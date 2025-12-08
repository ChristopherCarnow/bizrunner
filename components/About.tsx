import React from 'react';
import { SectionId } from '../types';

export const About: React.FC = () => {
  return (
    <section id={SectionId.ABOUT} className="py-24 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-block px-3 py-1 rounded bg-brand-100 text-brand-800 text-sm font-bold mb-4">
            LOCAL EXPERTS
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Your Partner in <br/>Western Cape Logistics.</h2>
          <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
            <p>
              Based in the heart of the Western Cape, BizRunner understands the unique rhythm of local business. Whether it's navigating Cape Town traffic or reaching outlying areas like Paarl and Stellenbosch, we know the way.
            </p>
            <p>
              We aren't just a courier service; we are an extension of your business. We prioritize communication, reliability, and professional presentation. When our driver arrives at your client's door, they represent you.
            </p>
            <p>
              Simple, honest, and effective courier services for businesses that demand reliability without the jargon.
            </p>
          </div>
          
          <div className="mt-8 flex gap-8 border-t border-slate-200 pt-8">
            <div>
              <div className="text-3xl font-bold text-brand-600">10+</div>
              <div className="text-sm text-slate-500 font-medium">Years Experience</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-600">100%</div>
              <div className="text-sm text-slate-500 font-medium">Local Coverage</div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-brand-600 rounded-lg transform translate-x-4 translate-y-4 opacity-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070&auto=format&fit=crop" 
            alt="Cape Town Logistics" 
            className="relative rounded-lg shadow-xl w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};