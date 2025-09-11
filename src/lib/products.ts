
import placeholderData from './placeholder-images.json';

export type Perfume = {
  id: string;
  name: string;
  brand: string;
  sizeMl: number;
  gender: 'Masculine' | 'Feminine';
  profitMargin: number;
  description: string;
  notes: string;
  imageId: string;
  priceUrl?: string;
  imageUrl?: string;
};

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
