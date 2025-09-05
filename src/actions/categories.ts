
'use server';

import { z } from 'zod';
import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';

const categoriesFilePath = path.join(process.cwd(), 'src', 'lib', 'categories.ts');

async function readCategoriesFile(): Promise<string[]> {
  try {
    const fileContent = await import(`@/lib/categories?v=${Date.now()}`);
    return fileContent.CATEGORIES || [];
  } catch (error) {
    return [];
  }
}

async function writeCategoriesFile(categories: string[]) {
  const uniqueCategories = [...new Set(categories)].sort();
  const fileContent = `// Este arquivo é gerenciado automaticamente. Não edite manualmente.
export const CATEGORIES: string[] = ${JSON.stringify(uniqueCategories, null, 2)};
`;
  await fs.writeFile(categoriesFilePath, fileContent, 'utf-8');
}


export async function getCategories(): Promise<string[]> {
  return await readCategoriesFile();
}


export async function addCategory(categoryName: string): Promise<void> {
  const validatedName = z.string().min(1).parse(categoryName);
  const categories = await readCategoriesFile();
  
  if (categories.some(c => c.toLowerCase() === validatedName.toLowerCase())) {
    throw new Error('Esta categoria já existe.');
  }

  const updatedCategories = [...categories, validatedName];
  await writeCategoriesFile(updatedCategories);
  revalidatePath('/admin/brands');
}


export async function removeCategory(categoryName: string): Promise<void> {
  const validatedName = z.string().min(1).parse(categoryName);
  let categories = await readCategoriesFile();
  
  // Aqui você pode querer adicionar uma verificação se a categoria está em uso
  // antes de permitir a exclusão. Por simplicidade, vamos pular isso por enquanto.

  const updatedCategories = categories.filter(c => c.toLowerCase() !== validatedName.toLowerCase());

  if (categories.length === updatedCategories.length) {
      throw new Error('Categoria não encontrada.');
  }
  
  await writeCategoriesFile(updatedCategories);
  revalidatePath('/admin/brands');
}
