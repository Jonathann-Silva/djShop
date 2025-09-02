export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  dataAiHint: string;
  onSale?: boolean;
};

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Smartphone X Pro',
    price: 4999.9,
    description: '128GB de armazenamento, câmera tripla de 108MP e tela Super AMOLED de 6.7 polegadas. Desempenho de ponta para suas tarefas.',
    category: 'Celulares',
    image: 'https://picsum.photos/600/400?random=1',
    dataAiHint: 'smartphone tech',
    onSale: true,
  },
  {
    id: 2,
    name: 'Smartphone Y Lite',
    price: 2499.9,
    description: '64GB de armazenamento e bateria de longa duração. O companheiro ideal para o dia a dia, com design moderno e leve.',
    category: 'Celulares',
    image: 'https://picsum.photos/600/400?random=2',
    dataAiHint: 'smartphone mobile'
  },
  {
    id: 3,
    name: 'Smartphone Z Fold',
    price: 9999.9,
    description: '256GB de armazenamento e a revolucionária tela dobrável. Um novo conceito de mobilidade e produtividade.',
    category: 'Celulares',
    image: 'https://picsum.photos/600/400?random=3',
    dataAiHint: 'foldable smartphone'
  },
  {
    id: 4,
    name: 'Notebook Gamer Fire',
    price: 8999.0,
    description: '16GB de RAM, placa de vídeo RTX 4060 e processador de última geração. Domine seus jogos com o máximo de performance.',
    category: 'Computadores',
    image: 'https://picsum.photos/600/400?random=4',
    dataAiHint: 'gaming laptop'
  },
  {
    id: 5,
    name: 'Ultrabook Air',
    price: 6499.0,
    description: 'Design leve e fino com 8GB de RAM e 512GB de SSD. Perfeito para quem busca portabilidade sem abrir mão da potência.',
    category: 'Computadores',
    image: 'https://picsum.photos/600/400?random=5',
    dataAiHint: 'ultrabook laptop'
  },
  {
    id: 6,
    name: 'PC All-in-One Home',
    price: 3899.0,
    description: 'Tela de 24 polegadas, 8GB de RAM e 1TB de HD. A solução completa para trabalho e entretenimento em casa.',
    category: 'Computadores',
    image: 'https://picsum.photos/600/400?random=6',
    dataAiHint: 'all-in-one computer'
  },
  {
    id: 7,
    name: 'Perfume Invictus',
    price: 459.9,
    description: 'Eau de Toilette de 100ml. Uma fragrância amadeirada aquática que celebra a vitória e a força masculina.',
    category: 'Perfumes Masculino',
    image: 'https://picsum.photos/600/400?random=7',
    dataAiHint: 'perfume bottle',
    onSale: true,
  },
  {
    id: 8,
    name: 'Perfume Sauvage',
    price: 529.0,
    description: 'Eau de Parfum de 60ml. Uma composição radicalmente fresca, ditada por um nome que soa como um manifesto.',
    category: 'Perfumes Masculino',
    image: 'https://picsum.photos/600/400?random=8',
    dataAiHint: 'cologne scent'
  },
  {
    id: 9,
    name: 'Perfume 1 Million',
    price: 389.9,
    description: 'Eau de Toilette de 50ml. Um aroma picante e fresco para o homem que tem o mundo aos seus pés.',
    category: 'Perfumes Masculino',
    image: 'https://picsum.photos/600/400?random=9',
    dataAiHint: 'luxury perfume'
  },
  {
    id: 10,
    name: 'Perfume La Vie Est Belle',
    price: 699.0,
    description: 'Eau de Parfum de 75ml. Uma declaração de felicidade e feminilidade vibrante, com notas de íris e jasmim.',
    category: 'Perfumes Femininos',
    image: 'https://picsum.photos/600/400?random=10',
    dataAiHint: 'perfume fragrance',
    onSale: true,
  },
  {
    id: 11,
    name: 'Perfume Good Girl',
    price: 649.0,
    description: 'Eau de Parfum de 80ml. Audacioso e sofisticado, em um frasco icônico em formato de salto agulha.',
    category: 'Perfumes Femininos',
    image: 'https://picsum.photos/600/400?random=11',
    dataAiHint: 'elegant perfume'
  },
  {
    id: 12,
    name: 'Perfume Coco Mademoiselle',
    price: 769.0,
    description: 'Eau de Parfum de 50ml. A essência de uma mulher livre e audaciosa. Um oriental feminino de personalidade forte.',
    category: 'Perfumes Femininos',
    image: 'https://picsum.photos/600/400?random=12',
    dataAiHint: 'classic perfume'
  },
];

export const getProducts = (): Product[] => PRODUCTS;

export const getProductById = (id: number): Product | undefined =>
  PRODUCTS.find((p) => p.id === id);

export const getCategories = (): string[] => {
  const categories = PRODUCTS.map(p => p.category);
  return [...new Set(categories)];
}