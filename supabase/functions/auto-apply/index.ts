
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
// Demo/mock job source -- replace with API/web scraping as needed
const demoJobs = [
  {
    job_id: "123",
    job_title: "Frontend Engineer",
    company: "Acme Corp",
    location: "Remote",
    salary: "$120k-$150k",
    job_url: "https://acme.example/job/123",
    description: "React, TypeScript, Tailwind, 3+ years experience",
  },
  {
    job_id: "456",
    job_title: "Full Stack Developer",
    company: "Globex LLC",
    location: "NYC",
    salary: "$140k-$160k",
    job_url: "https://globex.example/job/456",
    description: "Node.js, React, AWS, 4+ years experience",
  },
];

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type" }
    });
  }
  try {
    const { user_email, preferences } = await req.json();
    // Step 1: Filter jobs that match user preferences (simple example)
    const matchingJobs = demoJobs.filter(job =>
      (!preferences.role || job.job_title.toLowerCase().includes(preferences.role.toLowerCase())) &&
      (!preferences.location || job.location.toLowerCase().includes(preferences.location.toLowerCase()))
    );
    // Step 2: Compose auto-fill content for preview (simulate using GPT-4o)
    const jobsWithContent = matchingJobs.map(job => ({
      ...job,
      auto_filled_content: {
        cover_letter: `Dear ${job.company}, I am enthusiastic about the ${job.job_title} position.`,
        resume_snippet: "Extensive experience with React and Node.js...",
      }
    }));
    // Step 3: For demo, DO NOT auto-insert into DB. Just return matches.
    return new Response(JSON.stringify({
      found: jobsWithContent.length,
      jobs: jobsWithContent,
    }), {
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { "Access-Control-Allow-Origin": "*" } });
  }
});
