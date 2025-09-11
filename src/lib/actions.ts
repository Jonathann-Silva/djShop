
'use server';

import fs from 'fs/promises';
import path from 'path';
import {z} from 'genkit';
import type {Perfume} from './products';
import {revalidatePath} from 'next/cache';

const productsFilePath = path.join(process.cwd(), 'src', 'lib', 'products.db.json');

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
    const products = await getProducts();
    return [...new Set(products.map(p => p.brand))];
}

export async function getScentProfiles(): Promise<string[]> {
    const products = await getProducts();
    return [...new Set(products.map(p => p.scentProfile))];
}

export async function getGenders(): Promise<string[]> {
    const products = await getProducts();
    return [...new Set(products.map(p => p.gender))];
}

const UpdateProductInputSchema = z.object({
  id: z.string(),
  name: z.string(),
  brand: z.string(),
  scentProfile: z.enum(['Floral', 'Woody', 'Oriental', 'Fresh', 'Spicy']),
  gender: z.enum(['Masculine', 'Feminine']),
  profitMargin: z.number(),
  description: z.string(),
  notes: z.string(),
  imageId: z.string(),
  priceUrl: z.string().optional(),
  imageUrl: z.string().optional(),
});

export async function updateProduct(
  data: Perfume
): Promise<{success: boolean; message: string}> {
  const validation = UpdateProductInputSchema.safeParse(data);

  if (!validation.success) {
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
    
    // Invalidate caches for paths that show product info
    revalidatePath('/products');
    revalidatePath(`/products/${data.id}`);
    revalidatePath(`/products/${data.id}/edit`);
    revalidatePath('/catalogo');
    revalidatePath('/');


    return {success: true, message: 'Produto atualizado com sucesso!'};
  } catch (error) {
    console.error('Falha ao atualizar o produto:', error);
    return {
      success: false,
      message: 'Ocorreu um erro ao salvar o produto.',
    };
  }
}
