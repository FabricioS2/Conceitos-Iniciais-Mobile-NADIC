export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;     // URL de imagem
  description?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}