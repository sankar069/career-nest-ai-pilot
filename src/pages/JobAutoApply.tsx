
import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

interface Job {
  job_id: string;
  job_title: string;
  company: string;
  location: string;
  salary: string;
  job_url: string;
  auto_filled_content: {
    cover_letter: string;
    resume_snippet: string;
  }
}

export default function JobAutoApply() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [status, setStatus] = useState<string>("Idle");
  const [loading, setLoading] = useState<boolean>(false);
  const [approved, setApproved] = useState<{ [id: string]: boolean }>({});

  // For demo, preferences are static. Adapt UI as needed.
  const preferences = { role: "Engineer", location: "Remote" };

  const startAutoApply = async () => {
    setStatus("Scanning jobs matching your profile...");
    setLoading(true);
    setJobs([]);
    setApproved({});
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setStatus("Please login to auto-apply.");
      setLoading(false);
      return;
    }
    // Call edge function
    const res = await fetch("/functions/v1/auto-apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_email: user.email, preferences }),
    });
    const out = await res.json();
    setJobs(out.jobs || []);
    setStatus(`Found ${out.found} job(s) matching your profile.`);
    setLoading(false);
  };

  const approveAndApply = async (job: Job) => {
    // Insert application into Supabase (with status="applied")
    const { error } = await supabase.from("job_applications").insert({
      user_email: (await supabase.auth.getUser()).data.user?.email,
      job_id: job.job_id,
      job_title: job.job_title,
      company: job.company,
      location: job.location,
      salary: job.salary,
      status: "applied",
      applied_at: new Date().toISOString(),
      job_url: job.job_url,
      auto_filled_content: job.auto_filled_content,
    });
    if (!error) {
      setApproved((prev) => ({ ...prev, [job.job_id]: true }));
    } else {
      alert("Failed to apply!");
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Smart Job Auto-Apply</h1>
      <Button onClick={startAutoApply} disabled={loading}>
        {loading ? "Scanning..." : "Start Auto-Applying"}
      </Button>
      <div className="mt-6">
        <div className="text-lg mb-2">{status}</div>
        {jobs.map((job) => (
          <div key={job.job_id} className="border p-4 mb-4 rounded-lg bg-white shadow-sm">
            <div className="font-semibold text-primary mb-1">{job.job_title} @ {job.company}</div>
            <div className="text-sm text-gray-600 mb-1">{job.location} | {job.salary}</div>
            <a href={job.job_url} target="_blank" className="text-blue-600 underline text-xs mb-2 block">Job Link</a>
            <div className="text-base font-medium mt-2">Auto-filled preview:</div>
            <div className="text-sm text-gray-800 mb-2">
              <b>Cover Letter:</b> {job.auto_filled_content.cover_letter}<br/>
              <b>Resume Snippet:</b> {job.auto_filled_content.resume_snippet}
            </div>
            {approved[job.job_id] ? (
              <div className="text-green-600 font-bold">Applied!</div>
            ) : (
              <Button size="sm" onClick={() => approveAndApply(job)}>
                Approve & Apply
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
