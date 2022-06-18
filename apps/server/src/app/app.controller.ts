import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { seedDatabase } from '../database/db-seeder';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService
  ) {
    if (this.configService.get('app.seedDatabase')) {
      console.log('Seeding database');
      seedDatabase();
    }
  }
  @Get()
  getData() {
    return this.appService.getData();
  }
}
