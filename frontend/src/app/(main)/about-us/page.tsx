"use client";

import React from 'react';
import { aboutPageData } from './about';
import {
  HeroSection,
  PrimaryImageSection,
  IntroductionSection,
  WhoWeAreSection,
  WhyDifferentSection,
  // WhyWeExistSection,
  TempleServiceSection,
  OurCallSection,
  // CommunityServiceSection,
  GoalsSection,
  YourRoleSection,
} from './_components';

const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-background pt-3">
      <HeroSection 
        mainTitle={aboutPageData.mainTitle} 
        subtitle="जब धर्म संकट में होता है, तब संकल्पों से संगठित होती है चेतना; और जब समाज दिशाहीन हो जाता है, तब सेवा बनती है शक्ति।" 
      />
      
      <PrimaryImageSection image={aboutPageData.primaryImage} />
      
      <IntroductionSection introduction={aboutPageData.introduction} />
      
      <WhoWeAreSection whoWeAre={aboutPageData.sections.whoWeAre} />
      
      <WhyDifferentSection whyDifferent={aboutPageData.sections.whyDifferent} />
      
      {/* <WhyWeExistSection whyWeExist={aboutPageData.sections.whyWeExist} /> */}
      
      <TempleServiceSection />
      
      <OurCallSection ourCall={aboutPageData.sections.ourCall} />
      
      {/* <CommunityServiceSection /> */}
      
      <GoalsSection goals={aboutPageData.sections.goals} />
      
      <YourRoleSection yourRole={aboutPageData.sections.yourRole} />
      
    </div>
  );
};

export default AboutUsPage;
