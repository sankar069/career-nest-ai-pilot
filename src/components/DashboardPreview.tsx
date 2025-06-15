
import React from "react";

export const DashboardPreview = () => (
  <div className="min-w-[340px] flex flex-col gap-3 bg-white rounded-lg border border-muted px-7 py-6 shadow-feature">
    <div className="flex items-center mb-2">
      <span className="text-primary font-semibold mr-2">📈 Dashboard</span>
      <span className="italic text-gray-500 text-xs">Sample</span>
    </div>
    <div className="flex justify-between text-sm">
      <div>
        <div className="font-semibold text-xl text-blue-700">12</div>
        <div className="text-muted-foreground">Applications sent</div>
      </div>
      <div>
        <div className="font-semibold text-xl text-green-600">41%</div>
        <div className="text-muted-foreground">Got Interview</div>
      </div>
      <div>
        <div className="font-semibold text-xl text-[#e53e3e]">3</div>
        <div className="text-muted-foreground">Pending</div>
      </div>
    </div>
    <div className="mt-4 w-full h-[44px] bg-gradient-to-r from-primary to-accent/70 rounded-lg relative overflow-hidden flex items-center shrink-0">
      <div className="absolute left-4 text-white text-xs font-bold tracking-wider">Success Funnel</div>
      <div className="ml-auto mr-4 h-4 w-32 bg-white/20 rounded-full" />
    </div>
  </div>
);
