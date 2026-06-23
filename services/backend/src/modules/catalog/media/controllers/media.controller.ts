import { Controller, Post, UseInterceptors, UploadedFile, Param, Get, Delete, ParseUUIDPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { MediaService } from './media.service';
import { Roles } from '../../common/auth/decorators/roles.decorator';
import { Role } from '../../common/auth/enums/role.enum';

@ApiTags('Media')
@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('upload')
  @Roles(Role.ADMIN, Role.MANAGER, Role.MARKETING)
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload a file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ schema: { type: 'object', properties: { file: { type: 'string', format: 'binary' } } } })
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('entityType') entityType: string,
    @Param('entityId', ParseUUIDPipe) entityId: string,
    @Param('isThumbnail') isThumbnail: boolean = false,
  ) {
    return this.mediaService.uploadFile(
      Buffer.from(file.buffer),
      file.originalname,
      file.mimetype,
      entityType,
      entityId,
      undefined,
      isThumbnail,
    );
  }

  @Get(':entityType/:entityId')
  @ApiOperation({ summary: 'Get files for an entity' })
  getFiles(@Param('entityType') entityType: string, @Param('entityId') entityId: string) {
    return this.mediaService.getFiles(entityType, entityId);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiOperation({ summary: 'Delete a file' })
  deleteFile(@Param('id', ParseUUIDPipe) id: string) {
    return this.mediaService.deleteFile(id);
  }
}
