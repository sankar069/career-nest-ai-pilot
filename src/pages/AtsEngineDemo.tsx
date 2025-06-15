
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { FileUp, CheckCircle2 } from "lucide-react";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker?worker"; // Vite worker loader

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const ATS_KEYWORDS = [
  "skills",
  "education",
  "experience",
  "certification",
  "projects",
  "summary",
  "technologies",
  "responsibilities",
  "achievements",
  "awards",
  "interests",
  "languages"
];

function analyzePdfText(text: string): { score: number; found: string[] } {
  const lower = text.toLowerCase();
  const found = ATS_KEYWORDS.filter(word => lower.includes(word));
  const score = Math.round((found.length / ATS_KEYWORDS.length) * 100);
  return { score, found };
}

export default function AtsEngineDemo() {
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [foundKeywords, setFoundKeywords] = useState<string[]>([]);
  const [error, setError] = useState("");

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    setScore(null);
    setFoundKeywords([]);
    setFileName(null);
    setError("");
    if (!file) return;

    if (file.type !== "application/pdf") {
      setError("Please upload a PDF file.");
      return;
    }
    setFileName(file.name);
    setLoading(true);

    try {
      const fileReader = new FileReader();
      fileReader.onload = async function() {
        if (fileReader.result instanceof ArrayBuffer) {
          const typedArray = new Uint8Array(fileReader.result);
          const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;
          let text = "";
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            text += (content.items as any[])
              .map(item => ("str" in item ? item.str : ""))
              .join(" ") + " ";
          }
          const { score, found } = analyzePdfText(text);
          setScore(score);
          setFoundKeywords(found);
        }
        setLoading(false);
      };
      fileReader.onerror = function(e) {
        setError("Could not read PDF file. Is it a valid PDF?");
        setLoading(false);
      };
      fileReader.readAsArrayBuffer(file);
    } catch (err) {
      setError("Failed to read PDF. Please try another file.");
      setLoading(false);
    }
  }

  function handleReset() {
    setFileName(null);
    setScore(null);
    setFoundKeywords([]);
    setError("");
    if (fileRef.current) {
      fileRef.current.value = "";
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-accent/10 py-10 px-3">
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center w-full max-w-lg border border-accent/30">
        <h1 className="font-playfair text-3xl font-bold text-primary mb-2">ATS Optimization Engine <span className="text-xs ml-1 bg-gray-100 px-2 py-1 rounded-full border align-middle">Demo</span></h1>
        <p className="text-lg text-gray-700 mb-5">
          Upload your resume (PDF) below to see a simulated ATS score based on common keywords. This demo only checks for basics and is not production-ready!
        </p>
        <div className="flex justify-center gap-2 mb-7">
          <Button onClick={() => navigate("/features")} variant="outline" className="px-4 rounded-full font-bold">
            ← Back to Features
          </Button>
        </div>
        {/* Main Section */}
        {score == null && !loading && (
          <div>
            <input
              ref={fileRef}
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={handleFileChange}
            />
            <Button
              className="px-6 rounded-full bg-accent text-black font-bold mb-3 flex items-center gap-2"
              onClick={() => fileRef.current?.click()}
              type="button"
            >
              <FileUp className="w-5 h-5" /> Upload Resume (PDF)
            </Button>
            <div className="text-gray-400 text-xs mb-4">No files stored. Demo runs in your browser only!</div>
            {error && <div className="text-red-500 mb-2 text-sm">{error}</div>}
          </div>
        )}
        {loading && (
          <div className="text-accent font-semibold text-lg py-6 animate-pulse">
            Analyzing PDF... <span className="ml-1 animate-spin inline-block">⏳</span>
          </div>
        )}
        {score !== null && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-bold text-primary mb-2">
              Mock ATS Score: <span className="text-3xl text-accent align-baseline">{score}%</span>
            </h2>
            <div className="text-gray-700 mb-4">
              Found {foundKeywords.length} out of {ATS_KEYWORDS.length} key sections/terms:
            </div>
            <div className="flex flex-wrap justify-center gap-2 mb-3">
              {ATS_KEYWORDS.map(word =>
                foundKeywords.includes(word) ? (
                  <span key={word} className="flex items-center bg-green-100 text-green-600 rounded px-3 py-1 text-xs font-semibold shadow-sm">
                    <CheckCircle2 className="w-4 h-4 mr-1" /> {word}
                  </span>
                ) : (
                  <span key={word} className="bg-gray-100 text-gray-400 rounded px-3 py-1 text-xs">{word}</span>
                )
              )}
            </div>
            <Button
              className="px-5 rounded-full bg-primary text-white mt-1"
              onClick={handleReset}
            >
              Try Another Resume
            </Button>
            <div className="mt-4 text-xs text-gray-400">For demo only – no files are stored or sent to a server.</div>
          </div>
        )}
      </div>
    </div>
  );
}
