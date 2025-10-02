import React from 'react';
import { Badge } from '@/components/ui/badge';

interface HeroSectionProps {
  mainTitle: string;
  subtitle?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ 
  mainTitle, 
  subtitle 
}) => {
  return (
    <section className="relative py-20 sm:py-24 lg:py-32 bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center mb-8 sm:mb-12">
          <Badge className="bg-primary-foreground/10 backdrop-blur-sm text-primary-foreground border-primary-foreground/20 text-sm sm:text-base px-6 py-3 font-semibold shadow-lg">
            राष्ट्रीय सेवा संघ भारतवर्ष
          </Badge>
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 sm:mb-12 leading-tight tracking-tight">
          <span className="bg-gradient-to-r from-primary-foreground to-primary-foreground/90 bg-clip-text text-transparent drop-shadow-sm">
            {mainTitle}
          </span>
        </h1>
        
        {subtitle && (
          <p className="text-lg sm:text-xl lg:text-2xl text-primary-foreground/90 max-w-5xl mx-auto leading-relaxed font-medium">
            {subtitle}
          </p>
        )}
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