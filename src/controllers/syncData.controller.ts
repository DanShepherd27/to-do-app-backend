import { Body, Controller, Post } from '@nestjs/common';
import { SyncData } from '../models/SyncData';
import { SyncDataService } from '../services/syncData.service';

@Controller()
export class AppController {
  constructor(private readonly syncDataService: SyncDataService) {}

  @Post()
  postSyncData(@Body() syncData: SyncData): void {
    // CREATE DATA RECORD
    this.syncDataService.logSyncData(syncData);
    return;
  }
}
