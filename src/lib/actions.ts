'use server';

import fs from 'fs/promises';
import path from 'path';
import {z} from 'genkit';
import {Perfume, products} from './products';
import {revalidatePath} from 'next/cache';

const productsFilePath = path.join(process.cwd(), 'src', 'lib', 'products.json');

const UpdateProductInputSchema = z.object({
  id: z.string(),
  name: z.string(),
  brand: z.string(),
  scentProfile: z.enum(['Floral', 'Woody', 'Oriental', 'Fresh', 'Spicy']),
  gender: z.enum(['Masculine', 'Feminine']),
  price: z.number(),
  description: z.string(),
  notes: z.string(),
  imageId: z.string(),
});

export async function updateProduct(
  data: Perfume
): Promise<{success: boolean; message: string}> {
  const validation = UpdateProductInputSchema.safeParse(data);

  if (!validation.success) {
    return {success: false, message: 'Dados inválidos.'};
  }

  try {
    const productsData = await fs.readFile(productsFilePath, 'utf-8');
    const productsJson = JSON.parse(productsData);

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


    return {success: true, message: 'Produto atualizado com sucesso!'};
  } catch (error) {
    console.error('Falha ao atualizar o produto:', error);
    return {
      success: false,
      message: 'Ocorreu um erro ao salvar o produto.',
    };
  }
}
