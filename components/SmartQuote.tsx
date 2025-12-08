import React, { useState } from 'react';
import { Sparkles, ArrowRight, Package, Calendar, MapPin, Loader2 } from 'lucide-react';
import { parseLogisticsRequest } from '../services/geminiService';
import { QuoteRequest } from '../types';

export const SmartQuote: React.FC = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [quote, setQuote] = useState<QuoteRequest | null>(null);
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setQuote(null);
    setEstimatedPrice(null);

    const result = await parseLogisticsRequest(input);
    
    if (result) {
      setQuote(result);
      // Mock pricing logic based on extracted data
      const basePrice = 50;
      const urgencyMultiplier = result.urgency === 'Critical' ? 3 : result.urgency === 'Express' ? 1.5 : 1;
      setEstimatedPrice(Math.floor(basePrice * urgencyMultiplier + (Math.random() * 50)));
    }

    setLoading(false);
  };

  return (
    <section id="quote" className="py-24 bg-brand-950 relative overflow-hidden">
       {/* Decorative */}
       <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-900 skew-x-12 opacity-50 z-0 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">AI Dispatch Interface</h2>
          <p className="text-slate-400">Don't fill out 20 form fields. Just tell us what you need. Our neural engine handles the rest.</p>
        </div>

        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700 rounded-2xl p-6 md:p-10 shadow-2xl">
          <form onSubmit={handleAnalyze} className="relative">
            <div className="relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ex: I need to ship a 200lb pallet of server racks from San Francisco to a data center in Nevada by tomorrow morning. It's fragile."
                className="w-full bg-slate-950 text-white placeholder-slate-600 border border-slate-700 rounded-xl p-6 pr-32 h-32 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 resize-none font-mono text-sm leading-relaxed"
              />
              <button
                type="submit"
                disabled={loading || !input}
                className="absolute bottom-4 right-4 bg-brand-600 hover:bg-brand-500 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                ANALYZE
              </button>
            </div>
          </form>

          {quote && estimatedPrice && (
            <div className="mt-8 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Extracted Details */}
                <div className="bg-slate-950 rounded-xl p-6 border border-slate-800">
                  <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">Mission Parameters</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-brand-500 mt-1" />
                      <div>
                        <p className="text-xs text-slate-500">Route</p>
                        <p className="text-white font-mono">{quote.origin} <span className="text-slate-600">→</span> {quote.destination}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Package className="w-5 h-5 text-blue-500 mt-1" />
                      <div>
                        <p className="text-xs text-slate-500">Payload</p>
                        <p className="text-white font-medium">{quote.type} ({quote.weight})</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-red-500 mt-1" />
                      <div>
                        <p className="text-xs text-slate-500">Priority Level</p>
                        <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold mt-1 ${
                          quote.urgency === 'Critical' ? 'bg-red-500/20 text-red-400' : 
                          quote.urgency === 'Express' ? 'bg-yellow-500/20 text-yellow-400' : 
                          'bg-blue-500/20 text-blue-400'
                        }`}>
                          {quote.urgency.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Estimate Card */}
                <div className="bg-gradient-to-br from-brand-900 to-brand-950 rounded-xl p-6 border border-brand-700/50 flex flex-col justify-between">
                  <div>
                    <h3 className="text-brand-200 text-xs font-bold uppercase tracking-wider mb-2">Estimated Rate</h3>
                    <div className="text-4xl font-mono font-bold text-white mb-1">${estimatedPrice}.00</div>
                    <p className="text-brand-300/60 text-xs">Plus applicable fuel surcharges</p>
                  </div>
                  
                  <button className="w-full mt-6 bg-white text-brand-950 font-bold py-3 rounded-lg hover:bg-brand-50 transition-colors flex justify-center items-center gap-2">
                    Book Shipment <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};