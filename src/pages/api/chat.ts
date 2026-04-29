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
    
    // Attempt to use gemini-1.5-flash with a fallback to gemini-pro if needed
    let model;
    try {
      model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    } catch (e) {
      console.warn('Falling back to gemini-pro due to initialization error');
      model = genAI.getGenerativeModel({ model: "gemini-pro" });
    }

    const systemPrompt = `
      You are Omar Abbas's Interactive Terminal AI Assistant (OMARTERM). 
      Your ONLY purpose is to answer questions about Omar's professional career, skills, projects, and education based on the CV data provided below.
      
      STRICT RULES:
      1. ONLY answer questions related to Omar's CV.
      2. Respond in the same language as the user's query (Arabic or English).
      3. Omar is a Techno-Functional Engineer (Software Engineering + Business/SAP).
      
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
      if (error?.message?.includes('404')) {
        console.warn('Model not found, trying fallback to gemini-pro');
        const fallbackModel = genAI.getGenerativeModel({ model: "gemini-pro" });
        result = await fallbackModel.generateContent([
          { text: systemPrompt },
          { text: `User Question: ${message}` }
        ]);
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
