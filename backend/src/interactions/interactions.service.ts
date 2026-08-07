import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInteractionDto } from './dto/create-interaction.dto';
import { CompleteInteractionDto } from './dto/complete-interaction.dto';
import { SidTransactionsService } from '../sid-transactions/sid-transactions.service';
import { TrustService } from '../trust/trust.service';

@Injectable()
export class InteractionsService {

  constructor(
    private prisma: PrismaService,
    private sidTransactionsService: SidTransactionsService,
    private trustService: TrustService,
  ) {}

  async create(
    helperId: string,
    dto: CreateInteractionDto,
  ) {
    return this.prisma.interaction.create({
      data: {
        requestId: dto.requestId,
        helperId,
        status: 'STARTED',
      },
      include: {
        request: {
          include: {
            creator: {
              include: {
                profile: true,
              },
            },
          },
        },
        helper: {
          include: {
            profile: true,
          },
        },
      },
    });
  }


  async findAll() {
    return this.prisma.interaction.findMany({
      include: {
        request: true,
        helper: {
          include: {
            profile: true,
          },
        },
        sidTransactions: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }


  async complete(
    dto: CompleteInteractionDto,
  ) {

    const interaction =
      await this.prisma.interaction.findUnique({
        where: {
          id: dto.interactionId,
        },
      });


    if (!interaction) {
      throw new Error('Interaction not found');
    }


    const existingSid =
      await this.prisma.sIDTransaction.findFirst({
        where: {
          interactionId: interaction.id,
          type: 'HELP_COMPLETED',
        },
      });


    if (!existingSid) {

      await this.sidTransactionsService.create({
        userId: interaction.helperId,
        interactionId: interaction.id,
        amount: 15,
        reason: 'опомога сусіду виконана',
        type: 'HELP_COMPLETED',
      });


      await this.trustService.create(
        interaction.helperId,
        10,
        'опомога сусіду виконана',
        'HELP_COMPLETED',
      );

    }


    await this.prisma.request.update({
      where: {
        id: interaction.requestId,
      },
      data: {
        status: 'COMPLETED',
      },
    });


    return this.prisma.interaction.update({
      where: {
        id: dto.interactionId,
      },
      data: {
        status: 'COMPLETED',
      },
      include: {
        request: true,
        helper: {
          include: {
            profile: true,
          },
        },
        sidTransactions: true,
      },
    });

  }
}
