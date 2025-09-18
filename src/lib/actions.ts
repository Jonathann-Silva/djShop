
'use server';

import { adminDb } from './firebase-admin';
import { db } from './firebase';
import { collection, getDocs, doc, setDoc, addDoc, query, where, writeBatch } from 'firebase/firestore';
import { z } from 'genkit';
import type { Perfume } from './products';
import { revalidatePath } from 'next/cache';
import fs from 'fs/promises';
import path from 'path';

// --- Data Migration Helper ---
async function migrateDataIfNeeded() {
  const productsCollection = adminDb.collection('products');
  const productsSnapshot = await productsCollection.get();

  if (!productsSnapshot.empty) return;

  console.log("Firestore está vazio. Iniciando migração de dados...");

  try {
    const productsFilePath = path.join(process.cwd(), 'src', 'lib', 'products.db.json');
    const brandsFilePath = path.join(process.cwd(), 'src', 'lib', 'brands.db.json');

    const productsData = await fs.readFile(productsFilePath, 'utf-8');
    const brandsData = await fs.readFile(brandsFilePath, 'utf-8');

    const productsToMigrate = JSON.parse(productsData).products;
    const brandsToMigrate = JSON.parse(brandsData).brands;

    const batch = adminDb.batch();

    productsToMigrate.forEach((product: Perfume) => {
      const productRef = adminDb.collection('products').doc(product.id);
      batch.set(productRef, product);
    });

    brandsToMigrate.forEach((brandName: string) => {
      const brandRef = adminDb.collection('brands').doc();
      batch.set(brandRef, { name: brandName });
    });

    await batch.commit();
    console.log("Migração concluída com sucesso!");
  } catch (error) {
    console.error("Erro na migração:", error);
  }
}

// --- Product Actions ---

export async function getProducts(): Promise<Perfume[]> {
  await migrateDataIfNeeded(); // Garantir que dados existam

  try {
    const productsCollection = collection(db, 'products');
    const productsSnapshot = await getDocs(productsCollection);
    const productsList = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Perfume));
    return productsList;
  } catch (error) {
    console.error('Falha ao ler produtos do Firestore:', error);
    return [];
  }
}

const ProductSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Nome é obrigatório'),
  brand: z.string().min(1, 'Marca é obrigatória'),
  sizeMl: z.number().min(1, 'Tamanho (ml) é obrigatório'),
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
});

export async function updateProduct(
  data: Perfume
): Promise<{ success: boolean; message: string }> {
  const validation = ProductSchema.safeParse(data);

  if (!validation.success) {
    console.error("Validação falhou:", validation.error.formErrors.fieldErrors);
    return { success: false, message: 'Dados inválidos.' };
  }

  try {
    const productRef = doc(db, 'products', data.id);
    await setDoc(productRef, data, { merge: true });

    revalidatePath('/products', 'layout');
    revalidatePath(`/products/${data.id}`);
    revalidatePath(`/products/${data.id}/edit`);
    revalidatePath('/catalogo');

    return { success: true, message: 'Produto atualizado com sucesso!' };
  } catch (error) {
    console.error('Falha ao atualizar o produto:', error);
    return { success: false, message: 'Ocorreu um erro ao salvar o produto.' };
  }
}

export async function addProduct(
  data: Omit<Perfume, 'id'>
): Promise<{ success: boolean; message: string }> {
  const validation = ProductSchema.omit({ id: true }).safeParse(data);

  if (!validation.success) {
    console.error("Validação falhou:", validation.error.formErrors.fieldErrors);
    return { success: false, message: 'Dados inválidos.' };
  }
  
  try {
    const productsCollection = collection(db, 'products');
    // Use addDoc to let Firestore generate the ID
    await addDoc(productsCollection, data);
    
    revalidatePath('/products', 'layout');
    revalidatePath('/catalogo');

    return { success: true, message: 'Produto adicionado com sucesso!' };
  } catch (error) {
    console.error('Falha ao adicionar o produto:', error);
    return { success: false, message: 'Ocorreu um erro ao salvar o produto.' };
  }
}

// --- Brand Actions ---

export async function getBrands(): Promise<string[]> {
  try {
    const brandsCollection = collection(db, 'brands');
    const brandsSnapshot = await getDocs(brandsCollection);
    const brandsList = brandsSnapshot.docs.map(doc => doc.data().name as string);
    return brandsList.sort();
  } catch (error) {
    console.error('Falha ao ler marcas do Firestore:', error);
    return [];
  }
}

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

    revalidatePath('/products', 'layout');
    revalidatePath('/catalogo');
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
    // Verifica se a marca está em uso
    const productsCollection = collection(db, 'products');
    const productQuery = query(productsCollection, where("brand", "==", brandName));
    const productSnapshot = await getDocs(productQuery);

    if (!productSnapshot.empty) {
      return { success: false, message: 'Não é possível remover a marca pois ela está sendo utilizada por um ou mais produtos.' };
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

    revalidatePath('/products', 'layout');
    revalidatePath('/catalogo');
    return { success: true, message: `Marca "${brandName}" foi removida.` };
  } catch (error) {
    console.error('Falha ao remover marca:', error);
    return { success: false, message: 'Ocorreu um erro ao remover a marca.' };
  }
}

// --- Outros ---

export async function getGenders(): Promise<string[]> {
  const products = await getProducts();
  return [...new Set(products.map(p => p.gender))];
}
