import {
  Column,
  Entity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  Index,
} from 'typeorm';

import { Category } from '../categories/categories.entity';
import { Keyword } from '../keywords/keywords.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 200 })
  name: string;

  @Column('varchar', { length: 200 })
  @Index()
  slug: string;

  @Column('varchar', { length: 300 })
  summary: string;

  @Column('varchar', { length: 2000 })
  description: string;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @ManyToMany(() => Category)
  @JoinTable({ name: 'products_categories' })
  categories?: Category[];

  @ManyToMany(() => Keyword)
  @JoinTable({ name: 'products_keywords' })
  keywords?: Keyword[];
}
