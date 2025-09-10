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
    "onSale": false,
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
    "name": "ADYAN RIVIERA 100ML",
    "price": 0,
    "description": "Adyan Riviera Fem 100ml EDP é uma fragrância feminina sofisticada e vibrante, que evoca o frescor e o charme da Riviera Francesa. Com uma mistura elegante de notas cítricas, florais e amadeiradas, esse perfume é ideal para mulheres que buscam uma fragrância leve, energizante e sensual. Perfeito para o dia a dia ou ocasiões especiais, o Adyan Riviera Fem proporciona uma experiência olfativa refrescante e envolvente, com excelente fixação.",
    "category": "Perfumes Femininos",
    "image": "https://www.lgimportados.com/img/m/IMG_775618_4.JPG?v=1757545283",
    "dataAiHint": "gaming laptop",
    "onSale": false,
    "colors": [
      "#FF0000",
      "#00FF00",
      "#0000FF"
    ],
    "scrapingUrl": "https://www.lgimportados.com/produto/adyan-riviera-fem-100ml-edp",
    "priceMargin": 65
  },
  {
    "id": 5,
    "name": "ADYAN SAMARA 100ML",
    "price": 0,
    "description": "Adyan Samara é uma fragrância feminina doce, envolvente e sedutora, feita para mulheres que amam perfumes que marcam presença com delicadeza e intensidade ao mesmo tempo. Um encontro entre o floral sofisticado e o gourmand cremoso, essa fragrância transmite charme, elegância e uma feminilidade encantadora desde o primeiro acorde.",
    "category": "Perfumes Femininos",
    "image": "https://www.lgimportados.com/img/m/IMG_710329_1.JPG?v=1757545286",
    "dataAiHint": "ultrabook laptop",
    "onSale": false,
    "colors": [],
    "scrapingUrl": "https://www.lgimportados.com/produto/adyan-samara-100ml-fem-edp-codigo-710329",
    "priceMargin": 65
  },
  {
    "id": 6,
    "name": "ADYAN TAJALI EXTRAIT DE PARFUM 100ML",
    "price": 0,
    "description": "O Adyan Tajali Extrait de Parfum é uma fragrância feminina intensa, sofisticada e envolvente, criada para mulheres que desejam expressar presença, elegância e confiança em cada momento. Sua composição única combina notas orientais e amadeiradas, criando um perfume marcante, duradouro e capaz de deixar uma assinatura olfativa inesquecível.",
    "category": "Perfumes Femininos",
    "image": "https://www.lgimportados.com/img/m/IMG_871556_1.JPG?v=1757545287",
    "dataAiHint": "all-in-one computer",
    "onSale": false,
    "colors": [],
    "scrapingUrl": "https://www.lgimportados.com/produto/adyan-tajali-extrait-de-parfum-fem-100ml-300215-codigo-871556",
    "priceMargin": 65
  },
  {
    "id": 7,
    "name": "PACO RABANNE INVICTUS VICTORY ELIXIR INTENSE MEN 100ML EDT",
    "price": 0,
    "description": "PACO RABANNE INVICTUS VICTORY ELIXIR INTENSE MEN 100ML EDT é uma fragrância poderosa, intensa e extremamente sofisticada, criada para homens que vivem com determinação, confiança e espírito de conquista. Sua abertura combina notas frescas e picantes com especiarias marcantes como pimenta preta e lavanda, criando uma sensação vibrante e envolvente que desperta os sentidos com força e presença logo nos primeiros instantes.",
    "category": "Perfumes Masculino",
    "image": "https://www.lgimportados.com/img/m/IMG_592451_1.JPG?v=1756990805",
    "dataAiHint": "perfume bottle",
    "onSale": false,
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
    "onSale": false,
    "colors": [],
    "scrapingUrl": "https://www.lgimportados.com/produto/-lancome-la-vie-est-belle-fem-100ml-edp-286555-",
    "priceMargin": 65
  },
  {
    "id": 11,
    "name": "93 AL WATANIAH DURRAT AL AROOS FEM 85ML EDP",
    "description": "Al Wataniah Durrat Al Aroos é uma fragrância feminina exuberante e elegante, apresentada em um frasco de 85ml como Eau de Parfum. Com uma combinação harmoniosa de notas florais e frutadas, esta fragrância é uma celebração da feminilidade e da sofisticação. Ideal para uso em ocasiões especiais, sua essência única e envolvente deixa uma impressão memorável e encantadora.    ",
    "category": "Perfumes Femininos",
    "image": "https://www.lgimportados.com/img/m/IMG_536493_1.JPG?v=1757087795",
    "dataAiHint": "elegant perfume",
    "onSale": false,
    "colors": [],
    "scrapingUrl": "https://www.lgimportados.com/produto/93-al-wataniah-durrat-al-aroos-fem-85ml-edp-codigo-536493",
    "priceMargin": 50,
    "price": 0
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
    "id": 13,
    "name": "ABERCROMBIE & FITCH AUTHENTIC NIGHTT 100ML",
    "price": 0,
    "description": "Abercrombie & Fitch Authentic Night Femme é uma fragrância envolvente e sofisticada, pensada para a mulher que adora viver a intensidade das noites inesquecíveis. Com uma combinação de notas florais e amadeiradas, essa Eau de Parfum oferece uma experiência olfativa cativante e cheia de mistério, perfeita para ocasiões especiais ou para quem deseja exalar confiança e sedução durante a noite.",
    "category": "Perfumes Femininos",
    "image": "https://www.lgimportados.com/img/m/IMG_734264_1.JPG?v=1757087906",
    "dataAiHint": "",
    "onSale": false,
    "colors": [],
    "scrapingUrl": "https://www.lgimportados.com/produto/abercrombie-fitch-authentic-nightt-fem-100ml-edp-codigo-734264",
    "priceMargin": 50
  },
  {
    "name": "ABERCROMBIE & FITCH FIRST INSTINCT BLUE 100ML",
    "price": 0,
    "description": "Abercrombie & Fitch First Instinct Blue Femme é uma fragrância fresca e vibrante, criada para a mulher que vive com intensidade e autenticidade. Com uma combinação de notas frutadas e florais, esta Eau de Parfum oferece uma experiência olfativa leve, envolvente e energética, perfeita para o dia a dia ou para momentos descontraídos, trazendo uma sensação de frescor e liberdade.",
    "category": "Perfumes Femininos",
    "image": "https://www.lgimportados.com/img/m/IMG_734240_1.JPG?v=1757088493",
    "dataAiHint": "",
    "onSale": false,
    "colors": [],
    "scrapingUrl": "https://www.lgimportados.com/produto/abercrombie-fitch-first-instinct-blue-fem-100ml-edp-codigo-734240",
    "priceMargin": 0,
    "id": 14
  },
  {
    "name": "ABERCROMBIE & FITCH FIRST INSTINCT TOGETHER 100ML",
    "price": 0,
    "description": "Abercrombie & Fitch First Instinct Together Femme é uma fragrância cativante e romântica, criada para a mulher que vive intensamente o momento. Com uma combinação de notas florais frescas e frutadas, essa Eau de Parfum oferece uma experiência olfativa vibrante e envolvente, perfeita para mulheres que buscam exalar confiança, feminilidade e um toque de frescor em qualquer ocasião.",
    "category": "Perfumes Femininos",
    "image": "https://www.lgimportados.com/img/m/IMG_734288_1.JPG?v=1757089033",
    "dataAiHint": "",
    "onSale": false,
    "colors": [],
    "scrapingUrl": "https://www.lgimportados.com/produto/abercrombie-fitch-first-instinct-together-fem-100ml-edp",
    "priceMargin": 50,
    "id": 15
  },
  {
    "name": "ADYAN AL MUSK AL AHMAR RED FEM 100ML",
    "price": 0,
    "description": "O Adyan Al Musk Al Ahmar Red Eau de Parfum 100ml é uma fragrância feminina marcante e sensual, inspirada na elegância árabe e na intensidade do almíscar vermelho. Ideal para mulheres que desejam destacar sua presença com sofisticação, esta fragrância exótica é envolvente, cativante e duradoura.",
    "category": "Perfumes Femininos",
    "image": "https://www.lgimportados.com/img/m/IMG_845588_1.JPG?v=1757102346",
    "dataAiHint": "",
    "onSale": false,
    "colors": [],
    "scrapingUrl": "https://www.lgimportados.com/produto/adyan-al-musk-al-ahmar-red-fem-100ml-edp-codigo-845588",
    "priceMargin": 50,
    "id": 16
  },
  {
    "name": "ADYAN AL QALAM DELEGATION EXTRAIT DE PARFUM 100ML",
    "price": 0,
    "description": "O Adyan Al Qalam Delegation Extrait de Parfum é uma fragrância feminina sofisticada e intensa, especialmente desenvolvida para mulheres que desejam marcar presença, exalar confiança e deixar uma impressão inesquecível. Este perfume é uma verdadeira obra olfativa que combina a delicadeza das flores com a profundidade de nuances orientais, criando um equilíbrio perfeito entre suavidade e intensidade.",
    "category": "Perfumes Femininos",
    "image": "https://www.lgimportados.com/img/m/IMG_871563_1.JPG?v=1757102596",
    "dataAiHint": "",
    "onSale": false,
    "colors": [],
    "scrapingUrl": "https://www.lgimportados.com/produto/adyan-al-qalam-delegation-extrait-de-parfum-fem-100ml-300086",
    "priceMargin": 50,
    "id": 17
  },
  {
    "name": "ADYAN ASLOOB 100ML",
    "price": 0,
    "description": "Adyan Asloob Feminino 100ml Eau de Parfum (EDP) é uma fragrância refinada e envolvente, criada para mulheres que apreciam perfumes sofisticados, com um toque exótico e oriental. Com uma combinação única de notas florais, amadeiradas e orientais, Asloob oferece uma experiência olfativa inesquecível, que exala elegância e sensualidade.",
    "category": "Perfumes Femininos",
    "image": "https://www.lgimportados.com/img/m/IMG_710190_2.JPG?v=1757278331",
    "dataAiHint": "",
    "onSale": false,
    "colors": [],
    "scrapingUrl": "https://www.lgimportados.com/produto/adyan-asloob-100ml-fem-edp-codigo-710190",
    "priceMargin": 50,
    "id": 18
  },
  {
    "name": "ADYAN DALIA NOIR 100ML",
    "price": 0,
    "description": "Adyan Dalia Noir Fem é uma fragrância sofisticada e envolvente, projetada para a mulher misteriosa e confiante. Com uma combinação perfeita de notas florais, frutais e ambaradas, este Eau de Parfum oferece uma experiência olfativa intensa e marcante, ideal para quem busca um perfume de longa duração e grande projeção.",
    "category": "Perfumes Femininos",
    "image": "https://www.lgimportados.com/img/m/IMG_769822_1.JPG?v=1757278392",
    "dataAiHint": "",
    "onSale": false,
    "colors": [],
    "scrapingUrl": "https://www.lgimportados.com/produto/adyan-dalia-noir-fem-100ml-edp-codigo-769822",
    "priceMargin": 50,
    "id": 19
  },
  {
    "name": "ADYAN DALIA ROUGE 100ML",
    "price": 0,
    "description": "Adyan Dalia Rouge Fem é um Eau de Parfum sofisticado e envolvente, criado para a mulher que busca uma fragrância marcante e de longa duração. Com uma composição delicada, mas intensa, ele oferece uma experiência sensorial única que combina elegância e sedução.",
    "category": "Perfumes Femininos",
    "image": "https://www.lgimportados.com/img/m/IMG_769839_1.JPG?v=1757278443",
    "dataAiHint": "",
    "onSale": false,
    "colors": [],
    "scrapingUrl": "https://www.lgimportados.com/produto/adyan-dalia-rouge-fem-100ml-edp",
    "priceMargin": 50,
    "id": 20
  },
  {
    "name": "ADYAN EMIRA 100ML",
    "price": 0,
    "description": "Adyan Emira Feminino 100ml Eau de Parfum (EDP) é uma fragrância sofisticada e envolvente, criada para mulheres que buscam um perfume de presença marcante e exótico. Emira é uma mistura luxuosa de notas florais, orientais e amadeiradas, oferecendo uma experiência olfativa rica e sensual que exala confiança, mistério e elegância.",
    "category": "Perfumes Femininos",
    "image": "https://www.lgimportados.com/img/m/IMG_710206_1.JPG?v=1757278444",
    "dataAiHint": "",
    "onSale": false,
    "colors": [],
    "scrapingUrl": "https://www.lgimportados.com/produto/adyan-emira-100ml-fem-edp-codigo-710206",
    "priceMargin": 50,
    "id": 21
  },
  {
    "name": "ADYAN FARHA EXTRAIT DE PARFUM FEM 100ML",
    "price": 0,
    "description": "Adyan Farha Extrait de Parfum é uma fragrância feminina intensa e sofisticada, criada para mulheres que desejam exalar elegância, presença e sensualidade em todos os momentos. Cada borrifada proporciona uma experiência olfativa única, onde a modernidade das notas florais se mistura com a profundidade das nuances orientais, formando uma assinatura marcante que cativa e encanta. Seu aroma refinado acompanha a mulher confiante em sua rotina e nas ocasiões especiais, transformando momentos comuns em experiências memoráveis.",
    "category": "Perfumes Femininos",
    "image": "https://www.lgimportados.com/img/m/IMG_871587_1.JPG?v=1757278514",
    "dataAiHint": "",
    "onSale": false,
    "colors": [],
    "scrapingUrl": "https://www.lgimportados.com/produto/adyan-farha-extrait-de-parfum-fem-100ml-300208-codigo-871587",
    "priceMargin": 50,
    "id": 22
  },
  {
    "name": "ADYAN FREESIA EXTRAIT DE PARFUM 100ML",
    "price": 0,
    "description": "O Adyan Freesia Extrait de Parfum Feminino 100ml é uma fragrância sofisticada e intensa, desenvolvida para mulheres que buscam elegância, feminilidade e presença marcante. Sua composição revela uma experiência olfativa envolvente, na qual a delicadeza da flor de frésia se mistura harmoniosamente com acordes refinados, criando um perfume elegante, moderno e atemporal. Ideal para uso diário ou para ocasiões especiais, ele desperta confiança e charme a cada aplicação.",
    "category": "Perfumes Femininos",
    "image": "https://www.lgimportados.com/img/m/IMG_871594_1.JPG?v=1757278516",
    "dataAiHint": "",
    "onSale": false,
    "colors": [],
    "scrapingUrl": "https://www.lgimportados.com/produto/adyan-freesia-extrait-de-parfum-fem-100ml-300802-codigo-871594",
    "priceMargin": 50,
    "id": 23
  },
  {
    "name": "ADYAN GLAMOUR 100ML",
    "price": 0,
    "description": "Adyan Glamour Fem 100ml EDP é uma fragrância luxuosa e sofisticada, criada para mulheres que desejam destacar sua personalidade com elegância e charme. Com uma composição envolvente de notas florais, frutadas e amadeiradas, esse perfume oferece uma experiência olfativa cativante e duradoura, ideal para ocasiões especiais ou para o uso diário. Sua fragrância feminina e sedutora é perfeita para mulheres confiantes que buscam um toque de glamour em cada momento.",
    "category": "Perfumes Femininos",
    "image": "https://www.lgimportados.com/img/m/IMG_775526_1.JPG?v=1757278518",
    "dataAiHint": "",
    "onSale": false,
    "colors": [],
    "scrapingUrl": "https://www.lgimportados.com/produto/adyan-glamour-fem-100ml-edp",
    "priceMargin": 50,
    "id": 24
  },
  {
    "name": "ADYAN HYBA 100ML",
    "price": 0,
    "description": "Adyan Hyba Fem 100ml EDP é uma fragrância encantadora e refinada, desenvolvida para mulheres que desejam expressar sua feminilidade com sofisticação. Sua composição olfativa combina notas frescas, florais e amadeiradas, criando um perfume marcante, porém delicado, perfeito para o uso diário ou ocasiões especiais. Ideal para mulheres que buscam uma fragrância que exale elegância e charme a cada momento.",
    "category": "Perfumes Femininos",
    "image": "https://www.lgimportados.com/img/m/IMG_775533_1.JPG?v=1757278520",
    "dataAiHint": "",
    "onSale": false,
    "colors": [],
    "scrapingUrl": "https://www.lgimportados.com/produto/adyan-hyba-fem-100ml-edp-codigo-775533",
    "priceMargin": 50,
    "id": 25
  },
  {
    "name": "ADYAN MAHIB 100ML",
    "price": 0,
    "description": "Adyan Mahib Feminino 100ml Eau de Parfum (EDP) é uma fragrância sofisticada e envolvente, criada para mulheres que buscam um perfume de presença marcante e sedutora. Mahib combina notas orientais e florais, resultando em uma experiência olfativa rica, intensa e luxuosa, perfeita para quem deseja exalar elegância e mistério.",
    "category": "Perfumes Femininos",
    "image": "https://www.lgimportados.com/img/m/IMG_710213_1.JPG?v=1757278934",
    "dataAiHint": "",
    "onSale": false,
    "colors": [],
    "scrapingUrl": "https://www.lgimportados.com/produto/adyan-mahib-100ml-fem-edp-codigo-710213",
    "priceMargin": 50,
    "id": 26
  },
  {
    "name": "ADYAN MAYAR 100ML",
    "price": 0,
    "description": "Adyan Mayar Feminino 100ml Eau de Parfum (EDP) é uma fragrância sofisticada e encantadora, criada para mulheres que buscam um perfume marcante e envolvente. Mayar é uma mistura delicada de notas florais e orientais, oferecendo uma experiência olfativa que exala feminilidade, elegância e sensualidade.",
    "category": "Perfumes Femininos",
    "image": "https://www.lgimportados.com/img/m/IMG_710237_1.JPG?v=1757278964",
    "dataAiHint": "",
    "onSale": false,
    "colors": [],
    "scrapingUrl": "https://www.lgimportados.com/produto/adyan-mayar-100ml-fem-edp-codigo-710237",
    "priceMargin": 50,
    "id": 27
  },
  {
    "name": "ADYAN MUSK ESSENTIAL 100ML",
    "price": 0,
    "description": "Adyan Musk Essential Feminino 100ml Eau de Parfum (EDP) é uma fragrância delicada e envolvente, perfeita para mulheres que apreciam a suavidade e o frescor do almíscar com uma sofisticada mistura de notas florais e amadeiradas. Musk Essential é uma escolha que transmite elegância, suavidade e uma sensualidade discreta, ideal para o uso diário ou para ocasiões em que você deseja deixar uma impressão de frescor e frescor duradouro.",
    "category": "Perfumes Femininos",
    "image": "https://www.lgimportados.com/img/m/IMG_710244_1.JPG?v=1757278970",
    "dataAiHint": "",
    "onSale": false,
    "colors": [],
    "scrapingUrl": "https://www.lgimportados.com/produto/adyan-musk-essential-100ml-fem-edp",
    "priceMargin": 50,
    "id": 28
  },
  {
    "name": "ADYAN NAMOOS 100ML ",
    "price": 0,
    "description": "Adyan Namoos é uma fragrância feminina luxuosa, doce e hipnotizante, que traduz o charme irresistível da mulher elegante e ousada. Rica em acordes orientais, florais e gourmand, é um perfume que envolve como um véu quente e sedutor, deixando um rastro inesquecível por onde passa.",
    "category": "Perfumes Femininos",
    "image": "https://www.lgimportados.com/img/m/IMG_710251_1.JPG?v=1757279068",
    "dataAiHint": "",
    "onSale": false,
    "colors": [],
    "scrapingUrl": "https://www.lgimportados.com/produto/adyan-namoos-100ml-fem-edp-codigo-710251",
    "priceMargin": 50,
    "id": 29
  },
  {
    "name": "ADYAN NORAH BELLA 100ML",
    "price": 0,
    "description": "Adyan Norah Bella Fem 100ml EDP é uma fragrância sofisticada e elegante, ideal para mulheres que buscam um perfume delicado, porém marcante. Combinando notas florais, frutadas e amadeiradas, essa fragrância é perfeita para expressar feminilidade e charme. A suavidade das flores e a intensidade das madeiras tornam esse perfume uma escolha única, que se adapta facilmente ao dia a dia ou a eventos especiais. Norah Bella é para mulheres que desejam deixar uma impressão duradoura e sofisticada.",
    "category": "Perfumes Femininos",
    "image": "https://www.lgimportados.com/img/m/IMG_775571_3.JPG?v=1757279070",
    "dataAiHint": "",
    "onSale": false,
    "colors": [],
    "scrapingUrl": "https://www.lgimportados.com/produto/-adyan-norah-bella-fem-100ml-edp",
    "priceMargin": 50,
    "id": 30
  },
  {
    "name": "ADYAN NORAH CARAMELA 100ML",
    "price": 0,
    "description": "Adyan Norah Caramela Fem 100ml EDP é uma fragrância irresistível e envolvente, perfeita para mulheres que amam notas doces e sofisticadas. Com o delicioso toque de caramelo, essa fragrância cria uma experiência olfativa doce e acolhedora, garantindo uma sensação de conforto e elegância ao longo do dia.\n\n",
    "category": "Perfumes Femininos",
    "image": "https://www.lgimportados.com/img/m/IMG_769853_1.JPG?v=1757279073",
    "dataAiHint": "",
    "onSale": false,
    "colors": [],
    "scrapingUrl": "https://www.lgimportados.com/produto/-adyan-norah-caramela-fem-100ml-edp-codigo-769853",
    "priceMargin": 50,
    "id": 31
  },
  {
    "name": "ADYAN NORAH PASSION 100ML",
    "price": 0,
    "description": "Adyan Norah Passion Fem 100ml EDP é uma fragrância intensa e apaixonante, desenvolvida para mulheres que desejam exalar confiança, sensualidade e sofisticação. Combinando notas florais, frutadas e amadeiradas, esse perfume cria uma atmosfera envolvente e cativante. Perfeito para ocasiões especiais ou para quem busca marcar presença no dia a dia, Norah Passion é uma fragrância que reflete a verdadeira paixão e a energia feminina.",
    "category": "Perfumes Femininos",
    "image": "https://www.lgimportados.com/img/m/IMG_775588_1.JPG?v=1757279075",
    "dataAiHint": "",
    "onSale": false,
    "colors": [],
    "scrapingUrl": "https://www.lgimportados.com/produto/adyan-norah-passion-fem-100ml-edp-codigo-775588",
    "priceMargin": 50,
    "id": 32
  },
  {
    "name": "ADYAN NORAH PISTÁCHIO 100ML",
    "price": 0,
    "description": "Adyan Norah Pistácio Fem 100ml EDP é uma fragrância sofisticada e envolvente, ideal para mulheres que buscam um perfume único e marcante. Com notas doces e delicadas de pistácio, ela proporciona uma experiência olfativa intensa e duradoura, perfeita para o dia a dia ou ocasiões especiais.",
    "category": "Perfumes Femininos",
    "image": "https://www.lgimportados.com/img/m/IMG_769884_1.JPG?v=1757279874",
    "dataAiHint": "",
    "onSale": false,
    "colors": [],
    "scrapingUrl": "https://www.lgimportados.com/produto/-adyan-norah-pistachio-fem-100ml-edp-codigo-769884",
    "priceMargin": 50,
    "id": 33
  },
  {
    "name": "ADYAN OUD AL MAMLIKA 100ML",
    "price": 0,
    "description": "Adyan Oud Al Mamlika Feminino 100ml Eau de Parfum (EDP) é uma fragrância luxuosa e sofisticada, criada para mulheres que buscam um perfume exótico, marcante e envolvente. Oud Al Mamlika combina a profundidade do oud com toques florais e amadeirados, resultando em uma experiência olfativa intensa e sofisticada que exala poder, elegância e sensualidade.",
    "category": "Perfumes Femininos",
    "image": "https://www.lgimportados.com/img/m/IMG_710268_1.JPG?v=1757279875",
    "dataAiHint": "",
    "onSale": false,
    "colors": [],
    "scrapingUrl": "https://www.lgimportados.com/produto/adyan-oud-al-mamlika-100ml-fem-edp",
    "priceMargin": 50,
    "id": 34
  },
  {
    "name": "ADYAN OUD REHLA 100ML",
    "price": 0,
    "description": "Adyan Oud Rehla é uma fragrância feminina rica, calorosa e envolvente que representa uma verdadeira “jornada olfativa” pelo luxo da perfumaria oriental. Seu nome, Rehla (que significa “viagem” em árabe), define bem sua proposta: uma travessia sensorial entre doçura, madeira e especiarias, pensada para mulheres marcantes, elegantes e intensas.",
    "category": "Perfumes Femininos",
    "image": "https://www.lgimportados.com/img/m/IMG_710305_2.JPG?v=1757279877",
    "dataAiHint": "",
    "onSale": false,
    "colors": [],
    "scrapingUrl": "https://www.lgimportados.com/produto/adyan-oud-rehla-100ml-fem-edp",
    "priceMargin": 50,
    "id": 35
  },
  {
    "name": "ADYAN OUD SAFFRON 100ML",
    "price": 0,
    "description": "Adyan Oud Saffron é uma fragrância feminina intensa, misteriosa e altamente sedutora, que une o calor das especiarias orientais com a profundidade do oud e a doçura envolvente do âmbar. Inspirado nas tradições da perfumaria árabe, esse perfume é uma verdadeira joia olfativa: opulento, exótico e extremamente marcante, feito para mulheres que amam deixar rastro.\n\n",
    "category": "Perfumes Femininos",
    "image": "https://www.lgimportados.com/img/m/IMG_710282_1.JPG?v=1757279879",
    "dataAiHint": "",
    "onSale": false,
    "colors": [],
    "scrapingUrl": "https://www.lgimportados.com/produto/adyan-oud-saffron-100ml-fem-edp-codigo-710282",
    "priceMargin": 50,
    "id": 36
  },
  {
    "name": "ADYAN THAMNIYAT FLORA 100ML",
    "price": 0,
    "description": "Adyan Thamniyat Flora 100ml Fem EDP é uma fragrância floral sofisticada e envolvente, criada especialmente para mulheres que buscam exalar elegância e frescor. Com uma mistura delicada de notas florais, amadeiradas e um toque sutil de frutas, essa fragrância proporciona uma experiência olfativa marcante e única. Ideal para o uso diário ou para ocasiões especiais, o Thamniyat Flora é uma escolha perfeita para mulheres que desejam uma fragrância fresca, mas com uma base de sofisticação que se mantém ao longo do dia.",
    "category": "Perfumes Femininos",
    "image": "https://www.lgimportados.com/img/m/IMG_775632_2.JPG?v=1757545289",
    "dataAiHint": "",
    "onSale": false,
    "colors": [],
    "scrapingUrl": "https://www.lgimportados.com/produto/-adyan-thamniyat-flora-100ml-fem-edp-codigo-775632",
    "priceMargin": 65,
    "id": 37
  }
];

export const getProducts = (): Product[] => PRODUCTS;

export const getProductById = (id: number): Product | undefined =>
  PRODUCTS.find((p) => p.id === id);

export const getCategories = (): string[] => {
  const categories = PRODUCTS.map(p => p.category);
  return [...new Set(categories)];
}
