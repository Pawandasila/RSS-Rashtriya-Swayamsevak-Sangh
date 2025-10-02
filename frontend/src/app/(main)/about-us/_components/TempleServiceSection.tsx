import React from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';

const TempleServiceSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-24 lg:py-28 bg-muted/30 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_25%_25%,_var(--primary)_0%,_transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_75%_75%,_var(--secondary)_0%,_transparent_50%)]"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <Card className="overflow-hidden shadow-2xl border-0 bg-gradient-to-br from-background to-muted/30">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent z-10"></div>
                <Image
                  src="https://joinrss.org.in/wp-content/uploads/2025/08/WhatsApp-Image-2025-08-06-at-1.21.25-PM-e1756385010760.webp"
                  alt="Temple Visit - Devotees at Temple"
                  width={800}
                  height={600}
                  className="w-full h-[350px] sm:h-[450px] lg:h-[550px] object-cover transform hover:scale-105 transition-transform duration-700"
                />
              </div>
            </Card>
          </div>
          
          <div className="space-y-8 order-1 lg:order-2">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
                धार्मिक सेवा
              </div>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                धार्मिक आस्था और मंदिर सेवा
              </h3>
            </div>
            
            <div className="space-y-6">
              <Card className="p-6 bg-gradient-to-br from-background to-muted/30 border-0 shadow-lg">
                <p className="text-lg text-muted-foreground leading-relaxed font-medium">
                  हमारे संगठन के सदस्य नियमित रूप से मंदिरों में जाकर प्रार्थना और सेवा करते हैं। यह हमारी आध्यात्मिक शक्ति का स्रोत है।
                </p>
              </Card>
              
              <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-l-4 border-primary shadow-lg">
                <p className="text-lg text-muted-foreground leading-relaxed font-medium">
                  मंदिर केवल पूजा स्थल नहीं, बल्कि हमारी संस्कृति और परंपरा के संरक्षण का केंद्र हैं। हम मंदिरों की सुरक्षा और संरक्षण के लिए प्रतिबद्ध हैं।
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TempleServiceSection;