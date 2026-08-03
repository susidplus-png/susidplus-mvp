import { Test, TestingModule } from '@nestjs/testing';
import { SidTransactionsService } from './sid-transactions.service';

describe('SidTransactionsService', () => {
  let service: SidTransactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SidTransactionsService],
    }).compile();

    service = module.get<SidTransactionsService>(SidTransactionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
