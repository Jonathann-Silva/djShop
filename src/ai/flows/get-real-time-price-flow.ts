
'use server';
/**
 * @fileOverview A flow for fetching real-time prices from a URL using web scraping.
 *
 * - getRealTimePrice - A function that takes a URL and returns the extracted price.
 */

import { getUsdToBrlRate } from '@/services/currency';

async function fetchProductPrice(
  url: string
): Promise<{ price: number | null; error: string | null }> {
  try {
    if (!url) {
        return { price: null, error: "URL não fornecida."};
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
        error: `Falha ao buscar a página. Status: ${response.status}`,
      };
    }

    const html = await response.text();
    
    // Check if product is unavailable before looking for price
    if (html.includes('<div class="h5 mb-3">PRODUTO INDISPONÍVEL</div>')) {
        return { price: null, error: 'O produto está indisponível no site de origem.' };
    }

    const pricePatterns = [
      // Pattern for BRL like: <div class="h4 ...">R$ 4.207,50</div>
      { pattern: /<div class="h4.*?">R\$\s*([\d.,]+)<\/div>/, isUsd: false },
      // Pattern for BRL like: <div class="h1 ...">R$ 503,10</div>
      { pattern: /<div class="h1.*?">\s*R\$\s*(\d{1,3}(?:\.\d{3})*,\d{2})\s*<\/div>/, isUsd: false },
      // Pattern for USD like: <div class="fs-sm ..."><b>US$ 90,00</b></div>
      { pattern: /<div class="fs-sm mb-1"><b>US\$\s?([\d,.]+)<\/b>/, isUsd: true },
      // Generic patterns
      { pattern: /((?:R|US)\$\s?(\d{1,3}(?:[.,]\d{3})*[.,]\d{2}))/, isUsd: null }, // isUsd null to check in string
      { pattern: /"price":\s?"(\d+\.\d{2})"/, isUsd: false }, // Assume BRL by default
      { pattern: /meta\s+property="product:price:amount"\s+content="(\d+\.\d{2})"/, isUsd: false },
    ];

    for (const { pattern, isUsd: isUsdFlag } of pricePatterns) {
        const match = html.match(pattern);
        if (match && (match[1] || match[2])) {
            let priceStr = (match[1] || match[2]).replace(/<.*?>/g, '').trim();
            
            // Determine if it's USD
            const isUsd = isUsdFlag === null ? priceStr.toUpperCase().includes('US') : isUsdFlag;
            
            // Clean string for conversion
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
                        error: 'Não foi possível obter a taxa de câmbio para converter o valor.',
                    };
                }
            }
            return { price: numericPrice, error: null };
        }
    }

    return {
      price: null,
      error:
        'Não foi possível encontrar um padrão de preço reconhecível na página.',
    };
  } catch (error) {
    console.error('Erro de scraping:', error);
    return {
      price: null,
      error: 'Ocorreu um erro de rede ou o domínio de destino bloqueou a solicitação.',
    };
  }
}

// Wrapper to maintain compatibility with existing components.
export async function getRealTimePrice({ url }: { url: string }): Promise<{price: number} | null> {
    const result = await fetchProductPrice(url);
    if (result.price !== null) {
        return { price: result.price };
    }
    // Log the error for debugging on the server
    if (result.error) {
        console.error(`Price scraping failed for ${url}: ${result.error}`);
    }
    // Propagate a generic error or handle it as needed. For now, throwing to be caught by callers.
    throw new Error(result.error || 'Falha ao buscar o preço.');
}
