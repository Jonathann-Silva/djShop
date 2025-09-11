
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
  async input => {
    // In a real-world scenario, you would implement web scraping logic here.
    // For this prototype, we'll simulate it with a random price.
    const randomPrice = Math.floor(Math.random() * (300 - 50 + 1)) + 50;
    return {price: randomPrice};
  }
);

const prompt = ai.definePrompt({
  name: 'getRealTimePricePrompt',
  input: {schema: GetRealTimePriceInputSchema},
  output: {schema: GetRealTimePriceOutputSchema},
  tools: [getRealTimePriceFromUrl],
  prompt: `Use the getRealTimePriceFromUrl tool to extract the price from the provided URL: {{{url}}}`,
});

const getRealTimePriceFlow = ai.defineFlow(
  {
    name: 'getRealTimePriceFlow',
    inputSchema: GetRealTimePriceInputSchema,
    outputSchema: GetRealTimePriceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
