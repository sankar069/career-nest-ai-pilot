
import React from "react";

export const StatBar = () => {
  const stats = [
    {
      value: "60%",
      label: "Less Application Prep",
      color: "bg-accent text-foreground",
    },
    {
      value: "3x",
      label: "Higher Interview Rates",
      color: "bg-primary text-white",
    },
    {
      value: "90%+",
      label: "ATS Success Rate",
      color: "bg-gradient-to-br from-primary to-accent text-white",
    },
    {
      value: "99.9%",
      label: "Uptime SLA",
      color: "bg-muted text-foreground",
    },
  ];
  return (
    <div className="w-full flex justify-center gap-4 flex-wrap pb-6 pt-2 -mx-2">
      {stats.map((s) => (
        <div key={s.label}
          className={`flex flex-col items-center px-5 py-2 rounded-xl shadow-sm text-center min-w-[120px] ${s.color} animate-fade-in`}
        >
          <span className="font-playfair text-2xl font-bold mb-1">{s.value}</span>
          <span className="text-xs font-semibold uppercase tracking-widest opacity-80">{s.label}</span>
        </div>
      ))}
    </div>
  );
};
