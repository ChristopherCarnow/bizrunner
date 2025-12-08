import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { SectionId } from '../types';

interface HeroProps {
  scrollToSection: (id: SectionId) => void;
}

export const Hero: React.FC<HeroProps> = ({ scrollToSection }) => {
  return (
    <section id={SectionId.HOME} className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=2075&auto=format&fit=crop" 
          alt="Delivery truck on Western Cape road" 
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/40"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 border border-brand-400/30 text-brand-100 mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-green-400"></span>
            <span className="text-sm font-medium tracking-wide">Operating across the Western Cape</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
            Seamless B2B Logistics <br/>
            <span className="text-brand-400">for Your Business.</span>
          </h1>

          <p className="text-slate-200 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed font-light">
            BizRunner is the trusted courier partner for businesses in Cape Town and surrounds. 
            We handle your deliveries with professional care, so you can focus on growing your business.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <button 
              onClick={() => scrollToSection(SectionId.CONTACT)}
              className="group flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white px-8 py-4 rounded-md font-bold text-lg transition-all shadow-lg hover:translate-y-[-2px]"
            >
              Get a Quote
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button 
              onClick={() => scrollToSection(SectionId.SERVICES)}
              className="flex items-center gap-2 px-8 py-4 rounded-md font-bold text-lg text-white border border-white/20 hover:bg-white/10 transition-all backdrop-blur-sm"
            >
              View Services
            </button>
          </div>

          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-brand-400" />
              <span>Same-Day Cape Town</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-brand-400" />
              <span>Real-Time Tracking</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-brand-400" />
              <span>Vendor Accounts</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};