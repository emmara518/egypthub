import { Controller, Get, Post, Param, Body, Query } from '@nestjs/common';
import { AmbassadorsService } from './ambassadors.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Ambassadors')
@Controller()
export class AmbassadorsController {
  constructor(private readonly service: AmbassadorsService) {}

  @Post('register')
  @ApiOperation({ summary: 'تسجيل سفير جديد' })
  async register(@Body() body: { userId: string; bioAr?: string; cityId?: string }) {
    const data = await this.service.register(body.userId, body.bioAr, body.cityId);
    return { success: true, data };
  }

  @Get()
  @ApiOperation({ summary: 'جلب كل السفراء' })
  async findAll(@Query('page') page = 1, @Query('limit') limit = 20) {
    const result = await this.service.findAll(Number(page), Number(limit));
    return { success: true, ...result };
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'جلب سفير بالـ userId' })
  async findByUserId(@Param('userId') userId: string) {
    const data = await this.service.findByUserId(userId);
    return { success: true, data };
  }

  @Get('referral/:code')
  @ApiOperation({ summary: 'جلب سفير بكود الإحالة' })
  async findByReferralCode(@Param('code') code: string) {
    const data = await this.service.findByReferralCode(code);
    return { success: true, data };
  }

  @Get(':id')
  @ApiOperation({ summary: 'جلب سفير بالـ ID' })
  async findById(@Param('id') id: string) {
    const data = await this.service.findById(id);
    return { success: true, data };
  }

  @Post(':id/approve')
  @ApiOperation({ summary: 'اعتماد سفير' })
  async approve(@Param('id') id: string) {
    const data = await this.service.approve(id);
    return { success: true, data };
  }
}
