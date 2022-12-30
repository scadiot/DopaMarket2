import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Index,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Product } from '../products/products.entity';

@Entity()
export class Keyword {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 50 })
  @Index()
  word: string;

  @ManyToMany(() => Product)
  @JoinTable({ name: 'products_keywords' })
  products: Product[];
}
