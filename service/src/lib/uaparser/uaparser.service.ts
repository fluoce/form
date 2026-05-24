import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import type { UserAgentType } from 'src/types/types';
import { UAParser } from 'ua-parser-js';

@Injectable()
export class UAParserService {
  parseUserAgent(req: Request): UserAgentType & { ipAddress: string } {
    const ipAddress =
      (req.headers['cf-connecting-ip'] as string) ||
      (req.headers['x-forwarded-for'] as string)?.split(',')[0] ||
      req.ip ||
      '';
    const parser = new UAParser(req.headers['user-agent'] || '');
    const result = parser.getResult();
    return {
      ipAddress,
      device: result.device.type || 'desktop',
      os: result.os.name || 'Unknown',
      browser: result.browser.name || 'Unknown',
    };
  }
}
