import { Inject, Injectable } from '@nestjs/common';
import { UUID } from 'crypto';
import { User } from 'src/models/User';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY') private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: UUID): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async upsert(users: User[]): Promise<void> {
    await this.usersRepository.upsert(users, {
      conflictPaths: ['id'],
      skipUpdateIfNoValuesChanged: true,
      upsertType: 'on-conflict-do-update',
    });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
