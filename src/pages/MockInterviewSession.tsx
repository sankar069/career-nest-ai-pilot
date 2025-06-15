import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Monitor, Mic, MicOff, Video, VideoOff } from "lucide-react";
import { AudioRecorder, blobToBase64 } from "../utils/audioUtils";

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

  // For recording and video
  const audioRecorderRef = useRef<AudioRecorder | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [userTranscript, setUserTranscript] = useState<string | null>(null);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (showVideo) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          setVideoStream(stream);
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => {
          setSessionError(
            "Unable to access webcam. Please allow video access in your browser settings."
          );
          setShowVideo(false);
        });
    } else {
      if (videoStream) {
        videoStream.getTracks().forEach((track) => track.stop());
        setVideoStream(null);
      }
    }
    // Clean up on unmount
    return () => {
      if (videoStream) {
        videoStream.getTracks().forEach((track) => track.stop());
      }
    };
    // eslint-disable-next-line
  }, [showVideo]);

  // Sync videoRef srcObject
  useEffect(() => {
    if (videoRef.current && videoStream) {
      videoRef.current.srcObject = videoStream;
    }
  }, [videoStream]);

  // DEBUG: log mounting and role parameter
  useEffect(() => {
    const role = (location.state && location.state.role) || "Frontend Developer";
    console.log("MockInterviewSession mounted with role:", role);
  }, [location.state]);

  // Extract role from navigation state; fallback to generic
  const role = (location.state && location.state.role) || "Frontend Developer";

  useEffect(() => {
    setPhase("question");
    setLoading(false);
    setSessionError(null);
    setUserTranscript(null);
  }, [currentQuestionIdx]);

  const handleStartRecording = async () => {
    setIsRecording(true);
    setUserTranscript(null);
    if (!audioRecorderRef.current) {
      audioRecorderRef.current = new AudioRecorder();
    }
    await audioRecorderRef.current.start(async (blob) => {
      setIsRecording(false);
      setLoading(true);

      // Send to whisper edge function for transcription
      try {
        const base64Audio = await blobToBase64(blob);
        const response = await fetch("/functions/v1/voice-to-text", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ audio: base64Audio }),
        });
        const data = await response.json();
        if (data.text) {
          setUserTranscript(data.text);
        } else {
          setUserTranscript("Could not transcribe audio.");
        }
      } catch (e) {
        setUserTranscript("Transcription failed.");
      }
      setLoading(false);
    });
  };

  const handleStopRecording = () => {
    audioRecorderRef.current?.stop();
  };

  const handleAnswer = async () => {
    handleStopRecording();
    setLoading(true);
    // Simulate sentiment/confidence detection
    setTimeout(() => {
      setFeedback({
        sentimentScore: "Calculated", // Could be improved w/ some API
        confidenceScore: "Estimated",
        transcript: userTranscript ?? "No input detected.",
        bodyLanguage: showVideo ? "Video on (not evaluated)" : "N/A (video off)",
      });
      setPhase("feedback");
      setLoading(false);
    }, 1200);
  };

  const handleNext = () => {
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
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
            disabled={isRecording}
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

        {/* Show live webcam if enabled */}
        {showVideo && (
          <div className="mb-4 w-full flex flex-col items-center">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              style={{
                width: 240,
                maxWidth: "90vw",
                borderRadius: "1rem",
                border: "2px solid #aabbdd",
                boxShadow: "0 2px 12px rgba(90,132,255,.15)"
              }}
            />
          </div>
        )}

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
            <div className="mb-5 flex flex-col items-center gap-2">
              <span className="font-semibold">Your Turn: Record Your Answer</span>
              <span className="text-sm text-muted-foreground">Speak your answer out loud. Make sure microphone is enabled!</span>
            </div>
            {/* Recording controls */}
            <div className="flex flex-col items-center gap-3 mb-4">
              {!isRecording ? (
                <Button
                  onClick={handleStartRecording}
                  disabled={loading || !micEnabled}
                  variant="secondary"
                  className="mt-1"
                >
                  <Mic className="mr-1" />
                  Start Recording
                </Button>
              ) : (
                <Button
                  onClick={handleStopRecording}
                  variant="destructive"
                  className="mt-1"
                >
                  <MicOff className="mr-1" />
                  Stop Recording
                </Button>
              )}
              {isRecording && <div className="text-red-500 font-semibold animate-pulse">Recording...</div>}
              {userTranscript && (
                <div className="w-full max-w-md mx-auto bg-muted/40 rounded-md p-3 text-base mt-2 text-gray-800 shadow border border-border text-left">
                  <span className="font-bold">Transcript:</span> {userTranscript}
                </div>
              )}
            </div>
            <Button
              className="w-full"
              onClick={handleAnswer}
              disabled={loading || isRecording || !userTranscript}
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
