import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Features from "./pages/Features";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import { featuresData } from "./pages/featureDetailsContent";
import { FeatureDetailsPage } from "./pages/FeatureDetailsPage";
import InterviewSimulator from "./pages/InterviewSimulator";
const MockInterviewSession = React.lazy(() => import("./pages/MockInterviewSession"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/features" element={<Features />} />
          <Route path="/login" element={<Login />} />
          {/* Feature detail routes */}
          {featuresData.map(feature => (
            <Route
              key={feature.route}
              path={feature.route}
              element={
                <FeatureDetailsPage
                  icon={feature.icon}
                  title={feature.title}
                  hero={feature.hero}
                  featureList={feature.featureList}
                  cta={feature.cta}
                />
              }
            />
          ))}
          <Route path="/resume-builder" element={<React.Suspense fallback={<div>Loading...</div>}><ResumeBuilder /></React.Suspense>} />
          <Route path="/ats-engine/demo" element={<React.Suspense fallback={<div>Loading...</div>}><AtsEngineDemo /></React.Suspense>} />
          <Route path="/interview-simulator" element={<InterviewSimulator />} />
          <Route
            path="/mock-interview-session"
            element={
              <React.Suspense fallback={<div>Loading Mock Interview...</div>}>
                <MockInterviewSession />
              </React.Suspense>
            }
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

// Import ResumeBuilder for routing
import React from "react";
const ResumeBuilder = React.lazy(() => import("./pages/ResumeBuilder"));
const AtsEngineDemo = React.lazy(() => import("./pages/AtsEngineDemo"));

export default App;
