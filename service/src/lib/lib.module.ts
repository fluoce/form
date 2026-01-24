import { Global, Module } from '@nestjs/common';
import { JwtModule } from './jwt/jwt.module';
import { UlidService } from './ulid/ulid.service';
import { RedisModule } from './redis/redis.module';
import { PrismaModule } from './prisma/prisma.module';
import { SlugService } from './slug/slug.service';

@Global()
@Module({
    imports: [JwtModule, RedisModule, PrismaModule],
    providers: [UlidService, SlugService],
    exports: [UlidService, JwtModule, SlugService, PrismaModule]
})
export class LibModule { }
