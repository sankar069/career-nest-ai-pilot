import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { useUserResumes } from "@/hooks/useUserResumes";

// Dummy logged-in email (replace with actual logic when backend is connected)
const LOGGED_EMAIL = "user@email.com";

// Field definitions
const initialResume = {
  fullName: "",
  email: LOGGED_EMAIL,
  phone: "",
  linkedin: "",
  github: "",
  summary: "",
  skills: [] as string[], // tags
  education: [
    { school: "", degree: "", year: "" }
  ],
  experience: [
    { role: "", company: "", duration: "", description: "" }
  ],
  certifications: [""],
};

export default function ResumeBuilder() {
  const [resume, setResume] = useState(initialResume);

  // Tag entry for Skills
  const [skillInput, setSkillInput] = useState("");

  // Add skill tag
  const addSkill = () => {
    if (skillInput.trim() && !resume.skills.includes(skillInput.trim())) {
      setResume(r => ({ ...r, skills: [...r.skills, skillInput.trim()] }));
      setSkillInput("");
    }
  };
  const removeSkill = (skill: string) => {
    setResume(r => ({ ...r, skills: r.skills.filter(s => s !== skill) }));
  };

  // Add Education
  const addEducation = () => setResume(r => ({
    ...r,
    education: [...r.education, { school: "", degree: "", year: "" }]
  }));
  const updateEducation = (i: number, field: string, value: string) =>
    setResume(r => {
      const education = [...r.education];
      education[i] = { ...education[i], [field]: value };
      return { ...r, education };
    });
  const removeEducation = (idx: number) => setResume(r => ({
    ...r,
    education: r.education.filter((_, i) => i !== idx)
  }));

  // Add Experience
  const addExperience = () => setResume(r => ({
    ...r,
    experience: [...r.experience, { role: "", company: "", duration: "", description: "" }]
  }));
  const updateExperience = (i: number, field: string, value: string) =>
    setResume(r => {
      const experience = [...r.experience];
      experience[i] = { ...experience[i], [field]: value };
      return { ...r, experience };
    });
  const removeExperience = (idx: number) => setResume(r => ({
    ...r,
    experience: r.experience.filter((_, i) => i !== idx)
  }));

  // Add Certification
  const addCertification = () => setResume(r => ({
    ...r,
    certifications: [...r.certifications, ""]
  }));
  const updateCertification = (i: number, value: string) =>
    setResume(r => {
      const certifications = [...r.certifications];
      certifications[i] = value;
      return { ...r, certifications };
    });
  const removeCertification = (idx: number) => setResume(r => ({
    ...r,
    certifications: r.certifications.filter((_, i) => i !== idx)
  }));

  // "Export" buttons (no functionality yet)
  const exportPDF = () => {
    alert("Export as PDF coming soon! Connect Supabase for full feature.");
  };
  const exportDOCX = () => {
    alert("Export as DOCX coming soon! Connect Supabase for full feature.");
  };

  // Add resume persistence logic (per user)
  const [saveStatus, setSaveStatus] = useState<null | string>(null);
  const { saveResume } = useUserResumes(LOGGED_EMAIL);

  // Function to save resume to Supabase
  const persistResume = async () => {
    setSaveStatus("Saving...");
    try {
      await saveResume(resume);
      setSaveStatus("Resume saved!");
      setTimeout(() => setSaveStatus(null), 1800);
    } catch (err: any) {
      setSaveStatus("Failed to save. " + err.message);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#f7f9fd]">
      {/* Left: Form Input */}
      <motion.section
        className="w-full md:w-[56%] lg:w-1/2 px-3 md:px-8 py-6 md:py-9 flex flex-col gap-6 bg-gradient-to-br from-white/70 to-[#eceaff]/90 border-r-0 md:border-r md:border-accent/30 shadow-lg z-10"
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", duration: 0.7, bounce: 0.23 }}
      >
        <div className="mb-1 mt-2">
          <h2 className="font-playfair text-2xl md:text-3xl font-bold text-primary mb-1">
            Resume Details
          </h2>
        </div>
        {/* Full Name */}
        <Input
          placeholder="Full Name"
          value={resume.fullName}
          onChange={e => setResume(r => ({ ...r, fullName: e.target.value }))}
          className="mb-2"
          autoComplete="name"
        />
        {/* Email (readonly) */}
        <Input
          placeholder="Email"
          value={resume.email}
          readOnly
          className="mb-2 opacity-90 cursor-not-allowed"
          autoComplete="email"
        />
        {/* Phone */}
        <Input
          placeholder="Phone Number"
          value={resume.phone}
          onChange={e => setResume(r => ({ ...r, phone: e.target.value }))}
          className="mb-2"
          autoComplete="tel"
        />
        {/* LinkedIn / GitHub */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input
            placeholder="LinkedIn URL"
            value={resume.linkedin}
            onChange={e => setResume(r => ({ ...r, linkedin: e.target.value }))}
            className="mb-2"
            autoComplete="url"
          />
          <Input
            placeholder="GitHub URL"
            value={resume.github}
            onChange={e => setResume(r => ({ ...r, github: e.target.value }))}
            className="mb-2"
            autoComplete="url"
          />
        </div>
        {/* Summary */}
        <Textarea
          placeholder="Summary / Objective"
          value={resume.summary}
          onChange={e => setResume(r => ({ ...r, summary: e.target.value }))}
          className="mb-2"
        />
        {/* Skills */}
        <div>
          <label className="font-semibold text-accent block mb-2 text-sm">Skills <span className="font-normal text-gray-500">(Add & press Enter)</span></label>
          <div className="flex gap-1 mb-2">
            <Input
              placeholder="Add a skill..."
              value={skillInput}
              onChange={e => setSkillInput(e.target.value)}
              className="flex-grow"
              onKeyDown={e => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addSkill();
                }
              }}
            />
            <Button type="button" onClick={addSkill} size="sm" className="bg-accent text-black font-bold">Add</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {resume.skills.map(skill => (
              <span key={skill} className="px-2 py-1 bg-primary/10 text-primary rounded-lg text-xs font-semibold hover:bg-accent/60 transition-all cursor-pointer" onClick={() => removeSkill(skill)}>
                {skill} <span className="text-xs text-gray-400 ml-1">×</span>
              </span>
            ))}
          </div>
        </div>
        {/* Education */}
        <div>
          <label className="font-semibold text-accent block mb-1 text-sm">Education</label>
          {resume.education.map((edu, i) => (
            <div key={i} className="flex flex-col gap-1 mb-2 border-b border-accent/20 pb-2">
              <div className="flex gap-2">
                <Input placeholder="School" value={edu.school} onChange={e => updateEducation(i, "school", e.target.value)} className="flex-1" />
                <Input placeholder="Degree" value={edu.degree} onChange={e => updateEducation(i, "degree", e.target.value)} className="flex-1" />
                <Input placeholder="Year" value={edu.year} onChange={e => updateEducation(i, "year", e.target.value)} className="w-20" />
                {resume.education.length > 1 && (
                  <Button variant="outline" type="button" size="icon" onClick={() => removeEducation(i)} className="px-1 text-red-500">×</Button>
                )}
              </div>
            </div>
          ))}
          <Button variant="ghost" onClick={addEducation} size="sm" className="text-primary mt-1">+ Add Education</Button>
        </div>
        {/* Work Experience */}
        <div>
          <label className="font-semibold text-accent block mb-1 text-sm">Experience</label>
          {resume.experience.map((exp, i) => (
            <div key={i} className="flex flex-col gap-1 mb-2 border-b border-accent/20 pb-2">
              <div className="flex gap-2">
                <Input placeholder="Role" value={exp.role} onChange={e => updateExperience(i, "role", e.target.value)} className="flex-1" />
                <Input placeholder="Company" value={exp.company} onChange={e => updateExperience(i, "company", e.target.value)} className="flex-1" />
                <Input placeholder="Duration (e.g. 2020-23)" value={exp.duration} onChange={e => updateExperience(i, "duration", e.target.value)} className="w-24" />
                {resume.experience.length > 1 && (
                  <Button variant="outline" type="button" size="icon" onClick={() => removeExperience(i)} className="px-1 text-red-500">×</Button>
                )}
              </div>
              <Textarea placeholder="Description" value={exp.description} onChange={e => updateExperience(i, "description", e.target.value)} />
            </div>
          ))}
          <Button variant="ghost" onClick={addExperience} size="sm" className="text-primary mt-1">+ Add Experience</Button>
        </div>
        {/* Certifications */}
        <div>
          <label className="font-semibold text-accent block mb-2 text-sm">Certifications</label>
          {resume.certifications.map((cert, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <Input placeholder="Certification" value={cert} onChange={e => updateCertification(i, e.target.value)} className="flex-1" />
              {resume.certifications.length > 1 && (
                <Button variant="outline" type="button" size="icon" onClick={() => removeCertification(i)} className="px-1 text-red-500">×</Button>
              )}
            </div>
          ))}
          <Button variant="ghost" onClick={addCertification} size="sm" className="text-primary mt-1">+ Add Certification</Button>
        </div>
        {/* Export Buttons */}
        <div className="flex gap-3 mt-3">
          <Button variant="outline" onClick={exportPDF} className="rounded-full px-6">Export PDF</Button>
          <Button variant="outline" onClick={exportDOCX} className="rounded-full px-6">Export DOCX</Button>
          <Button variant="default" onClick={persistResume} className="rounded-full px-6 bg-primary text-white">
            Save Resume
          </Button>
        </div>
      </motion.section>

      {/* Right: Live Preview */}
      <motion.section
        className="w-full md:w-[44%] lg:w-1/2 px-1 md:px-6 py-6 overflow-x-auto flex flex-col bg-gradient-to-b from-[#eafafe] to-[#f7f9fd]"
        initial={{ x: 35, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", duration: 0.78, bounce: 0.19 }}
      >
        <div className="mx-auto w-full max-w-[600px] min-h-[830px] bg-white border border-accent/50 rounded-2xl shadow-2xl p-9 my-2">
          <div className="text-center mb-4">
            <h1 className="font-playfair text-3xl font-bold text-primary">{resume.fullName || "Your Name"}</h1>
            <div className="flex justify-center gap-5 my-2 text-gray-600 text-sm">
              <div>{resume.email}</div>
              {resume.phone && <div>| {resume.phone}</div>}
              {(resume.linkedin || resume.github) && (
                <>
                  {resume.linkedin && (
                    <div>
                      | <a href={resume.linkedin} target="_blank" rel="noopener noreferrer" className="underline hover:text-accent transition">{resume.linkedin.replace(/^https?:\/\//, "")}</a>
                    </div>
                  )}
                  {resume.github && (
                    <div>
                      | <a href={resume.github} target="_blank" rel="noopener noreferrer" className="underline hover:text-accent transition">{resume.github.replace(/^https?:\/\//, "")}</a>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          {/* Summary */}
          {resume.summary && (
            <div className="mb-3">
              <div className="font-bold text-lg text-accent">Summary</div>
              <div className="text-gray-700 text-base">{resume.summary}</div>
            </div>
          )}
          {/* Skills */}
          {resume.skills.length > 0 && (
            <div className="mb-3">
              <div className="font-bold text-lg text-accent">Skills</div>
              <ul className="flex flex-wrap gap-2 mt-1 text-[1rem] font-inter">
                {resume.skills.map(skill => (
                  <li key={skill} className="bg-primary/10 text-primary px-3 py-1 rounded-xl font-semibold">{skill}</li>
                ))}
              </ul>
            </div>
          )}
          {/* Education */}
          {resume.education.some(edu => edu.school || edu.degree || edu.year) && (
            <div className="mb-3">
              <div className="font-bold text-lg text-accent">Education</div>
              <ul className="space-y-2 mt-1">
                {resume.education.map((edu, i) =>
                  (edu.school || edu.degree || edu.year) && (
                    <li key={i} className="ml-2">
                      <span className="font-semibold text-primary">{edu.degree}</span>{" "}
                      <span className="text-gray-700">@ {edu.school}</span>
                      <span className="text-gray-400 italic pl-2">{edu.year}</span>
                    </li>
                  )) }
              </ul>
            </div>
          )}
          {/* Experience */}
          {resume.experience.some(exp => exp.role || exp.company || exp.duration || exp.description) && (
            <div className="mb-3">
              <div className="font-bold text-lg text-accent">Experience</div>
              <ul className="space-y-2 mt-1">
                {resume.experience.map((exp, i) =>
                  (exp.role || exp.company || exp.duration || exp.description) && (
                    <li key={i} className="ml-2">
                      <div>
                        <span className="font-semibold text-primary">{exp.role}</span>{" "}
                        <span className="text-gray-700">@ {exp.company}</span>
                        <span className="text-gray-400 italic pl-2">{exp.duration}</span>
                      </div>
                      {exp.description && (
                        <ul className="list-disc ml-5 text-gray-700 text-base">
                          {exp.description.split("\n").map((d, idx) => (
                            <li key={idx}>{d}</li>
                          ))}
                        </ul>
                      )}
                    </li>
                  )
                )}
              </ul>
            </div>
          )}
          {/* Certifications */}
          {resume.certifications.some(c => !!c) && (
            <div className="mb-2">
              <div className="font-bold text-lg text-accent">Certifications</div>
              <ul className="flex flex-wrap gap-2 mt-1">
                {resume.certifications.map((cert, i) => cert &&
                  <li key={i} className="bg-primary/10 text-primary px-3 py-1 rounded-xl font-semibold">{cert}</li>
                )}
              </ul>
            </div>
          )}
        </div>
      </motion.section>
    </div>
  );
}
