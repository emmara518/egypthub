import { cn } from '../../utils/cn';
import { Grid } from '../Grid';
import type { PartnerLogosProps } from './PartnerLogos.types';

export function PartnerLogos({ partners, className }: PartnerLogosProps) {
  return (
    <div className={cn('', className)}>
      <p className="text-caption text-text-muted text-center uppercase tracking-widest mb-6">شركاؤنا</p>
      <Grid cols={partners.length < 5 ? partners.length as 1 | 2 | 3 | 4 : 4} gap={8} className="items-center">
        {partners.map((partner) => (
          <div key={partner.id} className="flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300 opacity-50 hover:opacity-100">
            <img src={partner.src} alt={partner.name} className="max-h-10 object-contain" loading="lazy" />
          </div>
        ))}
      </Grid>
    </div>
  );
}
