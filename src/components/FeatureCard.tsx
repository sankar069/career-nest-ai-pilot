
import React from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
}) => {
  return (
    <div className="flex-1 min-w-[240px] max-w-[370px] bg-white rounded-2xl shadow-feature px-7 py-8 mb-6 animate-fade-in hover:scale-105 transition-transform duration-200 group relative overflow-hidden border border-border">
      <div className="w-12 h-12 bg-accent/60 rounded-2xl flex items-center justify-center mb-5 text-primary text-2xl group-hover:animate-bounce-hover">
        {icon}
      </div>
      <div className="font-playfair text-xl font-bold mb-2 text-gray-900">{title}</div>
      <div className="text-base text-gray-600 leading-relaxed">{description}</div>
      <div className="absolute -right-3 -top-3 opacity-10 scale-150">
        {icon}
      </div>
    </div>
  );
};
