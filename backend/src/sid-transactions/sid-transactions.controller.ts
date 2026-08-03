import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { SidTransactionsService } from './sid-transactions.service';

@Controller('sid-transactions')
export class SidTransactionsController {
  constructor(
    private readonly sidTransactionsService: SidTransactionsService,
  ) {}

  @Post()
  create(@Body() dto: any) {
    return this.sidTransactionsService.create(dto);
  }

  @Get()
  findAll() {
    return this.sidTransactionsService.findAll();
  }

  @Get('balance/:userId')
  getBalance(
    @Param('userId') userId: string,
  ) {
    return this.sidTransactionsService.getBalance(userId);
  }
}