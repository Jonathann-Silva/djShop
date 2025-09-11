
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
      const response = await fetch(url);
      const html = await response.text();
      const $ = load(html);

      // Try a few common selectors to find the price
      const selectors = [
          'div.h4.fw-normal.text-accent', // Original selector
          'span.price',
          '[itemprop="price"]',
          '.product-price',
          '#price',
          '#product-price'
      ];
      
      let priceText = '';
      for (const selector of selectors) {
          const element = $(selector).first();
          if (element.length) {
            priceText = element.text();
            if(priceText) break;
            
            // Sometimes price is in a 'content' attribute for meta tags
            if (element.attr('content')) {
                priceText = element.attr('content')!;
                if(priceText) break;
            }
          }
      }

      if (!priceText) {
        throw new Error('Price element not found on the page.');
      }

      // Clean the text and parse it into a number
      // Removes currency symbols, trims whitespace, handles different decimal separators
      const cleanedPrice = priceText
        .replace(/[^0-9,.]/g, '') // Remove everything except numbers, commas, and dots
        .trim()
        .replace('.', '') // Remove thousand separators (like in 1.234,56)
        .replace(',', '.'); // Replace comma decimal separator with a dot
        
      const price = parseFloat(cleanedPrice);

      if (isNaN(price)) {
          throw new Error('Failed to parse price from text: ' + priceText);
      }

      return {price};
    } catch (error) {
        console.error(`Failed to scrape price from ${url}:`, error);
        // If scraping fails, we can decide what to return.
        // Returning a price of 0 or throwing an error are options.
        // Let's throw so the caller knows something went wrong.
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
    // Directly call the tool instead of using a prompt
    return await getRealTimePriceFromUrl(input);
  }
);
