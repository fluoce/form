import { Test, TestingModule } from '@nestjs/testing';
import { SubmitcoreService } from './submitcore.service';

describe('SubmitcoreService', () => {
  let service: SubmitcoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubmitcoreService],
    }).compile();

    service = module.get<SubmitcoreService>(SubmitcoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
