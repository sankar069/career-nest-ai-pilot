
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChartContainer } from "@/components/ui/chart";
import { BarChart, XAxis, YAxis, Bar, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis } from "recharts";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

// Types
type ApplicationStage = "Applied" | "Shortlisted" | "Interview" | "Offer" | "Rejected";
type AppStatus = "applied" | "shortlisted" | "interview" | "offer" | "rejected" | string;

type JobApplication = {
  id: string;
  job_title: string | null;
  company: string | null;
  status: AppStatus;
  applied_at: string | null;
};

type Resume = {
  id: string;
  ats_score: number | null;
  created_at: string;
  type: string;
};

// Helper: Map status to stages
const statusToStage = (status: AppStatus): ApplicationStage => {
  switch ((status || "").toLowerCase()) {
    case "applied": return "Applied";
    case "shortlisted": return "Shortlisted";
    case "interview": return "Interview";
    case "offer": return "Offer";
    case "rejected": return "Rejected";
    default: return "Applied";
  }
};

export default function Dashboard() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setUserEmail(null);
        setLoading(false);
        return;
      }
      setUserEmail(user.email);

      const { data: applications = [] } = await supabase
        .from("job_applications")
        .select("id, job_title, company, status, applied_at")
        .eq("user_email", user.email);

      const { data: resumes = [] } = await supabase
        .from("resumes")
        .select("id, ats_score, created_at, type")
        .eq("user_email", user.email);

      setApplications(applications as JobApplication[]);
      setResumes(resumes as Resume[]);
      setLoading(false);
    }
    fetchData();
  }, []);

  // --- Application Stages Kanban Data ---
  const stageCounts = {
    Applied: 0, Shortlisted: 0, Interview: 0, Offer: 0, Rejected: 0
  };
  applications.forEach(app => {
    const stage = statusToStage(app.status);
    // @ts-ignore
    if (stageCounts[stage] !== undefined) stageCounts[stage]++;
  });

  const appStageData = Object.keys(stageCounts).map((stage) => ({
    stage,
    count: (stageCounts as any)[stage],
  }));

  // Resume Score Trend (last 5 uploads)
  const resumeTrend = resumes
    .filter(r => typeof r.ats_score === "number")
    .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
    .slice(-5).map(r => ({
      name: new Date(r.created_at).toLocaleDateString(),
      score: r.ats_score,
    }));

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 flex flex-col gap-6">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-3xl font-bold">📊 My Career Progress Dashboard</h1>
        <Button onClick={() => navigate("/")}>Home</Button>
      </div>
      {/* Main Cards */}
      <div className="flex flex-wrap gap-4">
        <ApplicationTrackerCard
          data={appStageData}
          loading={loading}
          total={applications.length}
        />
        <ResumeMetricsCard
          resumes={resumes}
          trendData={resumeTrend}
          loading={loading}
        />
      </div>
      {/* STUBS for other modules (to be implemented) */}
      <div className="flex flex-wrap gap-4">
        <InterviewAnalyticsCard loading={loading} />
        <SkillTimelineCard loading={loading} />
        <MilestoneBadgeCard loading={loading} />
      </div>
    </div>
  );
}

// ----------------- Widgets/Module Components ---------------------

