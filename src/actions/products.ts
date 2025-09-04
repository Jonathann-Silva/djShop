'use server';

import { PRODUCTS, type Product } from '@/lib/products';
import { z } from 'zod';
import fs from 'fs/promises';
import path from 'path';

// Zod schema para validação
const ProductSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, 'Nome é obrigatório'),
  price: z.number().min(0, 'Preço deve ser positivo'),
  description: z.string().min(1, 'Descrição é obrigatória'),
  category: z.string().min(1, 'Categoria é obrigatória'),
  image: z.string().url('URL da imagem inválida'),
  dataAiHint: z.string().optional(),
  onSale: z.boolean().optional(),
  colors: z.array(z.string()).optional(),
  scrapingUrl: z.string().url().optional().or(z.literal('')),
  priceMargin: z.number().min(0).optional(),
});

const productsFilePath = path.join(
  process.cwd(),
  'src',
  'lib',
  'products.ts'
);

async function readProductsFile(): Promise<Product[]> {
  // Em um ambiente real, você leria o arquivo.
  // Como estamos em um ambiente simulado que não permite re-leitura de arquivos
  // durante a mesma execução, vamos usar a constante importada.
  return Promise.resolve(PRODUCTS);
}

async function writeProductsFile(products: Product[]) {
  const fileContent = `export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  dataAiHint: string;
  onSale?: boolean;
  colors?: string[];
  scrapingUrl?: string;
  priceMargin?: number;
};

export const PRODUCTS: Product[] = ${JSON.stringify(products, null, 2)};

export const getProducts = (): Product[] => PRODUCTS;

export const getProductById = (id: number): Product | undefined =>
  PRODUCTS.find((p) => p.id === id);

export const getCategories = (): string[] => {
  const categories = PRODUCTS.map(p => p.category);
  return [...new Set(categories)];
}
`;
  // Esta escrita de arquivo é simulada e será aplicada pelo Studio.
  await fs.writeFile(productsFilePath, fileContent, 'utf-8');
}

export async function addProduct(
  productData: Omit<Product, 'id'>
): Promise<Product> {
  const validatedData = ProductSchema.omit({ id: true }).parse(productData);
  let products = await readProductsFile();

  const newProduct: Product = {
    ...validatedData,
    id: (products[products.length - 1]?.id || 0) + 1,
    dataAiHint: validatedData.dataAiHint || '',
    colors: validatedData.colors || [],
    scrapingUrl: validatedData.scrapingUrl || '',
    priceMargin: validatedData.priceMargin || 0,
  };

  const updatedProducts = [...products, newProduct];
  await writeProductsFile(updatedProducts);
  
  return newProduct;
}

export async function updateProduct(
  updatedProduct: Product
): Promise<Product> {
  const validatedData = ProductSchema.parse(updatedProduct);
  let products = await readProductsFile();

  const productIndex = products.findIndex((p) => p.id === validatedData.id);
  if (productIndex === -1) {
    throw new Error('Produto não encontrado');
  }

  products[productIndex] = validatedData;
  await writeProductsFile(products);

  return validatedData;
}
