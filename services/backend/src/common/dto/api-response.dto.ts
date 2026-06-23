import { ApiProperty } from '@nestjs/swagger';

export class ApiResponseDto<T = unknown> {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  message: string;

  @ApiProperty()
  timestamp: string;

  data?: T;
  meta?: Record<string, unknown>;

  constructor(success: boolean, message: string, data?: T, meta?: Record<string, unknown>) {
    this.success = success;
    this.message = message;
    this.timestamp = new Date().toISOString();
    this.data = data;
    this.meta = meta;
  }

  static ok<T>(data?: T, meta?: Record<string, unknown>): ApiResponseDto<T> {
    return new ApiResponseDto<T>(true, 'Success', data, meta);
  }

  static error(message: string, meta?: Record<string, unknown>): ApiResponseDto<never> {
    return new ApiResponseDto<never>(false, message, undefined, meta);
  }
}

export class PaginatedResponseDto<T = unknown> extends ApiResponseDto<T[]> {
  @ApiProperty()
  total: number;

  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;

  @ApiProperty()
  totalPages: number;

  constructor(data: T[], total: number, page: number, limit: number) {
    const totalPages = Math.ceil(total / limit);
    super(true, 'Success', data, { total, page, limit, totalPages });
    this.total = total;
    this.page = page;
    this.limit = limit;
    this.totalPages = totalPages;
  }
}
