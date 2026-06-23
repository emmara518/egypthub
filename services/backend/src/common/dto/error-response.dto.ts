import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  errorCode: string;

  @ApiProperty()
  message: string;

  @ApiProperty()
  timestamp: string;

  @ApiProperty({ required: false })
  details?: Record<string, unknown>;

  @ApiProperty({ required: false })
  path?: string;

  constructor(
    errorCode: string,
    message: string,
    details?: Record<string, unknown>,
    path?: string,
  ) {
    this.success = false;
    this.errorCode = errorCode;
    this.message = message;
    this.timestamp = new Date().toISOString();
    this.details = details;
    this.path = path;
  }
}
