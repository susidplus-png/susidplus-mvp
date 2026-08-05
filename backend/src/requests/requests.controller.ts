import {
  Body,
  Controller,
  Get,
  Post,
  Query,
} from '@nestjs/common';

import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { SearchRequestDto } from './dto/search-request.dto';

@Controller('requests')
export class RequestsController {
  constructor(
    private requestsService: RequestsService,
  ) {}

  @Post()
  create(
    @Body() dto: CreateRequestDto,
  ) {
    return this.requestsService.create(
      '1946c159-7253-4b6c-822d-cc4ece03b747',
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