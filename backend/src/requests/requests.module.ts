import { Module } from '@nestjs/common';
import { RequestsController } from './requests.controller';
import { RequestsService } from './requests.service';
import { PrismaModule } from '../prisma/prisma.module';
import { SidTransactionsModule } from '../sid-transactions/sid-transactions.module';

@Module({
  imports: [
    PrismaModule,
    SidTransactionsModule,
  ],
  controllers: [
    RequestsController,
  ],
  providers: [
    RequestsService,
  ],
})
export class RequestsModule {}