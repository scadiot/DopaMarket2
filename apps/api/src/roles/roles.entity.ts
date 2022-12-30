import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from '../users/users.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 10 })
  tag: string;

  @Column('varchar', { length: 50 })
  name: string;

  @Column('varchar', { length: 200 })
  description: string;

  @ManyToMany(() => User)
  @JoinTable({ name: 'users_roles' })
  users?: User[];
}
