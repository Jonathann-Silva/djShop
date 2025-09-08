'use server';

import { getCategories as getCategoriesFromProducts } from '@/lib/products';

// Ação para obter a lista de todas as categorias.
export async function getCategories(): Promise<string[]> {
  // Agora lê diretamente do arquivo de produtos, que é a fonte da verdade.
  return Promise.resolve(getCategoriesFromProducts());
}

// As funções de adicionar e remover foram desativadas porque não é possível
// escrever no sistema de arquivos em ambientes de produção como a Vercel.
// A gestão de categorias agora é feita diretamente no arquivo src/lib/products.ts.

export async function addCategory(categoryName: string): Promise<void> {
  throw new Error(
    'A adição de categorias via UI foi desativada para compatibilidade com a Vercel.'
  );
}

export async function removeCategory(categoryName: string): Promise<void> {
  throw new Error(
    'A remoção de categorias via UI foi desativada para compatibilidade com a Vercel.'
  );
}
