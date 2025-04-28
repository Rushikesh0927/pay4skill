
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-mint-500 to-mint-400 flex items-center justify-center">
                <span className="text-white font-bold">P4S</span>
              </div>
              <span className="font-heading font-bold text-xl text-white">Pay4Skill</span>
            </Link>
            <p className="text-neutral-300 mb-4">Get Paid for Your Skills. Find Opportunities. Deliver Talent.</p>
          </div>
          
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-neutral-300 hover:text-mint-400 transition-colors">Home</Link></li>
              <li><Link to="#about" className="text-neutral-300 hover:text-mint-400 transition-colors">About Us</Link></li>
              <li><Link to="#how-it-works" className="text-neutral-300 hover:text-mint-400 transition-colors">How It Works</Link></li>
              <li><Link to="#team" className="text-neutral-300 hover:text-mint-400 transition-colors">Meet the Team</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">For Users</h3>
            <ul className="space-y-2">
              <li><Link to="/login" className="text-neutral-300 hover:text-mint-400 transition-colors">Login</Link></li>
              <li><Link to="/signup" className="text-neutral-300 hover:text-mint-400 transition-colors">Sign Up</Link></li>
              <li><Link to="#" className="text-neutral-300 hover:text-mint-400 transition-colors">Browse Tasks</Link></li>
              <li><Link to="#" className="text-neutral-300 hover:text-mint-400 transition-colors">Post a Task</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-neutral-300">Email: info@pay4skill.com</li>
              <li className="text-neutral-300">Phone: +91 1234567890</li>
              <li className="text-neutral-300">Address: CMRCET Campus, Hyderabad, India</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-neutral-800 mt-8 pt-8 text-center">
          <p className="text-neutral-300 text-sm">
            &copy; {new Date().getFullYear()} Pay4Skill. All rights reserved.
          </p>
          <p className="text-neutral-400 text-xs mt-2">
            Developed by CMRCET - ECE 2027 Batch <br />
            Team: Sai Siddeshwar, Sowmya, Pranay, Srikar, Asvitha, Sai Venkat
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
