
'use server';

import { z } from 'zod';
import fs from 'fs/promises';
import path from 'path';

// Este caminho aponta para o novo arquivo que armazenará as marcas.
const brandsFilePath = path.join(process.cwd(), 'src', 'lib', 'brands.ts');

// Função para ler as marcas do arquivo.
// Usaremos um try-catch para lidar com o caso do arquivo ainda não existir.
async function readBrandsFile(): Promise<string[]> {
  try {
    // Importação dinâmica para garantir que estamos lendo a versão mais recente do arquivo.
    const fileContent = await import(`@/lib/brands?v=${Date.now()}`);
    return fileContent.BRANDS || [];
  } catch (error) {
    // Se o arquivo não existe, retorna um array vazio.
    return [];
  }
}

// Função para escrever a lista atualizada de marcas no arquivo.
async function writeBrandsFile(brands: string[]) {
  const uniqueBrands = [...new Set(brands)].sort();
  const fileContent = `// Este arquivo é gerenciado automaticamente. Não edite manualmente.
export const BRANDS: string[] = ${JSON.stringify(uniqueBrands, null, 2)};
`;
  // Esta escrita de arquivo é simulada e será aplicada pelo Studio.
  await fs.writeFile(brandsFilePath, fileContent, 'utf-8');
}

// Ação para obter a lista de todas as marcas.
export async function getBrands(): Promise<string[]> {
  return await readBrandsFile();
}

// Ação para adicionar uma nova marca.
export async function addBrand(brandName: string): Promise<void> {
  const validatedName = z.string().min(1).parse(brandName);
  const brands = await readBrandsFile();
  
  if (brands.some(b => b.toLowerCase() === validatedName.toLowerCase())) {
    throw new Error('Esta marca já existe.');
  }

  const updatedBrands = [...brands, validatedName];
  await writeBrandsFile(updatedBrands);
}

// Ação para remover uma marca (a ser implementada futuramente).
export async function removeBrand(brandName: string): Promise<void> {
  const validatedName = z.string().min(1).parse(brandName);
  let brands = await readBrandsFile();
  
  const updatedBrands = brands.filter(b => b.toLowerCase() !== validatedName.toLowerCase());

  if (brands.length === updatedBrands.length) {
      throw new Error('Marca não encontrada.');
  }
  
  await writeBrandsFile(updatedBrands);
}
