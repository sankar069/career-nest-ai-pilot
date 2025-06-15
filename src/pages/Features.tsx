
import React from "react";
import { FileText, Search, Mic, ChartBar, Bot, Users } from "lucide-react";

const features = [
  {
    title: "Resume & Cover Letter Generator",
    icon: <FileText className="w-7 h-7 text-primary" />,
    description: "AI-built, tailored documents based on your target roles. Fine-tuned for ATS, branding, and success with real-time export.",
    details: [
      "Format: Uses a structure inspired by HackerRank's resume format.",
      "Tailored sections: Contact, skills, experience, education, certifications.",
      "Auto-formatting: Ensures consistency and clean layout.",
      "Download as PDF and DOCX instantly."
    ]
  },
  {
    title: "ATS Optimization Engine",
    icon: <Search className="w-7 h-7 text-primary" />,
    description: "Instant scoring, keyword tips, and format checks to ensure your resume stands out—and gets through the bots.",
    details: [
      "NLP-based parsing: Analyzes resume structure and extracts key information.",
      "TF-IDF scoring & semantic matching: Enhances JD-to-resume relevance.",
      "spaCy/Transformers-powered context analysis for keyword/entity extraction.",
      "ATS Compatibility Scoring: Evaluates ATS passthrough rates.",
      "Keyword Optimization: Suggests job-specific keywords and synonyms.",
      "Format Recommendations: Ensures proper parsing for bots.",
      "Competitor Analysis: Compares against similar resumes in your field.",
      "Real-Time Feedback: Instant improvement suggestions during editing."
    ]
  },
  {
    title: "AI Interview Simulator",
    icon: <Mic className="w-7 h-7 text-primary" />,
    description: "Simulate tough interviews. Get AI feedback on voice, content, and body language. Practice, playback, improve.",
    details: [
      "OpenAI GPT-4o: Generates realistic, role-specific interview questions.",
      "Whisper: Advanced speech recognition for live answer transcription.",
      "DeepFace (optional): Analyzes facial expressions for emotion/confidence.",
      "Sentiment Analysis & NLP: Evaluates tone, clarity, and content.",
      "Role-Specific Question Generation: AI-tailored for your target roles.",
      "Real-Time Speech-to-Text Evaluation.",
      "Confidence & Sentiment Scoring.",
      "Facial & Body Language Feedback (optional).",
      "Performance Analytics: Progress tracking.",
      "Mock Interview Recording: Review and improve over time."
    ]
  },
  {
    title: "Skill Gap & Career Path Analyzer",
    icon: <ChartBar className="w-7 h-7 text-primary" />,
    description: "Analyze skills, uncover market gaps, and unlock personalized growth plans—plus salary and role predictions.",
    details: [
      "Embedding-based Recommendations: Compares your skills with job needs.",
      "Clustering for Role Suggestions.",
      "Market Trend Analysis: Leverages live data.",
      "scikit-learn/NLP for skill extraction.",
      "Skill Gap Detection.",
      "Personalized Career Path Suggestions.",
      "Learning Path & Certification Recommendations.",
      "Salary & Growth Forecasting.",
      "Industry Switch Feasibility Analysis."
    ]
  },
  {
    title: "Smart Job Auto-Apply",
    icon: <Bot className="w-7 h-7 text-primary" />,
    description: "Find, filter, and automate your job hunt. Full control, with ethical AI and transparent application dashboards.",
    details: [
      "Ethical Web Scraping & Job Board APIs for job listings.",
      "Automated Form Filling based on saved user data.",
      "User Preference Filters: Role, location, salary, etc.",
      "Approval Workflows for user control.",
      "Custom Job Search Monitoring.",
      "AI-Powered Job Matching.",
      "Bulk/One-Click Application (with approval).",
      "Application Tracking Dashboard.",
      "Ethical Safeguards and rate-limiting."
    ]
  },
  {
    title: "Centralized Progress Dashboard",
    icon: <Users className="w-7 h-7 text-primary" />,
    description: "Visualize applications, interviews, and career wins—all in one glance. Track your growth over time.",
    details: [
      "Built with React.js, Chart.js, and Tailwind CSS.",
      "Real-Time Data Sync with WebSockets and React Query.",
      "Custom Analytics Engine for performance/feedback.",
      "PostgreSQL & MongoDB for structured/unstructured data.",
      "Application Tracker with status visualization.",
      "Resume Performance Metrics.",
      "Interview Practice & Analytics.",
      "Skill Development Insights.",
      "Career Progress Timeline: milestones, growth."
    ]
  }
];


export default function Features() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#f7f9fd] to-[#edeaff] py-10 px-3 flex flex-col items-center">
      <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-8 text-primary text-center">CareerNest AI Features</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-7 w-full max-w-6xl">
        {features.map((f, i) => (
          <div
            key={f.title}
            className="bg-white border border-primary/20 rounded-2xl shadow-feature px-7 py-8 flex flex-col items-start animate-fade-in relative group transition-all hover:scale-105"
          >
            <div className="w-12 h-12 bg-accent/60 rounded-2xl flex items-center justify-center mb-3">{f.icon}</div>
            <h2 className="font-playfair text-lg md:text-xl font-bold mb-1 text-gray-900">{f.title}</h2>
            <div className="text-base text-gray-600 mb-3">{f.description}</div>
            <ul className="list-disc ml-5 text-sm text-gray-500 space-y-1">
              {f.details.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
            {/* Decorative corner */}
            <div className="absolute top-0 right-0 w-7 h-7 bg-gradient-to-tr from-primary/10 to-accent/5 rounded-tl-2xl pointer-events-none"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
