
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChartContainer, ChartLegend, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";
import { Download, RefreshCcw } from "lucide-react";

type AnalyzerResult = {
  skillMap: { skill: string; user: number; market: number }[];
  topRoles: { title: string; reason: string }[];
  learningPath: { label: string; url: string }[];
  salaryForecast: { year: number; min: number; max: number }[];
  industrySwitch: "Feasible" | "Challenging" | "Not Advised";
  readiness: number;
};

export default function CareerAnalyzer() {
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AnalyzerResult | null>(null);

  const handleAnalyze = async () => {
    setAnalyzing(true);
    setAnalysis(null);

    // TODO: Replace stubbedPayload with real fetch from user profile/resume/interview data
    const stubbedPayload = {
      resume: "Senior Frontend Developer with React, TypeScript, Node.js...",
      target_role: "Engineering Manager",
      location: "San Francisco, CA",
      interview_feedback: [
        { skill: "React", score: 8 },
        { skill: "Leadership", score: 5 },
      ],
    };

    const res = await fetch("/functions/v1/analyze-career", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(stubbedPayload),
    });
    const result = await res.json();
    setAnalysis(result);
    setAnalyzing(false);
  };

  const handleExportPDF = () => {
    // For now, simply print as PDF
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto py-16 px-2">
      <h1 className="font-playfair text-3xl font-bold text-primary mb-4">Skill Gap & Career Path Analyzer</h1>
      <p className="mb-8 text-muted-foreground max-w-2xl">
        Discover your career strengths, skill gaps, and the fastest way to reach your goals.
      </p>

      {!analysis && (
        <Button size="lg" className="mb-10" onClick={handleAnalyze} disabled={analyzing}>
          {analyzing ? "Analyzing your skills and career potential..." : "Analyze My Career"}
        </Button>
      )}

      {analyzing && (
        <div className="flex flex-col items-center gap-6 mb-10">
          <span className="text-lg font-bold animate-pulse">Analyzing your skills and career potential...</span>
          <Progress value={77} className="max-w-md w-96" />
        </div>
      )}

      {analysis && (
        <div className="flex flex-col gap-6">
          {/* Career Readiness */}
          <div className="mb-2 w-full">
            <label className="font-semibold text-sm">Career Readiness</label>
            <Progress value={analysis.readiness} className="mt-1 w-full" />
            <span className="text-xs">{analysis.readiness}% ready for next step!</span>
          </div>
          {/* Skill Radar Chart */}
          <div className="bg-white border rounded-xl shadow-md p-6 mb-6">
            <div className="font-semibold mb-3 text-primary text-lg">Skill Gap Analysis</div>
            <ChartContainer config={{}}>
              <RadarChart
                width={400} height={250}
                data={analysis.skillMap}
              >
                <PolarGrid />
                <PolarAngleAxis dataKey="skill" />
                <PolarRadiusAxis angle={30} domain={[0, 10]} />
                <Radar name="You" dataKey="user" stroke="#38bdf8" fill="#38bdf8" fillOpacity={0.5} />
                <Radar name="Market" dataKey="market" stroke="#6366f1" fill="#6366f1" fillOpacity={0.3} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend />
              </RadarChart>
            </ChartContainer>
          </div>
          {/* Top Suggested Roles */}
          <div className="mb-2 bg-gradient-to-br from-accent/30 via-blue-50 to-accent/10 border rounded-xl p-6">
            <div className="font-semibold mb-3 text-primary text-lg">Top 3 Career Role Suggestions</div>
            <ol className="list-decimal ml-5">
              {analysis.topRoles.map((role, idx) => (
                <li key={role.title} className="mb-2">
                  <b>{role.title}</b>
                  <span className="block text-muted-foreground font-normal text-sm">{role.reason}</span>
                </li>
              ))}
            </ol>
          </div>
          {/* Recommended Learning Path */}
          <div className="mb-2 bg-white border rounded-xl p-6">
            <div className="font-semibold mb-3 text-primary text-lg">Recommended Learning Path & Certifications</div>
            <ul>
              {analysis.learningPath.map(cert => (
                <li key={cert.label} className="my-2">
                  <a href={cert.url} target="_blank" rel="noopener noreferrer"
                    className="underline text-blue-700 hover:text-accent font-semibold"
                  >{cert.label}</a>
                </li>
              ))}
            </ul>
          </div>
          {/* Salary Forecast */}
          <div className="mb-2 bg-gradient-to-br from-green-50 via-white to-blue-50 border rounded-xl p-6">
            <div className="font-semibold mb-3 text-primary text-lg">Salary Forecast</div>
            {/* Mini chart (bar) */}
            <div className="w-full flex items-end gap-2 h-28">
              {analysis.salaryForecast.map(sf => (
                <div key={sf.year} className="flex flex-col items-center">
                  <div
                    className="bg-emerald-300 rounded-md"
                    style={{ width: 28, height: (sf.max / 2) + 22 }}
                    title={`$${sf.min}–$${sf.max}k`}
                  />
                  <span className="text-xs mt-1">{sf.year}</span>
                </div>
              ))}
            </div>
            <div className="text-[13px] mt-2 text-muted-foreground">
              Projected total compensation in thousands USD.
            </div>
          </div>
          {/* Industry Switch Feasibility */}
          <div className="bg-white border rounded-xl p-6 flex items-center gap-4">
            <div className="font-semibold text-lg text-primary">Industry Switch:</div>
            <span
              className={`font-bold px-3 py-2 rounded-md text-lg
              ${analysis.industrySwitch === "Feasible" ? "bg-green-100 text-green-700" :
                analysis.industrySwitch === "Challenging" ? "bg-yellow-100 text-yellow-700" :
                  "bg-red-100 text-red-700"
              }`}
            >
              {analysis.industrySwitch}
            </span>
          </div>

          <div className="flex gap-4 mt-6">
            <Button onClick={handleExportPDF} variant="outline">
              <Download className="mr-1" /> Export Career Report (PDF)
            </Button>
            <Button onClick={handleAnalyze} variant="secondary">
              <RefreshCcw className="mr-1" /> Re-analyze (Update Skills/Goals)
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
