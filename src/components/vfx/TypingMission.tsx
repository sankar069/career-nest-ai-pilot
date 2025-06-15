
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const phrases = [
  "Powering Your Career with AI...",
  "Smarter Resumes. Smarter Interviews.",
  "Let AI Accelerate Your Job Search."
];

export const TypingMission = () => {
  const [index, setIndex] = useState(0);
  const [subIdx, setSubIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (subIdx === phrases[index].length + 1 && !deleting) {
      setTimeout(() => setDeleting(true), 1200);
      return;
    }
    if (subIdx === 0 && deleting) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % phrases.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIdx(subIdx + (deleting ? -1 : 1));
    }, deleting ? 25 : 60);

    return () => clearTimeout(timeout);
  }, [subIdx, deleting, index]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -14 }}
        className="relative font-inter text-lg md:text-2xl text-accent-foreground text-shadow-lg px-2 mb-3"
        style={{ minHeight: "2.3em" }}
      >
        <span>
          {phrases[index].substring(0, subIdx)}
          <span className="inline-block animate-pulse text-primary">
            |
          </span>
        </span>
      </motion.div>
    </AnimatePresence>
  );
};
