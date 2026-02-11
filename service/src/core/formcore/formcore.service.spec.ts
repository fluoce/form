import { Test, TestingModule } from '@nestjs/testing';
import { FormcoreService } from './formcore.service';

describe('FormService', () => {
  let service: FormcoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormcoreService],
    }).compile();

    service = module.get<FormcoreService>(FormcoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
