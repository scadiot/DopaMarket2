import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import { AutoMap } from '@automapper/classes';
import { Product } from '../products/products.entity';

@Entity()
export class Category {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;

  @AutoMap()
  @Column('varchar', { length: 200 })
  name: string;

  @AutoMap()
  @Column('varchar', { length: 200 })
  slug: string;

  @AutoMap()
  @Column('varchar', { length: 500 })
  description: string;

  @ManyToOne(() => Category, (category) => category.children)
  @JoinColumn({ name: 'parentId' })
  parent?: Category;

  @AutoMap()
  @Column('varchar', { nullable: true })
  parentId: number;

  @OneToMany(() => Category, (category) => category.parent)
  children: Category[];

  @ManyToMany(() => Product)
  @JoinTable({ name: 'products_categories' })
  products: Product[];
}
