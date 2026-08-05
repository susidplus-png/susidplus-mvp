import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async findAll() {
    return this.prisma.user.findMany({
      include: {
        profile: true,
        location: true,

        services: {
          include: {
            category: true,
          },
        },

        reviewsReceived: true,
        reviewsGiven: true,

        helpedInteractions: {
          include: {
            request: true,
            sidTransactions: true,
            reviews: true,
          },
        },

        createdRequests: true,

        sidTransactions: true,
      },
    });
  }


  async findOne(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },

      include: {
        profile: true,
        location: true,

        services: {
          include: {
            category: true,
          },
        },

        reviewsReceived: true,
        reviewsGiven: true,

        helpedInteractions: {
          include: {
            request: true,
            sidTransactions: true,
            reviews: true,
          },
        },

        createdRequests: true,

        sidTransactions: true,
      },
    });
  }


  async findBySusidNumber(number: string) {
    return this.prisma.user.findUnique({
      where: {
        susidNumber: number,
      },

      include: {
        profile: true,
        location: true,

        services: {
          include: {
            category: true,
          },
        },

        reviewsReceived: true,
        reviewsGiven: true,

        helpedInteractions: {
          include: {
            request: true,
            sidTransactions: true,
            reviews: true,
          },
        },

        createdRequests: true,

        sidTransactions: true,
      },
    });
  }


  async create(data: any) {
    return this.prisma.user.create({
      data,
    });
  }


  async updateProfile(
    userId: string,
    data: any,
  ) {
    return this.prisma.profile.update({
      where: {
        userId,
      },
      data,
    });
  }
}