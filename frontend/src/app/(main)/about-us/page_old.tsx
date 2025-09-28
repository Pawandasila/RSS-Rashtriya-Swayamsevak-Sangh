"use client";

import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { aboutPageData } from './about';
import Link from 'next/link';
import NormalButton from '@/components/common/RssButton/RssButton';
import { Heart, Shield, Star, Target, Zap } from 'lucide-react';

const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      
      
      <section className="relative py-20 lg:py-28 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-8 bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30">
            राष्ट्रीय सेवा संघ भारतवर्ष
          </Badge>
          <h1 className="text-4xl lg:text-6xl font-bold mb-8 leading-tight">
            {aboutPageData.mainTitle}
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-4xl mx-auto leading-relaxed">
            सेवा, समर्पण और राष्ट्र के प्रति हमारी अटूट प्रतिबद्धता का परिचय
          </p>
        </div>
      </section>

      
      <section className="py-16 -mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="overflow-hidden shadow-2xl">
            <Image
              src={aboutPageData.primaryImage.url}
              alt={aboutPageData.primaryImage.alt}
              width={2048}
              height={1279}
              className="w-full h-[500px] lg:h-[600px] object-cover"
              priority
            />
          </Card>
        </div>
      </section>

      
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-xl bg-gradient-to-br from-card to-muted/30">
            <CardContent className="p-12 lg:p-16">
              <div className="text-center mb-12">
                <blockquote className="text-2xl lg:text-3xl font-bold text-foreground mb-8 leading-relaxed">
                  "{aboutPageData.introduction.mainQuote}"
                </blockquote>
                <Badge variant="secondary" className="px-6 py-3 text-base font-semibold">
                  स्थापना: {aboutPageData.introduction.foundingDate}
                </Badge>
              </div>
              
              <div className="space-y-6 text-center lg:text-justify">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  <strong className="text-primary font-bold">राष्ट्रीय सेवा संघ भारतवर्ष</strong> {aboutPageData.introduction.description}
                </p>
                <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg">
                  <p className="text-primary font-semibold text-lg leading-relaxed">
                    राष्ट्रीय सेवा संघ का प्रत्येक धर्म रक्षक, वेद और उपनिषदों में निहित सनातन सत्य को आत्मसात कर, भारतवर्ष की एकता, अखंडता और सांस्कृतिक गरिमा की रक्षा हेतु पूर्ण समर्पण भाव से सेवा कार्य में संलग्न है।
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      
      <section className="py-16 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                  {aboutPageData.sections.whoWeAre.title}
                </h2>
              </div>
              <div className="space-y-6">
                {aboutPageData.sections.whoWeAre.content.map((item, index) => (
                  <Card key={index} className="p-6 shadow-sm hover:shadow-md transition-shadow">
                    <p className="text-muted-foreground leading-relaxed">{item}</p>
                  </Card>
                ))}
              </div>
            </div>
            <div className="relative">
              <Card className="overflow-hidden shadow-xl">
                <Image
                  src="https://joinrss.org.in/wp-content/uploads/2025/06/Picsart_25-01-11_02-12-39-485.webp"
                  alt="RSS Banner"
                  width={1600}
                  height={533}
                  className="w-full h-auto object-cover"
                />
              </Card>
            </div>
          </div>
        </div>
      </section>

      
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-xl bg-gradient-to-br from-card to-muted/30">
            <CardContent className="p-12 lg:p-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-8">
                  {aboutPageData.sections.whyDifferent.title}
                </h2>
                <Badge variant="outline" className="bg-primary/10 border-primary/20 text-primary px-8 py-4 text-lg font-bold">
                  {aboutPageData.sections.whyDifferent.motto}
                </Badge>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {aboutPageData.sections.whyDifferent.content.map((item, index) => (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow border-l-4 border-l-primary">
                    <p className="text-muted-foreground leading-relaxed">{item}</p>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      
      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              {aboutPageData.sections.whyWeExist.title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              हमारे अस्तित्व का उद्देश्य और समाज के कल्याण के लिए हमारा दृष्टिकोण
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mb-16">
            {aboutPageData.sections.whyWeExist.content.map((item, index) => (
              <div key={index} className="group bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-border/50 hover:border-primary/20">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-muted-foreground font-medium leading-relaxed group-hover:text-foreground transition-colors">{item}</p>
                </div>
              </div>
            ))}
          </div>

          <Card className="bg-gradient-to-r from-destructive via-destructive/90 to-destructive text-destructive-foreground shadow-2xl">
            <CardContent className="p-8 lg:p-12 text-center space-y-6">
              <div className="flex justify-center">
                <Shield className="h-16 w-16 text-destructive-foreground/80" />
              </div>
              <div className="space-y-4">
                <p className="text-lg font-semibold">
                  हम उस अंधकार के विरुद्ध हैं जो हमारे धर्म को क्षीण कर रहा है।
                </p>
                <p className="text-lg font-semibold">
                  हम उस अन्याय के विरुद्ध हैं जो हमारी बहनों, माताओं और मंदिरों पर हो रहा है।
                </p>
                <p className="text-lg font-semibold">
                  हम उस विस्मृति के विरुद्ध हैं जो हमें हमारी संस्कृति, वेद, उपनिषद और गुरुकुलों से दूर ले जा रही है।
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      
      <section className="py-12 lg:py-16 bg-gradient-to-br from-foreground to-foreground/90 text-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-primary">
              {aboutPageData.sections.ourCall.title}
            </h2>
            <p className="text-xl mb-8 text-background/90">आज समय है —</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {aboutPageData.sections.ourCall.points.map((point, index) => (
              <div key={index} className="flex items-start space-x-4 p-6 bg-background/10 rounded-xl backdrop-blur-sm">
                <span className="text-primary font-bold text-2xl flex-shrink-0">👉</span>
                <p className="text-background/90 text-lg leading-relaxed">{point}</p>
              </div>
            ))}
          </div>

          <Card className="bg-gradient-to-r from-primary via-primary/90 to-accent border-0 text-primary-foreground shadow-2xl">
            <CardContent className="p-8 lg:p-12 text-center">
              <h3 className="text-2xl lg:text-3xl font-bold mb-6">न दैन्यं न पलायनम्</h3>
              <p className="text-lg lg:text-xl leading-relaxed">
                {aboutPageData.sections.ourCall.conclusion}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              {aboutPageData.sections.goals.title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              हमारे संगठन के मुख्य लक्ष्य और उद्देश्य जो समाज के कल्याण के लिए हैं
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {aboutPageData.sections.goals.objectives.map((objective, index) => (
              <Card key={index} className="group shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-t-primary bg-gradient-to-br from-card to-card/80 hover:border-t-accent">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-bold group-hover:bg-primary/20 transition-colors">
                      {index + 1}
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-foreground transition-colors">{objective}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-12 lg:py-16 bg-gradient-to-br from-primary via-primary/90 to-accent text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-8">
              {aboutPageData.sections.yourRole.title}
            </h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {aboutPageData.sections.yourRole.content.map((content, index) => (
              <div key={index} className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-6">
                <p className="text-lg leading-relaxed text-primary-foreground/90">
                  {content}
                </p>
              </div>
            ))}
          </div>

          <Card className="bg-primary-foreground/10 backdrop-blur border-primary-foreground/20">
            <CardContent className="p-8 lg:p-12 text-center">
              <h3 className="text-2xl font-bold mb-6 text-primary-foreground">
                {aboutPageData.sections.yourRole.callToAction}
              </h3>
              <p className="text-lg mb-8 text-primary-foreground/90">
                अब समय केवल देखने का नहीं, कुछ करने का है।<br/>
                सेवा ही धर्म है — और यही राष्ट्र का भाग्य बदल सकता है।
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/join-us">
                  <NormalButton 
                    variant="secondary" 
                    size="lg" 
                    className="bg-background text-foreground hover:bg-background/90 font-semibold px-8 py-3"
                  >
                    हमसे जुड़ें
                  </NormalButton>
                </Link>
                <Link href="/contact">
                  <NormalButton 
                    variant="outline" 
                    size="lg" 
                    className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary px-8 py-3"
                  >
                    संपर्क करें
                  </NormalButton>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      
      <section className="py-12 lg:py-16 bg-gradient-to-br from-foreground to-muted-foreground text-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <div className="flex justify-center space-x-6 mb-8">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                <Target className="h-8 w-8 text-primary" />
              </div>
            </div>
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold text-primary mb-8 leading-tight">
            "{aboutPageData.finalMessage}"
          </h2>
          <div className="max-w-2xl mx-auto">
            <p className="text-lg text-background/80 leading-relaxed">
              हमारे साथ जुड़कर भारत के उज्ज्वल भविष्य का निर्माण करें। सेवा, समर्पण और संकल्प के साथ।
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutUsPage;
