
import { ParticleBackground } from "@/components/vfx/ParticleBackground";
import { GlassOverlay } from "@/components/vfx/GlassOverlay";
import { AnimatedAIAvatar } from "@/components/vfx/AnimatedAIAvatar";
import { FloatingLabelInput } from "@/components/vfx/FloatingLabelInput";
import { TypingMission } from "@/components/vfx/TypingMission";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const phrases = [
  "AI-Powered Career Builder",
  "Smarter Applications in Seconds",
  "Level Up with CareerNest AI"
];

export default function Login() {
  const [view, setView] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function validateEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      setTimeout(() => setError(""), 2100);
      return;
    }
    if (pw.length < 5) {
      setError("Password too short (min 5 characters)");
      setTimeout(() => setError(""), 1800);
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      // Route or logic here
    }, 1200);
  }

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center bg-transparent dark:bg-[#0a0326]">
      <ParticleBackground />
      <GlassOverlay />
      <main className="relative z-20 w-full max-w-md mx-auto flex flex-col justify-center items-center pt-12 md:pt-20 pb-6 transition-all">
        <AnimatedAIAvatar />
        <TypingMission phrases={phrases} />
        <div className="flex gap-3 my-3 w-full items-center justify-center">
          <button
            className={`px-5 py-2 font-bold rounded-2xl focus:outline-none text-base transition-all
              ${view === "login" ? "bg-accent/80 text-black shadow-xl" : "bg-white/10 text-accent"}
              hover:scale-105`}
            aria-pressed={view === "login"}
            onClick={() => setView("login")}
            type="button"
          >
            Login
          </button>
          <button
            className={`px-5 py-2 font-bold rounded-2xl focus:outline-none text-base transition-all
              ${view === "signup" ? "bg-accent/80 text-black shadow-xl" : "bg-white/10 text-accent"}
              hover:scale-105`}
            aria-pressed={view === "signup"}
            onClick={() => setView("signup")}
            type="button"
          >
            Sign Up
          </button>
        </div>
        <AnimatePresence mode="wait">
          <motion.form
            key={view}
            id={`form-${view}`}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 28, scale: 0.93 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.97 }}
            transition={{ duration: 0.45, type: "spring", bounce: 0.25 }}
            className="transition-all w-full bg-white/80 dark:bg-black/70 rounded-2xl shadow-2xl p-8 pt-7 mt-5 flex flex-col gap-6 backdrop-blur-xl border border-primary/10"
          >
            <FloatingLabelInput
              id="email"
              type="email"
              label="Email"
              autoComplete="email"
              error={!!error}
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="mb-3"
            />
            <FloatingLabelInput
              id="pw"
              type="password"
              label={view === "signup" ? "Create Password" : "Password"}
              value={pw}
              error={!!error}
              onChange={e => setPw(e.target.value)}
              required
              className="mb-3"
            />
            <motion.div
              initial={false}
              animate={error ? { scale: 1.07, color: "#ff5050" } : { scale: 1, color: "#333" }}
              className="h-6 -mt-2 text-xs font-semibold transition"
              aria-live="polite"
            >
              {error}
            </motion.div>
            <motion.button
              type="submit"
              disabled={submitted}
              whileHover={{ scale: 1.04, boxShadow: "0 0 18px #82ff8e99" }}
              whileTap={{ scale: 0.97 }}
              className={`
                w-full py-3 mt-1 text-lg font-bold rounded-full transition-all
                bg-gradient-to-tr from-primary to-accent text-black 
                shadow-lg dark:shadow-accent/80 ring-2 ring-primary/30
                ${submitted ? "opacity-60" : ""}
              `}
              style={{
                textShadow: "0 1.5px 4px #3338",
                filter: "brightness(1.09) drop-shadow(0 0 16px #97ff5c66)",
              }}
            >
              {submitted ? (
                <span className="text-accent animate-pulse">
                  {view === "login" ? "Logging in..." : "Signing up..."}
                </span>
              ) : (
                <>{view === "login" ? "Login" : "Sign Up"}</>
              )}
            </motion.button>
          </motion.form>
        </AnimatePresence>
        <div className="mt-8 text-gray-400 text-xs text-center font-inter">
          {view === "login"
            ? "Don't have an account? "
            : "Already have an account? "}
          <button
            className="underline hover:text-accent font-bold"
            onClick={() => setView(view === "login" ? "signup" : "login")}
            type="button"
          >
            {view === "login" ? "Sign up" : "Login"}
          </button>
        </div>
      </main>
    </div>
  );
}
