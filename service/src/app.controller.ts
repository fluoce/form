import { Controller, Get, Req } from '@nestjs/common';

@Controller('app')
export class AppController {
  constructor() {}

  @Get('health')
  async health() {
    return {
      service:"Form",
      message: 'All is well',
      timestamp: new Date().toISOString(),
    };
  }
}
