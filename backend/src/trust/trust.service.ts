import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TrustService {

  constructor(
    private prisma: PrismaService,
  ) {}

  async create(
    userId: string,
    points: number,
    reason: string,
    type: string,
  ) {

    return this.prisma.trustEvent.create({
      data: {
        userId,
        points,
        reason,
        type,
      },
    });

  }

}
