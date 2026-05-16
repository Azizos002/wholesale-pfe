export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  categoryId: number;
  description?: string;
}

export interface Category {
  id: number;
  name: string;
}
