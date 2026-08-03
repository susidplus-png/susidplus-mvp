import { Test, TestingModule } from '@nestjs/testing';
import { SidTransactionsController } from './sid-transactions.controller';

describe('SidTransactionsController', () => {
  let controller: SidTransactionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SidTransactionsController],
    }).compile();

    controller = module.get<SidTransactionsController>(SidTransactionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
