
import React from 'react';
import { Shield, Users, Star, Settings } from 'lucide-react';

const WhyChooseUs = () => {
  const features = [
    {
      title: "Secure Transactions",
      description: "Our payment verification system ensures both parties are protected throughout the process.",
      icon: <Shield className="h-6 w-6 text-mint-500" />,
    },
    {
      title: "Verified Users",
      description: "All accounts are verified to ensure legitimate opportunities and qualified students.",
      icon: <Users className="h-6 w-6 text-mint-500" />,
    },
    {
      title: "Rating System",
      description: "Build your reputation with our transparent rating and review system for both parties.",
      icon: <Star className="h-6 w-6 text-mint-500" />,
    },
    {
      title: "Easy to Use",
      description: "Our intuitive platform makes it simple to post tasks, find opportunities, and communicate.",
      icon: <Settings className="h-6 w-6 text-mint-500" />,
    },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Why Choose JobFlowVerse</h2>
          <p className="text-neutral-600">
            We've designed our platform specifically for the student-employer relationship, with features that benefit both sides.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-6 shadow-sm border border-neutral-100 hover:shadow-md hover:border-mint-200 transition-all"
            >
              <div className="w-12 h-12 bg-mint-100 rounded-full flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="font-heading font-bold text-xl mb-3">{feature.title}</h3>
              <p className="text-neutral-600">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-gradient-to-r from-mint-500 to-mint-400 rounded-2xl p-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="font-heading text-2xl md:text-3xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="mb-8 text-mint-50">
              Join thousands of students already benefiting from JobFlowVerse's opportunities or post your first task as an employer.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="/signup" 
                className="inline-block px-6 py-3 bg-white text-mint-600 font-medium rounded-lg hover:bg-neutral-100 transition-colors"
              >
                Sign Up as Student
              </a>
              <a 
                href="/signup?role=employer" 
                className="inline-block px-6 py-3 bg-mint-600 text-white font-medium rounded-lg hover:bg-mint-700 transition-colors"
              >
                Sign Up as Employer
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
