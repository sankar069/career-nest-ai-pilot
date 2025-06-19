
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import HeroSection from "../components/HeroSection";

export default function Landing() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f7f9fd] to-[#edeaff]">
      {/* New Hero Section */}
      <HeroSection />
      
      {/* Original Content - moved to bottom for context */}
      <div className="px-3 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6 text-primary">
            Accelerate Your Journey
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-8">
            Join thousands of professionals who have transformed their careers with our AI-powered platform
          </p>
          <Link
            to="/features"
            className="inline-flex items-center px-6 py-3 text-lg font-semibold bg-white text-primary border-2 border-primary rounded-full hover:bg-primary hover:text-white transition-all duration-300"
          >
            Explore Features
          </Link>
        </div>
        
        <p className="mt-16 text-gray-400 text-xs text-center">
          &copy; {new Date().getFullYear()} CareerNest AI. All rights reserved.
        </p>
      </div>
    </div>
  );
}
