import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';

import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { SearchRequestDto } from './dto/search-request.dto';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';


@Controller('requests')
export class RequestsController {

  constructor(
    private requestsService: RequestsService,
  ) {}


  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Req() req,
    @Body() dto: CreateRequestDto,
  ) {

    return this.requestsService.create(
      req.user.userId,
      dto,
    );
  }


  @Get()
  findAll(
    @Query() query: SearchRequestDto,
  ) {

    return this.requestsService.findAll(
      query,
    );
  }

}
