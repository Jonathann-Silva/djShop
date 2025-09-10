
'use server';

// URL da API para obter a cotação do Dólar para o Real
const EXCHANGE_RATE_API_URL = 'https://economia.awesomeapi.com.br/last/USD-BRL';

type ExchangeRateResponse = {
  USDBRL: {
    bid: string; // Valor de compra, que usaremos para a conversão
  };
};

/**
 * Busca a cotação atual de USD para BRL.
 * @returns A taxa de câmbio, ou null em caso de erro.
 */
export async function getUsdToBrlRate(): Promise<number | null> {
  try {
    const response = await fetch(EXCHANGE_RATE_API_URL, {
      // Revalida a cada 1 hora para não sobrecarregar a API
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      console.error('Falha ao buscar a taxa de câmbio. Status:', response.status);
      return null;
    }

    const data: ExchangeRateResponse = await response.json();
    const rate = parseFloat(data.USDBRL.bid);
    
    if (isNaN(rate)) {
        console.error('Resposta da API de câmbio em formato inesperado:', data);
        return null;
    }

    return rate;
  } catch (error) {
    console.error('Erro ao conectar com a API de câmbio:', error);
    return null;
  }
}
