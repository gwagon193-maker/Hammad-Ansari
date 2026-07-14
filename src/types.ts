export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  category: 'wedding' | 'corporate' | 'decor' | 'nibm';
  venue: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  role: string;
  rating: number;
  content: string;
  date: string;
  initials: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface PlannerOption {
  id: string;
  label: string;
  basePrice: number;
  duration?: string;
}
