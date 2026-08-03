import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { InteractionsService } from './interactions.service';
import { CreateInteractionDto } from './dto/create-interaction.dto';
import { CompleteInteractionDto } from './dto/complete-interaction.dto';

@Controller('interactions')
export class InteractionsController {
  constructor(
    private interactionsService: InteractionsService,
  ) {}

  @Post()
  create(
    @Body() dto: CreateInteractionDto,
  ) {
    return this.interactionsService.create(
      'c2888f9c-7cd1-43d9-adea-ca27a0561580',
      dto,
    );
  }

  @Get()
  findAll() {
    return this.interactionsService.findAll();
  }

  @Patch('complete')
  complete(
    @Body() dto: CompleteInteractionDto,
  ) {
    return this.interactionsService.complete(dto);
  }
}