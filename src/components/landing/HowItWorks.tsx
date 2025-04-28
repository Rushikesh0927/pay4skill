
import React from 'react';
import { User, Briefcase, CheckCircle } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      title: "Create Your Profile",
      description: "Sign up and create a detailed profile showcasing your skills, experience, and education.",
      icon: <User className="w-6 h-6 text-mint-500" />,
    },
    {
      title: "Find Opportunities",
      description: "Browse available tasks that match your skills or receive task invitations from employers.",
      icon: <Briefcase className="w-6 h-6 text-mint-500" />,
    },
    {
      title: "Complete Tasks & Get Paid",
      description: "Deliver quality work on time and receive payment directly through secure payment methods.",
      icon: <CheckCircle className="w-6 h-6 text-mint-500" />,
    },
  ];

  return (
    <section id="how-it-works" className="section-padding bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-neutral-600">
            Our platform makes it simple to connect students with employers for mutually beneficial opportunities.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-6 shadow-sm border border-neutral-100 hover:shadow-md hover:border-mint-200 transition-all"
            >
              <div className="w-12 h-12 bg-mint-100 rounded-full flex items-center justify-center mb-6">
                {step.icon}
              </div>
              <h3 className="font-heading font-bold text-xl mb-3">{step.title}</h3>
              <p className="text-neutral-600">{step.description}</p>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2">
                  <div className="w-8 h-1 bg-mint-200"></div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-block px-6 py-4 rounded-xl bg-mint-50 border border-mint-200">
            <p className="text-neutral-700 font-medium">
              For Employers: Post tasks, review applications, select candidates, and approve completed work.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
