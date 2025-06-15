import React from "react";
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
import CareerAnalyzer from "./pages/CareerAnalyzer";
import JobAutoApply from "./pages/JobAutoApply";
import Dashboard from "./pages/Dashboard";

const ResumeBuilder = React.lazy(() => import("./pages/ResumeBuilder"));
const AtsEngineDemo = React.lazy(() => import("./pages/AtsEngineDemo"));
const CareerAnalyzerDemo = React.lazy(() => import("./pages/CareerAnalyzerDemo"));
const MockInterviewSession = React.lazy(() => import("./pages/MockInterviewSession"));
const InterviewSimulatorDemo = React.lazy(() => import("./pages/InterviewSimulatorDemo"));

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
          <Route
            path="/interview-simulator/demo"
            element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <InterviewSimulatorDemo />
              </React.Suspense>
            }
          />
          <Route path="/career-analyzer" element={<CareerAnalyzer />} />
          <Route path="/career-analyzer/demo" element={
            <React.Suspense fallback={<div>Loading...</div>}>
              <CareerAnalyzerDemo />
            </React.Suspense>
          } />
          <Route path="/auto-apply" element={
            <React.Suspense fallback={<div>Loading...</div>}>
              <JobAutoApply />
            </React.Suspense>
          } />
          <Route path="/auto-apply/demo" element={
            <React.Suspense fallback={<div>Loading...</div>}>
              <JobAutoApply />
            </React.Suspense>
          } />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
