'use server';

import { getBrands as getBrandsFromProducts } from '@/lib/products';

// Ação para obter a lista de todas as marcas.
export async function getBrands(): Promise<string[]> {
  // Agora lê diretamente do arquivo de produtos, que é a fonte da verdade.
  return Promise.resolve(getBrandsFromProducts());
}

// As funções de adicionar e remover foram desativadas porque não é possível
// escrever no sistema de arquivos em ambientes de produção como a Vercel.
// A gestão de marcas agora é feita diretamente no arquivo src/lib/products.ts.

export async function addBrand(brandName: string): Promise<void> {
  throw new Error(
    'A adição de marcas via UI foi desativada para compatibilidade com a Vercel.'
  );
}

export async function removeBrand(brandName: string): Promise<void> {
  throw new Error(
    'A remoção de marcas via UI foi desativada para compatibilidade com a Vercel.'
  );
}
