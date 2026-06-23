import { Injectable } from '@nestjs/common';

export interface UploadedFile {
  url: string;
  thumbnailUrl?: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
}

@Injectable()
export class FileStorageService {
  async upload(
    buffer: Buffer,
    originalName: string,
    mimeType: string,
  ): Promise<UploadedFile> {
    const filename = `${Date.now()}-${originalName.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    return {
      url: `/uploads/${filename}`,
      filename,
      originalName,
      mimeType,
      size: buffer.length,
    };
  }

  async delete(url: string): Promise<void> {
    // no-op for in-memory/local dev; replace with S3/MinIO in production
  }
}
