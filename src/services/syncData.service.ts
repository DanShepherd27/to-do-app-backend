import { Injectable } from '@nestjs/common';
import { SyncData } from 'src/models/SyncData';

@Injectable()
export class SyncDataService {
  logSyncData(syncData: SyncData) {
    console.log(syncData.user.username + '\n');
    syncData.todos.forEach((todo) =>
      console.log(`TODO: ${todo.title} - STATUS: ${todo.status}`),
    );
  }
}
