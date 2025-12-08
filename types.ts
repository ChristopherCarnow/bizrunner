// Fix: Import React to resolve 'React' namespace usage in types
import React from 'react';

export interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface QuoteRequest {
  origin: string;
  destination: string;
  weight: string;
  urgency: 'Standard' | 'Express' | 'Critical';
  type: string;
}

export interface QuoteResponse {
  price: number;
  eta: string;
  details: QuoteRequest;
}

export enum SectionId {
  HOME = 'home',
  SERVICES = 'services',
  ABOUT = 'about',
  CONTACT = 'contact',
  QUOTE = 'quote'
}