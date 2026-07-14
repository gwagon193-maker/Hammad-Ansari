import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';
import { ServiceItem } from '../types';

interface LightboxProps {
  service: ServiceItem | null;
  onClose: () => void;
  onInquire: (serviceName: string) => void;
}

export default function Lightbox({ service, onClose, onInquire }: LightboxProps) {
  if (!service) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-stone-900/45 backdrop-blur-md"
        />

        {/* Content Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-stone-100 z-10 flex flex-col max-h-[85vh]"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            id="lightbox-close-btn"
            className="absolute top-4 right-4 z-20 p-1.5 rounded-full bg-white/80 hover:bg-white text-stone-700 hover:text-charcoal shadow-md transition-all border border-stone-200"
            aria-label="Close details"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Image Node */}
          <div className="relative aspect-video w-full overflow-hidden">
            <img
              src={service.imageUrl}
              alt={service.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
              <div>
                <span className="text-[10px] font-sans font-bold tracking-widest text-gold uppercase bg-black/30 backdrop-blur-xs px-2.5 py-1 rounded-full border border-gold/25">
                  {service.subtitle}
                </span>
                <h3 className="text-xl font-serif text-white mt-1.5 drop-shadow-xs">
                  {service.title}
                </h3>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="p-6 overflow-y-auto space-y-4">
            <div className="flex items-center gap-1.5 text-xs font-serif text-stone-500">
              <MapPin className="w-4 h-4 text-gold shrink-0" />
              <span>Elite Venue: <strong className="text-charcoal font-medium">{service.venue}</strong></span>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-serif font-semibold text-stone-400 uppercase tracking-widest">
                Our Signature Execution
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed font-sans">
                {service.description}
              </p>
            </div>

            {/* Event Highlights list */}
            <div className="space-y-2 bg-ivory p-3.5 rounded-xl border border-stone-200/50">
              <h4 className="text-[10px] font-serif font-bold text-gold uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Included Luxe Offerings
              </h4>
              <ul className="text-[11px] text-stone-700 space-y-1.5 font-sans">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0" />
                  <span>3D Layout Visualization & Curated Mood-board</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0" />
                  <span>Elite Vendor Contracting & Secret Sourcing</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0" />
                  <span>Precision Turnkey Site-Management</span>
                </li>
              </ul>
            </div>

            {/* CTA action */}
            <button
              onClick={() => onInquire(service.title)}
              id="lightbox-inquire-btn"
              className="w-full py-3 bg-charcoal hover:bg-charcoal/90 text-gold font-serif font-semibold text-xs tracking-wider uppercase rounded-xl transition-all duration-300 shadow-sm"
            >
              Inquire About This Service
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
