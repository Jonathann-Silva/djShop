
'use server';

import fs from 'fs/promises';
import path from 'path';
import {z} from 'genkit';
import type {Perfume} from './products';
import {revalidatePath} from 'next/cache';

const productsFilePath = path.join(process.cwd(), 'src', 'lib', 'products.db.json');
const brandsFilePath = path.join(process.cwd(), 'src', 'lib', 'brands.db.json');

async function getAllBrands(): Promise<string[]> {
    try {
        const brandsData = await fs.readFile(brandsFilePath, 'utf-8');
        const brandsJson = JSON.parse(brandsData);
        return brandsJson.brands || [];
    } catch (error) {
        // If the file doesn't exist, we start with an empty array
        if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
            return [];
        }
        console.error('Failed to read brands:', error);
        return [];
    }
}

export async function getProducts(): Promise<Perfume[]> {
    try {
        const productsData = await fs.readFile(productsFilePath, 'utf-8');
        const productsJson = JSON.parse(productsData);
        return productsJson.products;
    } catch (error) {
        console.error('Failed to read products:', error);
        return [];
    }
}

export async function getBrands(): Promise<string[]> {
    const brands = await getAllBrands();
    return brands.sort();
}

export async function addBrand(brandName: string): Promise<{ success: boolean; message: string }> {
    if (!brandName || brandName.trim().length === 0) {
        return { success: false, message: 'O nome da marca não pode estar vazio.' };
    }
    try {
        const brands = await getAllBrands();
        if (brands.some(b => b.toLowerCase() === brandName.trim().toLowerCase())) {
            return { success: false, message: 'Esta marca já existe.' };
        }
        
        const updatedBrands = [...brands, brandName.trim()];
        await fs.writeFile(brandsFilePath, JSON.stringify({ brands: updatedBrands }, null, 2), 'utf-8');

        revalidatePath('/products', 'layout');
        revalidatePath('/catalogo', 'layout');
        return { success: true, message: `Marca "${brandName.trim()}" adicionada com sucesso.` };
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
        const products = await getProducts();
        const isBrandInUse = products.some(p => p.brand === brandName);

        if (isBrandInUse) {
            return { success: false, message: 'Não é possível remover a marca pois ela está sendo utilizada por um ou mais produtos.' };
        }

        let brands = await getAllBrands();
        const updatedBrands = brands.filter(b => b !== brandName);
        await fs.writeFile(brandsFilePath, JSON.stringify({ brands: updatedBrands }, null, 2), 'utf-8');


        revalidatePath('/products', 'layout');
        revalidatePath('/catalogo', 'layout');
        return { success: true, message: `Marca "${brandName}" foi removida.` };
    } catch (error) {
        console.error('Falha ao remover marca:', error);
        return { success: false, message: 'Ocorreu um erro ao remover a marca.' };
    }
}


export async function getGenders(): Promise<string[]> {
    const products = await getProducts();
    return [...new Set(products.map(p => p.gender))];
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
): Promise<{success: boolean; message: string}> {

  const validation = ProductSchema.safeParse(data);

  if (!validation.success) {
    console.error("Zod validation failed:", validation.error.formErrors.fieldErrors);
    return {success: false, message: 'Dados inválidos.'};
  }

  try {
    const products = await getProducts();
    const productsJson = { products };


    const productIndex = productsJson.products.findIndex(
      (p: Perfume) => p.id === data.id
    );

    if (productIndex === -1) {
      return {success: false, message: 'Produto não encontrado.'};
    }

    productsJson.products[productIndex] = data;

    await fs.writeFile(
      productsFilePath,
      JSON.stringify(productsJson, null, 2),
      'utf-8'
    );
    
    revalidatePath('/products', 'layout');


    return {success: true, message: 'Produto atualizado com sucesso!'};
  } catch (error) {
    console.error('Falha ao atualizar o produto:', error);
    return {
      success: false,
      message: 'Ocorreu um erro ao salvar o produto.',
    };
  }
}

export async function addProduct(
  data: Omit<Perfume, 'id'>
): Promise<{success: boolean; message: string}> {

   const validation = ProductSchema.omit({ id: true }).safeParse(data);

   if (!validation.success) {
    console.error("Zod validation failed:", validation.error.formErrors.fieldErrors);
    return {success: false, message: 'Dados inválidos.'};
  }

  try {
    const products = await getProducts();
    const productsJson = { products };

    const newId = (Math.max(0, ...productsJson.products.map(p => parseInt(p.id, 10))) + 1).toString();
    const newProduct: Perfume = { id: newId, ...data };

    productsJson.products.push(newProduct);
    
    await fs.writeFile(
      productsFilePath,
      JSON.stringify(productsJson, null, 2),
      'utf-8'
    );

    revalidatePath('/products', 'layout');

    return { success: true, message: 'Produto adicionado com sucesso!' };
  } catch (error) {
    console.error('Falha ao adicionar o produto:', error);
    return {
      success: false,
      message: 'Ocorreu um erro ao salvar o produto.',
    };
  }
}
