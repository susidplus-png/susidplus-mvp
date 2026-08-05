import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { NeighborsModule } from './neighbors/neighbors.module';
import { RequestsModule } from './requests/requests.module';
import { InteractionsModule } from './interactions/interactions.module';
import { ReviewsModule } from './reviews/reviews.module';
import { SidTransactionsModule } from './sid-transactions/sid-transactions.module';
import { ServicesModule } from './services/services.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    UsersModule,
    NeighborsModule,
    RequestsModule,
    InteractionsModule,
    ReviewsModule,
    SidTransactionsModule,
    ServicesModule,
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}