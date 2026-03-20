import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import type { Request } from 'express';
import { RedisService } from './lib/redis/redis.service';
import { Reflector } from '@nestjs/core';
import { SKIP_RATE_LIMIT_BY_IP } from './decorator/skip.ratelimit.decorator';
import { rateLimitByIp } from './func/rate-limit';
import { RateLimitConfigInterface } from './types/ratelimit.types';
import { RATE_LIMIT_CONFIG } from './decorator/ratelimit.config.decorator';

@Injectable()
export class RateLimitGuard implements CanActivate {
  constructor(
    private readonly redisService: RedisService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const handler = context.getHandler();
    const controller = context.getClass();
    const skip = this.reflector.getAllAndOverride<boolean>(
      SKIP_RATE_LIMIT_BY_IP,
      [handler, controller],
    );
    if (skip) {
      return true;
    }
    const config = this.reflector.getAllAndOverride<RateLimitConfigInterface>(
      RATE_LIMIT_CONFIG,
      [handler, controller],
    );
    const limit = config?.limit ?? 5;
    const windowSeconds = config?.windowSeconds ?? 1;
    const req = context.switchToHttp().getRequest<Request>();
    const ip = req.ip;
    await rateLimitByIp(this.redisService, ip, limit, windowSeconds);
    return true;
  }
}
