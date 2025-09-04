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
  scrapingUrl?: string;
  priceMargin?: number;
};

export const PRODUCTS: Product[] = [
  {
    "id": 1,
    "name": "CELULAR APPLE IPHONE 16 PRO MAX 256GB A-3084 BLACK TITANIUM LL ESIM",
    "price": 0,
    "description": " Apple iPhone 16 Pro Max é um smartphone iOS com características inovadoras que o tornam uma excelente opção para qualquer tipo de utilização, representando um dos melhores dispositivos móveis já feitos. A tela de 6.9 polegadas coloca esse Apple no topo de sua categoria. A resolução também é alta: 2868x1320 pixel. ",
    "category": "Celulares",
    "image": "https://www.lgimportados.com/img/m/IMG_747431_1.JPG?v=1756989116",
    "dataAiHint": "smartphone tech",
    "onSale": true,
    "colors": [
      "#000000",
      "#FFFFFF",
      "#0D47A1"
    ],
    "scrapingUrl": "https://www.lgimportados.com/produto/celular-apple-iphone-16-pro-max-256gb-a-3084-black-titanium-ll-esim",
    "priceMargin": 50
  },
  {
    "id": 2,
    "name": "APPLE IPHONE 16 128GB",
    "price": 0,
    "description": "O Apple iPhone 16 128GB (Modelo A3287) na cor Black é um símbolo de sofisticação, desempenho e funcionalidade. Com o avançado HN Chip, este smartphone oferece uma experiência incomparável em velocidade, eficiência energética e recursos inovadores. Projetado para atender às mais altas expectativas, o iPhone 16 é a escolha ideal para quem busca tecnologia de ponta com um design atemporal.",
    "category": "Celulares",
    "image": "https://www.lgimportados.com/img/m/IMG_781800_1.JPG?v=1757001163",
    "dataAiHint": "smartphone mobile",
    "onSale": false,
    "colors": [
      "amarelo",
      "verde",
      "vermelho"
    ],
    "scrapingUrl": "",
    "priceMargin": 0
  },
  {
    "id": 3,
    "name": "XIAOMI REDMI A5 3+64GB MIDNIGHT BLACK",
    "price": 0,
    "description": "Xiaomi Redmi A5 4G 3GB+64GB – Midnight Black\n\n\nDesign moderno, desempenho confiável e excelente custo-benefício. O Redmi A5 é a escolha ideal para quem busca um smartphone acessível, bonito e funcional para o dia a dia. Com acabamento elegante na cor Sandy Gold, ele une simplicidade e eficiência em um corpo leve e confortável de usar.",
    "category": "Celulares",
    "image": "https://www.lgimportados.com/img/m/IMG_813549_1.JPG?v=1757001500",
    "dataAiHint": "foldable smartphone",
    "onSale": false,
    "colors": [],
    "scrapingUrl": "https://www.lgimportados.com/produto/celular-xiaomi-redmi-a5-3-64gb-midnight-black-codigo-813549",
    "priceMargin": 50
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
    ],
    "scrapingUrl": ""
  },
  {
    "id": 5,
    "name": "Ultrabook Air",
    "price": 6499,
    "description": "Design leve e fino com 8GB de RAM e 512GB de SSD. Perfeito para quem busca portabilidade sem abrir mão da potência.",
    "category": "Computadores",
    "image": "https://picsum.photos/600/400?random=5",
    "dataAiHint": "ultrabook laptop",
    "scrapingUrl": ""
  },
  {
    "id": 6,
    "name": "PC All-in-One Home",
    "price": 3899,
    "description": "Tela de 24 polegadas, 8GB de RAM e 1TB de HD. A solução completa para trabalho e entretenimento em casa.",
    "category": "Computadores",
    "image": "https://picsum.photos/600/400?random=6",
    "dataAiHint": "all-in-one computer",
    "scrapingUrl": ""
  },
  {
    "id": 7,
    "name": "PACO RABANNE INVICTUS VICTORY ELIXIR INTENSE MEN 100ML EDT",
    "price": 0,
    "description": "PACO RABANNE INVICTUS VICTORY ELIXIR INTENSE MEN 100ML EDT é uma fragrância poderosa, intensa e extremamente sofisticada, criada para homens que vivem com determinação, confiança e espírito de conquista. Sua abertura combina notas frescas e picantes com especiarias marcantes como pimenta preta e lavanda, criando uma sensação vibrante e envolvente que desperta os sentidos com força e presença logo nos primeiros instantes.",
    "category": "Perfumes Masculino",
    "image": "https://www.lgimportados.com/img/m/IMG_592451_1.JPG?v=1756990805",
    "dataAiHint": "perfume bottle",
    "onSale": true,
    "colors": [],
    "scrapingUrl": "https://www.lgimportados.com/produto/paco-rabanne-invictus-victory-elixir-intense-men-100ml-edt",
    "priceMargin": 50
  },
  {
    "id": 8,
    "name": "DIOR SAUVAGE MEN 100ML EDT",
    "price": 0,
    "description": "É uma fragrância masculina vibrante, intensa e sofisticada, que traduz liberdade, autenticidade e poder natural. Inspirada nos grandes espaços abertos e na força selvagem da natureza, sua construção olfativa une frescor extremo com uma base amadeirada envolvente. A abertura traz uma bergamota da Calábria luminosa e picante, com facetas cítricas levemente amargas e frutadas que energizam a pele de forma limpa e refrescante. Em seguida, o coração se revela com uma explosão aromática e especiada, marcada pela pimenta sichuan vibrante, lavanda fresca e herbal, elemi resinoso e um gerânio verde com nuances florais, criando um contraste quente e frio que equilibra força e elegância.",
    "category": "Perfumes Masculino",
    "image": "https://epocacosmeticos.vteximg.com.br/arquivos/ids/961941-450-450/6.3348901428545-6.3348901608053.jpg?v=638906129512430000",
    "dataAiHint": "cologne scent",
    "onSale": false,
    "colors": [],
    "scrapingUrl": "https://www.lgimportados.com/produto/-dior-sauvage-men-100ml-edt",
    "priceMargin": 50
  },
  {
    "id": 9,
    "name": "Paco Rabanne 1 Million Parfum",
    "price": 0,
    "description": "O Paco Rabanne 1 Million Parfum é uma fragrância masculina que combina ousadia, sofisticação e uma sensualidade envolvente, sendo uma releitura moderna e intensa da icônica linha 1 Million. Lançado em 2020, este parfum possui uma concentração maior que as versões anteriores, garantindo maior fixação e presença marcante na pele.",
    "category": "Perfumes Masculino",
    "image": "https://www.lgimportados.com/img/m/IMG_576796_1.JPG?v=1756943786",
    "dataAiHint": "luxury perfume",
    "onSale": false,
    "colors": [],
    "scrapingUrl": "https://www.lgimportados.com/produto/-paco-rabanne-1-million-men-200ml-parfum",
    "priceMargin": 30
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
    "colors": [],
    "scrapingUrl": ""
  },
  {
    "id": 11,
    "name": "Perfume Good Girl",
    "price": 649,
    "description": "Eau de Parfum de 80ml. Audacioso e sofisticado, em um frasco icônico em formato de salto agulha.",
    "category": "Perfumes Femininos",
    "image": "https://picsum.photos/600/400?random=11",
    "dataAiHint": "elegant perfume",
    "scrapingUrl": ""
  },
  {
    "id": 12,
    "name": "Perfume Coco Mademoiselle",
    "price": 769,
    "description": "Eau de Parfum de 50ml. A essência de uma mulher livre e audaciosa. Um oriental feminino de personalidade forte.",
    "category": "Perfumes Femininos",
    "image": "https://picsum.photos/600/400?random=12",
    "dataAiHint": "classic perfume",
    "scrapingUrl": ""
  }
];

export const getProducts = (): Product[] => PRODUCTS;

export const getProductById = (id: number): Product | undefined =>
  PRODUCTS.find((p) => p.id === id);

export const getCategories = (): string[] => {
  const categories = PRODUCTS.map(p => p.category);
  return [...new Set(categories)];
}
