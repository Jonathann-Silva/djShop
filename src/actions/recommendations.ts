'use server';

import {
  getProductRecommendations,
  type ProductRecommendationsInput,
} from '@/ai/flows/product-recommendations';
import { z } from 'zod';

const ProductRecommendationsInputSchema = z.object({
  viewingHistory: z.string(),
  purchaseHistory: z.string(),
});

export async function getRecommendationsAction(
  input: ProductRecommendationsInput
) {
  try {
    const validatedInput = ProductRecommendationsInputSchema.parse(input);
    const recommendations = await getProductRecommendations(validatedInput);
    return recommendations;
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    // Return a default or empty state in case of an error
    return { recommendedProducts: '' };
  }
}
