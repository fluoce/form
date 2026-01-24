import { Test, TestingModule } from '@nestjs/testing';
import { WorkspaceMembercoreService } from './workspace.membercore.service';

describe('WorkspaceMembercoreService', () => {
  let service: WorkspaceMembercoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkspaceMembercoreService],
    }).compile();

    service = module.get<WorkspaceMembercoreService>(WorkspaceMembercoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
