
'use server';
/**
 * @fileOverview A flow for fetching real-time prices from a URL using an AI tool.
 *
 * - getRealTimePrice - A function that takes a URL and returns the extracted price.
 * - GetRealTimePriceInput - The input type for the getRealTimePrice function.
 * - GetRealTimePriceOutput - The return type for the getRealTimePrice function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import fetch from 'node-fetch';
import {load} from 'cheerio';

const GetRealTimePriceInputSchema = z.object({
  url: z.string().url().describe('The URL of the product page.'),
});
export type GetRealTimePriceInput = z.infer<typeof GetRealTimePriceInputSchema>;

const GetRealTimePriceOutputSchema = z.object({
  price: z.number().describe('The extracted price from the URL.'),
});
export type GetRealTimePriceOutput = z.infer<
  typeof GetRealTimePriceOutputSchema
>;

export async function getRealTimePrice(
  input: GetRealTimePriceInput
): Promise<GetRealTimePriceOutput> {
  return getRealTimePriceFlow(input);
}

const getRealTimePriceFromUrl = ai.defineTool(
  {
    name: 'getRealTimePriceFromUrl',
    description: 'Extracts the product price from a given URL.',
    inputSchema: GetRealTimePriceInputSchema,
    outputSchema: GetRealTimePriceOutputSchema,
  },
  async ({url}) => {
    try {
      const response = await fetch(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch page, status: ${response.status}`);
      }

      const html = await response.text();
      const $ = load(html);

      // Try a few common selectors to find the price
      const selectors = [
          'div.h4.fw-normal.text-accent', // Original selector for lgimportados
          '.price',
          'span.price',
          '[itemprop="price"]',
          '.product-price',
          '#price',
          '#product-price',
          '.Price',
          '.price-tag',
          'span[data-price]',
          'div[data-price]'
      ];
      
      let priceText = '';
      for (const selector of selectors) {
          const element = $(selector).first();
          if (element.length) {
            priceText = element.text();
            if(priceText) break;
            
            if (element.attr('content')) {
                priceText = element.attr('content')!;
                if(priceText) break;
            }
          }
      }

      if (!priceText) {
        throw new Error('Price element not found on the page.');
      }

      const cleanedPrice = priceText
        .replace(/[^0-9,.]/g, '') 
        .replace(/\./g, (match, offset, string) => string.indexOf(',') > offset ? '' : match)
        .replace(',', '.'); 
        
      const price = parseFloat(cleanedPrice);

      if (isNaN(price)) {
          throw new Error('Failed to parse price from text: ' + priceText);
      }

      return {price};
    } catch (error) {
        console.error(`Failed to scrape price from ${url}:`, error);
        if (error instanceof Error) {
            throw new Error(`Could not fetch or parse price from URL: ${error.message}`);
        }
        throw new Error('An unknown error occurred during web scraping.');
    }
  }
);

const getRealTimePriceFlow = ai.defineFlow(
  {
    name: 'getRealTimePriceFlow',
    inputSchema: GetRealTimePriceInputSchema,
    outputSchema: GetRealTimePriceOutputSchema,
  },
  async input => {
    return await getRealTimePriceFromUrl(input);
  }
);
