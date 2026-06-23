import { Controller, Get, Post, Param, Body, Query } from '@nestjs/common';
import { OffersService } from './offers.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Offers')
@Controller('offers')
export class OffersController {
  constructor(private readonly service: OffersService) {}

  @Get()
  @ApiOperation({ summary: 'جلب كل العروض النشطة' })
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 20,
    @Query('businessId') businessId?: string,
  ) {
    const result = await this.service.findAll(Number(page), Number(limit), businessId);
    return { success: true, ...result };
  }

  @Get(':id')
  @ApiOperation({ summary: 'جلب عرض بالـ ID' })
  async findById(@Param('id') id: string) {
    const data = await this.service.findById(id);
    return { success: true, data };
  }

  @Post()
  @ApiOperation({ summary: 'إضافة عرض جديد' })
  async create(@Body() body: any) {
    const data = await this.service.create(body);
    return { success: true, data };
  }
}
