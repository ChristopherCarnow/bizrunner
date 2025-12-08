import React from 'react';
import { Clock, Truck, Box, Users } from 'lucide-react';
import { SectionId } from '../types';

export const Services: React.FC = () => {
  const services = [
    {
      title: "Same-Day Distribution",
      desc: "Fast and reliable delivery within Cape Town and surrounding suburbs. Perfect for urgent documents and parcels.",
      icon: <Truck className="w-8 h-8 text-brand-600" />
    },
    {
      title: "Scheduled Routes",
      desc: "Regular pickup and delivery loops for your business. We connect your branches, suppliers, and clients daily.",
      icon: <Clock className="w-8 h-8 text-brand-600" />
    },
    {
      title: "Warehousing & Storage",
      desc: "Secure short-term storage solutions for your inventory. We pick, pack, and ship directly to your customers.",
      icon: <Box className="w-8 h-8 text-brand-600" />
    },
    {
      title: "Dedicated Fleet",
      desc: "Need a vehicle dedicated solely to your business? We provide the driver and the van, branded or unbranded.",
      icon: <Users className="w-8 h-8 text-brand-600" />
    }
  ];

  return (
    <section id={SectionId.SERVICES} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-brand-600 font-bold tracking-wider text-sm uppercase">Our Services</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-4">Tailored Logistics Solutions</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            We understand the local landscape. From the CBD to the Winelands, we keep your supply chain moving.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((s, i) => (
            <div key={i} className="group bg-slate-50 border border-slate-100 p-8 rounded-xl hover:shadow-xl hover:border-brand-200 transition-all duration-300">
              <div className="mb-6 p-4 bg-white inline-block rounded-full shadow-sm group-hover:scale-110 transition-transform">
                {s.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{s.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};