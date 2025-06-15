
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const InterviewSimulatorDemo = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-accent/10 via-white to-accent/20 px-2 py-8">
      <div className="bg-white rounded-xl shadow-xl max-w-xl w-full border border-border px-8 py-10 flex flex-col items-center animate-fade-in space-y-6">
        <h1 className="font-playfair text-3xl font-bold text-primary mb-2">AI Interview Demo</h1>
        <p className="text-gray-700 mb-6 text-center">
          This is a demo page placeholder for Interview Simulator. You can return or start a real mock interview below.
        </p>
        <Button className="mb-2 w-full" onClick={() => navigate("/interview-simulator")}>
          Return to Simulator
        </Button>
        <Button className="w-full" onClick={() => navigate("/mock-interview-session", { state: { role: "Frontend Developer" } })}>
          Start Real Mock Interview
        </Button>
      </div>
    </div>
  );
};
export default InterviewSimulatorDemo;
