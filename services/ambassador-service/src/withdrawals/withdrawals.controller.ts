import { Controller, Get, Post, Put, Param, Body, Query } from '@nestjs/common';
import { WithdrawalsService } from './withdrawals.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Withdrawals')
@Controller('withdrawals')
export class WithdrawalsController {
  constructor(private readonly service: WithdrawalsService) {}

  @Post()
  @ApiOperation({ summary: 'طلب سحب جديد' })
  async create(@Body() body: { ambassadorId: string; amount: number; bankAccountAr?: string; phone?: string }) {
    const data = await this.service.create(body);
    return { success: true, data };
  }

  @Get()
  @ApiOperation({ summary: 'جلب كل طلبات السحب' })
  async findAll(@Query('page') page = 1, @Query('limit') limit = 20) {
    const result = await this.service.findAll(Number(page), Number(limit));
    return { success: true, ...result };
  }

  @Get('ambassador/:ambassadorId')
  @ApiOperation({ summary: 'جلب طلبات سحب سفير' })
  async findByAmbassador(@Param('ambassadorId') ambassadorId: string) {
    const data = await this.service.findByAmbassador(ambassadorId);
    return { success: true, data };
  }

  @Put(':id/status')
  @ApiOperation({ summary: 'تحديث حالة طلب سحب' })
  async updateStatus(@Param('id') id: string, @Body() body: { status: string; adminNotes?: string }) {
    const data = await this.service.updateStatus(id, body.status, body.adminNotes);
    return { success: true, data };
  }
}
