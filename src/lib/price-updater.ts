
'use server';
import { updateProduct } from '@/lib/actions';
import { getProducts } from '@/lib/data';
import { getRealTimePrice } from '@/ai/flows/get-real-time-price-flow';
import { Perfume } from '@/lib/products';
import { revalidatePath } from 'next/cache';

// Helper to introduce a delay between requests
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function updateAllProductPrices(): Promise<{
  success: boolean;
  message: string;
  updatedCount: number;
  failedCount: number;
  totalCount: number;
}> {
  console.log('Iniciando a atualização de preços...');
  
  try {
    const products = await getProducts();
    let updatedCount = 0;
    let failedCount = 0;

    for (const product of products) {
      if (!product.priceUrl) {
        continue; // Pula produtos sem URL de preço
      }

      try {
        const result = await getRealTimePrice({ url: product.priceUrl });

        if (result.price !== null) {
          const newCostPrice = result.price;
          const newSellingPrice = newCostPrice * (1 + product.profitMargin / 100);

          // Verifica se o preço de custo realmente mudou antes de atualizar
          // Usando uma pequena tolerância para evitar atualizações por flutuações mínimas
          if (!product.costPrice || Math.abs(product.costPrice - newCostPrice) > 0.01) {
            const updatedProductData: Perfume = {
              ...product,
              costPrice: newCostPrice,
              price: newSellingPrice,
            };

            await updateProduct(updatedProductData);
            console.log(`Preço do produto "${product.name}" atualizado para R$ ${newSellingPrice.toFixed(2)}`);
            updatedCount++;
          }
        } else {
          console.warn(`Não foi possível obter o preço para "${product.name}". Erro: ${result.error}`);
          failedCount++;
        }
      } catch (error) {
        console.error(`Erro ao processar o produto "${product.name}":`, error);
        failedCount++;
      }
      
      // Adiciona um pequeno atraso para não sobrecarregar o site de origem
      await delay(500); 
    }

    // Revalida as páginas principais após a conclusão de todas as atualizações
    revalidatePath('/catalogo', 'layout');
    revalidatePath('/', 'layout');

    const message = `Atualização concluída. ${updatedCount} preços atualizados, ${failedCount} falhas.`;
    console.log(message);
    return { success: true, message, updatedCount, failedCount, totalCount: products.length };

  } catch (error) {
    console.error('Erro geral no processo de atualização de preços:', error);
    return { 
        success: false, 
        message: 'Ocorreu um erro crítico durante a atualização.', 
        updatedCount: 0, 
        failedCount: 0,
        totalCount: 0 
    };
  }
}
