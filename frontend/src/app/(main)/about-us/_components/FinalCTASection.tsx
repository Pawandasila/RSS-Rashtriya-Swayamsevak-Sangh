import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import NormalButton from '@/components/common/RssButton/RssButton';

interface FinalCTASectionProps {
  finalMessage: string;
}

const FinalCTASection: React.FC<FinalCTASectionProps> = ({ finalMessage }) => {
  return (
    <section className="py-20 sm:py-24 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="relative overflow-hidden border-0 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/90"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10"></div>
          
          <CardContent className="relative z-10 p-8 sm:p-16 lg:p-24 text-center">
            <div className="max-w-5xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm text-primary-foreground px-6 py-3 rounded-full text-sm font-semibold mb-12">
                आमंत्रण
              </div>
              
              <div className="mb-8">
                <div className="text-6xl sm:text-8xl lg:text-9xl font-bold text-primary-foreground/20 mb-4">&ldquo;</div>
              </div>
              
              <h2 className="text-2xl sm:text-3xl lg:text-5xl xl:text-6xl font-bold mb-8 lg:mb-12 leading-tight text-primary-foreground">
                {finalMessage}
              </h2>
              
              <div className="mb-8">
                <div className="text-6xl sm:text-8xl lg:text-9xl font-bold text-primary-foreground/20 rotate-180">&rdquo;</div>
              </div>
              
              <div className="border-t border-primary-foreground/30 pt-8 lg:pt-12">
                <p className="text-lg sm:text-xl lg:text-2xl text-primary-foreground/90 leading-relaxed mb-12 max-w-4xl mx-auto">
                  हमारे साथ जुड़कर भारत के उज्ज्वल भविष्य का निर्माण करें। सेवा, समर्पण और संकल्प के साथ।
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Link href="/contact-us">
                    <NormalButton 
                      variant="secondary" 
                      size="lg" 
                      className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-bold px-10 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 rounded-xl w-full sm:w-auto"
                    >
                      संपर्क करें
                    </NormalButton>
                  </Link>
                  <Link href="/donate-now">
                    <NormalButton 
                      variant="outline" 
                      size="lg" 
                      className="border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary backdrop-blur-sm font-bold px-10 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 rounded-xl w-full sm:w-auto"
                    >
                      दान करें
                    </NormalButton>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default FinalCTASection;