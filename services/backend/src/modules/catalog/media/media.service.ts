import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { FileStorageService, UploadedFile } from '../shared/file-storage.service';

@Injectable()
export class MediaService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fileStorage: FileStorageService,
  ) {}

  async uploadFile(
    buffer: Buffer,
    originalName: string,
    mimeType: string,
    entityType: string,
    entityId?: string,
    userId?: string,
    isThumbnail = false,
  ): Promise<UploadedFile> {
    const file = await this.fileStorage.upload(buffer, originalName, mimeType);
    await this.prisma.$executeRaw`
      INSERT INTO catalog.media (
        user_id, filename, original_name, mime_type, size, url, thumbnail_url,
        entity_type, entity_id, sort_order, status
      ) VALUES (
        ${userId ?? null}, ${file.filename}, ${file.originalName}, ${file.mimeType},
        ${file.size}, ${file.url}, ${isThumbnail ? file.thumbnailUrl : null},
        ${entityType}, ${entityId ?? null}, 0, 'active'
      )
    `;
    return file;
  }

  async getFiles(entityType: string, entityId: string): Promise<any[]> {
    const rows = await this.prisma.$queryRaw<any[]>`
      SELECT * FROM catalog.media WHERE entity_type = ${entityType} AND entity_id = ${entityId}
    `;
    return rows;
  }

  async deleteFile(id: string, userId?: string): Promise<boolean> {
    const result = await this.prisma.$executeRaw`
      DELETE FROM catalog.media WHERE media_id = ${id} AND (user_id = ${userId ?? null} OR ${userId ?? null} IS NULL)
    `;
    return result > 0;
  }
}
