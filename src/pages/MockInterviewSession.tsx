
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
// Stubs for future detailed features
import { Monitor, Mic, MicOff, Video, VideoOff } from "lucide-react";

// Placeholder for analytics
const PerformanceAnalytics = ({ feedback }: { feedback: any }) => (
  <div className="bg-accent/20 border border-border rounded-xl p-4 mt-6 w-full max-w-md mx-auto shadow-sm">
    <h3 className="font-bold text-primary mb-3">Performance Analytics</h3>
    <ul className="space-y-2">
      <li><b>Sentiment:</b> {feedback.sentimentScore ?? "—"}</li>
      <li><b>Confidence:</b> {feedback.confidenceScore ?? "—"}</li>
      <li><b>Speech-to-Text:</b> <span className="italic">{feedback.transcript ?? "—"}</span></li>
      <li><b>Body Language:</b> {feedback.bodyLanguage ?? "—"}</li>
    </ul>
  </div>
);

const QUESTION_STUBS = [
  "Tell me about a time you solved a challenging problem at work.",
  "How would you approach optimizing our web app’s performance?",
  "Describe your experience with cross-functional teams.",
  "What motivates you to excel in this role?",
  "Can you walk us through a relevant project from your resume?"
];

const MockInterviewSession = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [phase, setPhase] = useState<"question" | "answer" | "feedback" | "done">("question");
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<any>({});
  const [micEnabled, setMicEnabled] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const [sessionError, setSessionError] = useState<string | null>(null);

  // Extract role from navigation state; fallback to generic
  const role = (location.state && location.state.role) || "Frontend Developer";

  // On mount: fetch/generate first question from (future) AI backend
  useEffect(() => {
    setPhase("question");
    setLoading(false);
    setSessionError(null);
  }, [currentQuestionIdx]);

  const handleAnswer = () => {
    // In a real implementation, send answer audio to backend (Whisper), get analytics, etc.
    setLoading(true);
    setTimeout(() => {
      setFeedback({
        sentimentScore: "Positive",
        confidenceScore: "High",
        transcript: "I led a migration to React and solved critical bugs...",
        bodyLanguage: showVideo ? "Engaged & attentive" : "N/A (video off)"
      });
      setPhase("feedback");
      setLoading(false);
    }, 1800); // Simulate AI processing
  };

  const handleNext = () => {
    if (currentQuestionIdx < QUESTION_STUBS.length - 1) {
      setCurrentQuestionIdx(idx => idx + 1);
      setPhase("question");
    } else {
      setPhase("done");
    }
  };

  if (sessionError) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <div className="bg-red-100 border border-red-300 p-10 rounded-lg shadow text-red-700 text-lg max-w-sm w-full text-center">
          {sessionError}
          <Button className="mt-4" onClick={() => navigate("/")}>Return Home</Button>
        </div>
      </div>
    );
  }

  // Page transition animation wrapper
  return (
    <div className="w-full min-h-screen overflow-auto flex flex-col items-center justify-start bg-gradient-to-br from-accent/10 via-white to-accent/20 py-4 px-2">
      <div className="animate-fade-in w-full max-w-2xl mx-auto bg-white rounded-xl shadow-xl p-8 mt-8 flex flex-col items-center border border-border space-y-5 transition-all duration-500">
        <div className="flex flex-row gap-4 w-full justify-between items-center">
          <span className="font-playfair text-2xl font-bold text-primary">
            Mock Interview – <span className="font-normal text-gray-700">{role}</span>
          </span>
          <Button
            variant="ghost"
            onClick={() => navigate("/interview-simulator")}
            className="text-gray-600"
          >
            End Session
          </Button>
        </div>

        {/* Option toggles */}
        <div className="mb-3 flex gap-3 items-center">
          <Button
            variant={micEnabled ? "secondary" : "destructive"}
            onClick={() => setMicEnabled(m => !m)}
            className="rounded-full"
            size="icon"
            aria-label={micEnabled ? "Mute microphone" : "Unmute microphone"}
          >
            {micEnabled ? <Mic /> : <MicOff />}
          </Button>
          <Button
            variant={showVideo ? "secondary" : "outline"}
            className="rounded-full"
            onClick={() => setShowVideo(v => !v)}
            size="icon"
            aria-label={showVideo ? "Stop video" : "Start video"}
          >
            {showVideo ? <Video /> : <VideoOff />}
          </Button>
        </div>

        {/* Question/Answer/Feedback Phases */}
        {phase === "question" && (
          <div className="w-full transition-all duration-300">
            <div className="text-xl font-semibold text-gray-900 mb-4 animate-slide-in">
              Q{currentQuestionIdx + 1}: {QUESTION_STUBS[currentQuestionIdx]}
            </div>
            <Button
              className="w-full mt-4"
              disabled={loading}
              onClick={() => setPhase("answer")}
            >
              {loading ? (
                <>
                  <span className="mr-2 animate-spin">&#9696;</span>
                  Loading...
                </>
              ) : (
                "I'm ready to answer"
              )}
            </Button>
          </div>
        )}

        {phase === "answer" && (
          <div className="text-center w-full animate-fade-in">
            {/* Placeholder for voice recording */}
            <div className="mb-5 flex flex-col items-center gap-2">
              <span className="font-semibold">Your Turn: Record Your Answer</span>
              <span className="text-sm text-muted-foreground">Speak your answer out loud</span>
            </div>
            <Button
              className="w-full"
              onClick={handleAnswer}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="mr-2 animate-spin">&#9696;</span>
                  Analyzing...
                </>
              ) : (
                <>Submit Answer</>
              )}
            </Button>
          </div>
        )}

        {phase === "feedback" && (
          <div className="w-full animate-fade-in">
            <div className="mb-3 text-lg text-primary">Feedback & Analytics</div>
            <PerformanceAnalytics feedback={feedback} />
            <Button
              className="w-full mt-5"
              onClick={handleNext}
            >
              Next Question
            </Button>
          </div>
        )}

        {phase === "done" && (
          <div className="w-full animate-fade-in text-center py-8">
            <div className="font-bold text-xl text-primary mb-4">Session Complete!</div>
            <div className="mb-7 text-gray-700">
              Thank you for practicing. Your results and full feedback will appear soon.
            </div>
            <Button className="mx-auto" onClick={() => navigate("/interview-simulator")}>Return</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MockInterviewSession;
