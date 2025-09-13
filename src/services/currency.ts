
'use server';

// This is a basic implementation to fetch the USD to BRL exchange rate.
// In a real-world application, you would use a more reliable and paid service,
// handle API keys securely, and add more robust error handling and caching.
const EXCHANGE_RATE_API_URL = 'https://api.exchangerate-api.com/v4/latest/USD';

let cachedRate: { rate: number; timestamp: number } | null = null;
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

export async function getUsdToBrlRate(): Promise<number | null> {
  // Return cached rate if it's not too old
  if (cachedRate && Date.now() - cachedRate.timestamp < CACHE_DURATION) {
    return cachedRate.rate;
  }

  try {
    const response = await fetch(EXCHANGE_RATE_API_URL, {
        next: { revalidate: 3600 } // Revalidate every hour
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch exchange rate. Status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data && data.rates && data.rates.BRL) {
      const rate = data.rates.BRL;
      // Cache the new rate
      cachedRate = { rate, timestamp: Date.now() };
      return rate;
    }

    return null;
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    // Return the old cached rate if fetching fails
    return cachedRate ? cachedRate.rate : null;
  }
}
