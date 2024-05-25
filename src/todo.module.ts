import { Module } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { todoProviders } from './providers/todo.providers';
import { TodoService } from './services/todo.service';
import { UserModule } from './user.module';
import { userProviders } from './providers/user.providers';
import { TodoController } from './controllers/todo.controller';

@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [TodoController],
  providers: [...todoProviders, ...userProviders, TodoService],
})
export class TodoModule {}
