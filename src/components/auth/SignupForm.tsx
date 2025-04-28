
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff } from 'lucide-react';

const SignupForm = () => {
  // Get role from URL query param if provided
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialRole = params.get('role') || '';

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: initialRole || 'student',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (value: string) => {
    setFormData(prev => ({ ...prev, role: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Firebase authentication would be integrated here
      // For now, we'll just simulate a signup process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Account created successfully",
        description: "Welcome to JobFlowVerse!",
      });
      
      // Redirect to appropriate dashboard would happen here
    } catch (error) {
      toast({
        title: "Sign up failed",
        description: "There was an error creating your account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-sm border border-neutral-100">
      <div className="text-center mb-8">
        <h2 className="font-heading text-2xl font-bold mb-2">Create an Account</h2>
        <p className="text-neutral-600">Join JobFlowVerse and start your journey</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            name="fullName"
            placeholder="John Doe"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="pr-10"
              required
              minLength={6}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            minLength={6}
          />
        </div>
        
        <div className="space-y-3">
          <Label>I am a:</Label>
          <RadioGroup 
            value={formData.role}
            onValueChange={handleRoleChange}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="student" id="student" />
              <Label htmlFor="student" className="cursor-pointer">Student</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="employer" id="employer" />
              <Label htmlFor="employer" className="cursor-pointer">Employer</Label>
            </div>
          </RadioGroup>
        </div>
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Creating Account..." : "Sign Up"}
        </Button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-neutral-600">
          Already have an account?{" "}
          <Link to="/login" className="text-mint-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
