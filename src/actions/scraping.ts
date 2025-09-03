
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
): Promise<{ price: string | null; error: string | null }> {
  try {
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
    const pricePatterns = [
      /<div class="fs-sm mb-1"><b>(US\$\s?[\d,.]+)<\/b>/,
      /<div class="h1.*?">(R\$\s?(\d{1,3}(\.\d{3})*,\d{2}))\s*<\/div>/,
      /((?:R|US)\$\s?(\d{1,3}(?:[.,]\d{3})*[.,]\d{2}))/,
      /"price":\s?"(\d+\.\d{2})"/,
      /meta\s+property="product:price:amount"\s+content="(\d+\.\d{2})"/,
    ];

    for (const pattern of pricePatterns) {
      const match = html.match(pattern);
      if (match && match[1]) {
        let priceStr = match[1].replace(/<.*?>/g, '').trim();

        if (priceStr.startsWith('US$')) {
          const usdValue = parseFloat(priceStr.replace(/US\$\s?/, '').replace(',', '.'));
          if (!isNaN(usdValue)) {
            const exchangeRate = await getUsdToBrlRate();
            if (exchangeRate) {
              const brlValue = usdValue * exchangeRate;
              const formattedPrice = `R$ ${brlValue.toFixed(2).replace('.', ',')}`;
              return {
                price: `${formattedPrice} (convertido de US$ ${usdValue.toFixed(2)})`,
                error: null
              };
            } else {
              return {
                price: null,
                error: 'Não foi possível obter a taxa de câmbio para converter o valor.',
              };
            }
          }
        }
        
        if (!priceStr.includes('R$')) {
            priceStr = 'R$ ' + parseFloat(priceStr).toFixed(2).replace('.', ',');
        }

        return { price: priceStr, error: null };
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
