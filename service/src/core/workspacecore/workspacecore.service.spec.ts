import { Test, TestingModule } from '@nestjs/testing';
import { WorkspacecoreService } from './workspacecore.service';

describe('WorkspacecoreService', () => {
  let service: WorkspacecoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkspacecoreService],
    }).compile();

    service = module.get<WorkspacecoreService>(WorkspacecoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
