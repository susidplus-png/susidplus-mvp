import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateServiceDto } from './dto/create-service.dto';

@Injectable()
export class ServicesService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async create(
    userId: string,
    dto: CreateServiceDto,
  ) {
    return this.prisma.service.create({
      data: {
        userId,
        title: dto.title,
        description: dto.description,
        priceFrom: dto.priceFrom,
        priceTo: dto.priceTo,
        currency: dto.currency ?? 'UAH',
        categoryId: dto.categoryId,
      },
    });
  }


  async findByUser(
    userId: string,
  ) {
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


  async findAll() {
    return this.prisma.service.findMany({
      include: {
        user: {
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
  }


  async updateStatus(
    id: string,
    isActive: boolean,
  ) {
    return this.prisma.service.update({
      where: {
        id,
      },
      data: {
        isActive,
      },
    });
  }
}