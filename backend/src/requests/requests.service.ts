import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { SidTransactionsService } from '../sid-transactions/sid-transactions.service';

@Injectable()
export class RequestsService {
  constructor(
    private prisma: PrismaService,
    private sidTransactionsService: SidTransactionsService,
  ) {}

  async create(
    userId: string,
    dto: CreateRequestDto,
  ) {
    return this.prisma.request.create({
      data: {
        creatorId: userId,
        title: dto.title,
        description: dto.description,
        categoryId: dto.categoryId,
        status: 'OPEN',
      },
      include: {
        creator: {
          include: {
            profile: true,
          },
        },
        category: true,
      },
    });
  }

  async findAll() {
    const requests =
      await this.prisma.request.findMany({
        where: {
          status: 'OPEN',
        },
        include: {
          creator: {
            include: {
              profile: true,
            },
          },
          category: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

    return Promise.all(
      requests.map(async (request) => ({
        ...request,
        creator: {
          ...request.creator,
          sidBalance:
            await this.sidTransactionsService.getBalance(
              request.creator.id,
            ),
        },
      })),
    );
  }
}