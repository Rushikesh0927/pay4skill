
import React from 'react';
import { CheckCircle } from 'lucide-react';

const AboutSection = () => {
  const benefits = [
    "Earn while you learn with flexible freelancing",
    "Develop real-world professional experience",
    "Build your portfolio with completed projects",
    "Connect with potential long-term employers",
    "Learn project management and client communication",
    "Secure letters of recommendation"
  ];

  return (
    <section id="about" className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">About JobFlowVerse</h2>
          <p className="text-neutral-600">
            We're building a bridge between talented students and companies seeking fresh skills and perspectives.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="bg-neutral-50 rounded-2xl p-8 relative">
            <div className="bg-gradient-to-br from-mint-500 to-mint-400 absolute top-0 left-0 h-full w-2 rounded-l-2xl"></div>
            <h3 className="font-heading font-bold text-2xl mb-6">Our Mission</h3>
            <p className="text-neutral-700 mb-6">
              JobFlowVerse was created with a simple mission: to help students transform their academic knowledge into practical experience and income, while providing businesses with access to fresh talent and innovative thinking.
            </p>
            <p className="text-neutral-700">
              We understand the challenges students face when entering the job market. That's why we've built a platform that makes it easy to showcase skills, build a portfolio, and gain real-world experience before graduation.
            </p>
          </div>
          
          <div>
            <h3 className="font-heading font-bold text-2xl mb-6">Benefits for Students</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-white rounded-lg shadow-sm border border-neutral-100">
                  <CheckCircle className="text-mint-500 shrink-0 mt-0.5" size={20} />
                  <p className="text-neutral-700">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
