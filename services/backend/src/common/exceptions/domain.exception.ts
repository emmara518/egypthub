import { HttpException, HttpStatus } from '@nestjs/common';
import type { ErrorCode } from '../constants/error-codes';

export class DomainException extends HttpException {
  public readonly errorCode: ErrorCode;
  public readonly details?: Record<string, unknown>;

  constructor(
    errorCode: ErrorCode,
    message: string,
    status: HttpStatus = HttpStatus.UNPROCESSABLE_ENTITY,
    details?: Record<string, unknown>,
  ) {
    super({ errorCode, message, details, statusCode: status }, status);
    this.errorCode = errorCode;
    this.details = details;
  }
}

export class ResourceNotFoundException extends DomainException {
  constructor(resource: string, id: string) {
    super('RESOURCE_NOT_FOUND', `${resource} with id '${id}' not found`, HttpStatus.NOT_FOUND, {
      resource,
      id,
    });
  }
}

export class ResourceConflictException extends DomainException {
  constructor(resource: string, details?: Record<string, unknown>) {
    super('RESOURCE_CONFLICT', `${resource} conflict`, HttpStatus.CONFLICT, details);
  }
}

export class InvalidStateTransitionException extends DomainException {
  constructor(entity: string, from: string, to: string) {
    super(
      'INVALID_STATE_TRANSITION',
      `Cannot transition ${entity} from '${from}' to '${to}'`,
      HttpStatus.UNPROCESSABLE_ENTITY,
      { entity, from, to },
    );
  }
}

export class ForbiddenResourceException extends DomainException {
  constructor(resource: string, action: string) {
    super('RESOURCE_FORBIDDEN', `Forbidden: ${action} on ${resource}`, HttpStatus.FORBIDDEN, {
      resource,
      action,
    });
  }
}

export class BusinessRuleViolationException extends DomainException {
  constructor(rule: string, details?: Record<string, unknown>) {
    super('BUSINESS_RULE_VIOLATION', `Business rule violated: ${rule}`, HttpStatus.UNPROCESSABLE_ENTITY, {
      rule,
      ...details,
    });
  }
}

export class DuplicateOperationException extends DomainException {
  constructor(idempotencyKey: string) {
    super('DUPLICATE_OPERATION', `Duplicate operation for key: ${idempotencyKey}`, HttpStatus.CONFLICT, {
      idempotencyKey,
    });
  }
}
