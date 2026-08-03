import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ReviewsService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async create(
    authorId: string,
    dto: CreateReviewDto,
  ) {
    try {
      const review = await this.prisma.review.create({
        data: {
          authorId,
          receiverId: dto.receiverId,
          interactionId: dto.interactionId,
          rating: dto.rating,
          comment: dto.comment,
        },
        include: {
          author: {
            include: {
              profile: true,
            },
          },
          receiver: {
            include: {
              profile: true,
            },
          },
          interaction: true,
        },
      });

      return review;

    } catch (error) {

      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(
          'Ви вже залишили відгук за цю взаємодію',
        );
      }

      throw error;
    }
  }


  async findAll() {
    return this.prisma.review.findMany({
      include: {
        author: {
          include: {
            profile: true,
          },
        },
        receiver: {
          include: {
            profile: true,
          },
        },
        interaction: true,
      },
    });
  }


  async findOne(id: string) {
    return this.prisma.review.findUnique({
      where: {
        id,
      },
      include: {
        author: {
          include: {
            profile: true,
          },
        },
        receiver: {
          include: {
            profile: true,
          },
        },
        interaction: true,
      },
    });
  }
}