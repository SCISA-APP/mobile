export interface AddProductPayload {
  id: string;
  shop_id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  discount?: number;
  stock: number;
  status: 'active' | 'inactive';
  front_image: string | null;
  additional_images?: string[];
  sizes?: string[];
  colors?: string[];
  tags?: string[];
}