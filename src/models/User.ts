import { UUID } from 'crypto';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Todo } from './Todo';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column()
  username: string;

  @OneToMany(() => Todo, ({ user }) => user, { cascade: true })
  todos: Todo[];
}
