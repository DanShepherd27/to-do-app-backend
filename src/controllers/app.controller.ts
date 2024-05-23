import { Controller } from '@nestjs/common';
import { SyncDataService } from '../services/syncData.service';

@Controller()
export class AppController {
  constructor(private readonly syncDataService: SyncDataService) {}
}
