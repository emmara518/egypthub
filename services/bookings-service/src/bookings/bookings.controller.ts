import { Controller, Get, Post, Put, Param, Body, Query } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Bookings')
@Controller()
export class BookingsController {
  constructor(private readonly service: BookingsService) {}

  @Post()
  @ApiOperation({ summary: 'إنشاء حجز جديد' })
  async create(@Body() body: any) {
    const data = await this.service.create(body);
    return { success: true, data };
  }

  @Get()
  @ApiOperation({ summary: 'جلب كل الحجوزات' })
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 20,
    @Query('userId') userId?: string,
    @Query('businessId') businessId?: string,
    @Query('ambassadorId') ambassadorId?: string,
    @Query('status') status?: string,
  ) {
    const result = await this.service.findAll(Number(page), Number(limit), { userId, businessId, ambassadorId, status });
    return { success: true, ...result };
  }

  @Get('code/:code')
  @ApiOperation({ summary: 'جلب حجز بكود الحجز' })
  async findByCode(@Param('code') code: string) {
    const data = await this.service.findByCode(code);
    return { success: true, data };
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'جلب حجوزات مستخدم' })
  async getByUser(@Param('userId') userId: string) {
    const data = await this.service.getByUser(userId);
    return { success: true, data };
  }

  @Get('ambassador/:ambassadorId')
  @ApiOperation({ summary: 'جلب حجوزات سفير' })
  async getByAmbassador(@Param('ambassadorId') ambassadorId: string) {
    const data = await this.service.getByAmbassador(ambassadorId);
    return { success: true, data };
  }

  @Get(':id')
  @ApiOperation({ summary: 'جلب حجز بالـ ID' })
  async findById(@Param('id') id: string) {
    const data = await this.service.findById(id);
    return { success: true, data };
  }

  @Put(':id/status')
  @ApiOperation({ summary: 'تحديث حالة الحجز' })
  async updateStatus(@Param('id') id: string, @Body('status') status: any) {
    const data = await this.service.updateStatus(id, status);
    return { success: true, data };
  }
}
