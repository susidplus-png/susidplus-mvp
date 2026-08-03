import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNeighborRequestDto } from './dto/create-neighbor-request.dto';
import { SidTransactionsService } from '../sid-transactions/sid-transactions.service';

@Injectable()
export class NeighborsService {
  constructor(
    private prisma: PrismaService,
    private sidTransactionsService: SidTransactionsService,
  ) {}

  async createRequest(
    userId: string,
    dto: CreateNeighborRequestDto,
  ) {
    const connection =
      await this.prisma.neighborConnection.create({
        data: {
          userId,
          neighborId: dto.neighborId,
          status: 'PENDING',
        },
        include: {
          neighbor: {
            include: {
              profile: true,
            },
          },
        },
      });

    const sidBalance =
      await this.sidTransactionsService.getBalance(
        connection.neighbor.id,
      );

    return {
      ...connection,
      neighbor: {
        ...connection.neighbor,
        sidBalance,
      },
    };
  }


  async findUserConnections(userId: string) {
    const connections =
      await this.prisma.neighborConnection.findMany({
        where: {
          userId,
        },
        include: {
          neighbor: {
            include: {
              profile: true,
            },
          },
        },
      });

    return Promise.all(
      connections.map(async (item) => ({
        ...item,
        neighbor: {
          ...item.neighbor,
          sidBalance:
            await this.sidTransactionsService.getBalance(
              item.neighbor.id,
            ),
        },
      })),
    );
  }


  async acceptRequest(id: string) {
    const connection =
      await this.prisma.neighborConnection.update({
        where: {
          id,
        },
        data: {
          status: 'ACCEPTED',
        },
        include: {
          user: {
            include: {
              profile: true,
            },
          },
          neighbor: {
            include: {
              profile: true,
            },
          },
        },
      });

    const sidBalance =
      await this.sidTransactionsService.getBalance(
        connection.neighbor.id,
      );

    return {
      ...connection,
      neighbor: {
        ...connection.neighbor,
        sidBalance,
      },
    };
  }


  async findAcceptedNeighbors(userId: string) {
    const neighbors =
      await this.prisma.neighborConnection.findMany({
        where: {
          userId,
          status: 'ACCEPTED',
        },
        include: {
          neighbor: {
            include: {
              profile: true,
            },
          },
        },
      });

    return Promise.all(
      neighbors.map(async (item) => ({
        ...item,
        neighbor: {
          ...item.neighbor,
          sidBalance:
            await this.sidTransactionsService.getBalance(
              item.neighbor.id,
            ),
        },
      })),
    );
  }
}