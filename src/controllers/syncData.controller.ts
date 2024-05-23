import { Body, Controller, Get, Post } from '@nestjs/common';
import { SyncData } from '../models/SyncData';
import { SyncDataService } from '../services/syncData.service';
import { UUID } from 'crypto';
import { User } from 'src/models/User';
import { Todo } from 'src/models/Todo';
import { v4 as uuidv4 } from 'uuid';

@Controller('sync')
export class SyncDataController {
  constructor(private readonly syncDataService: SyncDataService) {}

  @Post()
  postSyncData(@Body() syncData: SyncData): void {
    // CREATE DATA RECORD
    this.syncDataService.logSyncData(syncData);
    return;
  }

  @Get(':userId')
  getSyncData(userId: UUID): SyncData {
    // READ FROM DB INSTEAD OF HARD CODED RESPONSE
    return new SyncData(new User('', userId), [
      new Todo(userId, 'mosogatás', false),
    ]);
  }
}
