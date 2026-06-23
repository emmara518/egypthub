export function formatDate(date: Date | string | number, locale: string = 'ar-EG', options?: Intl.DateTimeFormatOptions): string {
  const d = date instanceof Date ? date : new Date(date);
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  };
  try {
    return new Intl.DateTimeFormat(locale, defaultOptions).format(d);
  } catch {
    return d.toLocaleDateString(locale, defaultOptions);
  }
}

export function formatTime(date: Date | string | number, locale: string = 'ar-EG'): string {
  const d = date instanceof Date ? date : new Date(date);
  try {
    return new Intl.DateTimeFormat(locale, {
      hour: '2-digit',
      minute: '2-digit',
    }).format(d);
  } catch {
    return d.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
  }
}

export function formatRelativeTime(date: Date | string | number, locale: string = 'ar-EG'): string {
  const d = date instanceof Date ? date : new Date(date);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return locale.startsWith('ar') ? 'الآن' : 'just now';
  if (minutes < 60) return locale.startsWith('ar') ? `منذ ${minutes} دقيقة` : `${minutes}m ago`;
  if (hours < 24) return locale.startsWith('ar') ? `منذ ${hours} ساعة` : `${hours}h ago`;
  if (days < 7) return locale.startsWith('ar') ? `منذ ${days} يوم` : `${days}d ago`;

  return formatDate(d, locale);
}
