import { Test, TestingModule } from '@nestjs/testing';
import { FormpageService } from './formpage.service';

describe('FormpageService', () => {
  let service: FormpageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormpageService],
    }).compile();

    service = module.get<FormpageService>(FormpageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
