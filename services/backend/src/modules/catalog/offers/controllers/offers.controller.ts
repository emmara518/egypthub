import { Controller, Get, Post, Body, Param, Patch, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { OffersService } from './services/offers.service';
import { CreateOfferDto } from '../dto/create-offer.dto';
import { UpdateOfferDto } from '../dto/update-offer.dto';
import { Roles } from '../../../common/auth/decorators/roles.decorator';
import { Role } from '../../../common/auth/enums/role.enum';
import { Public } from '../../../common/auth/decorators/public.decorator';

@ApiTags('Offers')
@Controller('offers')
export class OffersController {
  constructor(private readonly service: OffersService) {}

  @Post()
  @Roles(Role.ADMIN, Role.MARKETING)
  @ApiOperation({ summary: 'Create a new offer' })
  create(@Body() dto: CreateOfferDto) {
    return this.service.create(dto);
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'List offers' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'Get offer by ID' })
  findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }

  @Get('slug/:slug')
  @Public()
  @ApiOperation({ summary: 'Get offer by slug' })
  findBySlug(@Param('slug') slug: string) {
    return this.service.findBySlug(slug);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.MARKETING)
  @ApiOperation({ summary: 'Update offer' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateOfferDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Soft-delete offer' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.remove(id);
  }
}
