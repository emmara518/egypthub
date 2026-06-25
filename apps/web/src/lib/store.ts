'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface TravelDna {
  travelerType: string;
  interests: string[];
  budget: string;
  pace: string;
  tripDuration: string;
  completed: boolean;
}

export interface PassportEntry {
  city: string;
  visited: boolean;
  date: string;
  stamps: number;
}

export interface Achievement {
  id: string;
  name: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface ExplorerLevel {
  level: number;
  title: string;
  xp: number;
  xpToNext: number;
}

export interface GamificationState {
  xp: number;
  level: number;
  title: string;
  passport: PassportEntry[];
  achievements: Achievement[];
  stamps: string[];
  completedChallenges: string[];
  badgeIds: string[];
}

export interface AppStore {
  travelDna: TravelDna;
  setTravelDna: (dna: Partial<TravelDna>) => void;
  resetTravelDna: () => void;

  collections: Record<string, string[]>;
  addToCollection: (name: string, itemId: string) => void;
  removeFromCollection: (name: string, itemId: string) => void;

  continuePlanning: Record<string, any>;
  saveDraft: (key: string, data: any) => void;
  clearDraft: (key: string) => void;

  notifications: { id: string; message: string; read: boolean; date: string }[];
  addNotification: (msg: string) => void;
  markRead: (id: string) => void;

  gamification: GamificationState;
  addXp: (amount: number) => void;
  visitCity: (city: string) => void;
  unlockAchievement: (id: string) => void;
  completeChallenge: (id: string) => void;

  aiMemory: Record<string, any>;
  setAiMemory: (key: string, value: any) => void;

  funnelEvents: { name: string; page: string; timestamp: number }[];
  trackEvent: (name: string, page: string) => void;
}

const defaultTravelDna: TravelDna = {
  travelerType: '',
  interests: [],
  budget: '',
  pace: '',
  tripDuration: '',
  completed: false,
};

const defaultGamification: GamificationState = {
  xp: 0,
  level: 1,
  title: 'مستكشف جديد',
  passport: [],
  achievements: [],
  stamps: [],
  completedChallenges: [],
  badgeIds: [],
};

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      travelDna: { ...defaultTravelDna },
      setTravelDna: (dna) =>
        set((s) => ({ travelDna: { ...s.travelDna, ...dna } })),
      resetTravelDna: () => set({ travelDna: { ...defaultTravelDna } }),

      collections: {},
      addToCollection: (name, itemId) =>
        set((s) => ({
          collections: {
            ...s.collections,
            [name]: [...(s.collections[name] || []), itemId],
          },
        })),
      removeFromCollection: (name, itemId) =>
        set((s) => ({
          collections: {
            ...s.collections,
            [name]: (s.collections[name] || []).filter((id) => id !== itemId),
          },
        })),

      continuePlanning: {},
      saveDraft: (key, data) =>
        set((s) => ({
          continuePlanning: { ...s.continuePlanning, [key]: { ...data, savedAt: new Date().toISOString() } },
        })),
      clearDraft: (key) =>
        set((s) => {
          const { [key]: _, ...rest } = s.continuePlanning;
          return { continuePlanning: rest };
        }),

      notifications: [],
      addNotification: (msg) =>
        set((s) => ({
          notifications: [
            { id: Date.now().toString(), message: msg, read: false, date: new Date().toISOString() },
            ...s.notifications,
          ],
        })),
      markRead: (id) =>
        set((s) => ({
          notifications: s.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        })),

      gamification: { ...defaultGamification },
      addXp: (amount) =>
        set((s) => {
          const newXp = s.gamification.xp + amount;
          const levels = [
            { level: 1, xpNeeded: 100, title: 'مستكشف جديد' },
            { level: 2, xpNeeded: 300, title: 'رحالة' },
            { level: 3, xpNeeded: 700, title: 'مغامر' },
            { level: 4, xpNeeded: 1500, title: 'مستكشف محترف' },
            { level: 5, xpNeeded: 3000, title: 'سفير مصر' },
            { level: 6, xpNeeded: 6000, title: 'أسطورة السياحة' },
          ];
          let currentLevel = s.gamification.level;
          let currentTitle = s.gamification.title;
          for (const l of levels) {
            if (newXp >= l.xpNeeded && l.level > currentLevel) {
              currentLevel = l.level;
              currentTitle = l.title;
            }
          }
          return {
            gamification: {
              ...s.gamification,
              xp: newXp,
              level: currentLevel,
              title: currentTitle,
            },
          };
        }),
      visitCity: (city) =>
        set((s) => {
          const exists = s.gamification.passport.find((p) => p.city === city);
          const newStamps = exists
            ? s.gamification.stamps
            : [...s.gamification.stamps, city + '-' + Date.now()];
          const newPassport = exists
            ? s.gamification.passport.map((p) =>
                p.city === city
                  ? { ...p, visited: true, stamps: p.stamps + 1, date: new Date().toISOString() }
                  : p
              )
            : [
                ...s.gamification.passport,
                { city, visited: true, date: new Date().toISOString(), stamps: 1 },
              ];
          return {
            gamification: {
              ...s.gamification,
              passport: newPassport,
              stamps: newStamps,
            },
          };
        }),
      unlockAchievement: (id) =>
        set((s) => ({
          gamification: {
            ...s.gamification,
            achievements: s.gamification.achievements.map((a) =>
              a.id === id ? { ...a, unlocked: true, unlockedAt: new Date().toISOString() } : a
            ),
          },
        })),
      completeChallenge: (id) =>
        set((s) => ({
          gamification: {
            ...s.gamification,
            completedChallenges: [...new Set([...s.gamification.completedChallenges, id])],
          },
        })),

      aiMemory: {},
      setAiMemory: (key, value) =>
        set((s) => ({ aiMemory: { ...s.aiMemory, [key]: value } })),

      funnelEvents: [],
      trackEvent: (name, page) =>
        set((s) => ({
          funnelEvents: [
            ...s.funnelEvents.slice(-499),
            { name, page, timestamp: Date.now() },
          ],
        })),
    }),
    { name: 'egypthub-store' }
  )
);
