import React from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';

interface WhoWeAreSectionProps {
  whoWeAre: {
    title: string;
    content: string[];
  };
}

const WhoWeAreSection: React.FC<WhoWeAreSectionProps> = ({ whoWeAre }) => {
  return (
    <section className="py-20 sm:py-24 lg:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-8 lg:space-y-10">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
                हमारे बारे में
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                {whoWeAre.title}
              </h2>
            </div>
            
            <div className="space-y-6">
              {whoWeAre.content.map((item, index) => (
                <Card key={index} className="group p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-background to-muted/30 hover:-translate-y-1">
                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-medium">
                      {item}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
          
          <div className="relative order-first lg:order-last">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-muted/20 to-muted/10 p-8">
              <Image
                src="https://joinrss.org.in/wp-content/uploads/2025/06/Picsart_25-01-11_02-12-39-485.webp"
                alt="RSS Banner"
                width={1600}
                height={533}
                className="w-full h-auto object-contain transform hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAreSection;