import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSidTransactionDto } from './dto/create-sid-transaction.dto';

@Injectable()
export class SidTransactionsService {

  constructor(
    private prisma: PrismaService,
  ) {}

  async create(dto: CreateSidTransactionDto) {
    return this.prisma.sIDTransaction.create({
      data: {
        userId: dto.userId,
        interactionId: dto.interactionId,
        amount: dto.amount,
        reason: dto.reason,
        type: dto.type,
      },
      include: {
        interaction: {
          include: {
            request: true,
          },
        },
      },
    });
  }


  async findAll() {
    return this.prisma.sIDTransaction.findMany({
      include: {
        user: {
          include: {
            profile: true,
          },
        },
        interaction: {
          include: {
            request: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }


  async findByUser(userId: string) {
    return this.prisma.sIDTransaction.findMany({
      where: {
        userId,
      },
      include: {
        interaction: {
          include: {
            request: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }


  async getBalance(userId: string) {

    const result =
      await this.prisma.sIDTransaction.aggregate({
        where: {
          userId,
        },
        _sum: {
          amount: true,
        },
      });


    return {
      userId,
      balance: result._sum.amount ?? 0,
    };
  }
}