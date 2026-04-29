import type { APIRoute } from 'astro';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Use import.meta.glob to bundle the resume content into the serverless function at build time
const resumeFiles = import.meta.glob('../../content/resume/*.md', { query: '?raw', import: 'default', eager: true });

export const GET: APIRoute = async () => {
  const apiKey = (import.meta.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY);
  return new Response(JSON.stringify({
    status: 'Chat API is active',
    diagnostics: {
      hasApiKey: !!apiKey,
      apiKeyLength: apiKey?.length || 0,
      availableResumes: Object.keys(resumeFiles)
    }
  }), { status: 200, headers: { 'Content-Type': 'application/json' } });
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json().catch(() => ({}));
    const { message, language = 'en' } = body;

    if (!message) {
      return new Response(JSON.stringify({ error: 'Message is required' }), { status: 400 });
    }

    // Robust API key retrieval
    const apiKey = (import.meta.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY)?.trim();
    
    if (!apiKey) {
      console.error('API Error: GEMINI_API_KEY is missing');
      return new Response(JSON.stringify({ 
        error: 'Configuration Error',
        message: 'GEMINI_API_KEY is not set in the environment.'
      }), { status: 500 });
    }

    // Get CV Content
    const resumeEn = (resumeFiles['../../content/resume/en.md'] as string) || '';
    const resumeAr = (resumeFiles['../../content/resume/ar.md'] as string) || '';
    
    if (!resumeEn && !resumeAr) {
      console.error('API Error: Resume files not found in bundle');
      return new Response(JSON.stringify({ 
        error: 'Content Error',
        message: 'CV data could not be loaded.'
      }), { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Modern Gemini model names
    const PRIMARY_MODEL = "gemini-1.5-flash";
    const FALLBACK_MODEL = "gemini-1.5-pro";

    let model;
    try {
      model = genAI.getGenerativeModel({ model: PRIMARY_MODEL });
    } catch (e) {
      model = genAI.getGenerativeModel({ model: FALLBACK_MODEL });
    }

    const systemPrompt = `
      You are Omar Abbas's Interactive Terminal AI Assistant (OMARTERM). 
      Your ONLY purpose is to answer questions about Omar's professional career, skills, projects, and education based on the CV data provided below.
      
      STRICT RULES:
      1. ONLY answer questions related to Omar's CV.
      2. Respond in the SAME LANGUAGE as the user's question (Arabic for Arabic, English for English).
      3. Omar is a Techno-Functional Engineer (Software Engineering + Business/SAP).
      4. Be concise and professional.
      
      CV DATA (ENGLISH):
      ${resumeEn}
      
      CV DATA (ARABIC):
      ${resumeAr}
    `;

    let result;
    try {
      result = await model.generateContent([
        { text: systemPrompt },
        { text: `User Question: ${message}` }
      ]);
    } catch (error: any) {
      const errorMsg = error?.message || '';
      console.error('Gemini API Error:', errorMsg);

      // If primary model fails (404/503), try the fallback
      if (errorMsg.includes('404') || errorMsg.includes('503')) {
        try {
          const fallbackModel = genAI.getGenerativeModel({ model: FALLBACK_MODEL });
          result = await fallbackModel.generateContent([
            { text: systemPrompt },
            { text: `User Question: ${message}` }
          ]);
        } catch (fallbackError: any) {
          throw new Error(`Both ${PRIMARY_MODEL} and ${FALLBACK_MODEL} failed. Error: ${fallbackError.message}`);
        }
      } else {
        throw error;
      }
    }

    const responseText = result.response.text();

    return new Response(JSON.stringify({ reply: responseText }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error: any) {
    console.error('Chat API Fatal Error:', error);
    return new Response(JSON.stringify({ 
      error: 'Execution Error', 
      message: error?.message || 'An unexpected error occurred during processing'
    }), { status: 500 });
  }
};
