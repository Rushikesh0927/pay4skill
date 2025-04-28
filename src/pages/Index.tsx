
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/landing/HeroSection';
import AboutSection from '@/components/landing/AboutSection';
import HowItWorks from '@/components/landing/HowItWorks';
import WhyChooseUs from '@/components/landing/WhyChooseUs';
import TeamSection from '@/components/landing/TeamSection';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <AboutSection />
        <HowItWorks />
        <WhyChooseUs />
        <TeamSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
