import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { UserModule } from './user.module';
import { TodoModule } from './todo.module';
import { DatabaseModule } from './database.module';

@Module({
  imports: [DatabaseModule, UserModule, TodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {}
}
