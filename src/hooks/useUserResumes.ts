
import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
// Import the Json type from the generated Supabase types
import type { Json } from "@/integrations/supabase/types";

export interface ResumeItem {
  id: string;
  user_email: string;
  type: "built" | "uploaded";
  resume_json?: any;
  file_url?: string | null;
  ats_score?: number | null;
  semantic_match?: number | null;
  created_at?: string;
  updated_at?: string;
}

// Get all resumes for the current user
export function useUserResumes(userEmail: string | null) {
  const [resumes, setResumes] = useState<ResumeItem[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch latest resumes for this user
  const fetchResumes = useCallback(async () => {
    if (!userEmail) return;
    setLoading(true); setError(null);
    const { data, error } = await supabase
      .from("resumes")
      .select("*")
      .eq("user_email", userEmail)
      .order("created_at", { ascending: false });
    if (error) setError(error.message);
    setResumes(data as ResumeItem[] | null || []);
    setLoading(false);
  }, [userEmail]);

  // Save builder-based resume (use Json type for resumeJson)
  const saveResume = useCallback(
    async (resumeJson: Json) => {
      if (!userEmail) { setError("User email is required"); return; }
      setLoading(true);
      // Make sure resumeJson is of type Json
      const { error } = await supabase.from("resumes").insert([
        {
          user_email: userEmail,
          type: "built",
          resume_json: resumeJson,
        },
      ]);
      setLoading(false);
      if (error) setError(error.message);
      else fetchResumes();
    },
    [userEmail, fetchResumes]
  );

  // For uploading file-based resumes
  const saveUploadedResume = useCallback(
    async (fileUrl: string) => {
      if (!userEmail) { setError("User email is required"); return; }
      setLoading(true);
      const { error } = await supabase.from("resumes").insert([
        {
          user_email: userEmail,
          type: "uploaded",
          file_url: fileUrl,
        },
      ]);
      setLoading(false);
      if (error) setError(error.message);
      else fetchResumes();
    },
    [userEmail, fetchResumes]
  );

  return { resumes, loading, error, fetchResumes, saveResume, saveUploadedResume };
}
