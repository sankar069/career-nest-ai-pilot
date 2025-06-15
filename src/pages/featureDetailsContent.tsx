
import { FileText, Search, Mic, BarChart, Rocket, Briefcase } from "lucide-react";

export const featuresData = [
  {
    route: "/resume-generator",
    icon: <FileText className="w-9 h-9 text-primary" />,
    title: "Resume & Cover Letter Generator",
    summary: "Instantly create AI-powered resumes and cover letters tailored to your target role and optimized for success.",
    hero: "Generate job-winning resumes and cover letters in seconds, styled with a HackerRank-inspired format.",
    featureList: [
      "AI-built, tailored documents for job-specific branding",
      "HackerRank-style resume format",
      "Sections: Contact, Skills, Education, Certifications",
      "Auto-formatting for clean layout",
      "Export as PDF & DOCX instantly"
    ],
    cta: { label: "Start Building Resume", demoPath: "/resume-generator/demo" }
  },
  {
    route: "/ats-engine",
    icon: <Search className="w-9 h-9 text-primary" />,
    title: "ATS Optimization Engine",
    summary: "Score, optimize, and refine your resume to beat Applicant Tracking Systems and reach real recruiters.",
    hero: "Optimize your resume for ATS with instant scoring, keyword tips, and smart format checks.",
    featureList: [
      "NLP-Based Parsing: Analyze resume structure",
      "TF-IDF & Semantic Matching: Boosts relevance for job descriptions",
      "ATS Compatibility Scoring",
      "Keyword Optimization Suggestions",
      "Format recommendations for parsing bots",
      "Real-Time Feedback and Competitor Analysis"
    ],
    cta: { label: "Optimize Resume", demoPath: "/ats-engine/demo" }
  },
  {
    route: "/interview-simulator",
    icon: <Mic className="w-9 h-9 text-primary" />,
    title: "AI Interview Simulator",
    summary: "Practice interviews with AI—get feedback on answers, confidence, and delivery. Improve faster than ever.",
    hero: "Boost your skills with AI-generated questions, live feedback, and real mock session analytics.",
    featureList: [
      "Role-Specific Question Generation (GPT-4o)",
      "Speech-to-Text Evaluation (Whisper)",
      "Sentiment & Confidence Scoring",
      "Facial/Body Language Feedback (optional)",
      "Performance Analytics & Progress Tracking",
      "Mock Interview Recording"
    ],
    cta: { label: "Start Mock Interview", demoPath: "/interview-simulator/demo" }
  },
  {
    route: "/career-analyzer",
    icon: <BarChart className="w-9 h-9 text-primary" />,
    title: "Skill Gap & Career Path Analyzer",
    summary: "Spot skill gaps, get upskilling paths, and explore smart role suggestions—all powered by data.",
    hero: "Analyze your skills, discover market gaps, and unlock a personalized career plan—plus salary and role insights.",
    featureList: [
      "Skill Gap Detection with NLP and ML",
      "Personalized career path suggestions",
      "Learning path & certification recommendations",
      "Salary & Growth Forecasting",
      "Industry switch feasibility analysis"
    ],
    cta: { label: "Analyze My Career", demoPath: "/career-analyzer/demo" }
  },
  {
    route: "/auto-apply",
    icon: <Rocket className="w-9 h-9 text-primary" />,
    title: "Smart Job Auto-Apply",
    summary: "Find, filter, and auto-apply to top jobs—track everything and stay in control with ethical AI.",
    hero: "Let AI find and apply to jobs for you, with full transparency and user-controlled filters.",
    featureList: [
      "Ethical Web Scraping & API Job Listings",
      "Automated Form Filling from your data",
      "User preference filters (role, location, salary)",
      "Bulk/One-Click Application with approval",
      "Custom search monitoring & Application dashboard"
    ],
    cta: { label: "Start Auto-Applying", demoPath: "/auto-apply/demo" }
  },
  {
    route: "/dashboard",
    icon: <Briefcase className="w-9 h-9 text-primary" />,
    title: "Centralized Progress Dashboard",
    summary: "Track applications, interviews, and career growth. Visualize your entire journey in one place.",
    hero: "See your job search, interviews, and learning milestones in a real-time interactive dashboard.",
    featureList: [
      "Application & Interview tracker (status visualization)",
      "Resume performance metrics",
      "Interview practice analytics & confidence scores",
      "Skill development insights & timeline",
      "Career milestones & achievements"
    ],
    cta: { label: "Go to My Dashboard", demoPath: "/dashboard/demo" }
  }
];
