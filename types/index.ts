export interface Product {
  id: string;
  name: string;
  emoji: string;
  category: string;
  price: number;
  unit: string;
  desc: string;
  onSale: boolean;
  image?: string; // mantido opcional para compatibilidade
}

export interface CartItem {
  product: Product;
  quantity: number;
}