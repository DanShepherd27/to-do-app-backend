import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { SyncDataController } from './controllers/syncData.controller';
import { SyncDataService } from './services/syncData.service';

@Module({
  imports: [],
  controllers: [AppController, SyncDataController],
  providers: [AppService, SyncDataService],
})
export class AppModule {}
