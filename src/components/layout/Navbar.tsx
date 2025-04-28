import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-mint-500 to-mint-400 flex items-center justify-center">
              <span className="text-white font-bold">P4S</span>
            </div>
            <span className="font-heading font-bold text-xl">Pay4Skill</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-neutral-700 hover:text-mint-600 transition-colors">Home</Link>
            <Link to="#about" className="text-neutral-700 hover:text-mint-600 transition-colors">About</Link>
            <Link to="#how-it-works" className="text-neutral-700 hover:text-mint-600 transition-colors">How It Works</Link>
            <Link to="#team" className="text-neutral-700 hover:text-mint-600 transition-colors">Team</Link>
          </div>
          
          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/admin">Admin</Link>
            </Button>
            <Button asChild>
              <Link to="/signup">Get Started</Link>
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu} aria-label="Menu">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-4 border-t mt-3 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-neutral-700 hover:text-mint-600 transition-colors px-2 py-2">Home</Link>
              <Link to="#about" className="text-neutral-700 hover:text-mint-600 transition-colors px-2 py-2">About</Link>
              <Link to="#how-it-works" className="text-neutral-700 hover:text-mint-600 transition-colors px-2 py-2">How It Works</Link>
              <Link to="#team" className="text-neutral-700 hover:text-mint-600 transition-colors px-2 py-2">Team</Link>
              <div className="flex flex-col space-y-2 pt-2">
                <Button variant="outline" asChild className="w-full">
                  <Link to="/login">Login</Link>
                </Button>
                <Button variant="outline" asChild className="w-full">
                  <Link to="/admin">Admin</Link>
                </Button>
                <Button asChild className="w-full">
                  <Link to="/signup">Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
