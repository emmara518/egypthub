import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { Prisma } from '@prisma/client';
import { ErrorResponseDto } from '../dto';

@Catch(Prisma.PrismaClientKnownRequestError)
export class QueryFailedFilter implements ExceptionFilter {
  private readonly logger = new Logger(QueryFailedFilter.name);

  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let errorCode = 'QUERY_FAILED';
    let message = 'Database query failed';

    switch (exception.code) {
      case 'P2002':
        status = HttpStatus.CONFLICT;
        errorCode = 'UNIQUE_CONSTRAINT_VIOLATION';
        message = 'A record with this value already exists';
        break;
      case 'P2025':
        status = HttpStatus.NOT_FOUND;
        errorCode = 'RESOURCE_NOT_FOUND';
        message = 'Record not found';
        break;
      case 'P2003':
        status = HttpStatus.CONFLICT;
        errorCode = 'FOREIGN_KEY_VIOLATION';
        message = 'Referenced record not found';
        break;
      case 'P2014':
        status = HttpStatus.CONFLICT;
        errorCode = 'INVALID_STATE_TRANSITION';
        message = 'Required relation violation';
        break;
      default:
        this.logger.error(`Prisma error ${exception.code}: ${exception.message}`);
    }

    response.status(status).json(
      new ErrorResponseDto(errorCode, message, { prismaCode: exception.code }, request.url),
    );
  }
}
