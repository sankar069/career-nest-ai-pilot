
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { featuresData } from "./featureDetailsContent";

export default function Features() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#f7f9fd] to-[#edeaff] py-10 px-3 flex flex-col items-center">
      {/* Animated Page Title */}
      <motion.h1
        initial={{ opacity: 0, y: -36, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.62, type: "spring", bounce: 0.22 }}
        className="font-playfair text-4xl md:text-5xl font-bold mb-10 text-primary text-center"
      >
        CareerNest AI Features
      </motion.h1>
      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7 w-full max-w-6xl">
        {featuresData.map((feature, i) => (
          <motion.button
            key={feature.route}
            initial={{ opacity: 0, scale: 0.93, y: 42 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              delay: 0.13 + i * 0.09,
              duration: 0.55,
              type: "spring",
              bounce: 0.23,
            }}
            type="button"
            className="group bg-white border border-primary/15 rounded-2xl shadow-feature px-7 py-8 flex flex-col items-start hover:scale-105 hover:shadow-2xl transition-all active:scale-97 cursor-pointer relative outline-none"
            onClick={() => navigate(feature.route)}
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.055 }}
          >
            <div className="w-12 h-12 bg-accent/60 rounded-2xl flex items-center justify-center mb-3 group-hover:animate-bounce-hover text-2xl">
              {feature.icon}
            </div>
            <h2 className="font-playfair text-lg md:text-xl font-bold mb-1 text-gray-900">
              {feature.title}
            </h2>
            <div className="text-base text-gray-600 mb-0.5">{feature.summary}</div>
            {/* Decorative corner */}
            <div className="absolute top-0 right-0 w-7 h-7 bg-gradient-to-tr from-primary/10 to-accent/10 rounded-tl-2xl pointer-events-none"></div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
