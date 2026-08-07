import { 
  Body, 
  Controller, 
  Get, 
  Patch, 
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import type { Request } from 'express';

import { InteractionsService } from './interactions.service';
import { CreateInteractionDto } from './dto/create-interaction.dto';
import { CompleteInteractionDto } from './dto/complete-interaction.dto';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';


@Controller('interactions')
export class InteractionsController {

  constructor(
    private interactionsService: InteractionsService,
  ) {}


  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Req() req: Request,
    @Body() dto: CreateInteractionDto,
  ) {

    return this.interactionsService.create(
      (req.user as any).userId,
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
