import { Controller, Get, Post, Put, Param, Body, Query } from '@nestjs/common';
import { BusinessesService } from './businesses.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Businesses')
@Controller()
export class BusinessesController {
  constructor(private readonly service: BusinessesService) {}

  @Get()
  @ApiOperation({ summary: 'جلب كل المنشآت' })
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 20,
    @Query('cityId') cityId?: string,
    @Query('categoryId') categoryId?: string,
    @Query('status') status?: string,
    @Query('featured') featured?: string,
  ) {
    const featuredBool = featured === 'true' ? true : undefined;
    const result = await this.service.findAll(Number(page), Number(limit), { cityId, categoryId, status, featured: featuredBool });
    return { success: true, ...result };
  }

  @Get('slug/:slug')
  @ApiOperation({ summary: 'جلب منشأة بالـ slug' })
  async findBySlug(@Param('slug') slug: string) {
    const data = await this.service.findBySlug(slug);
    return { success: true, data };
  }

  @Get(':id')
  @ApiOperation({ summary: 'جلب منشأة بالـ ID' })
  async findById(@Param('id') id: string) {
    const data = await this.service.findById(id);
    return { success: true, data };
  }

  @Post()
  @ApiOperation({ summary: 'إضافة منشأة جديدة' })
  async create(@Body() body: any) {
    const data = await this.service.create(body);
    return { success: true, data };
  }

  @Put(':id')
  @ApiOperation({ summary: 'تحديث منشأة' })
  async update(@Param('id') id: string, @Body() body: any) {
    const data = await this.service.update(id, body);
    return { success: true, data };
  }
}
