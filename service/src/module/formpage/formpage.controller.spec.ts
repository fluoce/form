import { Test, TestingModule } from '@nestjs/testing';
import { FormpageController } from './formpage.controller';

describe('FormpageController', () => {
  let controller: FormpageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormpageController],
    }).compile();

    controller = module.get<FormpageController>(FormpageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
