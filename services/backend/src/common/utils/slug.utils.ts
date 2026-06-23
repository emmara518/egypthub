export function createSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');
}

export function createUniqueSlug(name: string, suffix?: string): string {
  const slug = createSlug(name);
  return suffix ? `${slug}-${suffix}` : slug;
}
