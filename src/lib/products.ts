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
    "scrapingUrl": "https://www.lgimportados.com/produto/celular-apple-iphone-16-128gb-a-3081-black-ll-esim-codigo-747318",
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
    "name": "LANCOME LA VIE EST BELLE FEM 100ML",
    "price": 0,
    "description": "La Vie Est Belle é uma fragrância feminina icônica que celebra a liberdade, a felicidade e a beleza da vida. Lançado em 2012, esse perfume tornou-se um verdadeiro símbolo da mulher elegante, positiva e autêntica. Com uma assinatura olfativa marcante e envolvente, ele traduz sofisticação com um toque doce e acolhedor, ideal para quem quer deixar sua presença registrada com suavidade e intensidade.",
    "category": "Perfumes Femininos",
    "image": "https://www.lgimportados.com/img/m/IMG_286473_1.JPG?v=1757085731",
    "dataAiHint": "perfume fragrance",
    "onSale": true,
    "colors": [],
    "scrapingUrl": "https://www.lgimportados.com/produto/-lancome-la-vie-est-belle-fem-100ml-edp-286555-",
    "priceMargin": 50
  },
  {
    "id": 11,
    "name": "93 AL WATANIAH DURRAT AL AROOS FEM 85ML EDP",
    "price": 0,
    "description": "Al Wataniah Durrat Al Aroos é uma fragrância feminina exuberante e elegante, apresentada em um frasco de 85ml como Eau de Parfum. Com uma combinação harmoniosa de notas florais e frutadas, esta fragrância é uma celebração da feminilidade e da sofisticação. Ideal para uso em ocasiões especiais, sua essência única e envolvente deixa uma impressão memorável e encantadora.    ",
    "category": "Perfumes Femininos",
    "image": "https://www.lgimportados.com/img/m/IMG_536493_1.JPG?v=1757087795",
    "dataAiHint": "elegant perfume",
    "onSale": false,
    "colors": [],
    "scrapingUrl": "https://www.lgimportados.com/produto/93-al-wataniah-durrat-al-aroos-fem-85ml-edp-codigo-536493",
    "priceMargin": 50
  },
  {
    "id": 12,
    "name": "ABERCROMBIE & FITCH AUTHENTIC 100ML",
    "price": 0,
    "description": "Abercrombie & Fitch Autêntico Eau de Parfum Feminino 100ml é uma fragrância fresca, vibrante e envolvente, que captura a essência da mulher moderna e confiante. Com uma composição olfativa sofisticada e leve, esse perfume exala elegância e naturalidade, tornando-se a escolha perfeita para quem deseja uma fragrância que combine frescor e feminilidade, ideal para o dia a dia ou para ocasiões especiais.",
    "category": "Perfumes Femininos",
    "image": "https://www.lgimportados.com/img/m/IMG_587891_1.JPG?v=1757087848",
    "dataAiHint": "classic perfume",
    "onSale": false,
    "colors": [],
    "scrapingUrl": "https://www.lgimportados.com/produto/-abercrombie-fitch-authentic-fem-100ml-edp",
    "priceMargin": 50
  },
  {
    "name": "ABERCROMBIE & FITCH AUTHENTIC NIGHTT 100ML",
    "price": 0,
    "description": "Abercrombie & Fitch Authentic Night Femme é uma fragrância envolvente e sofisticada, pensada para a mulher que adora viver a intensidade das noites inesquecíveis. Com uma combinação de notas florais e amadeiradas, essa Eau de Parfum oferece uma experiência olfativa cativante e cheia de mistério, perfeita para ocasiões especiais ou para quem deseja exalar confiança e sedução durante a noite.",
    "category": "perfumes femininos",
    "image": "https://www.lgimportados.com/img/m/IMG_734264_1.JPG?v=1757087906",
    "dataAiHint": "",
    "onSale": false,
    "colors": [],
    "scrapingUrl": "https://www.lgimportados.com/produto/abercrombie-fitch-authentic-nightt-fem-100ml-edp-codigo-734264",
    "priceMargin": 50,
    "id": 13
  }
];

export const getProducts = (): Product[] => PRODUCTS;

export const getProductById = (id: number): Product | undefined =>
  PRODUCTS.find((p) => p.id === id);

export const getCategories = (): string[] => {
  const categories = PRODUCTS.map(p => p.category);
  return [...new Set(categories)];
}
