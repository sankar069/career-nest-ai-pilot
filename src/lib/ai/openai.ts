import OpenAI from 'openai';
import { APIError } from '../error';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});

// Types for AI service
export interface ResumeGenerationInput {
  jobDescription: string;
  userExperience: string;
  skills: string[];
  education: string;
}

export interface InterviewAnalysisInput {
  transcript: string;
  jobRole: string;
  questionType: 'technical' | 'behavioral' | 'general';
}

export interface CareerAnalysisInput {
  currentRole: string;
  experience: string;
  skills: string[];
  targetRole: string;
}

// Resume Generation
export const generateResume = async (input: ResumeGenerationInput) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert resume writer and career coach. Generate an optimized resume based on the provided information."
        },
        {
          role: "user",
          content: JSON.stringify(input)
        }
      ],
      temperature: 0.7,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    throw new APIError(500, "Failed to generate resume", error);
  }
};

// Interview Analysis
export const analyzeInterview = async (input: InterviewAnalysisInput) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert interview coach. Analyze the interview transcript and provide detailed feedback."
        },
        {
          role: "user",
          content: JSON.stringify(input)
        }
      ],
      temperature: 0.7,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    throw new APIError(500, "Failed to analyze interview", error);
  }
};

// Career Path Analysis
export const analyzeCareerPath = async (input: CareerAnalysisInput) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert career coach. Analyze the career path and provide recommendations for advancement."
        },
        {
          role: "user",
          content: JSON.stringify(input)
        }
      ],
      temperature: 0.7,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    throw new APIError(500, "Failed to analyze career path", error);
  }
}; 