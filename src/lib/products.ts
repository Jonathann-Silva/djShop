export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  dataAiHint: string;
  onSale?: boolean;
  colors?: string[];
};

export const PRODUCTS: Product[] = [
  {
    "id": 1,
    "name": "Iphone 16 Pro max",
    "price": 8800,
    "description": " Apple iPhone 16 Pro Max é um smartphone iOS com características inovadoras que o tornam uma excelente opção para qualquer tipo de utilização, representando um dos melhores dispositivos móveis já feitos. A tela de 6.9 polegadas coloca esse Apple no topo de sua categoria. A resolução também é alta: 2868x1320 pixel. ",
    "category": "Celulares",
    "image": "data:image/jpeg;base64,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",
    "dataAiHint": "smartphone tech",
    "onSale": true,
    "colors": [
      "#000000",
      "#FFFFFF",
      "#0D47A1"
    ]
  },
  {
    "id": 2,
    "name": "Smartphone Y Lite",
    "price": 2499.9,
    "description": "64GB de armazenamento e bateria de longa duração. O companheiro ideal para o dia a dia, com design moderno e leve.",
    "category": "Celulares",
    "image": "https://picsum.photos/600/400?random=2",
    "dataAiHint": "smartphone mobile"
  },
  {
    "id": 3,
    "name": "Smartphone Z Fold",
    "price": 9999.9,
    "description": "256GB de armazenamento e a revolucionária tela dobrável. Um novo conceito de mobilidade e produtividade.",
    "category": "Celulares",
    "image": "https://picsum.photos/600/400?random=3",
    "dataAiHint": "foldable smartphone"
  },
  {
    "id": 4,
    "name": "Notebook Gamer Fire",
    "price": 8999,
    "description": "16GB de RAM, placa de vídeo RTX 4060 e processador de última geração. Domine seus jogos com o máximo de performance.",
    "category": "Computadores",
    "image": "https://picsum.photos/600/400?random=4",
    "dataAiHint": "gaming laptop",
     "colors": [
      "#FF0000",
      "#00FF00",
      "#0000FF"
    ]
  },
  {
    "id": 5,
    "name": "Ultrabook Air",
    "price": 6499,
    "description": "Design leve e fino com 8GB de RAM e 512GB de SSD. Perfeito para quem busca portabilidade sem abrir mão da potência.",
    "category": "Computadores",
    "image": "https://picsum.photos/600/400?random=5",
    "dataAiHint": "ultrabook laptop"
  },
  {
    "id": 6,
    "name": "PC All-in-One Home",
    "price": 3899,
    "description": "Tela de 24 polegadas, 8GB de RAM e 1TB de HD. A solução completa para trabalho e entretenimento em casa.",
    "category": "Computadores",
    "image": "https://picsum.photos/600/400?random=6",
    "dataAiHint": "all-in-one computer"
  },
  {
    "id": 7,
    "name": "Perfume Invictus",
    "price": 459.9,
    "description": "Eau de Toilette de 100ml. Uma fragrância amadeirada aquática que celebra a vitória e a força masculina.",
    "category": "Perfumes Masculino",
    "image": "https://epocacosmeticos.vteximg.com.br/arquivos/ids/544346/invictus-victory-elixir-paco-rabanne-perfume-masculino-parfum--2-.jpg?v=638168120498430000",
    "dataAiHint": "perfume bottle",
    "onSale": true
  },
  {
    "id": 8,
    "name": "Perfume Sauvage",
    "price": 529,
    "description": "Eau de Parfum de 60ml. Uma composição radicalmente fresca, ditada por um nome que soa como um manifesto.",
    "category": "Perfumes Masculino",
    "image": "https://picsum.photos/600/400?random=8",
    "dataAiHint": "cologne scent"
  },
  {
    "id": 9,
    "name": "Perfume 1 Million",
    "price": 389.9,
    "description": "Eau de Toilette de 50ml. Um aroma picante e fresco para o homem que tem o mundo aos seus pés.",
    "category": "Perfumes Masculino",
    "image": "https://picsum.photos/600/400?random=9",
    "dataAiHint": "luxury perfume"
  },
  {
    "id": 10,
    "name": "Perfume La Vie Est Belle",
    "price": 699,
    "description": "Eau de Parfum de 75ml. Uma declaração de felicidade e feminilidade vibrante, com notas de íris e jasmim.",
    "category": "Perfumes Femininos",
    "image": "https://picsum.photos/600/400?random=10",
    "dataAiHint": "perfume fragrance",
    "onSale": true
  },
  {
    "id": 11,
    "name": "Perfume Good Girl",
    "price": 649,
    "description": "Eau de Parfum de 80ml. Audacioso e sofisticado, em um frasco icônico em formato de salto agulha.",
    "category": "Perfumes Femininos",
    "image": "https://picsum.photos/600/400?random=11",
    "dataAiHint": "elegant perfume"
  },
  {
    "id": 12,
    "name": "Perfume Coco Mademoiselle",
    "price": 769,
    "description": "Eau de Parfum de 50ml. A essência de uma mulher livre e audaciosa. Um oriental feminino de personalidade forte.",
    "category": "Perfumes Femininos",
    "image": "https://picsum.photos/600/400?random=12",
    "dataAiHint": "classic perfume"
  }
];

export const getProducts = (): Product[] => PRODUCTS;

export const getProductById = (id: number): Product | undefined =>
  PRODUCTS.find((p) => p.id === id);

export const getCategories = (): string[] => {
  const categories = PRODUCTS.map(p => p.category);
  return [...new Set(categories)];
}
