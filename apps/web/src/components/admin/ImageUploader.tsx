'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface UploadedFile {
  id: string;
  url: string;
  filename: string;
  size: number;
  type: string;
}

interface ImageUploaderProps {
  onUpload: (files: UploadedFile[]) => void;
  maxFiles?: number;
  multiple?: boolean;
  accept?: string;
  className?: string;
}

const MAX_SIZE = 5 * 1024 * 1024;
const ACCEPTED = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function ImageUploader({ onUpload, maxFiles = 10, multiple = true, accept = 'image/*', className = '' }: ImageUploaderProps) {
  const [dragOver, setDragOver] = useState(false);
  const [previews, setPreviews] = useState<{ file: File; url: string }[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const processFiles = useCallback((files: FileList) => {
    setError(null);
    const valid: File[] = [];
    const fileArray = Array.from(files);
    const remaining = maxFiles - previews.length;

    if (fileArray.length > remaining) {
      setError(`يمكنك رفع ${remaining} ملف فقط`);
      return;
    }

    for (const file of fileArray) {
      if (!ACCEPTED.includes(file.type) && !file.type.startsWith('image/')) {
        setError(`نوع الملف غير مدعوم: ${file.type}`);
        continue;
      }
      if (file.size > MAX_SIZE) {
        setError(`الملف كبير جداً: ${file.name} (الحد الأقصى 5MB)`);
        continue;
      }
      valid.push(file);
    }

    const newPreviews = valid.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setPreviews((prev) => [...prev, ...newPreviews]);
  }, [maxFiles, previews.length]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length) processFiles(e.dataTransfer.files);
  }, [processFiles]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) processFiles(e.target.files);
    e.target.value = '';
  }, [processFiles]);

  const removePreview = useCallback((index: number) => {
    setPreviews((prev) => {
      URL.revokeObjectURL(prev[index].url);
      return prev.filter((_, i) => i !== index);
    });
  }, []);

  const handleUpload = async () => {
    if (previews.length === 0) return;
    setUploading(true);
    setError(null);

    const formData = new FormData();
    for (const p of previews) {
      formData.append('files', p.file);
    }

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      if (!res.ok) throw new Error('فشل الرفع');
      const data = await res.json();
      const uploaded: UploadedFile[] = data.urls.map((url: string, i: number) => ({
        id: `upload-${Date.now()}-${i}`,
        url,
        filename: previews[i].file.name,
        size: previews[i].file.size,
        type: previews[i].file.type,
      }));
      onUpload(uploaded);
      setPreviews([]);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'حدث خطأ في الرفع');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={className}>
      {/* Drop Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
          dragOver
            ? 'border-theme-gold bg-theme-gold/5'
            : 'border-theme-gold/20 hover:border-theme-gold/40 bg-theme-surface/50'
        }`}
      >
        <input ref={inputRef} type="file" accept={accept} multiple={multiple} onChange={handleInputChange} className="hidden" />
        <div className="flex flex-col items-center gap-3">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${dragOver ? 'bg-theme-gold/20 scale-110' : 'bg-theme-gold/10'}`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={dragOver ? 'text-theme-gold' : 'text-theme-muted'}>
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-theme font-cairo mb-1">
              {dragOver ? 'أفلت الملفات هنا' : 'اسحب وأفلت الصور هنا أو اضغط للاختيار'}
            </p>
            <p className="text-[10px] text-theme-muted font-cairo">JPG, PNG, WebP, GIF, SVG — حد أقصى 5MB</p>
          </div>
        </div>
      </div>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.p initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            className="text-red-400 text-xs font-cairo mt-2">{error}</motion.p>
        )}
      </AnimatePresence>

      {/* Previews */}
      {previews.length > 0 && (
        <div className="mt-4">
          <p className="text-xs text-theme-muted font-cairo mb-2">{previews.length} ملف مختار</p>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
            {previews.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                className="relative group rounded-xl overflow-hidden border border-theme-gold/10 bg-theme-surface aspect-square">
                <img src={p.url} alt={p.file.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button onClick={(e) => { e.stopPropagation(); removePreview(i); }}
                    className="p-1.5 rounded-lg bg-red-500/80 text-white hover:bg-red-500 transition-colors">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                  </button>
                </div>
                <div className="absolute bottom-0 inset-x-0 p-1 bg-gradient-to-t from-black/60 to-transparent">
                  <p className="text-[8px] text-white/80 truncate font-english">{p.file.name}</p>
                  <p className="text-[7px] text-white/50 font-english">{formatSize(p.file.size)}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={handleUpload}
            disabled={uploading}
            className="mt-4 w-full px-6 py-3 rounded-xl bg-theme-gold text-dark-900 font-bold font-cairo text-sm hover:opacity-90 transition-all disabled:opacity-50"
          >
            {uploading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="31.4 31.4" /></svg>
                جاري الرفع...
              </span>
            ) : (
              `رفع ${previews.length} ملف`
            )}
          </motion.button>
        </div>
      )}
    </div>
  );
}
