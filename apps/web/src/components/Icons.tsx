/* eslint-disable react/display-name */
import Image from 'next/image';
import { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const Gold = '#D4A24C';
const GoldLight = '#E8C97A';
const Muted = 'currentColor';

function createIcon(children: React.ReactNode, viewBox = '0 0 24 24') {
  return ({ size = 20, className = '', ...props }: IconProps) => (
    <svg width={size} height={size} viewBox={viewBox} fill="none" xmlns="http://www.w3.org/2000/svg" className={`shrink-0 ${className}`} {...props}>
      {children}
    </svg>
  );
}

export const Sparkles = createIcon(<>
  <path d="M12 2l1.5 5.5L19 9l-5.5 1.5L12 16l-1.5-5.5L5 9l5.5-1.5L12 2z" fill={Gold} opacity="0.6" />
  <path d="M8 16l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z" fill={GoldLight} opacity="0.8" />
  <path d="M17 14l.5 2 2 .5-2 .5-.5 2-.5-2-2-.5 2-.5.5-2z" fill={Gold} opacity="0.5" />
</>);

export const Search = createIcon(<>
  <circle cx="10.5" cy="10.5" r="7" stroke={Muted} strokeWidth="1.8" />
  <path d="M16 16l5 5" stroke={Muted} strokeWidth="1.8" strokeLinecap="round" />
</>);

export const Menu = createIcon(<>
  <path d="M4 6h16" stroke={Muted} strokeWidth="1.8" strokeLinecap="round" />
  <path d="M4 12h16" stroke={Muted} strokeWidth="1.8" strokeLinecap="round" />
  <path d="M4 18h16" stroke={Muted} strokeWidth="1.8" strokeLinecap="round" />
</>);

export const Close = createIcon(<>
  <path d="M6 6l12 12" stroke={Muted} strokeWidth="1.8" strokeLinecap="round" />
  <path d="M18 6L6 18" stroke={Muted} strokeWidth="1.8" strokeLinecap="round" />
</>);

export const Location = createIcon(<>
  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke={Gold} strokeWidth="1.5" fill={`${Gold}20`} />
  <circle cx="12" cy="9" r="2.5" fill={Gold} />
</>);

export const Calendar = createIcon(<>
  <rect x="3" y="4" width="18" height="18" rx="3" stroke={Muted} strokeWidth="1.5" />
  <path d="M3 10h18" stroke={Muted} strokeWidth="1.5" />
  <path d="M8 2v4" stroke={Muted} strokeWidth="1.5" strokeLinecap="round" />
  <path d="M16 2v4" stroke={Muted} strokeWidth="1.5" strokeLinecap="round" />
  <circle cx="9" cy="14" r="1" fill={Muted} opacity="0.4" />
  <circle cx="15" cy="14" r="1" fill={Muted} opacity="0.4" />
  <circle cx="12" cy="18" r="1" fill={Muted} opacity="0.4" />
</>);

export const User = createIcon(<>
  <circle cx="12" cy="8" r="4.5" stroke={Muted} strokeWidth="1.5" />
  <path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" stroke={Muted} strokeWidth="1.5" strokeLinecap="round" />
</>);

export const Play = createIcon(<>
  <circle cx="12" cy="12" r="10" fill={Gold} opacity="0.15" />
  <circle cx="12" cy="12" r="10" stroke={Gold} strokeWidth="1.5" />
  <path d="M10 8l6 4-6 4V8z" fill={Gold} />
</>);

export const ArrowRight = createIcon(<>
  <path d="M5 12h14" stroke={Muted} strokeWidth="1.8" strokeLinecap="round" />
  <path d="M14 7l5 5-5 5" stroke={Muted} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
</>);

export const ArrowUp = createIcon(<>
  <path d="M12 20V4" stroke={Gold} strokeWidth="1.8" strokeLinecap="round" />
  <path d="M7 9l5-5 5 5" stroke={Gold} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
</>);

export const Star = createIcon(<>
  <path d="M12 2l2.4 7.2H22l-6 4.8 2.4 7.2L12 16l-6.4 4.8L8 14l-6-4.8h7.6L12 2z" fill={Gold} stroke={Gold} strokeWidth="1" />
</>);

export const StarOutline = createIcon(<>
  <path d="M12 2l2.4 7.2H22l-6 4.8 2.4 7.2L12 16l-6.4 4.8L8 14l-6-4.8h7.6L12 2z" stroke={Muted} strokeWidth="1.5" fill="none" />
</>);

export const Heart = createIcon(<>
  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke="currentColor" strokeWidth="1.5" fill="none" />
</>);

export const HeartFilled = createIcon(<>
  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill={Gold} stroke={Gold} strokeWidth="1" />
</>);

export const Check = createIcon(<>
  <circle cx="12" cy="12" r="10" fill={`${Gold}20`} stroke={Gold} strokeWidth="1.5" />
  <path d="M8 12l3 3 5-6" stroke={Gold} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
</>);

export const CheckSimple = createIcon(<>
  <path d="M5 13l4 4L19 7" stroke={Gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
</>);

export const Plus = createIcon(<>
  <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
</>);

export const Dollar = createIcon(<>
  <circle cx="12" cy="12" r="9" stroke={Gold} strokeWidth="1.3" fill={`${Gold}08`} />
  <path d="M12 7v10" stroke={Gold} strokeWidth="1.5" strokeLinecap="round" />
  <path d="M9 9.5c0-1 1.5-1.5 3-1.5s3 .5 3 1.5c0 2-3 1.5-3 3s3 1 3 2.5c0 1.5-1.5 2-3 2s-3-.5-3-2" stroke={Gold} strokeWidth="1.2" strokeLinecap="round" />
</>);

export const Refresh = createIcon(<>
  <path d="M23 4v6h-6" stroke={Gold} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  <path d="M1 20v-6h6" stroke={Gold} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" stroke={Gold} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
</>);

export const Sun = createIcon(<>
  <circle cx="12" cy="12" r="4.5" stroke={Gold} strokeWidth="1.5" />
  <path d="M12 2v2" stroke={Gold} strokeWidth="1.5" strokeLinecap="round" />
  <path d="M12 20v2" stroke={Gold} strokeWidth="1.5" strokeLinecap="round" />
  <path d="M4.22 4.22l1.42 1.42" stroke={Gold} strokeWidth="1.5" strokeLinecap="round" />
  <path d="M18.36 18.36l1.42 1.42" stroke={Gold} strokeWidth="1.5" strokeLinecap="round" />
  <path d="M2 12h2" stroke={Gold} strokeWidth="1.5" strokeLinecap="round" />
  <path d="M20 12h2" stroke={Gold} strokeWidth="1.5" strokeLinecap="round" />
  <path d="M4.22 19.78l1.42-1.42" stroke={Gold} strokeWidth="1.5" strokeLinecap="round" />
  <path d="M18.36 5.64l1.42-1.42" stroke={Gold} strokeWidth="1.5" strokeLinecap="round" />
</>);

export const Moon = createIcon(<>
  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
</>);

export const Mail = createIcon(<>
  <rect x="2" y="4" width="20" height="16" rx="3" stroke={Gold} strokeWidth="1.5" fill={`${Gold}10`} />
  <path d="M2 7l10 6 10-6" stroke={Gold} strokeWidth="1.5" />
</>);

export const ChevronDown = createIcon(<>
  <path d="M6 9l6 6 6-6" stroke={Muted} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
</>);

export const ChevronLeft = createIcon(<>
  <path d="M15 18l-6-6 6-6" stroke={Gold} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
</>);

export const ChevronRight = createIcon(<>
  <path d="M9 18l6-6-6-6" stroke={Gold} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
</>);

export const Spa = createIcon(<>
  <path d="M12 22c-4 0-7-2.5-7-7 0-3 2-5.5 7-9 5 3.5 7 6 7 9 0 4.5-3 7-7 7z" stroke={Gold} strokeWidth="1.3" fill={`${Gold}15`} />
  <path d="M12 6V2" stroke={Gold} strokeWidth="1.5" strokeLinecap="round" />
  <path d="M9 3h6" stroke={Gold} strokeWidth="1.5" strokeLinecap="round" />
</>);

export const Mountain = createIcon(<>
  <path d="M2 20l6-12 4 6 3-4 7 10H2z" stroke={Gold} strokeWidth="1.3" fill={`${Gold}10`} strokeLinejoin="round" />
  <circle cx="15" cy="8" r="1.5" fill={Gold} />
</>);

export const Landmark = createIcon(<>
  <path d="M4 20h16v-2H4v2z" fill={`${Gold}20`} stroke={Gold} strokeWidth="1" />
  <path d="M6 14l1-4" stroke={Gold} strokeWidth="1.5" strokeLinecap="round" />
  <path d="M10 14l1-4" stroke={Gold} strokeWidth="1.5" strokeLinecap="round" />
  <path d="M14 14l1-4" stroke={Gold} strokeWidth="1.5" strokeLinecap="round" />
  <path d="M18 14l1-4" stroke={Gold} strokeWidth="1.5" strokeLinecap="round" />
  <path d="M12 2l8 4H4l8-4z" fill={Gold} opacity="0.3" stroke={Gold} strokeWidth="1" strokeLinejoin="round" />
</>);

export const Food = createIcon(<>
  <path d="M6 2v8a4 4 0 004 4h1" stroke={Gold} strokeWidth="1.5" strokeLinecap="round" />
  <path d="M11 14v8" stroke={Gold} strokeWidth="1.5" strokeLinecap="round" />
  <path d="M17 6V2" stroke={Gold} strokeWidth="1.5" strokeLinecap="round" />
  <path d="M20 6c0 4-3 6-6 6v2c-1 0-2-.5-2-2" stroke={Gold} strokeWidth="1.5" />
  <path d="M17 6h3" stroke={Gold} strokeWidth="1.5" strokeLinecap="round" />
</>);

export const Laptop = createIcon(<>
  <rect x="3" y="3" width="18" height="12" rx="2" stroke={Gold} strokeWidth="1.3" fill={`${Gold}10`} />
  <path d="M2 18h20a2 2 0 01-2 2H4a2 2 0 01-2-2z" fill={`${Gold}15`} stroke={Gold} strokeWidth="1" />
</>);

export const Globe = createIcon(<>
  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
  <path d="M2 12h20" stroke="currentColor" strokeWidth="1.5" />
  <path d="M12 2c2 3 3 6.5 3 10s-1 7-3 10" stroke="currentColor" strokeWidth="1.5" />
  <path d="M12 2c-2 3-3 6.5-3 10s1 7 3 10" stroke="currentColor" strokeWidth="1.5" />
</>);

export const Beach = createIcon(<>
  <path d="M2 20h20" stroke={Gold} strokeWidth="1.5" strokeLinecap="round" />
  <path d="M6 14l3-6" stroke={Gold} strokeWidth="1.5" strokeLinecap="round" />
  <path d="M12 20l4-8" stroke={Gold} strokeWidth="1.5" strokeLinecap="round" />
  <path d="M17 20l1-2" stroke={Gold} strokeWidth="1.5" strokeLinecap="round" />
  <path d="M7 4l1 2" stroke={Gold} strokeWidth="1.5" strokeLinecap="round" />
  <circle cx="19" cy="6" r="3" fill={Gold} opacity="0.3" stroke={Gold} strokeWidth="1" />
</>);

export const City = createIcon(<>
  <rect x="4" y="8" width="5" height="12" rx="1" fill={`${Gold}10`} stroke={Gold} strokeWidth="1" />
  <rect x="11" y="4" width="5" height="16" rx="1" fill={`${Gold}10`} stroke={Gold} strokeWidth="1" />
  <rect x="18" y="10" width="4" height="10" rx="1" fill={`${Gold}10`} stroke={Gold} strokeWidth="1" />
  <path d="M6.5 5v3" stroke={Gold} strokeWidth="1.5" strokeLinecap="round" />
  <path d="M13.5 2v2" stroke={Gold} strokeWidth="1.5" strokeLinecap="round" />
</>);

export const Tree = createIcon(<>
  <path d="M12 2L6 10h4v4h4v-4h4L12 2z" fill={`${Gold}15`} stroke={Gold} strokeWidth="1.2" strokeLinejoin="round" />
  <path d="M12 14v6" stroke={Gold} strokeWidth="1.5" strokeLinecap="round" />
</>);

export const Water = createIcon(<>
  <path d="M12 2C8 8 5 12 5 15c0 4 3 7 7 7s7-3 7-7c0-3-3-7-7-13z" stroke={Gold} strokeWidth="1.3" fill={`${Gold}08`} strokeLinejoin="round" />
  <path d="M10 18c1.5-1 3.5-1 5 0" stroke={Gold} strokeWidth="1.2" strokeLinecap="round" />
  <path d="M12 15c1 0 2 .5 3 1" stroke={Gold} strokeWidth="1.2" strokeLinecap="round" />
</>);

export const Archway = createIcon(<>
  <path d="M2 20h20" stroke={Gold} strokeWidth="1.5" strokeLinecap="round" />
  <path d="M6 20V8c0-2 2-4 6-4s6 2 6 4v12" stroke={Gold} strokeWidth="1.3" fill={`${Gold}08`} />
  <path d="M10 12v4" stroke={Gold} strokeWidth="1.5" strokeLinecap="round" />
  <path d="M14 12v4" stroke={Gold} strokeWidth="1.5" strokeLinecap="round" />
</>);

export const Home = createIcon(<>
  <path d="M3 12l9-9 9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  <path d="M5 10v10h14V10" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
</>);

export const Compass = createIcon(<>
  <circle cx="12" cy="12" r="9" stroke={Gold} strokeWidth="1.3" />
  <path d="M16 8l-4 8-4-8 4 2 4-2z" fill={Gold} stroke={Gold} strokeWidth="0.5" />
</>);

export const Shield = createIcon(<>
  <path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z" stroke={Gold} strokeWidth="1.3" fill={`${Gold}08`} strokeLinejoin="round" />
  <path d="M9 12l2 2 4-4" stroke={Gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
</>);

export const Clock = createIcon(<>
  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
  <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
</>);

export const Support = createIcon(<>
  <circle cx="12" cy="12" r="9" stroke={Gold} strokeWidth="1.3" fill={`${Gold}08`} />
  <path d="M12 8v4" stroke={Gold} strokeWidth="1.5" strokeLinecap="round" />
  <circle cx="12" cy="16" r="0.8" fill={Gold} />
</>);

export const Pyramid = createIcon(<>
  <path d="M12 2L2 22h20L12 2z" fill={`${Gold}15`} stroke={Gold} strokeWidth="1.2" strokeLinejoin="round" />
  <path d="M12 8l-4 10h8L12 8z" fill={Gold} opacity="0.3" />
  <circle cx="12" cy="14" r="0.8" fill={Gold} />
</>);

export const Camel = createIcon(<>
  <ellipse cx="9" cy="13" rx="5" ry="3" fill={`${Gold}10`} stroke={Gold} strokeWidth="1.2" />
  <circle cx="6" cy="13" r="1.5" fill={Gold} opacity="0.5" />
  <path d="M12 10l2-4 1 2" stroke={Gold} strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  <path d="M4 16l-1 2" stroke={Gold} strokeWidth="1.2" strokeLinecap="round" />
  <path d="M14 16l1 2" stroke={Gold} strokeWidth="1.2" strokeLinecap="round" />
</>);

export const Cleopatra = createIcon(<>
  <circle cx="12" cy="7" r="3" stroke={Gold} strokeWidth="1.2" fill={`${Gold}10`} />
  <path d="M9 10h6l2 4H7l2-4z" fill={`${Gold}10`} stroke={Gold} strokeWidth="1" strokeLinejoin="round" />
  <path d="M7 14l-2 4" stroke={Gold} strokeWidth="1.2" strokeLinecap="round" />
  <path d="M17 14l2 4" stroke={Gold} strokeWidth="1.2" strokeLinecap="round" />
  <path d="M10 14v2" stroke={Gold} strokeWidth="1" strokeLinecap="round" />
  <path d="M14 14v2" stroke={Gold} strokeWidth="1" strokeLinecap="round" />
</>);

/* Brand Social Icons — use local SVGs for known brands */
export const SocialBrand = ({ name, size = 20, className = '' }: { name: string; size?: number; className?: string }) => (
  <Image src={`/assets/icons/${name}.svg`} alt={name} width={size} height={size} className={`shrink-0 ${className}`} />
);
