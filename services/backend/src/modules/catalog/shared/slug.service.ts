import { Injectable } from '@nestjs/common';

@Injectable()
export class SlugService {
  generate(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .substring(0, 64);
  }

  async ensureUnique(
    slug: string,
    existsFn: (candidate: string) => Promise<boolean>,
    maxAttempts = 10,
  ): Promise<string> {
    let candidate = slug;
    for (let i = 1; i <= maxAttempts; i++) {
      if (!(await existsFn(candidate))) return candidate;
      const suffix = Math.random().toString(36).substring(2, 6);
      candidate = `${slug}-${suffix}`.substring(0, 64);
    }
    throw new Error(`Unable to generate unique slug after ${maxAttempts} attempts`);
  }
}
