import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { REVIEWS_DATA } from '../data';

export default function ReviewSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % REVIEWS_DATA.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + REVIEWS_DATA.length) % REVIEWS_DATA.length);
  };

  const currentReview = REVIEWS_DATA[activeIndex];

  return (
    <div className="py-20 px-6 bg-white border-y border-stone-100" id="trust-engine">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-12">
          {/* Rating Header */}
          <div className="flex items-center justify-center gap-1.5 text-gold mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-current stroke-none" />
            ))}
          </div>
          <div className="text-3xl sm:text-4xl font-serif tracking-tight text-charcoal font-bold italic mb-2">5.0 Client Rating</div>
          <p className="text-xs font-sans tracking-widest uppercase text-stone-400">
            24 Verified High Society Appreciations
          </p>
        </div>

        {/* Review Card Slider */}
        <div className="relative min-h-[220px] flex flex-col justify-between bg-[#FBFBFA] border border-[#D4AF37]/10 p-8 sm:p-12 rounded-3xl shadow-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentReview.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex-1"
            >
              {/* Elegant Quote Block with thin gold border */}
              <div className="pl-6 border-l-[3px] border-gold py-1">
                <Quote className="w-10 h-10 text-gold/20 -mt-4 mb-3" />
                <p className="text-base sm:text-lg italic leading-relaxed text-stone-700 font-serif">
                  "{currentReview.content}"
                </p>
                
                <div className="mt-6 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-sm font-serif font-bold text-gold shrink-0">
                    {currentReview.initials}
                  </div>
                  <div>
                    <h4 className="text-sm font-serif font-semibold text-charcoal tracking-wide">
                      {currentReview.author}
                    </h4>
                    <p className="text-xs text-stone-400 font-sans uppercase tracking-wider">
                      {currentReview.role} • {currentReview.date}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Indicators and Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-stone-150/50">
            <div className="flex gap-1.5">
              {REVIEWS_DATA.map((_, idx) => (
                <button
                  key={idx}
                  id={`review-dot-${idx}`}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeIndex === idx ? 'bg-gold w-6' : 'bg-stone-200'
                  }`}
                  aria-label={`Go to review ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                id="review-prev"
                onClick={handlePrev}
                className="p-2 rounded-full border border-stone-200 text-stone-600 hover:text-white hover:bg-gold hover:border-gold transition-all duration-300"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                id="review-next"
                onClick={handleNext}
                className="p-2 rounded-full border border-stone-200 text-stone-600 hover:text-white hover:bg-gold hover:border-gold transition-all duration-300"
                aria-label="Next review"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
