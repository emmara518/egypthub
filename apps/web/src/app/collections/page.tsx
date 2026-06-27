'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { Plus, Close, ArrowRight } from '@/components/Icons';

export default function CollectionsPage() {
  const { collections, addToCollection, removeFromCollection } = useAppStore();
  const [newName, setNewName] = useState('');
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [editingNote, setEditingNote] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');

  const collectionNames = Object.keys(collections);

  const createCollection = () => {
    const name = newName.trim();
    if (!name || collections[name]) return;
    addToCollection(name, '__created__');
    setNewName('');
  };

  const deleteCollection = (name: string) => {
    collections[name]?.forEach((id) => removeFromCollection(name, id));
  };

  const totalItems = (items: string[]) => items.filter((id) => id !== '__created__').length;

  const saveNote = (name: string) => {
    setNotes({ ...notes, [name]: noteText });
    setEditingNote(null);
  };

  return (
    <div className="min-h-screen bg-theme-bg">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-6 py-8">
        <Link href="/" className="inline-flex items-center gap-1 text-theme-gold hover:text-theme-gold/80 transition-colors text-sm font-cairo mb-6">
          <ArrowRight size={16} />
          العودة للرئيسية
        </Link>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white font-playfair">مجموعاتي</h1>
            <p className="text-theme-muted font-cairo mt-1">نظّم وجهاتك وتجاربك المفضلة</p>
          </div>
        </div>

        <div className="flex gap-3 mb-10">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && createCollection()}
            placeholder="اسم المجموعة الجديدة"
            className="flex-1 max-w-sm px-4 py-3 rounded-xl bg-theme-card border border-theme-gold/20 text-white placeholder:text-theme-muted font-cairo text-sm focus:outline-none focus:border-theme-gold/50 transition-all"
          />
          <button
            onClick={createCollection}
            disabled={!newName.trim()}
            className="px-5 py-3 rounded-xl bg-gradient-gold text-dark-900 font-bold font-cairo text-sm disabled:opacity-40 hover:brightness-110 transition-all flex items-center gap-2"
          >
            <Plus size={16} />
            إضافة
          </button>
        </div>

        {collectionNames.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">📂</div>
            <h2 className="text-xl font-bold text-white font-playfair mb-2">لا توجد مجموعات</h2>
            <p className="text-theme-muted font-cairo">أنشئ مجموعتك الأولى لتنظيم وجهاتك وتجاربك المفضلة</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {collectionNames.map((name, idx) => {
              const items = collections[name] || [];
              const count = totalItems(items);

              return (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="relative group rounded-2xl border border-theme-gold/10 bg-theme-card p-6 hover:border-theme-gold/30 transition-all"
                >
                  <button
                    onClick={() => deleteCollection(name)}
                    className="absolute top-3 left-3 w-8 h-8 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500/20"
                  >
                    <Close size={14} />
                  </button>

                  <div className="w-12 h-12 rounded-xl bg-theme-gold/10 flex items-center justify-center text-xl mb-4">
                    📁
                  </div>

                  <h3 className="text-lg font-bold text-white font-cairo mb-1">{name}</h3>
                  <p className="text-sm text-theme-muted font-cairo mb-4">
                    {count} {count === 1 ? 'عنصر' : 'عناصر'}
                  </p>

                  <AnimatePresence mode="wait">
                    {editingNote === name ? (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-4"
                      >
                        <textarea
                          value={noteText}
                          onChange={(e) => setNoteText(e.target.value)}
                          placeholder="أضف ملاحظة..."
                          className="w-full px-3 py-2 rounded-xl bg-theme-surface border border-theme-gold/20 text-white placeholder:text-theme-muted text-sm font-cairo resize-none h-20 focus:outline-none focus:border-theme-gold/50"
                        />
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => saveNote(name)}
                            className="px-3 py-1.5 rounded-lg bg-gradient-gold text-dark-900 text-xs font-bold font-cairo"
                          >
                            حفظ
                          </button>
                          <button
                            onClick={() => setEditingNote(null)}
                            className="px-3 py-1.5 rounded-lg border border-white/10 text-theme-secondary text-xs font-cairo"
                          >
                            إلغاء
                          </button>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mb-4"
                      >
                        {notes[name] && (
                          <p className="text-sm text-theme-secondary font-cairo bg-theme-surface/50 rounded-xl p-3 mb-2">
                            {notes[name]}
                          </p>
                        )}
                        <button
                          onClick={() => { setEditingNote(name); setNoteText(notes[name] || ''); }}
                          className="text-xs text-theme-gold font-cairo hover:underline"
                        >
                          {notes[name] ? 'تعديل الملاحظة' : 'أضف ملاحظة'}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
