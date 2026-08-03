import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { NeighborsService } from './neighbors.service';
import { CreateNeighborRequestDto } from './dto/create-neighbor-request.dto';

@Controller('neighbors')
export class NeighborsController {
  constructor(
    private neighborsService: NeighborsService,
  ) {}

  @Post('request')
  createRequest(
    @Body() dto: CreateNeighborRequestDto,
  ) {
    return this.neighborsService.createRequest(
      '1946c159-7253-4b6c-822d-cc4ece03b747',
      dto,
    );
  }

  @Get()
  findConnections() {
    return this.neighborsService.findUserConnections(
      '1946c159-7253-4b6c-822d-cc4ece03b747',
    );
  }

  @Get('accepted')
  findAcceptedNeighbors() {
    return this.neighborsService.findAcceptedNeighbors(
      '1946c159-7253-4b6c-822d-cc4ece03b747',
    );
  }

  @Patch(':id/accept')
  acceptRequest(
    @Param('id') id: string,
  ) {
    return this.neighborsService.acceptRequest(id);
  }
}