import { Body, Controller, Get, Post } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/create-request.dto';

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
  findAll() {
    return this.requestsService.findAll();
  }
}