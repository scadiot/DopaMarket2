import { Category } from './category'

export interface Product {
  id: number;
  name: string;
  slug: string;
  summary: string;
  description: string;
  createDate: Date;
  updateDate: Date;
  categories?: Category[];
  keywords?: string[];
}