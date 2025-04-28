import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff } from 'lucide-react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Firebase authentication would be integrated here
      // For now, we'll just simulate a login process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Login Successful",
        description: "Welcome back to Pay4Skill!",
      });
      
      // Check user role and redirect to appropriate dashboard
      if (email.toLowerCase().includes('admin')) {
        navigate('/admin/dashboard');
      } else if (email.toLowerCase().includes('student')) {
        navigate('/student/dashboard');
      } else if (email.toLowerCase().includes('employer')) {
        navigate('/employer/dashboard');
      } else {
        // Default to student dashboard if role is not determined
        navigate('/student/dashboard');
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Please check your credentials and try again.",
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
        <h2 className="font-heading text-2xl font-bold mb-2">Welcome Back</h2>
        <p className="text-neutral-600">Sign in to your Pay4Skill account</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="your.email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="password">Password</Label>
            <Link to="/forgot-password" className="text-sm text-mint-600 hover:underline">
              Forgot Password?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pr-10"
              required
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
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-neutral-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-mint-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
