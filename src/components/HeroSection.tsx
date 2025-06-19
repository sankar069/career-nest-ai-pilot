
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Brain, Network, Database } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating AI Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.1, y: 0 }}
          transition={{ duration: 2, delay: 1 }}
          className="absolute top-20 left-10 text-primary"
        >
          <Brain className="w-8 h-8" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 0.1, y: 0 }}
          transition={{ duration: 2, delay: 1.5 }}
          className="absolute top-40 right-20 text-accent"
        >
          <Network className="w-6 h-6" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 0.1, x: 0 }}
          transition={{ duration: 2, delay: 2 }}
          className="absolute bottom-40 left-20 text-primary"
        >
          <Database className="w-7 h-7" />
        </motion.div>

        {/* Abstract Neural Network Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 800 600">
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{ duration: 3, delay: 0.5 }}
            d="M100,150 Q200,100 300,150 T500,150"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
            className="text-primary"
          />
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{ duration: 3, delay: 1 }}
            d="M150,300 Q250,250 350,300 T550,300"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
            className="text-accent"
          />
          <motion.circle
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.4 }}
            transition={{ duration: 1, delay: 1.5 }}
            cx="300"
            cy="150"
            r="3"
            fill="currentColor"
            className="text-primary"
          />
          <motion.circle
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.4 }}
            transition={{ duration: 1, delay: 2 }}
            cx="350"
            cy="300"
            r="2"
            fill="currentColor"
            className="text-accent"
          />
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-primary leading-tight"
        >
          Unlock Your Career's{" "}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-gradient bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
          >
            Full Potential
          </motion.span>{" "}
          with AI
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl lg:text-2xl text-gray-700 max-w-3xl mx-auto mb-8 leading-relaxed"
        >
          Smart resume analysis, interview prep, job tracking—all in one intuitive AI dashboard
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mb-12"
        >
          <Link
            to="/login"
            className="inline-flex items-center px-8 py-4 text-lg font-bold bg-gradient-to-r from-primary to-accent text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
          >
            Try It Now
            <motion.span
              className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
              initial={{ x: 0 }}
              whileHover={{ x: 4 }}
            >
              →
            </motion.span>
          </Link>
        </motion.div>

        {/* Floating Data Points */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.6, scale: 1 }}
              transition={{
                duration: 1,
                delay: 2 + i * 0.2,
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 3
              }}
              className={`absolute w-2 h-2 bg-gradient-to-r from-primary to-accent rounded-full`}
              style={{
                left: `${20 + (i * 12)}%`,
                top: `${30 + (i % 3) * 20}%`,
                animationDelay: `${i * 0.3}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-primary/60 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
