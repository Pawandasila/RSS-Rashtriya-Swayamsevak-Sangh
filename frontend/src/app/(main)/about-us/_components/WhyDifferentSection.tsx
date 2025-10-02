import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface WhyDifferentSectionProps {
  whyDifferent: {
    title: string;
    motto: string;
    content: string[];
  };
}

const WhyDifferentSection: React.FC<WhyDifferentSectionProps> = ({ whyDifferent }) => {
  return (
    <section className="py-20 sm:py-24 lg:py-28 bg-muted/30 relative">
     <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="shadow-2xl border-0 bg-gradient-to-br from-background via-background/95 to-background/90 backdrop-blur-sm overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5"></div>
          <CardContent className="relative z-10 p-8 sm:p-12 lg:p-20">
            <div className="text-center mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-full text-sm font-semibold mb-8">
                हमारी विशेषता
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-8 leading-tight">
                {whyDifferent.title}
              </h2>
              
              <div className="flex justify-center">
                <Badge className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-8 py-4 text-lg font-bold rounded-xl shadow-lg">
                  {whyDifferent.motto}
                </Badge>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {whyDifferent.content.map((item, index) => (
                <Card key={index} className="group p-6 sm:p-8 hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-background to-muted/30 hover:-translate-y-2">
                  <div className="flex items-start gap-4">
                    <div className="w-1 h-16 bg-gradient-to-b from-primary to-primary/50 rounded-full flex-shrink-0"></div>
                    <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-medium">
                      {item}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
            
            <div className="text-center">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-muted/20 to-muted/10 p-8 max-w-5xl mx-auto">
                <Image
                  src="https://joinrss.org.in/wp-content/uploads/2025/08/WhatsApp-Image-2025-08-05-at-3.03.54-PM-scaled.webp"
                  alt="Religious Community Gathering"
                  width={1200}
                  height={800}
                  className="w-full h-auto object-contain transform hover:scale-105 transition-transform duration-700"
                />
              </div>
              
              <div className="mt-8 bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-2xl border border-primary/20 max-w-3xl mx-auto">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed font-medium">
                  हमारे संगठन में सभी आयु वर्ग के लोग शामिल हैं। हम जाति, वर्ग की सीमाओं से ऊपर उठकर एक साथ काम करते हैं।
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default WhyDifferentSection;