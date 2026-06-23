import { Controller, Get, Post, Body, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { DestinationsService } from './services/destinations.service';
import { CreateDestinationDto } from './dto/create-destination.dto';

@ApiTags('Destinations')
@Controller('destinations')
export class DestinationsController {
  constructor(private readonly service: DestinationsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new destination' })
  create(@Body() dto: CreateDestinationDto) {
    return this.service.create(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get destination by ID' })
  findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }
}
