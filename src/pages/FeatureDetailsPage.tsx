
import React from "react";
import { motion, Variants } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface FeatureDetailsPageProps {
  icon: React.ReactNode;
  title: string;
  hero: string;
  featureList: string[];
  cta: { label: string; demoPath: string };
}

// Use Variants typing for fadeVariants
const fadeVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.18 + i * 0.07,
      duration: 0.62,
      type: "spring" as const,
      bounce: 0.2
    }
  })
};

export const FeatureDetailsPage: React.FC<FeatureDetailsPageProps> = ({
  icon,
  title,
  hero,
  featureList,
  cta
}) => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f7f9fd] to-[#edeaff] px-2 pt-5 pb-14 flex flex-col items-center">
      {/* Sticky Back Button */}
      <button
        className="fixed left-3 top-3 z-40 bg-white/80 border border-primary/20 rounded-full px-4 py-2 shadow hover:scale-105 transition-all text-primary font-semibold text-base flex items-center gap-1"
        onClick={() => navigate("/features")}
      >
        ← All Features
      </button>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 14 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, type: "spring", bounce: 0.25 }}
        className="max-w-2xl mx-auto bg-white/70 border border-primary/10 rounded-2xl shadow-2xl px-7 py-8 mb-8 mt-16 flex flex-col items-center text-center"
      >
        <div className="mb-3">{icon}</div>
        <h1 className="font-playfair text-3xl md:text-4xl font-bold mb-2 text-primary">
          {title}
        </h1>
        <div className="text-base md:text-lg text-gray-700 mb-1">
          {hero}
        </div>
      </motion.div>
      {/* Feature Points */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        className="w-full max-w-xl flex flex-col gap-4 mb-9"
      >
        {featureList.map((f, i) => (
          <motion.div
            custom={i}
            variants={fadeVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            key={f}
            className="bg-white flex items-center gap-3 rounded-lg shadow-feature border border-primary/10 px-5 py-4 text-gray-800 text-[1rem] font-inter"
          >
            <CheckCircle2 className="w-5 h-5 text-accent" />
            <span>{f}</span>
          </motion.div>
        ))}
      </motion.div>
      {/* CTA Button */}
      <Button
        className="text-base font-bold px-8 py-3 rounded-full shadow-lg bg-gradient-to-tr from-primary to-accent text-black hover:scale-105 transition-all"
        onClick={() => navigate(cta.demoPath)}
      >
        {title === "Resume & Cover Letter Generator" ? "Start Building Resume" : cta.label}
      </Button>
    </div>
  );
}
