
'use server';

import { getUsdToBrlRate } from '@/services/currency';

// ATENÇÃO: Esta é uma implementação muito básica de web scraping.
// A maioria dos sites modernos usa renderização via JavaScript ou medidas
// de segurança que impediriam este código de funcionar.
// Para uma solução robusta, seriam necessárias bibliotecas como
// Puppeteer (para controlar um navegador) ou Cheerio (para parsing de HTML),
// além de proxies para evitar bloqueios de IP.
// Considere isto uma PROVA DE CONCEITO.

export async function fetchProductPrice(
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
    
    // Verifica se o produto está indisponível antes de procurar o preço
    if (html.includes('<div class="h5 mb-3">PRODUTO INDISPONÍVEL</div>')) {
        return { price: null, error: 'O produto está indisponível no site de origem.' };
    }

    const pricePatterns = [
      // Padrão para R$ como: <div class="h4 ...">R$ 4.207,50</div>
      { pattern: /<div class="h4.*?">R\$\s*([\d.,]+)<\/div>/, isUsd: false },
      // Padrão para R$ como: <div class="h1 ...">R$ 503,10</div>
      { pattern: /<div class="h1.*?">\s*R\$\s*(\d{1,3}(?:\.\d{3})*,\d{2})\s*<\/div>/, isUsd: false },
      // Padrão para US$ como: <div class="fs-sm ..."><b>US$ 90,00</b></div>
      { pattern: /<div class="fs-sm mb-1"><b>US\$\s?([\d,.]+)<\/b>/, isUsd: true },
      // Padrões genéricos
      { pattern: /((?:R|US)\$\s?(\d{1,3}(?:[.,]\d{3})*[.,]\d{2}))/, isUsd: null }, // isUsd null para verificar na string
      { pattern: /"price":\s?"(\d+\.\d{2})"/, isUsd: false }, // Assume BRL por padrão se não especificado
      { pattern: /meta\s+property="product:price:amount"\s+content="(\d+\.\d{2})"/, isUsd: false },
    ];

    for (const { pattern, isUsd: isUsdFlag } of pricePatterns) {
        const match = html.match(pattern);
        if (match && (match[1] || match[2])) {
            let priceStr = (match[1] || match[2]).replace(/<.*?>/g, '').trim();
            
            // Determina se é USD
            const isUsd = isUsdFlag === null ? priceStr.toUpperCase().includes('US') : isUsdFlag;
            
            // Limpa a string para conversão
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
            // Retorna o número, a formatação será feita no componente
            return { price: numericPrice, error: null };
        }
    }

    return {
      price: null,
      error:
        'Não foi possível encontrar um padrão de preço reconhecível na página. O site pode carregar os preços dinamicamente com JavaScript.',
    };
  } catch (error) {
    console.error('Erro de scraping:', error);
    return {
      price: null,
      error: 'Ocorreu um erro de rede ou o domínio de destino bloqueou a solicitação.',
    };
  }
}
