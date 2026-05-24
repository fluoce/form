import { Global, Module } from '@nestjs/common';
import { JwtModule } from './jwt/jwt.module';
import { UlidService } from './ulid/ulid.service';
import { RedisModule } from './redis/redis.module';
import { PrismaModule } from './prisma/prisma.module';
import { SlugService } from './slug/slug.service';
import { CloudflareService } from './cloudflare/cloudflare.service';
import { UAParserService } from './uaparser/uaparser.service';

@Global()
@Module({
  imports: [JwtModule, RedisModule, PrismaModule],
  providers: [UlidService, SlugService, CloudflareService, UAParserService],
  exports: [
    UlidService,
    JwtModule,
    SlugService,
    PrismaModule,
    CloudflareService,
    UAParserService,
  ],
})
export class LibModule {}
