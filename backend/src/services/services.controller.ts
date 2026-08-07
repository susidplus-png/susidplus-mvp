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
    private readonly servicesService: ServicesService,
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

  @Get()
  findAll(
    @Query() search: SearchServiceDto,
  ) {
    return this.servicesService.findAll(search);
  }

  @Get('user/:userId')
  findByUser(
    @Param('userId') userId: string,
  ) {
    return this.servicesService.findByUser(userId);
  }

  @Patch(':id/status/:isActive')
  updateStatus(
    @Param('id') id: string,
    @Param('isActive') isActive: string,
  ) {
    return this.servicesService.updateStatus(
      id,
      isActive === 'true',
    );
  }
}