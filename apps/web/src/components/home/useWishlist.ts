'use client';

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'egypthub_wishlist';

export function useWishlist() {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setItems(JSON.parse(stored));
  }, []);

  const toggle = useCallback((title: string) => {
    setItems(prev => {
      const next = prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isSaved = useCallback((title: string) => items.includes(title), [items]);

  return { items, toggle, isSaved, count: items.length };
}
