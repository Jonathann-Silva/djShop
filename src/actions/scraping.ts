
'use server';

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
        // Simular um navegador para evitar bloqueios simples
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

    // Tenta encontrar o preço usando expressões regulares.
    // Esta é a parte mais frágil e específica para cada site.
    // As expressões abaixo são exemplos genéricos.
    const pricePatterns = [
      // Padrão específico para: <div class="h1 ..."> R$ 503,10 ... </div>
      /<div class="h1.*?">(R\$\s?(\d{1,3}(\.\d{3})*,\d{2}))\s*<\/div>/,
      // Padrão para "R$ 1.234,56"
      /(R\$\s?(\d{1,3}(\.\d{3})*,\d{2}))/,
      // Padrão para "price": "1234.56" em scripts JSON
      /"price":\s?"(\d+\.\d{2})"/,
      // Padrão para "price" content="1234.56" em meta tags
      /meta\s+property="product:price:amount"\s+content="(\d+\.\d{2})"/,
    ];

    for (const pattern of pricePatterns) {
      const match = html.match(pattern);
      if (match && match[1]) {
        // Retorna a primeira correspondência encontrada
        let price = match[1];
        // Limpa qualquer HTML extra que possa ter sido capturado
        price = price.replace(/<.*?>/g, '').trim();
        
        if (!price.includes('R$')) {
            price = 'R$ ' + parseFloat(price).toFixed(2).replace('.', ',');
        }
        return { price, error: null };
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
