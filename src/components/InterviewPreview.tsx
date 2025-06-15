
import React from "react";

export const InterviewPreview = () => (
  <div className="min-w-[340px] flex flex-col gap-3 bg-white rounded-lg border border-muted px-7 py-6 shadow-feature">
    <div className="flex items-center mb-2">
      <span className="text-primary font-semibold mr-2">🤖 Mock Interview</span>
      <span className="italic text-gray-500 text-xs">Sample</span>
    </div>
    <div className="mt-2 text-base text-gray-800">Q: “Tell me about a time you solved a complex problem?”</div>
    <div className="mt-1 text-[13px] italic text-gray-600">AI Tip: Use STAR – Situation, Task, Action, Result</div>
    <div className="flex justify-between items-center mt-3">
      <button className="px-4 py-1.5 bg-primary text-white rounded-full text-sm font-medium hover:bg-accent hover:text-gray-900 transition-all duration-150">Record Answer</button>
      <span className="text-xs text-gray-400">Feedback in real-time</span>
    </div>
  </div>
);
