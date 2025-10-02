import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Heart, Shield, CreditCard, Sparkles } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative py-20 lg:py-28 bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground overflow-hidden">
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="text-center">
          <div className="flex justify-center mb-8">
            <Badge className="hero-badge text-primary-foreground border-primary-foreground/20 px-6 py-3 text-base font-medium">
              <Heart className="w-5 h-5 mr-2 animate-pulse" />
              दान करें - सेवा करें
              <Sparkles className="w-4 h-4 ml-2" />
            </Badge>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-8 leading-relaxed py-2">
            <span className="text-primary-foreground drop-shadow-sm">
              राष्ट्र सेवा में
            </span>
            <br />
            <span className="text-primary-foreground">योगदान करें</span>
          </h1>
          
          <p className="text-lg lg:text-xl text-primary-foreground/90 max-w-4xl mx-auto leading-relaxed mb-12 font-medium">
            आपका हर योगदान समाज सेवा, शिक्षा और राष्ट्रीय एकता के कार्यों में उपयोग होता है।
            <br className="hidden sm:block" />
            एक बेहतर समाज के निर्माण में अपना योगदान दें।
          </p>
          
          <div className="flex flex-wrap justify-center gap-8 text-sm lg:text-base">
            <div className="flex items-center gap-3 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-4 py-2 border border-primary-foreground/20">
              <Shield className="w-5 h-5 text-primary-foreground/90" />
              <span className="font-medium">100% सुरक्षित भुगतान</span>
            </div>
            <div className="flex items-center gap-3 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-4 py-2 border border-primary-foreground/20">
              <CreditCard className="w-5 h-5 text-primary-foreground/90" />
              <span className="font-medium">त्वरित और आसान</span>
            </div>
            <div className="flex items-center gap-3 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-4 py-2 border border-primary-foreground/20">
              <Heart className="w-5 h-5 text-primary-foreground/90" />
              <span className="font-medium">पारदर्शी उपयोग</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-8 lg:h-12 text-background" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,120 C150,60 350,0 600,0 C850,0 1050,60 1200,120 L1200,120 L0,120 Z" fill="currentColor"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;