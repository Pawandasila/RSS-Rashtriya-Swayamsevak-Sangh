import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Shield, Users, Globe, TrendingUp } from 'lucide-react';

const impactItems = [
  {
    icon: <Heart className="w-8 h-8 text-red-500" />,
    title: "सामाजिक कल्याण",
    description: "रक्तदान शिविर, स्वास्थ्य सेवा और आपातकालीन सहायता में योगदान",
    stats: "50,000+ लाभार्थी"
  },
  {
    icon: <Users className="w-8 h-8 text-blue-500" />,
    title: "शिक्षा और प्रशिक्षण",
    description: "युवा प्रशिक्षण कार्यक्रम और चरित्र निर्माण गतिविधियों में सहयोग",
    stats: "25,000+ छात्र"
  },
  {
    icon: <Globe className="w-8 h-8 text-green-500" />,
    title: "सांस्कृतिक संरक्षण",
    description: "भारतीय संस्कृति और परंपरा के संरक्षण में योगदान",
    stats: "1,000+ कार्यक्रम"
  },
  {
    icon: <Shield className="w-8 h-8 text-purple-500" />,
    title: "राष्ट्र सेवा",
    description: "राष्ट्रीय एकता और धार्मिक मूल्यों के संवर्धन में सहयोग",
    stats: "सभी राज्यों में सक्रिय"
  },
];

const ImpactSection = () => {
  return (
    <section className="py-16 lg:py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <TrendingUp className="w-4 h-4" />
            प्रभाव और परिणाम
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
            आपका दान कैसे उपयोग होता है
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            हमारे संगठन द्वारा किए जाने वाले विभिन्न सेवा कार्यों में आपका योगदान प्रभावी रूप से उपयोग होता है।
            पारदर्शिता और जवाबदेही हमारे मुख्य सिद्धांत हैं।
          </p>
        </div>
        
        {/* Impact Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {impactItems.map((item, index) => (
            <Card 
              key={index} 
              className="group text-center p-6 bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
            >
              <CardHeader className="pb-4">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-muted rounded-xl group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                </div>
                <CardTitle className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
                <div className="pt-2 border-t border-border/50">
                  <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full">
                    {item.stats}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-xl p-8 border border-primary/20">
            <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-4">
              आज ही योगदान करें और बदलाव का हिस्सा बनें
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              आपका हर योगदान हजारों लोगों के जीवन में सकारात्मक बदलाव लाता है
            </p>
            <div className="flex justify-center">
              <div className="flex items-center gap-2 text-sm text-primary">
                <Heart className="w-4 h-4 animate-pulse" />
                <span className="font-medium">मिलकर करें समाज सेवा</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;