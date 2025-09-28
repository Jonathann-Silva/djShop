
import placeholderData from './placeholder-images.json';

export interface Perfume {
  id: string;
  name: string;
  brand: string;
  sizeMl: number;
  gender: 'Masculine' | 'Feminine';
  profitMargin: number;
  description: string;
  topNotes?: string;
  heartNotes?: string;
  baseNotes?: string;
  imageId: string;
  onSale?: boolean;
  priceUrl?: string;
  imageUrl?: string;
  price?: number | null;
  costPrice?: number | null;
  createdAt?: number;
}

export interface Eletronico {
  id: string;
  name: string;
  brand: string;
  profitMargin: number;
  description: string;
  imageId: string;
  onSale?: boolean;
  priceUrl?: string;
  imageUrl?: string;
  price?: number | null;
  costPrice?: number | null;
  createdAt?: number;
}

export interface Bebida {
  id: string;
  name: string;
  brand: string;
  profitMargin: number;
  description: string;
  imageId: string;
  onSale?: boolean;
  priceUrl?: string;
  imageUrl?: string;
  price?: number | null;
  costPrice?: number | null;
  createdAt?: number;
}


export function getImageUrl(imageId: string, product?: Perfume | Eletronico | Bebida): string {
  if (product?.imageUrl) {
    return product.imageUrl;
  }
  const placeholder = placeholderData.placeholderImages.find(
    (img) => img.id === imageId
  );
  return placeholder ? placeholder.imageUrl : `https://picsum.photos/seed/${imageId || 'default'}/400/600`;
}

export function getImageHint(imageId: string): string {
    const placeholder = placeholderData.placeholderImages.find(
    (img) => img.id === imageId
  );
  return placeholder ? placeholder.imageHint : "perfume bottle";
}

export function getHeroImageUrl(): string {
  const heroImage = placeholderData.placeholderImages.find(p => p.id === 'hero-image');
  return heroImage ? heroImage.imageUrl : 'https://picsum.photos/seed/perfume-hero/1200/800';
}

export function getHeroImageHint(): string {
    const heroImage = placeholderData.placeholderImages.find(p => p.id === 'hero-image');
    return heroImage ? heroImage.imageHint : 'perfume abstract';
}
