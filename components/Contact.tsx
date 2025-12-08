import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Loader2, AlertCircle, ExternalLink } from 'lucide-react';
import { SectionId } from '../types';
import { send } from '@emailjs/browser';

export const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', details: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // --- CONFIGURATION ---
  const SERVICE_ID = 'service_752tqzx';
  const TEMPLATE_ID = 'template_101cvf8'; 
  const PUBLIC_KEY = 'eEzDqiApwCZeayQ39'; 
  // ---------------------

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    // Mapped exactly to your template variables: {{name}} and {{email}}
    const templateParams = {
      // 1. Specific variables requested
      name: formState.name,
      email: formState.email,
      
      // 2. Common variables (backups)
      to_name: 'BizRunner Team', 
      from_name: formState.name,
      message: formState.details,
      phone: formState.phone,
      details: formState.details
    };

    try {
      // Direct send
      await send(SERVICE_ID.trim(), TEMPLATE_ID.trim(), templateParams, PUBLIC_KEY.trim());
      
      console.log('Email sent successfully');
      setIsSubmitted(true);
      setFormState({ name: '', email: '', phone: '', details: '' });
    } catch (error: any) {
      console.error('EmailJS Raw Error:', JSON.stringify(error, null, 2));
      
      let displayError = "An unexpected error occurred.";

      if (error) {
        if (typeof error === 'object' && 'text' in error) {
          displayError = error.text;
        } 
        else if (error instanceof Error) {
          displayError = error.message;
        } 
        else if (typeof error === 'string') {
          displayError = error;
        }
        else {
          const jsonError = JSON.stringify(error);
          if (jsonError === '{}') {
             displayError = "Network request blocked. Please check your internet connection or ad-blocker.";
          } else {
             displayError = `Error details: ${jsonError}`;
          }
        }
      }

      setErrorMessage(displayError);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getMailtoLink = () => {
    const subject = encodeURIComponent(`Inquiry from ${formState.name}`);
    const body = encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\nPhone: ${formState.phone}\n\nMessage:\n${formState.details}`
    );
    return `mailto:info@bizrunner.org.za?subject=${subject}&body=${body}`;
  };

  return (
    <section id={SectionId.CONTACT} className="py-24 bg-white/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Contact Us</h2>
          <p className="text-slate-600">Get a quote or open a vendor account today.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 bg-slate-50 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
          
          {/* Info Sidebar */}
          <div className="lg:col-span-2 bg-brand-900 p-10 flex flex-col justify-between text-white">
            <div>
              <h3 className="text-2xl font-bold mb-8">Get in Touch</h3>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-brand-400 shrink-0 mt-1" />
                  <div>
                    <p className="font-bold text-lg">Cape Town Office</p>
                    <p className="text-brand-100">Unit 5, Logistics Park<br/>Montague Gardens<br/>Cape Town, 7441</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="w-6 h-6 text-brand-400 shrink-0" />
                  <div>
                    <p className="font-bold text-lg">Call Us</p>
                    <p className="text-brand-100">021 555 0123</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="w-6 h-6 text-brand-400 shrink-0" />
                  <div>
                    <p className="font-bold text-lg">Email Us</p>
                    <p className="text-brand-100">info@bizrunner.org.za</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12 pt-8 border-t border-brand-800">
              <p className="text-sm text-brand-300">Operating Hours:<br/>Mon - Fri: 08:00 - 17:00</p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3 p-10 relative">
            {isSubmitted ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white p-8 text-center animate-fade-in">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                <p className="text-slate-600 max-w-md">
                  Thank you for reaching out. A BizRunner representative will contact you at <strong>{formState.email || 'your email address'}</strong> shortly.
                </p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="mt-8 text-brand-600 font-bold hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Company Name / Contact Person</label>
                    <input 
                      type="text" 
                      name="user_name" 
                      value={formState.name}
                      onChange={(e) => setFormState({...formState, name: e.target.value})}
                      className="w-full bg-white border border-slate-300 text-slate-900 p-3 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
                      placeholder="Enter name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Email Address</label>
                    <input 
                      type="email" 
                      name="user_email" 
                      value={formState.email}
                      onChange={(e) => setFormState({...formState, email: e.target.value})}
                      className="w-full bg-white border border-slate-300 text-slate-900 p-3 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
                      placeholder="name@company.co.za"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Phone Number</label>
                    <input 
                      type="tel" 
                      name="contact_number" 
                      value={formState.phone}
                      onChange={(e) => setFormState({...formState, phone: e.target.value})}
                      className="w-full bg-white border border-slate-300 text-slate-900 p-3 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
                      placeholder="082 123 4567"
                      required
                    />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">How can we help?</label>
                  <textarea 
                    rows={4}
                    name="message" 
                    value={formState.details}
                    onChange={(e) => setFormState({...formState, details: e.target.value})}
                    className="w-full bg-white border border-slate-300 text-slate-900 p-3 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none resize-none transition-all"
                    placeholder="Tell us about your delivery needs..."
                    required
                  />
                </div>

                {errorMessage && (
                  <div className="space-y-3">
                    <div className="flex items-start gap-2 p-3 bg-red-50 text-red-700 text-sm rounded-md border border-red-100">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <p className="flex-1 font-medium break-words">
                        Failed to send: {errorMessage}
                      </p>
                    </div>
                    {/* Fallback Button */}
                    <a 
                      href={getMailtoLink()}
                      className="flex items-center justify-center gap-2 w-full p-3 bg-slate-100 text-slate-700 font-bold rounded-md hover:bg-slate-200 transition-colors border border-slate-200"
                    >
                      <Mail className="w-4 h-4" />
                      Open in Email App Instead
                      <ExternalLink className="w-3 h-3 ml-1 opacity-50" />
                    </a>
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-brand-600 text-white font-bold py-4 rounded-md hover:bg-brand-700 transition-colors flex justify-center items-center gap-2 shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>Sending... <Loader2 className="w-4 h-4 animate-spin" /></>
                  ) : (
                    <>Send Message <Send className="w-4 h-4" /></>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};