import { Controller, Get, Post, Body, Param, Patch, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { StoriesService } from './services/stories.service';
import { CreateStoryDto } from '../dto/create-story.dto';
import { UpdateStoryDto } from '../dto/update-story.dto';
import { Roles } from '../../../common/auth/decorators/roles.decorator';
import { Role } from '../../../common/auth/enums/role.enum';
import { Public } from '../../../common/auth/decorators/public.decorator';

@ApiTags('Stories')
@Controller('stories')
export class StoriesController {
  constructor(private readonly service: StoriesService) {}

  @Post()
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiOperation({ summary: 'Create a new story' })
  create(@Body() dto: CreateStoryDto) {
    return this.service.create(dto);
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'List stories' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'Get story by ID' })
  findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }

  @Get('slug/:slug')
  @Public()
  @ApiOperation({ summary: 'Get story by slug' })
  findBySlug(@Param('slug') slug: string) {
    return this.service.findBySlug(slug);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiOperation({ summary: 'Update story' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateStoryDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Soft-delete story' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.remove(id);
  }
}
