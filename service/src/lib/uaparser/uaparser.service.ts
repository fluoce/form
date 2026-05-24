import { Injectable } from '@nestjs/common';
import type { UserAgentType } from 'src/types/types';
import { UAParser } from 'ua-parser-js';

@Injectable()
export class UAParserService {
  parseUserAgent(userAgent: string): UserAgentType {
    const parser = new UAParser(userAgent);
    const result = parser.getResult();
    return {
      device: result.device.type || 'desktop',
      os: result.os.name || 'Unknown',
      browser: result.browser.name || 'Unknown',
    };
  }
}
