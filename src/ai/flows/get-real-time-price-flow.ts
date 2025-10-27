
'use server';
/**
 * @fileOverview A flow for fetching real-time prices from a URL using web scraping.
 *
 * - getRealTimePrice - A function that takes a URL and returns the extracted price.
 */

import { getUsdToBrlRate } from '@/services/currency';

async function fetchProductPrice(
  url: string
): Promise<{ price: number | null; originalPrice: number | null; error: string | null }> {
  try {
    if (!url) {
        return { price: null, originalPrice: null, error: "URL não fornecida."};
    }
    
    const response = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    });

    if (!response.ok) {
      return {
        price: null,
        originalPrice: null,
        error: `Falha ao buscar a página. Status: ${response.status}`,
      };
    }

    const html = await response.text();
    
    if (html.includes('<div class="h5 mb-3">PRODUTO INDISPONÍVEL</div>')) {
        return { price: null, originalPrice: null, error: 'O produto está indisponível no site de origem.' };
    }

    const pricePatterns = [
      { pattern: /<div class="h4.*?">R\$\s*([\d.,]+)<\/div>/, isUsd: false },
      { pattern: /<div class="h1.*?">\s*R\$\s*(\d{1,3}(?:\.\d{3})*,\d{2})\s*<\/div>/, isUsd: false },
      { pattern: /<div class="fs-sm mb-1"><b>US\$\s?([\d,.]+)<\/b>/, isUsd: true },
      { pattern: /((?:R|US)\$\s?(\d{1,3}(?:[.,]\d{3})*[.,]\d{2}))/, isUsd: null },
      { pattern: /"price":\s?"(\d+\.\d{2})"/, isUsd: false }, 
      { pattern: /meta\s+property="product:price:amount"\s+content="(\d+\.\d{2})"/, isUsd: false },
    ];
    
    const onSalePatterns = [
        /<del.*?>(?:R\$\s*)?([\d.,]+)<\/del>/,
    ];
    let originalPrice: number | null = null;
    
    for (const onSalePattern of onSalePatterns) {
        const onSaleMatch = html.match(onSalePattern);
        if (onSaleMatch && onSaleMatch[1]) {
            let cleanedPriceStr = onSaleMatch[1].replace(/\./g, '').replace(',', '.');
            originalPrice = parseFloat(cleanedPriceStr);
            if (!isNaN(originalPrice)) {
                break;
            } else {
                originalPrice = null;
            }
        }
    }


    for (const { pattern, isUsd: isUsdFlag } of pricePatterns) {
        const match = html.match(pattern);
        if (match && (match[1] || match[2])) {
            let priceStr = (match[1] || match[2]).replace(/<.*?>/g, '').trim();
            
            const isUsd = isUsdFlag === null ? priceStr.toUpperCase().includes('US') : isUsdFlag;
            
            let cleanedPriceStr = priceStr.replace(/US\$\s?|R\$\s?/g, '').replace(/\./g, '').replace(',', '.');
            let numericPrice = parseFloat(cleanedPriceStr);

            if (isNaN(numericPrice)) continue;

            if (isUsd) {
                const exchangeRate = await getUsdToBrlRate();
                if (exchangeRate) {
                    numericPrice = numericPrice * exchangeRate;
                } else {
                    return {
                        price: null,
                        originalPrice: null,
                        error: 'Não foi possível obter a taxa de câmbio para converter o valor.',
                    };
                }
            }
            return { price: numericPrice, originalPrice, error: null };
        }
    }

    return {
      price: null,
      originalPrice: null,
      error:
        'Não foi possível encontrar um padrão de preço reconhecível na página.',
    };
  } catch (error) {
    console.error('Erro de scraping:', error);
    return {
      price: null,
      originalPrice: null,
      error: 'Ocorreu um erro de rede ou o domínio de destino bloqueou a solicitação.',
    };
  }
}

export async function getRealTimePrice({ url }: { url: string }): Promise<{price: number | null, originalPrice: number | null, error?: string | null}> {
    const result = await fetchProductPrice(url);
    if (result.price !== null) {
        return { price: result.price, originalPrice: result.originalPrice, error: null };
    }
    
    if (result.error) {
        console.error(`Price scraping failed for ${url}: ${result.error}`);
    }

    return { price: null, originalPrice: null, error: result.error };
}
