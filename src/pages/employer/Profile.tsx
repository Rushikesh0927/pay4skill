
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Building, Mail, Phone, MapPin } from 'lucide-react';

const EmployerProfile = () => {
  return (
    <DashboardLayout userRole="employer">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Company Profile</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-24 h-24 rounded-full bg-neutral-100 flex items-center justify-center">
                <Building className="w-12 h-12 text-neutral-500" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Tech Corp</h2>
                <p className="text-neutral-500">Software Development Company</p>
              </div>
            </div>
            
            <div className="grid gap-4 mt-4">
              <div className="flex items-center space-x-2 text-neutral-600">
                <Mail className="w-4 h-4" />
                <span>contact@techcorp.com</span>
              </div>
              <div className="flex items-center space-x-2 text-neutral-600">
                <Phone className="w-4 h-4" />
                <span>+1 234 567 890</span>
              </div>
              <div className="flex items-center space-x-2 text-neutral-600">
                <MapPin className="w-4 h-4" />
                <span>San Francisco, USA</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Company Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-neutral-600">
              Tech Corp is a leading software development company specializing in web and mobile applications.
              We're committed to providing opportunities for talented students to gain real-world experience
              while contributing to meaningful projects.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default EmployerProfile;
