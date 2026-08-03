import { Module } from '@nestjs/common';
import { NeighborsController } from './neighbors.controller';
import { NeighborsService } from './neighbors.service';
import { PrismaModule } from '../prisma/prisma.module';
import { SidTransactionsModule } from '../sid-transactions/sid-transactions.module';

@Module({
  imports: [
    PrismaModule,
    SidTransactionsModule,
  ],
  controllers: [
    NeighborsController,
  ],
  providers: [
    NeighborsService,
  ],
})
export class NeighborsModule {}