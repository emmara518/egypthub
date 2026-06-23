import { describe, it, expect } from 'vitest';
import { destinations, experiences, regions } from '@/lib/mock-data';

describe('destinations mock data', () => {
  it('has at least 6 destinations', () => {
    expect(destinations.length).toBeGreaterThanOrEqual(6);
  });

  it('every destination has required fields', () => {
    for (const d of destinations) {
      expect(d.slug).toBeTruthy();
      expect(d.name).toBeTruthy();
      expect(d.image).toBeTruthy();
      expect(d.heroImage).toBeTruthy();
      expect(typeof d.rating).toBe('number');
      expect(d.rating).toBeGreaterThan(0);
      expect(d.rating).toBeLessThanOrEqual(5);
      expect(Array.isArray(d.highlights)).toBe(true);
      expect(d.highlights.length).toBeGreaterThan(0);
      expect(Array.isArray(d.categories)).toBe(true);
      expect(d.categories.length).toBeGreaterThan(0);
    }
  });

  it('all destination slugs are unique', () => {
    const slugs = destinations.map((d) => d.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('all destinations have valid image URLs', () => {
    for (const d of destinations) {
      expect(d.image).toMatch(/^https:\/\/images\.unsplash\.com/);
      expect(d.heroImage).toMatch(/^https:\/\/images\.unsplash\.com/);
    }
  });
});

describe('experiences mock data', () => {
  it('has at least 3 experiences', () => {
    expect(experiences.length).toBeGreaterThanOrEqual(3);
  });

  it('every experience has required fields', () => {
    for (const e of experiences) {
      expect(e.slug).toBeTruthy();
      expect(e.name).toBeTruthy();
      expect(e.description).toBeTruthy();
      expect(e.longDescription).toBeTruthy();
      expect(typeof e.rating).toBe('number');
      expect(e.rating).toBeGreaterThan(0);
      expect(e.rating).toBeLessThanOrEqual(5);
      expect(e.price).toBeGreaterThan(0);
      expect(Array.isArray(e.gallery)).toBe(true);
      expect(e.gallery.length).toBeGreaterThan(0);
      expect(Array.isArray(e.highlights)).toBe(true);
      expect(e.highlights.length).toBeGreaterThan(0);
      expect(Array.isArray(e.includes)).toBe(true);
      expect(Array.isArray(e.excludes)).toBe(true);
      expect(Array.isArray(e.itinerary)).toBe(true);
      expect(e.itinerary.length).toBeGreaterThan(0);
      expect(e.host).toBeTruthy();
      expect(e.host.name).toBeTruthy();
      expect(e.host.avatar).toBeTruthy();
      expect(e.host.bio).toBeTruthy();
    }
  });

  it('all experience slugs are unique', () => {
    const slugs = experiences.map((e) => e.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('all experience prices are positive numbers', () => {
    for (const e of experiences) {
      expect(e.price).toBeGreaterThan(0);
      expect(typeof e.price).toBe('number');
    }
  });

  it('all experiences have valid gallery images', () => {
    for (const e of experiences) {
      for (const img of e.gallery) {
        expect(img).toMatch(/^https:\/\/images\.unsplash\.com/);
      }
    }
  });

  it('every experience has at least one itinerary item', () => {
    for (const e of experiences) {
      expect(e.itinerary.length).toBeGreaterThanOrEqual(1);
      for (const item of e.itinerary) {
        expect(item.day).toBeTruthy();
        expect(item.title).toBeTruthy();
        expect(item.description).toBeTruthy();
      }
    }
  });
});

describe('regions mock data', () => {
  it('includes "all" region for unfiltered view', () => {
    expect(regions.find((r) => r.slug === 'all')).toBeTruthy();
  });

  it('has at least 4 regions', () => {
    expect(regions.length).toBeGreaterThanOrEqual(4);
  });
});
