import {
  ResourceNotFoundException,
  ResourceConflictException,
  InvalidStateTransitionException,
  ForbiddenResourceException,
} from '../../../../src/common/exceptions';

describe('Domain Exceptions', () => {
  it('ResourceNotFoundException', () => {
    const ex = new ResourceNotFoundException('User', 'abc');
    expect(ex.getStatus()).toBe(404);
    expect(ex.errorCode).toBe('RESOURCE_NOT_FOUND');
  });

  it('ResourceConflictException', () => {
    const ex = new ResourceConflictException('Email');
    expect(ex.getStatus()).toBe(409);
    expect(ex.errorCode).toBe('RESOURCE_CONFLICT');
  });

  it('InvalidStateTransitionException', () => {
    const ex = new InvalidStateTransitionException('Booking', 'pending', 'confirmed');
    expect(ex.getStatus()).toBe(422);
    expect(ex.details).toEqual({ entity: 'Booking', from: 'pending', to: 'confirmed' });
  });

  it('ForbiddenResourceException', () => {
    const ex = new ForbiddenResourceException('booking', 'delete');
    expect(ex.getStatus()).toBe(403);
  });
});
