import { Test, TestingModule } from '@nestjs/testing';
import { UaparserService } from './uaparser.service';

describe('UaparserService', () => {
  let service: UaparserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UaparserService],
    }).compile();

    service = module.get<UaparserService>(UaparserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
