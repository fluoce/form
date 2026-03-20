import { Test, TestingModule } from '@nestjs/testing';
import { FormpagecoreService } from './formpagecore.service';

describe('FormpagecoreService', () => {
  let service: FormpagecoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormpagecoreService],
    }).compile();

    service = module.get<FormpagecoreService>(FormpagecoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
