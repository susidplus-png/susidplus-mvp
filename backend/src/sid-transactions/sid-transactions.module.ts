import { Module } from '@nestjs/common';
import { SidTransactionsService } from './sid-transactions.service';
import { SidTransactionsController } from './sid-transactions.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
  ],
  providers: [
    SidTransactionsService,
  ],
  controllers: [
    SidTransactionsController,
  ],
  exports: [
    SidTransactionsService,
  ],
})
export class SidTransactionsModule {}