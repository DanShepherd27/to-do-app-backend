import { Inject, Injectable } from '@nestjs/common';
import { Todo } from 'src/models/Todo';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';
import { User } from 'src/models/User';

@Injectable()
export class TodoService {
  constructor(
    @Inject('TODO_REPOSITORY') private todosRepository: Repository<Todo>,
    @Inject('USER_REPOSITORY') private userRepository: Repository<User>,
  ) {}

  async findAll(userId: UUID): Promise<Array<Todo>> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new Error('User not found');
    }
    return await this.todosRepository.find({
      where: { user },
      relations: ['user'],
    });
  }

  async findOne(id: UUID): Promise<Todo | null> {
    return await this.todosRepository.findOneBy({ id });
  }

  async upsert(todos: Todo[]): Promise<void> {
    await this.todosRepository.upsert(todos, {
      conflictPaths: ['id'],
      skipUpdateIfNoValuesChanged: true,
      upsertType: 'on-conflict-do-update',
    });
  }

  async delete(id: UUID): Promise<void> {
    await this.todosRepository.delete(id);
  }

  async remove(removables: Todo[]): Promise<void> {
    await this.todosRepository.remove(removables);
  }

  async syncLog(changed: Todo[], removed: Todo[]): Promise<void> {
    console.log('-------- SYNCED ITEMS --------');
    changed.map(async (todo) => {
      const user = await this.userRepository.findOneBy({ id: todo.user.id });

      console.log(
        `TODO: ${todo.title} STATUS: ${todo.done ? 'done' : 'pending'} OWNER: ${user?.username} (${user?.id})`,
      );
    });

    removed.map(async (todo) => {
      const user = await this.userRepository.findOneBy({ id: todo.user.id });

      console.log(
        `REMOVED (TODO: ${todo.title} STATUS: ${todo.done ? 'done' : 'pending'} OWNER: ${user?.username} (${user?.id}))`,
      );
    });
  }
}
