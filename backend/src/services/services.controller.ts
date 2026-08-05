import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { SearchServiceDto } from './dto/search-service.dto';

@Controller('services')
export class ServicesController {
  constructor(
    private servicesService: ServicesService,
  ) {}

  @Post(':userId')
  create(
    @Param('userId') userId: string,
    @Body() dto: CreateServiceDto,
  ) {
    return this.servicesService.create(
      userId,
      dto,
    );
  }

  @Get('user/:userId')
  findByUser(
    @Param('userId') userId: string,
  ) {
    return this.servicesService.findByUser(
      userId,
    );
  }

  @Get()
  findAll(
    @Query() search: SearchServiceDto,
  ) {
    return this.servicesService.findAll(
      search,
    );
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body('isActive') isActive: boolean,
  ) {
    return this.servicesService.updateStatus(
      id,
      isActive,
    );
  }
}