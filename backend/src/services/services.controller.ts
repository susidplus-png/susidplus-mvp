import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';


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
  findAll() {
    return this.servicesService.findAll();
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