import { ApiResponseDto, PaginatedResponseDto } from '../../../../src/common/dto';

describe('ApiResponseDto', () => {
  it('should create success response', () => {
    const res = ApiResponseDto.ok({ id: '1' });
    expect(res.success).toBe(true);
    expect(res.data).toEqual({ id: '1' });
    expect(res.timestamp).toBeDefined();
  });

  it('should create error response', () => {
    const res = ApiResponseDto.error('Something went wrong');
    expect(res.success).toBe(false);
    expect(res.message).toBe('Something went wrong');
  });
});

describe('PaginatedResponseDto', () => {
  it('should calculate total pages', () => {
    const res = new PaginatedResponseDto([{ id: '1' }], 25, 1, 10);
    expect(res.totalPages).toBe(3);
    expect(res.page).toBe(1);
    expect(res.limit).toBe(10);
    expect(res.total).toBe(25);
  });
});
