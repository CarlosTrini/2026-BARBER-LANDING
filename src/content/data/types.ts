export interface Service {
  id: string;
  name: string;
  tagline: string;
  category: 'CORTE' | 'BARBA' | 'PAQUETE' | 'TRATAMIENTO';
  price: number;
  duration: string;
  description: string;
  features: string[];
  popular?: boolean;
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  iconName: 'Flame' | 'Award' | 'Coffee' | 'Sparkles' | 'Music' | 'ShieldCheck';
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialty: string;
  experience: string;
  image: string;
  bio: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  avatar: string;
  rating: number;
  comment: string;
  service: string;
}

export interface ScheduleDay {
  days: string;
  hours: string;
}

export interface ContactInfo {
  brandName: string;
  tagline: string;
  address: string;
  neighborhood: string;
  city: string;
  phone: string;
  phoneFormatted: string;
  whatsapp: string;
  whatsappUrl: string;
  email: string;
  mapUrl: string;
  schedule: ScheduleDay[];
}

export interface StatItem {
  value: string;
  label: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  discountPercent?: number;
  category: string;
  volume?: string;
  badge?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
}

