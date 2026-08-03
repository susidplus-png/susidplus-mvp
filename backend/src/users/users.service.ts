import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SidTransactionsService } from '../sid-transactions/sid-transactions.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private sidTransactionsService: SidTransactionsService,
  ) {}

  async findAll() {
    const users = await this.prisma.user.findMany({
      include: {
        profile: true,
        location: true,
      },
    });

    return Promise.all(
      users.map(async (user) => ({
        ...user,
        sidBalance: await this.sidTransactionsService.getBalance(user.id),
      })),
    );
  }

  async create(data: {
    phone: string;
    firstName: string;
  }) {
    const count = await this.prisma.user.count();

    const susidNumber = `S+${String(count + 1).padStart(6, '0')}`;

    return this.prisma.user.create({
      data: {
        phone: data.phone,
        susidNumber,
        profile: {
          create: {
            firstName: data.firstName,
          },
        },
      },
      include: {
        profile: true,
      },
    });
  }

  async updateProfile(
    userId: string,
    data: {
      lastName?: string;
      city?: string;
      district?: string;
      bio?: string;
    },
  ) {
    return this.prisma.profile.update({
      where: {
        userId,
      },
      data,
    });
  }

  async findBySusidNumber(susidNumber: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        susidNumber,
      },
      include: {
        profile: true,
        location: true,
      },
    });

    if (!user) {
      return null;
    }

    return {
      ...user,
      sidBalance: await this.sidTransactionsService.getBalance(user.id),
    };
  }
}