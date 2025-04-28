
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-b from-white to-mint-50">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 max-w-xl">
            <div className="inline-block px-3 py-1 rounded-full bg-mint-100 text-mint-700 font-medium text-sm">
              Student-Friendly Freelancing
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Get Paid for Your <span className="gradient-heading">Skills.</span> Find <span className="gradient-heading">Opportunities.</span>
            </h1>
            <p className="text-neutral-600 text-lg">
              Connect with employers, showcase your talent, and earn while you learn. JobFlowVerse makes freelancing accessible for students.
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
              <Button size="lg" asChild>
                <Link to="/signup">
                  Get Started <ArrowRight className="ml-2" size={18} />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/login">Login</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-r from-mint-500 to-mint-400 p-1">
              <div className="bg-white h-full w-full rounded-xl overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c" 
                  alt="Students working together" 
                  className="h-full w-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <p className="text-white font-medium">Students collaborating on projects</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-5 -right-5 bg-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="bg-mint-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                  $
                </div>
                <div>
                  <p className="font-medium text-sm">Get Paid</p>
                  <p className="text-neutral-600 text-xs">For Your Skills</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
