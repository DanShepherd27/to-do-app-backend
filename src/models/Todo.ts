import { UUID } from 'crypto';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column()
  title: string;

  @Column({ default: false })
  done: boolean;

  @Column()
  index: number;

  @ManyToOne(() => User, ({ todos }) => todos, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;
}
