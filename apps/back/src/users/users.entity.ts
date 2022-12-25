import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { AutoMap } from '@automapper/classes';
import { Role } from '../roles/roles.entity';

@Entity()
export class User {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;

  @AutoMap()
  @Column('varchar', { length: 200 })
  email: string;

  @AutoMap()
  @Column('varchar', { length: 200 })
  password: string;

  @ManyToMany(() => Role)
  @JoinTable({ name: 'users_roles' })
  roles?: Role[];
}
