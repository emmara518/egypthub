import { createSlug, createUniqueSlug } from '../../../../src/common/utils/slug.utils';

describe('SlugUtils', () => {
  describe('createSlug', () => {
    it('should create slug from simple text', () => {
      expect(createSlug('Hello World')).toBe('hello-world');
    });

    it('should remove special characters', () => {
      expect(createSlug('Café & Restaurant!')).toBe('caf-restaurant');
    });

    it('should collapse multiple spaces', () => {
      expect(createSlug('  Sharm   El  Sheikh  ')).toBe('sharm-el-sheikh');
    });
  });

  describe('createUniqueSlug', () => {
    it('should append suffix', () => {
      const result = createUniqueSlug('Test Destination', 'abc123');
      expect(result).toBe('test-destination-abc123');
    });
  });
});
