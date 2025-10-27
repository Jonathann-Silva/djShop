
'use server';

import { updateProduct, updateElectronic, updateBebida } from '@/lib/actions';
import { getProducts, getElectronics, getBebidas } from '@/lib/data';
import { getRealTimePrice } from '@/ai/flows/get-real-time-price-flow';
import { Perfume, Product, Eletronico, Bebida } from '@/lib/products';
import { revalidatePath } from 'next/cache';

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
    const perfumes = (await getProducts()).map(p => ({...p, category: 'perfume' as const}));
    const eletronicos = (await getElectronics()).map(p => ({...p, category: 'eletronico' as const}));
    const bebidas = (await getBebidas()).map(p => ({...p, category: 'bebida' as const}));
    const allProducts: (Perfume | Eletronico | Bebida)[] = [...perfumes, ...eletronicos, ...bebidas];

    let updatedCount = 0;
    let failedCount = 0;

    for (const product of allProducts) {
      if (!product.priceUrl) {
        continue;
      }

      try {
        const result = await getRealTimePrice({ url: product.priceUrl });
        const dataToUpdate: Partial<Product> = {};
        let hasChanged = false;

        const profitMultiplier = 1 + product.profitMargin / 100;
        let newCostPrice = product.costPrice;

        if (result.price !== null) {
          const fetchedCostPrice = result.price;
          if (!product.costPrice || Math.abs(product.costPrice - fetchedCostPrice) > 0.01) {
            newCostPrice = fetchedCostPrice;
            dataToUpdate.costPrice = fetchedCostPrice;
            dataToUpdate.price = fetchedCostPrice * profitMultiplier;
            hasChanged = true;
          }
        } else {
            console.warn(`Não foi possível obter o preço para "${product.name}". Erro: ${result.error}`);
        }

        const scrapedOriginalCostPrice = result.originalPrice;
        // A product is on sale if we scraped an original price AND that original price is higher than the current cost price.
        const newOnSaleStatus = scrapedOriginalCostPrice !== null && newCostPrice !== undefined && scrapedOriginalCostPrice > newCostPrice;

        // If the sale status has changed (e.g. was on sale, now isn't, or vice-versa)
        if (product.onSale !== newOnSaleStatus) {
            dataToUpdate.onSale = newOnSaleStatus;
            hasChanged = true;
        }

        if (newOnSaleStatus && scrapedOriginalCostPrice) {
            const calculatedOriginalPrice = scrapedOriginalCostPrice * profitMultiplier;
            // If the original cost price or the calculated final price has changed, update it.
            if (product.originalCostPrice !== scrapedOriginalCostPrice || product.originalPrice !== calculatedOriginalPrice) {
                dataToUpdate.originalCostPrice = scrapedOriginalCostPrice;
                dataToUpdate.originalPrice = calculatedOriginalPrice;
                hasChanged = true;
            }
        } else if (product.onSale && !newOnSaleStatus) { // If product was on sale, but isn't anymore
            dataToUpdate.originalPrice = null;
            dataToUpdate.originalCostPrice = null;
            dataToUpdate.onSale = false; // Explicitly set to false
            hasChanged = true;
        }

        if (hasChanged) {
            const finalData = { ...product, ...dataToUpdate };
            switch(finalData.category) {
                case 'perfume': await updateProduct(finalData as Perfume); break;
                case 'eletronico': await updateElectronic(finalData as Eletronico); break;
                case 'bebida': await updateBebida(finalData as Bebida); break;
            }
            console.log(`Produto "${product.name}" atualizado. Preço de venda: ${finalData.price?.toFixed(2)}, Em promoção: ${finalData.onSale}, Preço Original: ${finalData.originalPrice?.toFixed(2)}`);
            updatedCount++;
        }

      } catch (error) {
        console.error(`Erro ao processar o produto "${product.name}":`, error);
        failedCount++;
      }
      
      await delay(500); 
    }

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
