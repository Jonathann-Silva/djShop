
'use server';

import { adminDb } from './firebase-admin';
import { db } from './firebase';
import { collection, getDocs, doc, setDoc, addDoc, query, where, writeBatch, getDoc, deleteDoc } from 'firebase/firestore';
import { z } from 'zod';
import type { Perfume, Eletronico, Bebida, CartItem, Order } from './products';
import { revalidatePath } from 'next/cache';
import fs from 'fs/promises';
import path from 'path';

// --- Telegram Action ---

export async function sendTelegramNotification(message: string): Promise<{ success: boolean; message: string }> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.error("Telegram Bot Token ou Chat ID não estão configurados no .env");
    return { success: false, message: "A funcionalidade de notificação não está configurada." };
  }

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    const result = await response.json();

    if (result.ok) {
      return { success: true, message: "Pedido enviado com sucesso!" };
    } else {
      console.error("Erro ao enviar para o Telegram:", result);
      return { success: false, message: `Falha ao notificar o pedido: ${result.description}` };
    }
  } catch (error) {
    console.error("Erro de rede ao contatar a API do Telegram:", error);
    return { success: false, message: "Ocorreu um erro de rede ao enviar o pedido." };
  }
}


// --- Product Actions ---

const ProductSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Nome é obrigatório'),
  brand: z.string().min(1, 'Marca é obrigatória'),
  sizeMl: z.number().nonnegative('O tamanho (ml) não pode ser negativo'),
  gender: z.enum(['Masculine', 'Feminine'], { required_error: 'Gênero é obrigatório' }),
  profitMargin: z.number(),
  description: z.string().min(1, 'Descrição é obrigatória'),
  topNotes: z.string().optional(),
  heartNotes: z.string().optional(),
  baseNotes: z.string().optional(),
  imageId: z.string().min(1, 'ID da Imagem é obrigatório'),
  onSale: z.boolean().optional(),
  priceUrl: z.string().url('URL de preço inválida').optional().or(z.literal('')),
  imageUrl: z.string().url('URL da imagem inválida').optional().or(z.literal('')),
  price: z.number().optional().nullable(), 
  costPrice: z.number().optional().nullable(),
  createdAt: z.number().optional(),
});

export async function updateProduct(
  data: Perfume
): Promise<{ success: boolean; message: string }> {
  const validation = ProductSchema.safeParse(data);

  if (!validation.success) {
    console.error("Validação falhou:", validation.error.formErrors.fieldErrors);
    return { success: false, message: 'Dados inválidos.' };
  }
  
  const validatedData = validation.data;

  // Recalcula o preço de venda se a margem de lucro for alterada e o preço de custo existir
  if (validatedData.costPrice && validatedData.profitMargin >= 0) {
    validatedData.price = validatedData.costPrice * (1 + validatedData.profitMargin / 100);
  }


  try {
    const productRef = doc(db, 'products', validatedData.id);
    await setDoc(productRef, validatedData, { merge: true });

    revalidatePath('/admin/perfumes', 'layout');
    revalidatePath(`/admin/perfumes/${validatedData.id}/edit`);
    revalidatePath('/catalogo', 'layout');
    revalidatePath(`/products/${validatedData.id}`);

    return { success: true, message: 'Produto atualizado com sucesso!' };
  } catch (error) {
    console.error('Falha ao atualizar o produto:', error);
    return { success: false, message: 'Ocorreu um erro ao salvar o produto.' };
  }
}

export async function addProduct(
  data: Omit<Perfume, 'id' | 'createdAt'>
): Promise<{ success: boolean; message: string }> {
  const validationSchema = ProductSchema.omit({ id: true, createdAt: true });
  const validation = validationSchema.safeParse(data);

  if (!validation.success) {
    console.error("Validação falhou:", validation.error.formErrors.fieldErrors);
    return { success: false, message: 'Dados inválidos.' };
  }

  const dataWithTimestamp = {
    ...validation.data,
    createdAt: Date.now(),
  };
  
  try {
    const productsCollection = collection(db, 'products');
    await addDoc(productsCollection, dataWithTimestamp);
    
    revalidatePath('/admin/perfumes', 'layout');
    revalidatePath('/catalogo', 'layout');

    return { success: true, message: 'Produto adicionado com sucesso!' };
  } catch (error) {
    console.error('Falha ao adicionar o produto:', error);
    return { success: false, message: 'Ocorreu um erro ao salvar o produto.' };
  }
}

