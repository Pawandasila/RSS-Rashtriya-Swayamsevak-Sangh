import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface IntroductionSectionProps {
  introduction: {
    mainQuote: string;
    foundingDate: string;
    description: string;
  };
}

const IntroductionSection: React.FC<IntroductionSectionProps> = ({ introduction }) => {
  return (
    <section className="py-20 sm:py-24 lg:py-28 bg-muted/30 relative">
     
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="shadow-2xl border-0 bg-gradient-to-br from-background via-background/95 to-background/90 backdrop-blur-sm overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5"></div>
          <CardContent className="relative z-10 p-8 sm:p-12 lg:p-20">
            <div className="text-center mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-full text-sm font-semibold mb-8">
                प्रस्तावना
              </div>
              
              <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-8 sm:mb-12 leading-relaxed max-w-5xl mx-auto">
                <span className="text-primary">&ldquo;</span>
                {introduction.mainQuote}
                <span className="text-primary">&rdquo;</span>
              </blockquote>
              
              <div className="flex justify-center">
                <Badge className="bg-gradient-to-r from-primary/20 to-secondary/20 text-foreground border-primary/30 px-6 py-4 text-base font-semibold rounded-xl shadow-lg">
                  <span className="font-bold text-primary">स्थापना:</span>
                  <span className="ml-2">{introduction.foundingDate}</span>
                </Badge>
              </div>
            </div>
            
            <div className="space-y-8 max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-background to-muted/50 p-8 rounded-2xl border border-border/50 shadow-lg">
                <p className="text-lg sm:text-xl leading-relaxed text-muted-foreground text-center lg:text-justify">
                  <strong className="text-primary font-bold text-xl">राष्ट्रीय सेवा संघ भारतवर्ष</strong> {introduction.description}
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 border-l-4 border-primary p-8 rounded-r-2xl shadow-lg">
                <p className="text-primary font-semibold text-lg sm:text-xl leading-relaxed text-center lg:text-justify">
                  राष्ट्रीय सेवा संघ का प्रत्येक धर्म रक्षक, वेद और उपनिषदों में निहित सनातन सत्य को आत्मसात कर, भारतवर्ष की एकता, अखंडता और सांस्कृतिक गरिमा की रक्षा हेतु पूर्ण समर्पण भाव से सेवा कार्य में संलग्न है।
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default IntroductionSection;