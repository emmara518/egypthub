import { Controller, Get, Post, Body, Param, Patch, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ExperiencesService } from './services/experiences.service';
import { CreateExperienceDto } from '../dto/create-experience.dto';
import { UpdateExperienceDto } from '../dto/update-experience.dto';
import { ExperienceFilterDto } from '../dto/experience-filter.dto';
import { Roles } from '../../../common/auth/decorators/roles.decorator';
import { Role } from '../../../common/auth/enums/role.enum';
import { Public } from '../../../common/auth/decorators/public.decorator';

@ApiTags('Experiences')
@Controller('experiences')
export class ExperiencesController {
  constructor(private readonly service: ExperiencesService) {}

  @Post()
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiOperation({ summary: 'Create a new experience' })
  create(@Body() dto: CreateExperienceDto) {
    return this.service.create(dto);
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'List experiences with optional filters' })
  findAll(@Query() filter?: ExperienceFilterDto) {
    return this.service.findAll(filter);
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'Get experience by ID' })
  findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }

  @Get('slug/:slug')
  @Public()
  @ApiOperation({ summary: 'Get experience by slug' })
  findBySlug(@Param('slug') slug: string) {
    return this.service.findBySlug(slug);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiOperation({ summary: 'Update experience' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateExperienceDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Soft-delete experience' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.remove(id);
  }
}
