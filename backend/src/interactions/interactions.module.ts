import { Module } from '@nestjs/common';
import { InteractionsController } from './interactions.controller';
import { InteractionsService } from './interactions.service';
import { PrismaModule } from '../prisma/prisma.module';
import { SidTransactionsModule } from '../sid-transactions/sid-transactions.module';
import { TrustModule } from '../trust/trust.module';

@Module({
  imports: [
    PrismaModule,
    SidTransactionsModule,
    TrustModule,
  ],
  controllers: [
    InteractionsController,
  ],
  providers: [
    InteractionsService,
  ],
})
export class InteractionsModule {}