export async function removeProduct(id: string): Promise<{ success: boolean; message: string }> {
    if (!id) {
        return { success: false, message: 'ID do produto não fornecido.' };
    }
    try {
        const productRef = doc(db, 'products', id);
        await deleteDoc(productRef);
        
        revalidatePath('/admin/perfumes', 'layout');
        revalidatePath('/catalogo', 'layout');

        return { success: true, message: 'Produto removido com sucesso!' };
    } catch (error) {
        console.error('Falha ao remover o produto:', error);
        return { success: false, message: 'Ocorreu um erro ao remover o produto.' };
    }
}

// --- Eletronico Actions ---

const EletronicoSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Nome é obrigatório'),
  brand: z.string().min(1, 'Marca é obrigatória'),
  profitMargin: z.number(),
  description: z.string().min(1, 'Descrição é obrigatória'),
  imageId: z.string().min(1, 'ID da Imagem é obrigatório'),
  onSale: z.boolean().optional(),
  priceUrl: z.string().url('URL de preço inválida').optional().or(z.literal('')),
  imageUrl: z.string().url('URL da imagem inválida').optional().or(z.literal('')),
  price: z.number().optional().nullable(), 
  costPrice: z.number().optional().nullable(),
  createdAt: z.number().optional(),
});


export async function updateElectronic(
  data: Eletronico
): Promise<{ success: boolean; message: string }> {
  const validation = EletronicoSchema.safeParse(data);

  if (!validation.success) {
    console.error("Validação falhou:", validation.error.formErrors.fieldErrors);
    return { success: false, message: 'Dados inválidos.' };
  }
  
  const validatedData = validation.data;

  if (validatedData.costPrice && validatedData.profitMargin >= 0) {
    validatedData.price = validatedData.costPrice * (1 + validatedData.profitMargin / 100);
  }

  try {
    const electronicRef = doc(db, 'electronics', validatedData.id);
    await setDoc(electronicRef, validatedData, { merge: true });

    revalidatePath('/admin/eletronicos', 'layout');
    revalidatePath(`/admin/eletronicos/${validatedData.id}/edit`);

    return { success: true, message: 'Eletrônico atualizado com sucesso!' };
  } catch (error) {
    console.error('Falha ao atualizar o eletrônico:', error);
    return { success: false, message: 'Ocorreu um erro ao salvar o eletrônico.' };
  }
}

export async function addElectronic(
  data: Omit<Eletronico, 'id' | 'createdAt'>
): Promise<{ success: boolean; message: string }> {
  const validationSchema = EletronicoSchema.omit({ id: true, createdAt: true });
  const validation = validationSchema.safeParse(data);

  if (!validation.success) {
    console.error("Validação falhou:", validation.error.formErrors.fieldErrors);
    return { success: false, message: 'Dados inválidos.' };
  }

  const dataWithTimestamp = {
    ...validation.data,
    createdAt: Date.now(),
  };
  
  try {
    const electronicsCollection = collection(db, 'electronics');
    await addDoc(electronicsCollection, dataWithTimestamp);
    
    revalidatePath('/admin/eletronicos', 'layout');

    return { success: true, message: 'Eletrônico adicionado com sucesso!' };
  } catch (error) {
    console.error('Falha ao adicionar o eletrônico:', error);
    return { success: false, message: 'Ocorreu um erro ao salvar o eletrônico.' };
  }
}

export async function removeElectronic(id: string): Promise<{ success: boolean; message: string }> {
    if (!id) {
        return { success: false, message: 'ID do eletrônico não fornecido.' };
    }
    try {
        const electronicRef = doc(db, 'electronics', id);
        await deleteDoc(electronicRef);
        
        revalidatePath('/admin/eletronicos', 'layout');

        return { success: true, message: 'Eletrônico removido com sucesso!' };
    } catch (error) {
        console.error('Falha ao remover o eletrônico:', error);
        return { success: false, message: 'Ocorreu um erro ao remover o eletrônico.' };
    }
}


// --- Bebida Actions ---

const BebidaSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Nome é obrigatório'),
  brand: z.string().min(1, 'Marca é obrigatória'),
  profitMargin: z.number(),
  description: z.string().min(1, 'Descrição é obrigatória'),
  imageId: z.string().min(1, 'ID da Imagem é obrigatório'),
  onSale: z.boolean().optional(),
  priceUrl: z.string().url('URL de preço inválida').optional().or(z.literal('')),
  imageUrl: z.string().url('URL da imagem inválida').optional().or(z.literal('')),
  price: z.number().optional().nullable(), 
  costPrice: z.number().optional().nullable(),
  createdAt: z.number().optional(),
});


export async function updateBebida(
  data: Bebida
): Promise<{ success: boolean; message: string }> {
  const validation = BebidaSchema.safeParse(data);

  if (!validation.success) {
    console.error("Validação falhou:", validation.error.formErrors.fieldErrors);
    return { success: false, message: 'Dados inválidos.' };
  }
  
  const validatedData = validation.data;

  if (validatedData.costPrice && validatedData.profitMargin >= 0) {
    validatedData.price = validatedData.costPrice * (1 + validatedData.profitMargin / 100);
  }

  try {
    const bebidaRef = doc(db, 'bebidas', validatedData.id);
    await setDoc(bebidaRef, validatedData, { merge: true });

    revalidatePath('/admin/bebidas', 'layout');
    revalidatePath(`/admin/bebidas/${validatedData.id}/edit`);

    return { success: true, message: 'Bebida atualizada com sucesso!' };
  } catch (error) {
    console.error('Falha ao atualizar a bebida:', error);
    return { success: false, message: 'Ocorreu um erro ao salvar a bebida.' };
  }
}

export async function addBebida(
  data: Omit<Bebida, 'id' | 'createdAt'>
): Promise<{ success: boolean; message: string }> {
  const validationSchema = BebidaSchema.omit({ id: true, createdAt: true });
  const validation = validationSchema.safeParse(data);

  if (!validation.success) {
    console.error("Validação falhou:", validation.error.formErrors.fieldErrors);
    return { success: false, message: 'Dados inválidos.' };
  }

  const dataWithTimestamp = {
    ...validation.data,
    createdAt: Date.now(),
  };
  
  try {
    const bebidasCollection = collection(db, 'bebidas');
    await addDoc(bebidasCollection, dataWithTimestamp);
    
    revalidatePath('/admin/bebidas', 'layout');

    return { success: true, message: 'Bebida adicionada com sucesso!' };
  } catch (error) {
    console.error('Falha ao adicionar a bebida:', error);
    return { success: false, message: 'Ocorreu um erro ao salvar a bebida.' };
  }
}

export async function removeBebida(id: string): Promise<{ success: boolean; message: string }> {
    if (!id) {
        return { success: false, message: 'ID da bebida não fornecido.' };
    }
    try {
        const bebidaRef = doc(db, 'bebidas', id);
        await deleteDoc(bebidaRef);
        
        revalidatePath('/admin/bebidas', 'layout');

        return { success: true, message: 'Bebida removida com sucesso!' };
    } catch (error) {
        console.error('Falha ao remover a bebida:', error);
        return { success: false, message: 'Ocorreu um erro ao remover a bebida.' };
    }
}


// --- Brand Actions ---

export async function addBrand(brandName: string): Promise<{ success: boolean; message: string }> {
  if (!brandName || brandName.trim().length === 0) {
    return { success: false, message: 'O nome da marca não pode estar vazio.' };
  }
  const trimmedBrandName = brandName.trim();

  try {
    const brandsCollection = collection(db, 'brands');
    const q = query(brandsCollection, where("name", "==", trimmedBrandName));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return { success: false, message: 'Esta marca já existe.' };
    }

    await addDoc(brandsCollection, { name: trimmedBrandName });

    revalidatePath('/admin/perfumes', 'layout');
    revalidatePath('/admin/eletronicos', 'layout');
    revalidatePath('/admin/bebidas', 'layout');
    revalidatePath('/catalogo', 'layout');
    return { success: true, message: `Marca "${trimmedBrandName}" adicionada com sucesso.` };
  } catch (error) {
    console.error('Falha ao adicionar marca:', error);
    return { success: false, message: 'Ocorreu um erro ao adicionar a marca.' };
  }
}

