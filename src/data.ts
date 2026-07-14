import { ServiceItem, ReviewItem, FAQItem } from './types';

// Let's import the actual image assets generated earlier
import heroWeddingImg from './assets/images/hero_luxury_wedding_1784044581512.jpg';
import serviceCorporateImg from './assets/images/service_corporate_1784044599122.jpg';
import serviceDecorImg from './assets/images/service_decor_1784044614267.jpg';
import servicePuneVenuesImg from './assets/images/service_pune_venues_1784044631559.jpg';

export { heroWeddingImg, serviceCorporateImg, serviceDecorImg, servicePuneVenuesImg };

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'corporate',
    title: 'Grand Corporate Scale',
    subtitle: 'Conferences & Elite Team Building',
    description: 'Immersive, sleek, and high-impact corporate event management. From keynotes to executive retreats, we curate pristine spaces designed for elite networking and perfect brand alignment.',
    imageUrl: serviceCorporateImg,
    category: 'corporate',
    venue: 'JW Marriott / Westin Pune'
  },
  {
    id: 'decor',
    title: 'Bespoke Theme Decor',
    subtitle: 'Masterful Visual Architecture',
    description: 'Breathtaking floral sculptures, luxurious drapery, and ambient illumination. Every detail is custom-crafted to create a magical environment tailored precisely to your design dreams.',
    imageUrl: serviceDecorImg,
    category: 'decor',
    venue: 'Koregaon Park Estates'
  },
  {
    id: 'pune-sectors',
    title: 'Elite Pune Celebrations',
    subtitle: 'Serving NIBM Road & Premium Venues',
    description: 'Signature weddings and high-society receptions across NIBM Road, Kalyani Nagar, and elite Pune venues. We provide absolute discretion, impeccable timing, and exquisite high-fashion styling.',
    imageUrl: servicePuneVenuesImg,
    category: 'nibm',
    venue: 'NIBM Road & Premium Venues, Pune'
  }
];

export const REVIEWS_DATA: ReviewItem[] = [
  {
    id: 'review-1',
    author: 'Aditya & Rhea K.',
    role: 'Luxury Wedding Clients (NIBM Road)',
    rating: 5,
    content: 'Have done 8-10 events with them, they are very professional to work with. At each event, all set up is down and ready before guests arrive, and their visual aesthetic is unmatched.',
    date: 'June 2026',
    initials: 'AR'
  },
  {
    id: 'review-2',
    author: 'Meenakshi Deshmukh',
    role: 'Corporate Gala Director',
    rating: 5,
    content: 'Fashionista Factory Events turned our annual corporate summit into a breathtaking experience. The attention to detail and professional stage setup exceeded our highest standards.',
    date: 'May 2026',
    initials: 'MD'
  },
  {
    id: 'review-3',
    author: 'Siddharth Malhotra',
    role: 'Private Estate Event',
    rating: 5,
    content: 'Their team designed a stunning champagne garden theme decor. Flawless coordination, superb floral arches, and a highly professional team that understands true high-end luxury.',
    date: 'April 2026',
    initials: 'SM'
  }
];

export const FAQS_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Which areas in Pune do you specialize in?',
    answer: 'We host premium events across all elite sectors of Pune, including NIBM Road, Koregaon Park, Kalyani Nagar, Boat Club Road, and luxury outstation estates.'
  },
  {
    id: 'faq-2',
    question: 'How do you structure the design and planning process?',
    answer: 'We begin with a personalized mood-board consultation, followed by detailed 3D spatial layout reviews. We curate everything from vendor selection to custom fabrication under one high-fashion lens.'
  },
  {
    id: 'faq-3',
    question: 'Do you offer complete execution, or decor-only services?',
    answer: 'We provide both end-to-end turnkey event production (planning, guest management, coordination) and bespoke high-end thematic floral/lighting design builds depending on your specific requirements.'
  },
  {
    id: 'faq-4',
    question: 'Can you work within a specific design theme?',
    answer: 'Absolutely. We specialize in custom themes, ranging from royal minimalist luxury and sun-drenched European garden designs to futuristic high-tech corporate summits.'
  }
];

export const EVENT_TYPES = [
  { id: 'wedding', label: 'Bespoke Wedding & Sangeet', basePrice: 450000 },
  { id: 'corporate', label: 'Premium Corporate Summit', basePrice: 300000 },
  { id: 'decor', label: 'Elite Theme Decor & Gala', basePrice: 200000 },
  { id: 'private', label: 'Private Estate Cocktail Party', basePrice: 150000 }
];

export const REGIONS = [
  { id: 'nibm', label: 'NIBM Road (Elite Estates)', premium: 0 },
  { id: 'kp', label: 'Koregaon Park / Kalyani Nagar', premium: 50000 },
  { id: 'bcr', label: 'Boat Club Road / Camp', premium: 40000 },
  { id: 'out', label: 'Pune Outstation Resorts', premium: 100000 }
];

export const DECOR_ADDONS = [
  { id: 'floral', label: 'Signature Fresh Floral Wall', price: 80000 },
  { id: 'lighting', label: 'Fairy-Light Canopy & Chandeliers', price: 50000 },
  { id: 'stage', label: 'Custom Arch & Raised Stage Build', price: 90000 },
  { id: 'champagne', label: 'Champagne Fountain & Bar Curation', price: 40000 }
];
