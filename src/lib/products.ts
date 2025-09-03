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
    "image": "https://www.iceloshop.com.br/image/cache/catalog/1-iphone16/16promax-fundo-800x800.png",
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
    "name": "Iphone 15 Pro max",
    "price": 5600,
    "description": "64GB de armazenamento e bateria de longa duração. O companheiro ideal para o dia a dia, com design moderno e leve.",
    "category": "Celulares",
    "image": "https://horizonplay.fbitsstatic.net/img/p/apple-iphone-15-pro-max-256gb-5g-vitrine-tela-super-retina-xdr-display-6-7-titanio-azul-152591/339194-5.jpg?w=670&h=670&v=202501262008",
    "dataAiHint": "smartphone mobile",
    "colors": [
      "amarelo",
      "verde",
      "vermelho"
    ]
  },
  {
    "id": 3,
    "name": "Smartphone Z Fold",
    "price": 9999.9,
    "description": "256GB de armazenamento e a revolucionária tela dobrável. Um novo conceito de mobilidade e produtividade.",
    "category": "Celulares",
    "image": "https://i.zst.com.br/thumbs/12/3c/1c/-1115297546.jpg",
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
    "price": 650,
    "description": "Eau de Parfum de 60ml. Uma composição radicalmente fresca, ditada por um nome que soa como um manifesto.",
    "category": "Perfumes Masculino",
    "image": "https://epocacosmeticos.vteximg.com.br/arquivos/ids/961941-450-450/6.3348901428545-6.3348901608053.jpg?v=638906129512430000",
    "dataAiHint": "cologne scent",
    "onSale": false,
    "colors": []
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
    "price": 450,
    "description": "Eau de Parfum de 75ml. Uma declaração de felicidade e feminilidade vibrante, com notas de íris e jasmim.",
    "category": "Perfumes Femininos",
    "image": "https://static.cestasmichelli.com.br/images/product/rs-2047-2515-0.jpg?ims=750x750",
    "dataAiHint": "perfume fragrance",
    "onSale": true,
    "colors": []
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
