
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function AtsEngineDemo() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-accent/10 py-10 px-3">
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center w-full max-w-lg border border-accent/30">
        <h1 className="font-playfair text-3xl font-bold text-primary mb-2">ATS Optimization Engine (Demo)</h1>
        <p className="text-lg text-gray-700 mb-5">
          This is where your resume will be scored and optimized for ATS!
        </p>
        <p className="text-gray-500 mb-8">
          Stay tuned—full optimization and keyword analysis coming soon.
        </p>
        <Button onClick={() => navigate("/features")} className="px-6 rounded-full bg-accent text-black font-bold">
          ← Back to Features
        </Button>
      </div>
    </div>
  );
}
