
import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '@/components/auth/LoginForm';

const Login = () => {
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <Link to="/" className="inline-flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-mint-500 to-mint-400 flex items-center justify-center">
                <span className="text-white font-bold">P4S</span>
              </div>
              <span className="font-heading font-bold text-xl">Pay4Skill</span>
            </Link>
          </div>
          
          <LoginForm />
          
          <div className="mt-8 text-center">
            <Link to="/" className="text-sm text-neutral-500 hover:text-mint-600">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
