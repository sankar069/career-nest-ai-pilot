import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Circle } from "lucide-react";

const ROLES = [
  "Frontend Developer",
  "Backend Developer",
  "Data Analyst",
  "Product Manager",
  "UX Designer",
];

const InterviewSimulator = () => {
  const [selectedRole, setSelectedRole] = useState(ROLES[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleStart = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log("Navigating to /mock-interview-session with role:", selectedRole);
      setTimeout(() => {
        navigate("/mock-interview-session", { state: { role: selectedRole } });
      }, 1200); // simulate latency
    } catch (err) {
      setError("Failed to start session. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-accent/10 via-white to-accent/20 px-2 py-8">
      <div className="bg-white rounded-xl shadow-xl max-w-xl w-full border border-border px-8 py-10 flex flex-col items-center animate-fade-in space-y-6">
        <h1 className="font-playfair text-3xl font-bold text-primary mb-2">AI Interview Simulator</h1>
        <p className="text-gray-700 mb-4 text-center">
          Practice real interview questions with AI—get instant analytics and voice feedback.
        </p>
        <div className="w-full flex flex-col items-center">
          <label className="block text-base font-medium mb-2">Choose a Job Role</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
            {ROLES.map(role => (
              <button
                key={role}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition ${selectedRole === role ? 'bg-primary text-white border-primary' : 'bg-white hover:bg-accent/20 text-gray-700 border-border'}`}
                onClick={() => setSelectedRole(role)}
                type="button"
              >
                <Circle size={18} className={selectedRole === role ? "fill-primary text-white" : "text-gray-400"} />
                <span>{role}</span>
              </button>
            ))}
          </div>
        </div>
        {error && (
          <div className="bg-destructive/10 text-destructive rounded py-2 px-3 w-full text-center">{error}</div>
        )}
        <Button
          className="mt-3 w-full py-3 text-lg rounded-full bg-primary hover:bg-accent/90 font-bold relative"
          disabled={loading}
          onClick={handleStart}
        >
          {loading ? (
            <>
              <span className="mr-2 animate-spin">&#9696;</span>
              Starting Session...
            </>
          ) : (
            <>Start Mock Interview</>
          )}
        </Button>
      </div>
    </div>
  );
};

export default InterviewSimulator;
