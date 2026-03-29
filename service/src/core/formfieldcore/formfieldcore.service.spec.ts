import { Test, TestingModule } from '@nestjs/testing';
import { FormfieldcoreService } from './formfieldcore.service';

describe('FormfieldcoreService', () => {
  let service: FormfieldcoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormfieldcoreService],
    }).compile();

    service = module.get<FormfieldcoreService>(FormfieldcoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
