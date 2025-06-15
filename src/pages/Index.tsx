import { BrandButton } from "@/components/BrandButton";
import { FeatureCard } from "@/components/FeatureCard";
import { StatBar } from "@/components/StatBar";
import { DashboardPreview } from "@/components/DashboardPreview";
import { InterviewPreview } from "@/components/InterviewPreview";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

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

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeInOut" } },
};

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.7, ease: "easeInOut" } }
};

const Index = () => {
  // Utility function for robust email validation
  function isValidEmail(email: string) {
    // Basic RFC 5322 regex - still not perfect, but covers most cases
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.trim());
  }

  return (
    <div className="min-h-screen w-full bg-transparent flex flex-col overflow-x-hidden">
      <header className="w-full py-6 mb-4">
        <motion.nav
          initial={fadeInUp.initial}
          animate={fadeInUp.animate}
          className="w-full flex justify-between items-center max-w-[1360px] mx-auto px-4"
        >
          <div className="font-playfair text-2xl tracking-tight text-primary animate-fade-in">
            CareerNest
            <span className="font-normal text-gradient ml-1">AI</span>
          </div>
          <div className="flex gap-3">
            <BrandButton as="a" href="#cta" className="font-inter text-base px-4 py-2 rounded-lg">
              Get Early Access <ArrowRight size={18} />
            </BrandButton>
            <BrandButton as="a" href="/login" className="font-inter text-base px-4 py-2 rounded-lg bg-accent text-black hover:bg-primary hover:text-white transition-colors">
              Login
            </BrandButton>
          </div>
        </motion.nav>
      </header>

      <main className="flex-1 flex flex-col items-center pt-10 px-4">
        <motion.section
          initial={fadeInUp.initial}
          animate={{
            ...fadeInUp.animate,
            transition: { ...fadeInUp.animate.transition, delay: 0.15 },
          }}
          className="w-full max-w-[1240px] mx-auto flex flex-col items-center"
        >
          <motion.h1
            layout
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1, transition: { delay: 0.2, duration: 0.8, type: "spring" } }}
            className="font-playfair text-hero font-extrabold text-center mb-3"
            style={{ lineHeight: "1.13" }}
          >
            Your End-to-End <span className="text-gradient">AI Career Copilot</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.37, duration: 0.65, ease: "easeInOut" } }}
            className="text-xl font-inter text-gray-600 mb-6 text-center"
          >
            Accelerate your job search, optimize your resume, ace interviews, and land your dream job—CareerNest does it all, powered by AI.
          </motion.div>
          <StatBar />
          <BrandButton as="a" href="#cta" className="text-xl font-inter px-8 py-4 mt-4 shadow-lg">
            Join Waitlist Now
            <ArrowRight size={22} />
          </BrandButton>
        </motion.section>

        <motion.section
          initial={fadeIn.initial}
          animate={{
            ...fadeIn.animate,
            transition: { ...fadeIn.animate.transition, delay: 0.35 },
          }}
          className="w-full max-w-[1280px] flex justify-center gap-8 mt-12 mb-9 flex-wrap"
        >
          <DashboardPreview />
          <InterviewPreview />
        </motion.section>

        <motion.section
          initial={fadeIn.initial}
          animate={{
            ...fadeIn.animate,
            transition: { ...fadeIn.animate.transition, delay: 0.5 },
          }}
          className="w-full max-w-[1300px] mx-auto mt-4 flex flex-wrap justify-center gap-7 pb-12 pt-2"
        >
          {features.map((f, idx) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 + idx * 0.07, duration: 0.67, type: "spring", ease: "easeInOut" }}
            >
              <FeatureCard {...f} />
            </motion.div>
          ))}
        </motion.section>

        <motion.section
          initial={fadeInUp.initial}
          animate={{
            ...fadeInUp.animate,
            transition: { ...fadeInUp.animate.transition, delay: 0.6 },
          }}
          id="cta"
          className="mx-auto mt-8 mb-24 w-full max-w-lg shadow-xl bg-white border border-muted rounded-2xl py-12 px-8 flex flex-col items-center animate-fade-in"
        >
          <h2 className="font-playfair text-section font-bold mb-2 text-center">
            Be First In Line for Early Access
          </h2>
          <div className="text-gray-700 text-center font-inter mb-4">CareerNest AI is coming soon. Drop your email below &amp; join our beta!</div>
          <form
            className="flex w-full gap-3 justify-center items-center"
            onSubmit={e => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const emailInput = form.elements.namedItem('email') as HTMLInputElement;
              const email = emailInput?.value ?? "";
              if (!isValidEmail(email)) {
                alert("Please enter a valid email address.");
                emailInput.focus();
                return;
              }
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
        </motion.section>
      </main>

      <footer className="border-t border-muted py-7 text-center text-xs text-gray-400 mt-auto">
        &copy; {new Date().getFullYear()} CareerNest AI – All rights reserved.
      </footer>
    </div>
  );
};

export default Index;
