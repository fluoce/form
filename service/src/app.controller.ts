import { Controller, Get, Req } from '@nestjs/common';
import { Public } from "@/decorator/public.decorator"

@Controller('app')
export class AppController {
  constructor() {}

  @Public()
  @Get('health')
  async health() {
    return {
      service:"Form",
      message: 'All is well',
      timestamp: new Date().toISOString(),
    };
  }
}
