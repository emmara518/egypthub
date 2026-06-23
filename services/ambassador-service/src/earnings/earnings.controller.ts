import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { EarningsService } from './earnings.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Earnings')
@Controller('earnings')
export class EarningsController {
  constructor(private readonly service: EarningsService) {}

  @Post()
  @ApiOperation({ summary: 'إضافة ربح جديد' })
  async add(@Body() body: { ambassadorId: string; bookingId?: string; amount: number; descriptionAr?: string }) {
    const data = await this.service.add(body);
    return { success: true, data };
  }

  @Get('ambassador/:ambassadorId')
  @ApiOperation({ summary: 'جلب أرباح سفير' })
  async getByAmbassador(@Param('ambassadorId') ambassadorId: string) {
    const data = await this.service.getByAmbassador(ambassadorId);
    const total = await this.service.getTotalEarnings(ambassadorId);
    return { success: true, data, total };
  }
}
