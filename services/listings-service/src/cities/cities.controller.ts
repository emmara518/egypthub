import { Controller, Get, Param } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Cities')
@Controller('cities')
export class CitiesController {
  constructor(private readonly service: CitiesService) {}

  @Get()
  @ApiOperation({ summary: 'جلب كل المدن النشطة' })
  async findAll() {
    const data = await this.service.findAll();
    return { success: true, data };
  }

  @Get(':slug')
  @ApiOperation({ summary: 'جلب مدينة بالـ slug' })
  async findBySlug(@Param('slug') slug: string) {
    const data = await this.service.findBySlug(slug);
    return { success: true, data };
  }
}
