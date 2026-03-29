import { Test, TestingModule } from '@nestjs/testing';
import { FormfieldController } from './formfield.controller';

describe('FormfieldController', () => {
  let controller: FormfieldController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormfieldController],
    }).compile();

    controller = module.get<FormfieldController>(FormfieldController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