// 1. Application & Interview Tracker (Bar chart)
function ApplicationTrackerCard({
  data, loading, total,
}: { data: { stage: string; count: number }[]; loading: boolean; total: number }) {
  return (
    <Card className="min-w-[320px] flex-1 animate-fade-in">
      <CardHeader>
        <CardTitle>
          Application Tracker
          <span className="ml-2 text-xs text-foreground/50">{total} total</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[180px] w-full">
          {loading
            ? <div className="mt-6 text-muted">Loading...</div>
            : (
              <ResponsiveContainer width="100%" height={150}>
                <BarChart data={data}>
                  <XAxis dataKey="stage" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#4f46e5" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
        </div>
        <div className="flex justify-between mt-2">
          {data.map(d => (
            <span key={d.stage} className="text-xs rounded px-2 py-1"
              style={{
                background: d.count > 0 ? "#eef2ff" : "#f3f4f6",
                color: d.count > 0 ? "#6366f1" : "#9ca3af"
              }}>
              {d.stage}: {d.count}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// 2. Resume Performance Metrics (Trend line)
function ResumeMetricsCard({
  resumes, trendData, loading,
}: { resumes: Resume[]; trendData: any[]; loading: boolean }) {
  // Get last resume score
  const latest = resumes.length > 0 ?
    resumes.reduce((a, b) => (new Date(a.created_at) > new Date(b.created_at) ? a : b)) : null;
  return (
    <Card className="min-w-[320px] flex-1 animate-fade-in">
      <CardHeader>
        <CardTitle>Resume ATS Score</CardTitle>
      </CardHeader>
      <CardContent>
        {loading
          ? <div className="mt-6 text-muted">Loading...</div>
          : (
            <>
              <div className="font-bold text-primary text-3xl mb-1">
                {latest?.ats_score ? `${latest.ats_score}/100` : "--"}
              </div>
              <div className="text-xs text-muted-foreground mb-3">
                Latest resume: {latest?.type || "-"}
              </div>
              <div className="h-[60px] w-full">
                {trendData.length > 0 &&
                  <ResponsiveContainer width="100%" height={60}>
                    <BarChart data={trendData}>
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 100]} hide />
                      <Tooltip />
                      <Bar dataKey="score" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                }
              </div>
            </>
          )}
      </CardContent>
    </Card>
  );
}

// 3. Interview Practice Analytics (Radar chart stub)
function InterviewAnalyticsCard({ loading }: { loading: boolean }) {
  // Mock demo data, replace with real
  const radarData = [
    { subject: "Confidence", A: 70 },
    { subject: "Clarity", A: 80 },
    { subject: "Domain", A: 60 },
    { subject: "Structure", A: 65 },
    { subject: "Articulation", A: 75 },
  ];
  return (
    <Card className="min-w-[320px] flex-1 animate-fade-in">
      <CardHeader>
        <CardTitle>Interview Practice Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        {loading
          ? <div className="mt-6 text-muted">Loading...</div>
          : (
            <ResponsiveContainer width="100%" height={150}>
              <RadarChart cx="50%" cy="50%" outerRadius={60} data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <Radar name="Score" dataKey="A" stroke="#6366f1" fill="#6366f1" fillOpacity={0.5} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          )}
      </CardContent>
    </Card>
  );
}

// 4. Skill Development Insights (Timeline stub)
function SkillTimelineCard({ loading }: { loading: boolean }) {
  // Mocked data for now
  const skills = [
    { name: "React", completed: true, date: "2024-03-10" },
    { name: "TypeScript", completed: true, date: "2024-04-05" },
    { name: "System Design", completed: false, date: null },
  ];
  return (
    <Card className="min-w-[320px] flex-1 animate-fade-in">
      <CardHeader>
        <CardTitle>Skill Development Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        {loading
          ? <div className="mt-6 text-muted">Loading...</div>
          : (
            <ul className="flex flex-col gap-2">
              {skills.map((s, i) => (
                <li key={s.name} className="flex items-center gap-2">
                  <span className={`h-3 w-3 rounded-full ${s.completed ? "bg-emerald-500" : "bg-gray-300"}`} />
                  <span className="font-medium">{s.name}</span>
                  <span className="text-xs text-gray-400 ml-auto">{s.completed ? s.date : "In progress"}</span>
                </li>
              ))}
            </ul>
          )}
      </CardContent>
    </Card>
  );
}

// 5. Career Milestones & Achievements (Badges stub)
function MilestoneBadgeCard({ loading }: { loading: boolean }) {
  // Mock, future: fetch real milestones
  const badges = [
    { label: "Top 5% Resume", icon: "⭐" },
    { label: "10 Interviews", icon: "🏅" },
    { label: "5 Skills Mastered", icon: "🎓" },
  ];
  return (
    <Card className="min-w-[320px] flex-1 animate-fade-in">
      <CardHeader>
        <CardTitle>Career Milestones</CardTitle>
      </CardHeader>
      <CardContent>
        {loading
          ? <div className="mt-6 text-muted">Loading...</div>
          : (
            <div className="flex gap-3">
              {badges.map(b => (
                <div key={b.label} className="px-4 py-3 bg-accent rounded-lg flex items-center gap-2 text-sm font-semibold shadow border">
                  <span>{b.icon}</span>
                  {b.label}
                </div>
              ))}
            </div>
          )}
      </CardContent>
    </Card>
  );
}
