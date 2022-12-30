import { Product } from './product'

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  parent?: Category;
  parentId: number;
  children: Category[];
  products: Product[];
}