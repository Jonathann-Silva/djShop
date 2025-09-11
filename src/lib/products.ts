import placeholderData from './placeholder-images.json';

export type Perfume = {
  id: string;
  name: string;
  brand: string;
  scentProfile: 'Floral' | 'Woody' | 'Oriental' | 'Fresh' | 'Spicy';
  gender: 'Masculine' | 'Feminine' | 'Unisex';
  price: number;
  description: string;
  notes: string;
  imageId: string;
};

export const products: Perfume[] = [
  {
    id: '1',
    name: 'Midnight Oud',
    brand: 'Aethelred',
    scentProfile: 'Woody',
    gender: 'Masculine',
    price: 180,
    description: 'A deep and mysterious scent that combines the richness of oud with spicy notes of saffron and black pepper.',
    notes: 'Oud, Saffron, Black Pepper, Leather',
    imageId: 'perfume-1',
  },
  {
    id: '2',
    name: 'Crimson Bloom',
    brand: 'Elysian',
    scentProfile: 'Floral',
    gender: 'Feminine',
    price: 220,
    description: 'An explosive bouquet of Turkish rose, peony, and lily of the valley, creating a vibrant and romantic aura.',
    notes: 'Turkish Rose, Peony, Lily of the Valley, Lychee',
    imageId: 'perfume-2',
  },
  {
    id: '3',
    name: 'Aqua Celestia',
    brand: 'Orion',
    scentProfile: 'Fresh',
    gender: 'Unisex',
    price: 150,
    description: 'A refreshing wave of Italian bergamot, mint, and blackcurrant, evoking a clear summer sky.',
    notes: 'Bergamot, Mint, Blackcurrant, Musk',
    imageId: 'perfume-3',
  },
  {
    id: '4',
    name: 'Terra Firma',
    brand: 'Aethelred',
    scentProfile: 'Woody',
    gender: 'Unisex',
    price: 195,
    description: 'An earthy and grounding fragrance with notes of vetiver, patchouli, and cedarwood.',
    notes: 'Vetiver, Patchouli, Cedarwood, Grapefruit',
    imageId: 'perfume-4',
  },
  {
    id: '5',
    name: 'Velvet Orchid',
    brand: 'Elysian',
    scentProfile: 'Oriental',
    gender: 'Feminine',
    price: 250,
    description: 'A luxurious and sensual blend of black orchid, ylang-ylang, and dark truffle.',
    notes: 'Black Orchid, Ylang-Ylang, Truffle, Sandalwood',
    imageId: 'perfume-5',
  },
  {
    id: '6',
    name: 'Solstice Citrus',
    brand: 'Orion',
    scentProfile: 'Fresh',
    gender: 'Masculine',
    price: 130,
    description: 'A bright and energetic scent bursting with mandarin orange, lemon, and a hint of ginger.',
    notes: 'Mandarin Orange, Lemon, Ginger, Neroli',
    imageId: 'perfume-6',
  },
  {
    id: '7',
    name: 'Ember Musk',
    brand: 'Aethelred',
    scentProfile: 'Spicy',
    gender: 'Unisex',
    price: 210,
    description: 'A warm and inviting aroma of cinnamon, amber, and musk, perfect for a cozy evening.',
    notes: 'Cinnamon, Amber, Musk, Tobacco Leaf',
    imageId: 'perfume-7',
  },
  {
    id: '8',
    name: 'Ocean Breeze',
    brand: 'Orion',
    scentProfile: 'Fresh',
    gender: 'Unisex',
    price: 145,
    description: 'A cool and invigorating scent that captures the essence of a sea breeze with notes of sea salt, sage, and driftwood.',
    notes: 'Sea Salt, Sage, Ambrette, Driftwood',
    imageId: 'perfume-8',
  },
];

export const brands = [...new Set(products.map(p => p.brand))];
export const scentProfiles = [...new Set(products.map(p => p.scentProfile))];
export const genders = [...new Set(products.map(p => p.gender))];

export function getImageUrl(imageId: string) {
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