export async function removeBrand(brandName: string): Promise<{ success: boolean; message: string }> {
  if (!brandName) {
    return { success: false, message: 'Nome da marca não fornecido.' };
  }
  try {
    // Verifica se a marca está em uso em perfumes
    const productsCollection = collection(db, 'products');
    const productQuery = query(productsCollection, where("brand", "==", brandName));
    const productSnapshot = await getDocs(productQuery);

    if (!productSnapshot.empty) {
      return { success: false, message: 'Não é possível remover a marca pois ela está sendo utilizada por um ou mais perfumes.' };
    }
    
    // Verifica se a marca está em uso em eletronicos
    const electronicsCollection = collection(db, 'electronics');
    const electronicQuery = query(electronicsCollection, where("brand", "==", brandName));
    const electronicSnapshot = await getDocs(electronicQuery);
    
    if (!electronicSnapshot.empty) {
      return { success: false, message: 'Não é possível remover a marca pois ela está sendo utilizada por um ou mais eletrônicos.' };
    }

    // Verifica se a marca está em uso em bebidas
    const bebidasCollection = collection(db, 'bebidas');
    const bebidaQuery = query(bebidasCollection, where("brand", "==", brandName));
    const bebidaSnapshot = await getDocs(bebidaQuery);

    if (!bebidaSnapshot.empty) {
        return { success: false, message: 'Não é possível remover a marca pois ela está sendo utilizada por uma ou mais bebidas.' };
    }

    // Encontra e remove a marca
    const brandsCollection = collection(db, 'brands');
    const brandQuery = query(brandsCollection, where("name", "==", brandName));
    const brandSnapshot = await getDocs(brandQuery);

    if (brandSnapshot.empty) {
      return { success: false, message: 'Marca não encontrada.' };
    }

    const batch = writeBatch(db);
    brandSnapshot.docs.forEach(doc => {
      batch.delete(doc.ref);
    });
    await batch.commit();

    revalidatePath('/admin/perfumes', 'layout');
    revalidatePath('/admin/eletronicos', 'layout');
    revalidatePath('/admin/bebidas', 'layout');
    revalidatePath('/catalogo', 'layout');
    return { success: true, message: `Marca "${brandName}" foi removida.` };
  } catch (error) {
    console.error('Falha ao remover marca:', error);
    return { success: false, message: 'Ocorreu um erro ao remover a marca.' };
  }
}

// --- Order Actions ---

const OrderItemSchema = z.object({
  productId: z.string(),
  name: z.string(),
  quantity: z.number(),
  price: z.number().nullable(),
  category: z.string(),
});

const OrderSchema = z.object({
  customerName: z.string(),
  address: z.string(),
  phone: z.string(),
  items: z.array(OrderItemSchema),
  paymentMethod: z.string(),
  total: z.number(),
  status: z.enum(['Pendente', 'Entregue']),
});


export async function createOrder(
  data: Omit<Order, 'id' | 'createdAt'>
): Promise<{ success: boolean; message: string }> {
  const validation = OrderSchema.safeParse(data);

  if (!validation.success) {
    console.error("Validação do pedido falhou:", validation.error.formErrors.fieldErrors);
    return { success: false, message: 'Dados do pedido inválidos.' };
  }

  const dataWithTimestamp = {
    ...validation.data,
    createdAt: Date.now(),
  };

  try {
    const ordersCollection = collection(db, 'orders');
    await addDoc(ordersCollection, dataWithTimestamp);
    
    revalidatePath('/admin/pedidos');

    return { success: true, message: 'Pedido criado com sucesso!' };
  } catch (error) {
    console.error('Falha ao criar o pedido:', error);
    return { success: false, message: 'Ocorreu um erro ao salvar o pedido.' };
  }
}

export async function updateOrderStatus(
  orderId: string,
  status: 'Pendente' | 'Entregue'
): Promise<{ success: boolean; message: string }> {
  if (!orderId || !status) {
    return { success: false, message: 'Dados inválidos.' };
  }
  
  try {
    const orderRef = doc(db, 'orders', orderId);
    await setDoc(orderRef, { status: status }, { merge: true });

    revalidatePath('/admin/pedidos');
    return { success: true, message: 'Status do pedido atualizado!' };
  } catch (error) {
    console.error('Falha ao atualizar o status do pedido:', error);
    return { success: false, message: 'Ocorreu um erro ao atualizar o status.' };
  }
}

    