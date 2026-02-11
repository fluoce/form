import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { LibModule } from './lib/lib.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './lib/jwt/jwt.guard';
import { WorkspaceModule } from './module/workspace/workspace.module';
import { FormModule } from './module/form/form.module';
import { RateLimitGuard } from './ratelimit.guard';
import { WorkspacecoreModule } from './core/workspacecore/workspacecore.module';
import { FormcoreModule } from './core/formcore/formcore.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    LibModule,
    WorkspaceModule,
    FormModule,
    FormcoreModule,
    WorkspacecoreModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RateLimitGuard,
    }
  ],
})
export class AppModule { }
