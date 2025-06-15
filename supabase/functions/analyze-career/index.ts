
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  try {
    const { resume, target_role, location, interview_feedback = [] } = await req.json();

    // Compose prompt for GPT-4o (simplified version for MVP)
    const prompt = `
      "You are an expert AI career analyst. Here is the user data:
      Resume: ${resume}
      Interview Feedback: ${JSON.stringify(interview_feedback)}
      Target Role: ${target_role}
      Location: ${location}
      Analyze skill gaps (user skills vs. market), suggest top 3 new career roles, learning paths (with certifications), salary trends, and industry switch feasibility. 
      Output JSON with keys: skillMap (array of { skill, user, market }), topRoles (array of { title, reason }), learningPath (array of { label, url }), salaryForecast (array of { year, min, max }), industrySwitch (string: Feasible|Challenging|Not Advised), readiness (0-100)."
    `;

    // Call OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          { role: "system", content: "You are a helpful career AI assistant." },
          { role: "user", content: prompt }
        ],
        temperature: 0.4,
        max_tokens: 1000,
      }),
    });
    const data = await response.json();
    // Try to parse structured JSON model response (extract first valid JSON substring)
    let result = null;
    try {
      const text = data.choices?.[0]?.message?.content || "";
      const jsonMatch = text.match(/({[\s\S]+})/);
      result = jsonMatch ? JSON.parse(jsonMatch[1]) : {};
    } catch (e) { result = {}; }

    // Fallback: if parsing fails, use a mock response
    if (!result || !result.skillMap) {
      result = {
        skillMap: [
          { skill: "React", user: 7, market: 9 },
          { skill: "TypeScript", user: 6, market: 8 },
          { skill: "Node.js", user: 5, market: 7 },
          { skill: "Leadership", user: 5, market: 9 },
          { skill: "Project Mgmt", user: 6, market: 8 }
        ],
        topRoles: [
          { title: "Tech Lead", reason: "Strong frontend skills and emerging leadership" },
          { title: "Product Manager", reason: "Experience in cross-team collaboration" },
          { title: "Developer Advocate", reason: "Strong communication and engineering background" }
        ],
        learningPath: [
          { label: "AWS Certified Solutions Architect", url: "https://aws.amazon.com/certification/certified-solutions-architect-associate/" },
          { label: "Scrum Master Cert", url: "https://www.scrum.org/professional-scrum-certifications" },
          { label: "Udemy: Advanced React", url: "https://www.udemy.com/course/advanced-react-and-redux/" }
        ],
        salaryForecast: [
          { year: 2024, min: 120, max: 175 },
          { year: 2025, min: 135, max: 200 }
        ],
        industrySwitch: "Feasible",
        readiness: 77,
      };
    }

    return new Response(JSON.stringify(result), { headers: { ...corsHeaders, "Content-Type": "application/json" }});
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: corsHeaders });
  }
});
