import type { ReactNode } from 'react';

export interface MapCoordinates {
  lat: number;
  lng: number;
}

export interface MapContainerProps {
  center: MapCoordinates;
  zoom?: number;
  className?: string;
  children?: ReactNode;
  onCenterChange?: (center: MapCoordinates) => void;
}

export interface MapPinProps {
  position: MapCoordinates;
  label?: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export interface MapTooltipProps {
  title: string;
  description?: string;
  image?: string;
  price?: string;
  rating?: number;
  className?: string;
}

export interface MapFiltersProps {
  categories: { id: string; label: string; active: boolean }[];
  onToggle: (id: string) => void;
  className?: string;
}
