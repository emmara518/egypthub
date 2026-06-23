import { Controller, Get, Post, Body, Param, Patch, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PartnersService } from './services/partners.service';
import { CreatePartnerDto } from '../dto/create-partner.dto';
import { UpdatePartnerDto } from '../dto/update-partner.dto';
import { Roles } from '../../../common/auth/decorators/roles.decorator';
import { Role } from '../../../common/auth/enums/role.enum';
import { Public } from '../../../common/auth/decorators/public.decorator';

@ApiTags('Partners')
@Controller('partners')
export class PartnersController {
  constructor(private readonly service: PartnersService) {}

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Create a new partner' })
  create(@Body() dto: CreatePartnerDto) {
    return this.service.create(dto);
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'List active partners' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'Get partner by ID' })
  findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }

  @Get('slug/:slug')
  @Public()
  @ApiOperation({ summary: 'Get partner by slug' })
  findBySlug(@Param('slug') slug: string) {
    return this.service.findBySlug(slug);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Update partner' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdatePartnerDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete partner' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.remove(id);
  }
}
