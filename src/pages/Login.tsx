
import { ParticleBackground } from "@/components/vfx/ParticleBackground";
import { GlassOverlay } from "@/components/vfx/GlassOverlay";
import { AnimatedAIAvatar } from "@/components/vfx/AnimatedAIAvatar";
import { TypingMission } from "@/components/vfx/TypingMission";
import { BrandButton } from "@/components/BrandButton";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function isValidEmail(email: string) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.trim());
  }

  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      setTimeout(() => setError(""), 2600);
      return;
    }
    if (pw.length < 5) {
      setError("Password too short (min 5 characters)");
      setTimeout(() => setError(""), 2250);
      return;
    }
    setSubmitted(true);
    setTimeout(() => navigate("/"), 1200);
  }

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center bg-transparent dark:bg-[#030014]">
      <ParticleBackground />
      <GlassOverlay />
      <motion.section
        initial={{ opacity: 0, y: 28, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, type: "spring", bounce: 0.34 }}
        className="relative z-20 w-full max-w-md mx-auto flex flex-col items-center py-14 px-6"
      >
        <AnimatedAIAvatar />
        <TypingMission />
        <form
          className="w-full bg-white/80 dark:bg-black/70 rounded-2xl shadow-2xl p-8 pt-7 mt-5 flex flex-col gap-4 backdrop-blur-xl border border-primary/10"
          onSubmit={handleSubmit}
        >
          <motion.label
            htmlFor="email"
            className="text-gray-800 dark:text-gray-300 text-sm font-bold mb-1"
            whileHover={{ color: "#97ff5c" }}
          >
            Email
          </motion.label>
          <motion.div
            whileFocus={{ boxShadow: "0 0 0 4px #97ff5c55" }}
            className="w-full"
          >
            <Input
              id="email"
              type="email"
              autoComplete="email"
              className={`transition-all bg-white/80 dark:bg-black/60 border focus:ring-2 focus:ring-accent/40 px-4 py-3 rounded-xl font-inter text-base shadow-sm
                ${error ? "border-red-400 animate-shake" : ""}
              `}
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="jane@email.com"
            />
          </motion.div>
          <motion.label
            htmlFor="pw"
            className="text-gray-800 dark:text-gray-300 text-sm font-bold mb-1"
            whileHover={{ color: "#97ff5c" }}
          >
            Password
          </motion.label>
          <motion.div
            whileFocus={{ boxShadow: "0 0 0 4px #97ff5c55" }}
            className="w-full"
          >
            <Input
              id="pw"
              type="password"
              autoComplete="current-password"
              className={`transition-all bg-white/80 dark:bg-black/60 border focus:ring-2 focus:ring-accent/40 px-4 py-3 rounded-xl font-inter text-base shadow-sm
                ${error ? "border-red-400 animate-shake" : ""}
              `}
              value={pw}
              onChange={e => setPw(e.target.value)}
              placeholder="Type password"
            />
          </motion.div>
          <motion.div
            initial={false}
            animate={error ? { scale: 1.04, color: "#ff5050" } : { scale: 1, color: "#313" }}
            className="h-6 mt-1 text-xs font-semibold transition"
            aria-live="polite"
          >
            {error}
          </motion.div>
          <motion.div whileTap={{ scale: 0.96 }}>
            <BrandButton
              type="submit"
              className="w-full py-3 mt-3 text-lg font-bold relative overflow-hidden transition-all
                before:absolute before:inset-0 before:bg-gradient-to-tr before:from-primary/20 before:to-accent/10 before:rounded-full before:opacity-60 before:blur
                active:before:animate-pulse shadow-lg dark:shadow-accent/70"
              disabled={submitted}
            >
              {submitted ? (
                <span className="text-accent animate-pulse">Welcome!</span>
              ) : (
                <>
                  Login <ArrowRight />
                </>
              )}
            </BrandButton>
          </motion.div>
          <div className="mt-9 text-center text-gray-500 text-xs">
            Don’t have an account? <a href="#" className="underline text-primary">Sign up</a>
          </div>
        </form>
      </motion.section>
    </div>
  );
}
