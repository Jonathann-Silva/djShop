export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  dataAiHint: string;
};

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Ergonomic Office Chair',
    price: 299.99,
    description: 'A comfortable and supportive chair designed for long hours at the desk. Features adjustable height, lumbar support, and breathable mesh back.',
    category: 'Furniture',
    image: 'https://picsum.photos/600/400?random=1',
    dataAiHint: 'office chair'
  },
  {
    id: 2,
    name: 'Wireless Mechanical Keyboard',
    price: 129.99,
    description: 'A tactile and responsive keyboard with customizable RGB lighting. Connect via Bluetooth or USB-C.',
    category: 'Electronics',
    image: 'https://picsum.photos/600/400?random=2',
    dataAiHint: 'mechanical keyboard'
  },
  {
    id: 3,
    name: '4K UHD Monitor',
    price: 449.0,
    description: 'A 27-inch 4K monitor with stunning color accuracy and clarity. Perfect for creative professionals and gamers.',
    category: 'Electronics',
    image: 'https://picsum.photos/600/400?random=3',
    dataAiHint: 'computer monitor'
  },
  {
    id: 4,
    name: 'Minimalist Desk Lamp',
    price: 79.5,
    description: 'A sleek and modern LED desk lamp with adjustable brightness and color temperature. Provides flicker-free lighting.',
    category: 'Home Goods',
    image: 'https://picsum.photos/600/400?random=4',
    dataAiHint: 'desk lamp'
  },
  {
    id: 5,
    name: 'Smart Reusable Notebook',
    price: 34.95,
    description: 'Write, scan, and erase. This notebook connects to your favorite cloud services for endless use.',
    category: 'Office Supplies',
    image: 'https://picsum.photos/600/400?random=5',
    dataAiHint: 'notebook journal'
  },
  {
    id: 6,
    name: 'Adjustable Standing Desk',
    price: 599.0,
    description: 'Switch between sitting and standing with this electric height-adjustable desk. Features a spacious work surface and memory presets.',
    category: 'Furniture',
    image: 'https://picsum.photos/600/400?random=6',
    dataAiHint: 'standing desk'
  },
  {
    id: 7,
    name: 'Noise-Cancelling Headphones',
    price: 349.99,
    description: 'Immerse yourself in sound with industry-leading noise cancellation. Features up to 30 hours of battery life.',
    category: 'Electronics',
    image: 'https://picsum.photos/600/400?random=7',
    dataAiHint: 'headphones music'
  },
  {
    id: 8,
    name: 'Gourmet Coffee Beans',
    price: 22.5,
    description: 'A 12oz bag of single-origin, medium-roast coffee beans with notes of chocolate and citrus.',
    category: 'Home Goods',
    image: 'https://picsum.photos/600/400?random=8',
    dataAiHint: 'coffee beans'
  },
  {
    id: 9,
    name: 'Modern Bookshelf',
    price: 180.0,
    description: 'A stylish and sturdy 5-tier bookshelf perfect for displaying books, plants, and decor.',
    category: 'Furniture',
    image: 'https://picsum.photos/600/400?random=9',
    dataAiHint: 'bookshelf interior'
  },
  {
    id: 10,
    name: 'High-Speed Blender',
    price: 99.99,
    description: 'A powerful blender for smoothies, soups, and sauces. Comes with a 64oz container and multiple speed settings.',
    category: 'Home Goods',
    image: 'https://picsum.photos/600/400?random=10',
    dataAiHint: 'kitchen blender'
  },
  {
    id: 11,
    name: 'Yoga Mat',
    price: 45.0,
    description: 'A non-slip, eco-friendly yoga mat with extra cushioning for comfort and support during your practice.',
    category: 'Sports',
    image: 'https://picsum.photos/600/400?random=11',
    dataAiHint: 'yoga mat'
  },
  {
    id: 12,
    name: 'Smart Water Bottle',
    price: 59.95,
    description: 'Tracks your water intake and glows to remind you to stay hydrated throughout the day.',
    category: 'Sports',
    image: 'https://picsum.photos/600/400?random=12',
    dataAiHint: 'water bottle'
  },
];

export const getProducts = (): Product[] => PRODUCTS;

export const getProductById = (id: number): Product | undefined =>
  PRODUCTS.find((p) => p.id === id);

export const getCategories = (): string[] => {
  const categories = PRODUCTS.map(p => p.category);
  return [...new Set(categories)];
}
