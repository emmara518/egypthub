export interface Testimonial {
  id: string;
  authorName: string;
  authorAvatar?: string;
  role?: string;
  content: string;
  rating: number;
}

export interface TestimonialsProps {
  testimonials: Testimonial[];
  variant?: 'grid' | 'carousel';
  className?: string;
}
