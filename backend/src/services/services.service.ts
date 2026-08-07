import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

import { CreateServiceDto } from './dto/create-service.dto';
import { SearchServiceDto } from './dto/search-service.dto';

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateServiceDto) {
    return this.prisma.service.create({
      data: {
        userId,
        title: dto.title,
        description: dto.description,
        serviceType: dto.serviceType ?? 'PAID',
        priceFrom: dto.priceFrom,
        priceTo: dto.priceTo,
        currency: dto.currency ?? 'UAH',
        categoryId: dto.categoryId,
      },
      include: {
        category: true,
        user: {
          include: {
            profile: true,
          },
        },
      },
    });
  }

  async findByUser(userId: string) {
    return this.prisma.service.findMany({
      where: {
        userId,
      },
      include: {
        category: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findAll(search?: SearchServiceDto) {
    const where: Prisma.ServiceWhereInput = {};

    if (search?.title) {
      where.title = {
        contains: search.title,
        mode: 'insensitive',
      };
    }

    if (search?.categoryId) {
      where.categoryId = search.categoryId;
    }

    if (search?.serviceType) {
      where.serviceType = search.serviceType;
    }

    if (search?.city || search?.district) {
      where.user = {
        profile: {
          ...(search.city && { city: search.city }),
          ...(search.district && { district: search.district }),
        },
      };
    }

    return this.prisma.service.findMany({
      where,
      include: {
        category: true,
        user: {
          include: {
            profile: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async updateStatus(id: string, isActive: boolean) {
    return this.prisma.service.update({
      where: {
        id,
      },
      data: {
        isActive,
      },
      include: {
        category: true,
        user: {
          include: {
            profile: true,
          },
        },
      },
    });
  }
}