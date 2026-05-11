export interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string;
  description: string | null;
  category: string | null;
  quantity: number;
  sizes: string[] | null;
  created_at: string;
}
