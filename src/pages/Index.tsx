
import { BrandButton } from "@/components/BrandButton";
import { FeatureCard } from "@/components/FeatureCard";
import { StatBar } from "@/components/StatBar";
import { DashboardPreview } from "@/components/DashboardPreview";
import { InterviewPreview } from "@/components/InterviewPreview";
import { ArrowRight } from "lucide-react";

const features = [
  {
    title: "Resume & Cover Letter Generator",
    description:
      "AI-built, tailored documents based on your target roles. Fine-tuned for ATS, branding, and success with real-time export.",
    icon: <span className="text-2xl">📝</span>,
  },
  {
    title: "ATS Optimization Engine",
    description:
      "Instant scoring, keyword tips, and format checks to ensure your resume stands out—and gets through the bots.",
    icon: <span className="text-2xl">🚦</span>,
  },
  {
    title: "AI Interview Simulator",
    description:
      "Simulate tough interviews. Get AI feedback on voice, content, and body language. Practice, playback, improve.",
    icon: <span className="text-2xl">🎤</span>,
  },
  {
    title: "Skill Gap & Career Path Analyzer",
    description:
      "Analyze skills, uncover market gaps, and unlock personalized growth plans—plus salary and role predictions.",
    icon: <span className="text-2xl">📊</span>,
  },
  {
    title: "Smart Job Auto-Apply",
    description:
      "Find, filter, and automate your job hunt. Full control, with ethical AI and transparent application dashboards.",
    icon: <span className="text-2xl">🤖</span>,
  },
  {
    title: "Centralized Progress Dashboard",
    description:
      "Visualize applications, interviews, and career wins—all in one glance. Track your growth over time.",
    icon: <span className="text-2xl">📈</span>,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen w-full bg-transparent flex flex-col">
      <header className="w-full py-6 mb-4">
        <nav className="w-full flex justify-between items-center max-w-[1360px] mx-auto px-4">
          <div className="font-playfair text-2xl tracking-tight text-primary animate-fade-in">
            CareerNest
            <span className="font-normal text-gradient ml-1">AI</span>
          </div>
          <BrandButton as="a" href="#cta" className="font-inter text-base px-4 py-2 rounded-lg">
            Get Early Access <ArrowRight size={18} />
          </BrandButton>
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center pt-10 px-4">
        <section className="w-full max-w-[1240px] mx-auto flex flex-col items-center">
          <h1 className="font-playfair text-hero font-extrabold text-center mb-3 animate-fade-in" style={{ lineHeight: "1.13" }}>
            Your End-to-End <span className="text-gradient">AI Career Copilot</span>
          </h1>
          <div className="text-xl font-inter text-gray-600 mb-6 text-center animate-fade-in">
            Accelerate your job search, optimize your resume, ace interviews, and land your dream job—CareerNest does it all, powered by AI.
          </div>
          <StatBar />
          <BrandButton as="a" href="#cta" className="text-xl font-inter px-8 py-4 mt-4 shadow-lg">
            Join Waitlist Now
            <ArrowRight size={22} />
          </BrandButton>
        </section>

        <section className="w-full max-w-[1280px] flex justify-center gap-8 mt-12 mb-9 flex-wrap">
          <DashboardPreview />
          <InterviewPreview />
        </section>

        <section className="w-full max-w-[1300px] mx-auto mt-4 flex flex-wrap justify-center gap-7 pb-12 pt-2">
          {features.map((f, idx) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </section>

        <section id="cta" className="mx-auto mt-8 mb-24 w-full max-w-lg shadow-xl bg-white border border-muted rounded-2xl py-12 px-8 flex flex-col items-center animate-fade-in">
          <h2 className="font-playfair text-section font-bold mb-2 text-center">
            Be First In Line for Early Access
          </h2>
          <div className="text-gray-700 text-center font-inter mb-4">CareerNest AI is coming soon. Drop your email below &amp; join our beta!</div>
          <form
            className="flex w-full gap-3 justify-center items-center"
            onSubmit={e => {
              e.preventDefault();
              alert("Thank you! Beta notifications coming soon.");
            }}
          >
            <input
              required
              name="email"
              type="email"
              placeholder="Your email address"
              className="bg-gray-100 border border-muted rounded-full px-5 py-3 text-base w-full max-w-xs outline-primary focus:bg-white transition"
              autoComplete="email"
            />
            <BrandButton type="submit" className="px-6 py-3 text-lg">
              Notify Me
            </BrandButton>
          </form>
        </section>
      </main>

      <footer className="border-t border-muted py-7 text-center text-xs text-gray-400 mt-auto">
        &copy; {new Date().getFullYear()} CareerNest AI – All rights reserved.
      </footer>
    </div>
  );
};

export default Index;
