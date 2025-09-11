
import placeholderData from './placeholder-images.json';
import fs from 'fs/promises';
import path from 'path';

export type Perfume = {
  id: string;
  name: string;
  brand: string;
  scentProfile: 'Floral' | 'Woody' | 'Oriental' | 'Fresh' | 'Spicy';
  gender: 'Masculine' | 'Feminine';
  price: number;
  description: string;
  notes: string;
  imageId: string;
  priceUrl?: string;
  imageUrl?: string;
};

const productsFilePath = path.join(process.cwd(), 'src', 'lib', 'products.db.json');

export async function getProducts(): Promise<Perfume[]> {
    try {
        const productsData = await fs.readFile(productsFilePath, 'utf-8');
        const productsJson = JSON.parse(productsData);
        return productsJson.products;
    } catch (error) {
        console.error('Failed to read products:', error);
        return [];
    }
}

export async function getBrands(): Promise<string[]> {
    const products = await getProducts();
    return [...new Set(products.map(p => p.brand))];
}

export async function getScentProfiles(): Promise<string[]> {
    const products = await getProducts();
    return [...new Set(products.map(p => p.scentProfile))];
}

export async function getGenders(): Promise<string[]> {
    const products = await getProducts();
    return [...new Set(products.map(p => p.gender))];
}


export function getImageUrl(imageId: string, product?: Perfume) {
    if (product?.imageUrl) {
        return product.imageUrl;
    }
    const image = placeholderData.placeholderImages.find(img => img.id === imageId);
    return image ? image.imageUrl : 'https://picsum.photos/seed/default/400/600';
}

export function getImageHint(imageId: string) {
    const image = placeholderData.placeholderImages.find(img => img.id === imageId);
    return image ? image.imageHint : 'perfume bottle';
}

export function getHeroImageUrl() {
    const image = placeholderData.placeholderImages.find(img => img.id === 'hero-image');
    return image ? image.imageUrl : 'https://picsum.photos/seed/perfume-hero/1200/800';
}
export function getHeroImageHint() {
    const image = placeholderData.placeholderImages.find(img => img.id === 'hero-image');
    return image ? image.imageHint : 'perfume abstract';
}
