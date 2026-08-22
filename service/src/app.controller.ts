import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/decorator/public.decorator';
import { PrismaService } from './lib/prisma/prisma.service';

@Controller('app')
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Public()
  @Get('health')
  async health() {
    await this.prisma.$queryRaw`SELECT 1`;
    return {
      service: 'Form',
      message: 'All is well',
      timestamp: new Date().toISOString(),
    };
  }
}
