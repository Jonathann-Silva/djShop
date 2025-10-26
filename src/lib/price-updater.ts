
'use server';

import { updateProduct, updateElectronic, updateBebida } from '@/lib/actions';
import { getProducts, getElectronics, getBebidas } from '@/lib/data';
import { getRealTimePrice } from '@/ai/flows/get-real-time-price-flow';
import { Perfume, Product } from '@/lib/products';
import { revalidatePath } from 'next/cache';

// Helper para introduzir um atraso entre as requisições
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/* Esta função auxiliar parece não ser usada pela lógica principal de atualização em massa, 
  mas a mantive caso seja usada em outro lugar.
*/
async function updateSingleProduct(product: Product) {
  const newCostPrice = product.costPrice!;
  const newSellingPrice = Math.ceil(newCostPrice * (1 + product.profitMargin / 100));

  const updatedProductData = {
    ...product,
    costPrice: newCostPrice,
    price: newSellingPrice,
  };

  switch (product.category) {
    case 'perfume':
      await updateProduct(updatedProductData as Perfume);
      break;
    case 'eletronico':
      await updateElectronic(updatedProductData);
      break;
    case 'bebida':
      await updateBebida(updatedProductData);
      break;
  }

  console.log(`Preço do produto "${product.name}" atualizado para R$ ${newSellingPrice.toFixed(2)}`);
}

/**
 * Função principal do robô: busca os preços de todos os produtos e atualiza no banco de dados.
 */
export async function updateAllProductPrices(): Promise<{
  success: boolean;
  message: string;
  updatedCount: number;
  failedCount: number;
  totalCount: number;
}> {
  console.log('Iniciando a atualização de preços...');
  
  try {
    const perfumes = (await getProducts()).map(p => ({...p, category: 'perfume' as const}));
    const eletronicos = (await getElectronics()).map(p => ({...p, category: 'eletronico' as const}));
    const bebidas = (await getBebidas()).map(p => ({...p, category: 'bebida' as const}));
    const allProducts = [...perfumes, ...eletronicos, ...bebidas];

    let updatedCount = 0;
    let failedCount = 0;

    for (const product of allProducts) {
      if (!product.priceUrl) {
        continue;
      }

      try {
        const result = await getRealTimePrice({ url: product.priceUrl });
        const dataToUpdate = { ...product };
        let hasChanged = false;

        // --- Lógica de Preço de Custo e Venda ---
        if (result.price !== null) {
          const newCostPrice = result.price;
          // Verifica se o preço de custo mudou (com uma pequena tolerância para evitar atualizações desnecessárias)
          if (!product.costPrice || Math.abs(product.costPrice - newCostPrice) > 0.01) {
            dataToUpdate.costPrice = newCostPrice;
            dataToUpdate.price = Math.ceil(newCostPrice * (1 + product.profitMargin / 100));
            hasChanged = true;
          }
        } else {
            console.warn(`Não foi possível obter o preço para "${product.name}". Erro: ${result.error}`);
        }

        // --- Lógica de Promoção ---
        const newOriginalPrice = result.originalPrice;
        const newOnSaleStatus = newOriginalPrice !== null && result.price !== null && newOriginalPrice > result.price;

        if (product.onSale !== newOnSaleStatus || product.originalPrice !== newOriginalPrice) {
            dataToUpdate.onSale = newOnSaleStatus;
            dataToUpdate.originalPrice = newOriginalPrice;
            hasChanged = true;
        }

        // --- Salvar no Banco de Dados se houver alguma mudança ---
        if (hasChanged) {
            switch(dataToUpdate.category) {
                case 'perfume': await updateProduct(dataToUpdate as Perfume); break;
                case 'eletronico': await updateElectronic(dataToUpdate); break;
                case 'bebida': await updateBebida(dataToUpdate); break;
            }
            console.log(`Produto "${product.name}" atualizado. Preço de venda: ${dataToUpdate.price?.toFixed(2)}, Em promoção: ${dataToUpdate.onSale}, Preço Original: ${dataToUpdate.originalPrice}`);
            updatedCount++;
        }

      } catch (error) {
        console.error(`Erro ao processar o produto "${product.name}":`, error);
        failedCount++;
      }
      
      // Atraso para não sobrecarregar o site de origem
      await delay(500); 
    }

    // Revalida o cache das páginas para que os usuários vejam os novos preços
    revalidatePath('/catalogo', 'layout');
    revalidatePath('/', 'layout');

    const message = `Atualização concluída. ${updatedCount} produtos atualizados, ${failedCount} falhas.`;
    console.log(message);
    return { success: true, message, updatedCount, failedCount, totalCount: allProducts.length };

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
