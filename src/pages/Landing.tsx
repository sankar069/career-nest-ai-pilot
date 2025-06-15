
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#f7f9fd] to-[#edeaff] px-3">
      <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-6 text-primary text-center">
        Welcome to CareerNest AI
      </h1>
      <p className="text-lg md:text-xl text-gray-700 max-w-xl mb-7 text-center">
        Accelerate your job search with AI-powered tools — resume & cover letter generator, ATS optimization, interview simulator, and more.
      </p>
      <Link
        to="/login"
        className="px-7 py-3 rounded-full text-lg font-bold bg-gradient-to-tr from-accent to-primary text-black shadow-lg hover:scale-105 transition-all"
      >
        Get Started
      </Link>
      {/* The "Go to My Dashboard" section has been removed */}
      <p className="mt-10 text-gray-400 text-xs text-center">
        &copy; {new Date().getFullYear()} CareerNest AI. All rights reserved.
      </p>
    </div>
  );
}

