import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Check, HelpCircle, PhoneCall, Gift } from 'lucide-react';
import { EVENT_TYPES, REGIONS, DECOR_ADDONS } from '../data';

interface ConciergePlannerProps {
  onInquirySubmitted?: (message: string) => void;
}

export default function ConciergePlanner({ onInquirySubmitted }: ConciergePlannerProps) {
  const [selectedType, setSelectedType] = useState('wedding');
  const [selectedRegion, setSelectedRegion] = useState('nibm');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['floral', 'lighting']);
  const [guestCount, setGuestCount] = useState(150);

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Calculate dynamic estimated budget
  const estimatedBudget = useMemo(() => {
    const baseType = EVENT_TYPES.find((t) => t.id === selectedType);
    const basePrice = baseType ? baseType.basePrice : 0;

    const regionObj = REGIONS.find((r) => r.id === selectedRegion);
    const regionPremium = regionObj ? regionObj.premium : 0;

    const addonsSum = selectedAddons.reduce((sum, addonId) => {
      const addon = DECOR_ADDONS.find((a) => a.id === addonId);
      return sum + (addon ? addon.price : 0);
    }, 0);

    // Guest scaling factor: simple mock logic (e.g., ₹250 per guest above 50)
    const guestPremium = Math.max(0, guestCount - 50) * 400;

    return basePrice + regionPremium + addonsSum + guestPremium;
  }, [selectedType, selectedRegion, selectedAddons, guestCount]);

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Compile the inquiry text
  const inquiryMessage = useMemo(() => {
    const typeLabel = EVENT_TYPES.find((t) => t.id === selectedType)?.label || selectedType;
    const regionLabel = REGIONS.find((r) => r.id === selectedRegion)?.label || selectedRegion;
    const addonsLabels = selectedAddons
      .map((id) => DECOR_ADDONS.find((a) => a.id === id)?.label)
      .filter(Boolean)
      .join(', ');

    const formattedBudget = formatCurrency(estimatedBudget);

    return `Hello Fashionista Factory Events,\n\nI would like to inquire about planning an elite event with your agency:\n\n✨ Event Concept: ${typeLabel}\n📍 Preferred Location: ${regionLabel}\n👥 Estimated Guests: ${guestCount}\n🌟 Tailored Upgrades: ${addonsLabels || 'Standard Luxury Curation'}\n💎 Dynamic Budget Range: ${formattedBudget}\n\nPlease let me know your availability for a bespoke consultation! Thank you.`;
  }, [selectedType, selectedRegion, selectedAddons, guestCount, estimatedBudget]);

  // WhatsApp redirection link
  const whatsappUrl = useMemo(() => {
    // Standard phone number format. We can direct to their business line.
    // The user's prompt mentions bentlyillionaire@gmail.com, we will redirect WhatsApp using a standard Indian code
    const phone = '919876543210'; // Representative business number
    return `https://wa.me/${phone}?text=${encodeURIComponent(inquiryMessage)}`;
  }, [inquiryMessage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onInquirySubmitted) {
      onInquirySubmitted(inquiryMessage);
    } else {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="py-20 px-6 bg-ivory border-y border-stone-100" id="planner-estimator">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-12 max-w-xl mx-auto space-y-2">
          <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1 bg-gold/10 border border-gold/20 rounded-full text-xs font-serif font-medium text-gold tracking-wide">
            <Sparkles className="w-3.5 h-3.5" /> Premium Event Curator
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-charcoal font-bold italic tracking-tight">Bespoke Concierge Planner</h2>
          <p className="text-xs sm:text-sm text-stone-500 font-sans leading-relaxed">
            Configure your dream event specifications below to instantly project a luxury design budget and coordinate directly with our principal designers.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column - Steps (Col Span 7) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Step 1: Event Type */}
            <div className="space-y-3">
              <label className="block text-xs font-serif font-bold uppercase tracking-widest text-stone-500">
                1. Select Event Scale & Concept
              </label>
              <div className="grid grid-cols-2 gap-3">
                {EVENT_TYPES.map((type) => (
                  <button
                    type="button"
                    key={type.id}
                    id={`event-type-${type.id}`}
                    onClick={() => setSelectedType(type.id)}
                    className={`py-3.5 px-4 rounded-xl text-left border text-xs sm:text-sm transition-all duration-300 ${
                      selectedType === type.id
                        ? 'border-gold bg-white shadow-sm ring-1 ring-gold/20 text-charcoal font-semibold'
                        : 'border-stone-200 bg-white/40 text-stone-600 hover:border-stone-300'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Location Region */}
            <div className="space-y-3">
              <label className="block text-xs font-serif font-bold uppercase tracking-widest text-stone-500">
                2. Elite Venue Sector
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {REGIONS.map((region) => (
                  <button
                    type="button"
                    key={region.id}
                    id={`region-${region.id}`}
                    onClick={() => setSelectedRegion(region.id)}
                    className={`py-3 px-4 rounded-xl text-left border text-xs sm:text-sm flex items-center justify-between transition-all duration-300 ${
                      selectedRegion === region.id
                        ? 'border-gold bg-white shadow-sm text-charcoal font-semibold'
                        : 'border-stone-200 bg-white/40 text-stone-600 hover:border-stone-300'
                    }`}
                  >
                    <span>{region.label}</span>
                    {selectedRegion === region.id && (
                      <Check className="w-4 h-4 text-gold" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Guest Scale */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-xs font-serif font-bold uppercase tracking-widest text-stone-500">
                  3. Expected Guest Invitation Scale
                </label>
                <span className="text-xs sm:text-sm font-mono text-gold font-bold">
                  {guestCount} Guests
                </span>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
                <input
                  type="range"
                  id="guest-slider"
                  min="20"
                  max="1000"
                  step="10"
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full h-1.5 bg-stone-100 rounded-lg appearance-none cursor-pointer accent-gold"
                />
                <div className="flex justify-between text-[10px] sm:text-xs text-stone-400 font-mono mt-3">
                  <span>20</span>
                  <span>250</span>
                  <span>500</span>
                  <span>750</span>
                  <span>1000+</span>
                </div>
              </div>
            </div>

            {/* Step 4: Addons */}
            <div className="space-y-3">
              <label className="block text-xs font-serif font-bold uppercase tracking-widest text-stone-500">
                4. Tailored Upgrade Curations (Select Multiple)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {DECOR_ADDONS.map((addon) => {
                  const isSelected = selectedAddons.includes(addon.id);
                  return (
                    <button
                      type="button"
                      key={addon.id}
                      id={`addon-${addon.id}`}
                      onClick={() => toggleAddon(addon.id)}
                      className={`p-3.5 rounded-xl border text-left transition-all duration-300 flex items-center justify-between bg-white ${
                        isSelected
                          ? 'border-gold bg-gold/5 shadow-xs'
                          : 'border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors ${
                            isSelected
                              ? 'border-gold bg-gold text-white'
                              : 'border-stone-300'
                          }`}
                        >
                          {isSelected && <Check className="w-2.5 h-2.5 text-white" />}
                        </div>
                        <span className="text-xs sm:text-sm text-charcoal font-medium">
                          {addon.label}
                        </span>
                      </div>
                      <span className="text-[10px] sm:text-xs font-mono text-stone-400">
                        +{formatCurrency(addon.price)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column - Sticky Live Pricing Card (Col Span 5) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="p-6 sm:p-8 rounded-3xl bg-charcoal text-white space-y-6 shadow-2xl border border-gold/15 relative overflow-hidden">
              
              {/* Subtle background luxury mesh effect */}
              <div className="absolute right-0 top-0 w-32 h-32 bg-gold/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-stone-400 block">
                  Interactive Projection Estimate
                </span>
                <div className="text-3xl sm:text-4xl font-serif text-gold font-bold tracking-tight">
                  {formatCurrency(estimatedBudget)}
                </div>
              </div>

              <div className="h-[1px] bg-white/10" />

              <div className="space-y-4">
                <p className="text-xs text-stone-300 leading-relaxed font-sans italic">
                  *All visual estimations include high-end coordination, venue architectural mapping, custom vendor sourcing, and principal Fashionista design supervision.
                </p>
                
                <div className="space-y-2 text-xs text-stone-400">
                  <div className="flex justify-between">
                    <span>Base Estimate</span>
                    <span className="font-mono text-stone-200">
                      {formatCurrency(EVENT_TYPES.find((t) => t.id === selectedType)?.basePrice || 0)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Venue Premium</span>
                    <span className="font-mono text-stone-200">
                      {formatCurrency(REGIONS.find((r) => r.id === selectedRegion)?.premium || 0)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Guest Scaling Additions</span>
                    <span className="font-mono text-stone-200">
                      {formatCurrency(Math.max(0, guestCount - 50) * 400)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  id="planner-submit-btn"
                  className="w-full py-4 bg-gold hover:bg-[#c5a030] text-charcoal font-serif font-bold text-sm tracking-widest uppercase rounded-full shadow-lg transition-all duration-300 flex items-center justify-center gap-2 border border-white/15"
                >
                  <PhoneCall className="w-4 h-4" /> Secure Consult on WhatsApp
                </button>
              </div>

            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
