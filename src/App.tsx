import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MapPin,
  Phone,
  Mail,
  ChevronDown,
  ArrowRight,
  MessageSquare,
  Instagram,
  Wifi,
  Battery,
  Sparkles,
  ArrowDown,
  Menu,
  Award,
  Globe,
  Calendar,
  X,
  Compass
} from 'lucide-react';

// Import our structured data and images
import {
  SERVICES_DATA,
  FAQS_DATA,
  heroWeddingImg,
} from './data';
import { ServiceItem } from './types';

// Import custom sub-components
import ReviewSection from './components/ReviewSection';
import ConciergePlanner from './components/ConciergePlanner';
import Lightbox from './components/Lightbox';

export default function App() {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('08:56');
  const [phoneNotification, setPhoneNotification] = useState<string | null>(null);

  // References for scrolling
  const plannerRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);

  // Smooth scroll helper
  const scrollToSection = (elementRef: React.RefObject<HTMLDivElement | null>) => {
    if (elementRef.current) {
      elementRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Keep a ticking clock matching the current hour
  useEffect(() => {
    const timer = setInterval(() => {
      const date = new Date();
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleInquiryNotification = (message: string) => {
    // Show a sleek in-app booking notification banner first
    setPhoneNotification('Building your customized event prospectus...');
    setTimeout(() => {
      setPhoneNotification(null);
      // Construct direct WhatsApp link
      const phone = '919876543210';
      const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    }, 1800);
  };

  const handleLightboxInquiry = (serviceName: string) => {
    setSelectedService(null);
    const message = `Hello Fashionista Factory Events, I am incredibly inspired by your event concept: "${serviceName}" and would love to inquire about curating a similar aesthetic for my upcoming event.`;
    handleInquiryNotification(message);
  };

  return (
    <div className="min-h-screen bg-[#FBFBFA] font-sans antialiased relative overflow-x-hidden text-charcoal">
      
      {/* Dynamic Notification Banner */}
      <AnimatePresence>
        {phoneNotification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-charcoal/95 backdrop-blur-md border border-gold/30 py-3 px-6 rounded-full flex items-center gap-3 shadow-2xl"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-gold animate-ping shrink-0" />
            <p className="text-xs font-serif font-medium tracking-wide text-stone-200">{phoneNotification}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Website Navigation Header */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-stone-100/80 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Brand Identity / Monogram Crest */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 rounded-full border border-gold flex items-center justify-center bg-ivory shadow-xs">
              <span className="font-serif text-base font-bold tracking-tight text-gold">FF</span>
            </div>
            <div>
              <div className="font-serif text-sm font-black tracking-widest text-charcoal">FASHIONISTA</div>
              <div className="text-[9px] font-sans tracking-[0.25em] text-stone-400 uppercase font-medium">Factory Events</div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-serif font-bold uppercase tracking-widest text-stone-600">
            <button
              onClick={() => scrollToSection(servicesRef)}
              className="hover:text-gold transition-colors pb-1 border-b border-transparent hover:border-gold/30"
            >
              Portfolios
            </button>
            <button
              onClick={() => scrollToSection(reviewsRef)}
              className="hover:text-gold transition-colors pb-1 border-b border-transparent hover:border-gold/30"
            >
              Appreciations
            </button>
            <button
              onClick={() => scrollToSection(plannerRef)}
              className="hover:text-gold transition-colors pb-1 border-b border-transparent hover:border-gold/30"
            >
              Bespoke Planner
            </button>
            <button
              onClick={() => {
                const faqsEl = document.getElementById('faqs');
                if (faqsEl) faqsEl.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-gold transition-colors pb-1 border-b border-transparent hover:border-gold/30"
            >
              Inquiries
            </button>
          </nav>

          {/* Call to Action Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => scrollToSection(plannerRef)}
              className="hidden sm:inline-flex items-center justify-center py-2.5 px-6 bg-charcoal text-white hover:bg-stone-900 text-[10px] font-serif font-bold uppercase tracking-widest rounded-full border border-white/10 shadow-md transition-all duration-300"
            >
              Book Consultation
            </button>
            
            {/* Mobile Menu Icon */}
            <button 
              id="menu-toggle-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-charcoal hover:text-gold transition-colors"
              aria-label="Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Slide Navigation */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black z-50"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-0 bottom-0 w-80 bg-white z-50 shadow-2xl p-8 flex flex-col justify-between border-l border-stone-100"
            >
              <div>
                <div className="flex justify-between items-center mb-10 pb-4 border-b border-stone-100">
                  <span className="font-serif text-xs text-stone-400 tracking-widest uppercase">Navigation Menu</span>
                  <button id="close-menu-btn" onClick={() => setMenuOpen(false)} className="text-stone-400 hover:text-charcoal p-1">
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <nav className="space-y-6">
                  <button
                    onClick={() => { setMenuOpen(false); scrollToSection(servicesRef); }}
                    className="block text-left text-lg font-serif italic text-charcoal hover:text-gold transition-colors"
                  >
                    Asymmetric Portfolios
                  </button>
                  <button
                    onClick={() => { setMenuOpen(false); scrollToSection(reviewsRef); }}
                    className="block text-left text-lg font-serif italic text-charcoal hover:text-gold transition-colors"
                  >
                    Client Appreciations
                  </button>
                  <button
                    onClick={() => { setMenuOpen(false); scrollToSection(plannerRef); }}
                    className="block text-left text-lg font-serif italic text-charcoal hover:text-gold transition-colors"
                  >
                    Bespoke Concierge Planner
                  </button>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      const faqsEl = document.getElementById('faqs');
                      if (faqsEl) faqsEl.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="block text-left text-lg font-serif italic text-charcoal hover:text-gold transition-colors"
                  >
                    Curated Inquiries (FAQ)
                  </button>
                </nav>
              </div>
              
              <div className="border-t border-stone-100 pt-8 space-y-4">
                <p className="text-[10px] font-mono text-stone-400 uppercase tracking-widest">Connect Directly</p>
                <div className="flex items-center gap-3 text-xs text-stone-600">
                  <Phone className="w-4 h-4 text-gold" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-stone-600">
                  <Mail className="w-4 h-4 text-gold" />
                  <span className="break-all">bentlyillionaire@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-stone-600">
                  <MapPin className="w-4 h-4 text-gold" />
                  <span>NIBM Road, Elite Quadrant, Pune</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 1. Luxury Hero Section (High Impact Editorial Banner) */}
      <section className="relative w-full bg-white overflow-hidden py-12 md:py-20 lg:py-24 border-b border-stone-100" id="hero-section">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Overlaid branding & Sub-tagline stack in Bold Typography italic style */}
          <div className="lg:col-span-5 space-y-6 text-center lg:text-left order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 px-3.5 py-1.5 rounded-full text-gold">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-[10px] font-serif font-bold uppercase tracking-widest">Pune's Premier Luxury Agency</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif italic font-extrabold tracking-tight text-charcoal leading-[1.1]">
              Fashionista Factory
            </h1>
            
            <div className="w-16 h-[2px] bg-gold mx-auto lg:mx-0" />
            
            <p className="text-xs sm:text-sm font-sans text-stone-500 leading-relaxed tracking-wide max-w-lg mx-auto lg:mx-0">
              Architects of Bespoke Weddings, Premium Corporate Experiences & Elite Theme Decor in Pune. Experience a sun-drenched, high-fashion aesthetic crafted for absolute perfection.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => scrollToSection(plannerRef)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 px-8 bg-charcoal hover:bg-stone-900 text-white text-xs font-serif font-bold uppercase tracking-widest rounded-full shadow-lg transition-all duration-300"
              >
                Inquire For Next Event <ArrowRight className="w-4 h-4 text-gold" />
              </button>
              <button
                onClick={() => scrollToSection(servicesRef)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 px-8 border border-stone-200 hover:border-gold text-xs font-serif font-bold uppercase tracking-widest text-charcoal hover:text-gold transition-all duration-300 rounded-full"
              >
                Explore Portfolios
              </button>
            </div>
          </div>

          {/* Hero Banner Large Image Node */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src={heroWeddingImg}
                alt="Grand luxury wedding entrance in Pune"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transform scale-100 hover:scale-105 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              
              {/* Floating aesthetic stamp */}
              <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg border border-gold/20 flex items-center gap-2">
                <Award className="w-5 h-5 text-gold" />
                <div className="text-left">
                  <p className="text-[10px] font-serif font-bold text-charcoal uppercase leading-none">High Fashion</p>
                  <p className="text-[8px] font-mono text-stone-500 uppercase tracking-widest leading-none mt-1">Design Standard</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Welcome Quote Divider Node */}
      <section className="py-16 bg-ivory text-center border-b border-stone-100">
        <div className="max-w-3xl mx-auto px-6 space-y-4">
          <span className="text-[10px] font-mono tracking-[0.25em] text-gold uppercase block">Our Design Philosophy</span>
          <blockquote className="font-serif text-lg sm:text-xl lg:text-2xl italic text-charcoal leading-relaxed">
            "We believe a luxury gathering is not just an event—it is a meticulously orchestrated living canvas of scent, sight, and elegant emotion."
          </blockquote>
          <div className="w-8 h-[1px] bg-gold mx-auto my-3" />
          <p className="text-xs font-serif font-medium text-stone-500 uppercase tracking-widest">— Devika R., Principal Designer</p>
        </div>
      </section>

      {/* 2. Bright & Asymmetric Visual Service Grid */}
      <section className="py-20 px-6 max-w-7xl mx-auto space-y-12" id="portfolio-grid" ref={servicesRef}>
        
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="text-[10px] font-mono tracking-[0.2em] text-gold uppercase">Signature Portfolios</span>
          <h2 className="text-3xl sm:text-4xl font-serif text-charcoal tracking-tight font-extrabold italic">Interactive Visuals</h2>
          <p className="text-xs text-stone-400 font-sans tracking-wide leading-relaxed">
            Explore our curated masterpieces. Click any design grid card below to view detailed spatial configurations, layouts, and curated additions.
          </p>
        </div>

        {/* Beautiful Asymmetric Bento-like grid layout on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_DATA.map((service, index) => {
            // Give NIBM Luxury full-width col span on large screen for asymmetrical layout rhythm
            const isFullWidth = service.category === 'nibm';
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => setSelectedService(service)}
                className={`group cursor-pointer select-none ${isFullWidth ? 'md:col-span-2 lg:col-span-3' : ''}`}
              >
                <div className="bg-[#F5F1EE] rounded-3xl overflow-hidden border border-[#D4AF37]/10 hover:border-gold/25 shadow-xs hover:shadow-xl transition-all duration-500 flex flex-col h-full">
                  
                  {/* Responsive Frame sizing */}
                  <div className={`relative overflow-hidden ${isFullWidth ? 'aspect-[21/9] min-h-[260px]' : 'aspect-[4/3]'}`}>
                    <img
                      src={service.imageUrl}
                      alt={service.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                    
                    {/* Elite Tag */}
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs py-1.5 px-3.5 rounded-xl border border-gold/20 flex items-center gap-1.5 shadow-sm">
                      <Compass className="w-3.5 h-3.5 text-gold" />
                      <span className="text-[9px] font-mono tracking-wider text-charcoal font-bold uppercase">
                        {service.category === 'nibm' ? 'PUNE ELITE VENUE' : service.category.toUpperCase()}
                      </span>
                    </div>

                    {/* Quick view floating hint */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <span className="text-[10px] font-serif font-bold text-white tracking-widest uppercase bg-charcoal/80 backdrop-blur-xs px-3 py-1.5 rounded-full">
                        View Blueprint Spec
                      </span>
                    </div>
                  </div>

                  {/* Text node bottom section in warm F5F1EE */}
                  <div className="p-6 space-y-2 bg-[#F5F1EE] flex-1 flex flex-col justify-between">
                    <div className="space-y-1">
                      <p className="text-[9px] uppercase tracking-widest font-bold text-[#1A1A1A]">
                        {service.subtitle}
                      </p>
                      <h4 className="text-xl font-serif italic text-charcoal font-bold group-hover:text-gold transition-colors mt-1">
                        {service.title}
                      </h4>
                      <p className="text-xs text-stone-500 leading-relaxed font-sans line-clamp-2 pt-1">
                        {service.description}
                      </p>
                    </div>
                    
                    <div className="flex justify-between items-center pt-4 border-t border-stone-200/50 mt-4">
                      <span className="text-[10px] font-mono text-stone-400">Venue: {service.venue}</span>
                      <span className="p-2 rounded-full bg-white border border-[#D4AF37]/15 text-stone-500 group-hover:text-gold group-hover:border-gold group-hover:bg-ivory transition-all duration-300 shrink-0">
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 3. Clean Trust Engine (Google Reviews) */}
      <section ref={reviewsRef} className="bg-white">
        <div className="max-w-7xl mx-auto">
          <ReviewSection />
        </div>
      </section>

      {/* 4. Interactive Concierge Event Planner (2-Column Custom website calculator) */}
      <section ref={plannerRef} className="bg-[#FBFBFA]">
        <div className="max-w-7xl mx-auto">
          <ConciergePlanner onInquirySubmitted={handleInquiryNotification} />
        </div>
      </section>

      {/* 5. Elegant Accordion FAQs */}
      <section className="py-20 bg-white border-b border-stone-100" id="faqs">
        <div className="max-w-4xl mx-auto px-6 space-y-12">
          
          <div className="text-center max-w-md mx-auto space-y-2">
            <span className="text-[10px] font-mono tracking-[0.25em] text-gold uppercase block">Planning & Logistics</span>
            <h3 className="text-3xl font-serif text-charcoal tracking-tight font-extrabold italic">Curated Inquiries</h3>
            <p className="text-xs text-stone-400">Discretionary assistance & spatial details</p>
          </div>

          <div className="space-y-6 max-w-2xl mx-auto">
            {FAQS_DATA.map((faq) => {
              const isExpanded = expandedFaq === faq.id;
              return (
                <div key={faq.id} className="border-b border-stone-100 pb-5">
                  <button
                    id={`faq-btn-${faq.id}`}
                    onClick={() => setExpandedFaq(isExpanded ? null : faq.id)}
                    className="w-full flex justify-between items-center text-left py-3 font-serif text-base text-charcoal font-medium hover:text-gold transition-colors focus:outline-none"
                  >
                    <span className="pr-6 leading-relaxed">{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-gold shrink-0 transition-transform duration-300 ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="text-xs sm:text-sm text-stone-500 leading-relaxed font-sans pt-2 pr-4">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 6. Luxury Footer / Contact Details */}
      <footer className="bg-charcoal text-stone-300 py-16 relative overflow-hidden">
        
        {/* Soft decorative golden crest in background */}
        <div className="absolute right-10 bottom-10 w-72 h-72 rounded-full border border-gold/5 pointer-events-none flex items-center justify-center">
          <div className="w-56 h-56 rounded-full border border-gold/5" />
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-stone-800/80 pb-12">
          
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full border border-gold/40 flex items-center justify-center bg-stone-900">
                <span className="font-serif text-sm font-bold text-gold">FF</span>
              </div>
              <span className="font-serif text-base tracking-widest text-white uppercase font-semibold">Fashionista Factory</span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed font-sans max-w-sm">
              We craft majestic structural events and elite floral architectures for Pune's highest society. Experiencing a celebration should be an absolute sensory masterpiece.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-gold/10 border border-white/10 hover:border-gold/30 flex items-center justify-center text-stone-300 hover:text-gold transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-gold/10 border border-white/10 hover:border-gold/30 flex items-center justify-center text-stone-300 hover:text-gold transition-all duration-300"
                aria-label="Globe"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="md:col-span-4 space-y-4">
            <h4 className="text-[11px] font-serif font-semibold text-gold uppercase tracking-widest">
              Pune Creative Atelier
            </h4>
            <div className="space-y-3 text-xs text-stone-400 font-sans">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span className="leading-relaxed">NIBM Road, Elite Estate Quadrant, Pune, MH, India</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <span className="break-all">bentlyillionaire@gmail.com</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-3 space-y-4">
            <h4 className="text-[11px] font-serif font-semibold text-gold uppercase tracking-widest text-left">
              Quick Portals
            </h4>
            <ul className="space-y-2 text-xs text-stone-400 font-sans">
              <li>
                <button onClick={() => scrollToSection(servicesRef)} className="hover:text-gold transition-colors text-left">
                  → Asymmetric Gallery
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection(plannerRef)} className="hover:text-gold transition-colors text-left">
                  → Bespoke Planner Estimate
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection(reviewsRef)} className="hover:text-gold transition-colors text-left">
                  → Client Testimonials
                </button>
              </li>
            </ul>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-6 pt-8 flex flex-col sm:flex-row justify-between items-center text-[11px] text-stone-500 font-sans gap-4">
          <span>© 2026 Fashionista Factory Events. All Rights Reserved.</span>
          <div className="flex items-center gap-2">
            <span>Corporate Registration: MH-PNE-2026-FASHION</span>
            <span className="h-3 w-[1px] bg-stone-800 hidden sm:inline" />
            <span className="font-serif font-bold tracking-tight text-gold hidden sm:inline">5.0 ★ Rating</span>
          </div>
        </div>
      </footer>

      {/* 7. Website Permanent Desktop Floating WhatsApp Widget & Booking Hook */}
      <div className="fixed bottom-6 right-6 z-40 max-w-[340px] w-full px-4 sm:px-0">
        <button
          onClick={() => scrollToSection(plannerRef)}
          id="whatsapp-floating-hook"
          className="w-full h-14 bg-[#1A1A1A] rounded-full flex items-center justify-between pl-6 pr-3 shadow-[0_16px_40px_rgba(26,26,26,0.35)] hover:shadow-[0_20px_48px_rgba(26,26,26,0.45)] hover:bg-stone-900 active:scale-[0.98] transition-all duration-300 border border-white/10 group"
        >
          <div className="flex flex-col items-start text-left">
            <span className="text-[9px] text-white/50 uppercase tracking-[0.15em] font-medium">Available for 2026/27</span>
            <span className="text-white text-xs font-semibold tracking-wide font-serif italic">Inquire for Next Event</span>
          </div>
          
          <div className="w-8 h-8 bg-[#25D366] rounded-full flex items-center justify-center shadow-xs shrink-0 relative">
            <MessageSquare className="w-4 h-4 fill-current text-white stroke-none" />
            {/* Pulsing notification circle */}
            <span className="absolute -top-0.5 -right-0.5 flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
            </span>
          </div>
        </button>
      </div>

      {/* Lightbox Modal display */}
      <Lightbox
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onInquire={handleLightboxInquiry}
      />

    </div>
  );
}
