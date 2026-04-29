import type { APIRoute } from 'astro';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Use import.meta.glob to bundle the resume content into the serverless function at build time
// This avoids runtime file system issues on Netlify/Vercel
const resumeFiles = import.meta.glob('../../content/resume/*.md', { query: '?raw', import: 'default', eager: true });

export const POST: APIRoute = async ({ request }) => {
  try {
    const { message, language = 'en' } = await request.json();

    if (!message) {
      return new Response(JSON.stringify({ error: 'Message is required' }), { status: 400 });
    }

    // Try both import.meta.env and process.env for maximum compatibility with Netlify
    const apiKey = (import.meta.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY)?.trim();
    
    if (!apiKey) {
      console.error('GEMINI_API_KEY is missing from environment variables');
      return new Response(JSON.stringify({ 
        error: 'API Key not configured',
        message: 'Please ensure GEMINI_API_KEY is set in your Netlify environment variables.'
      }), { status: 500 });
    }

    // Get CV Content from bundled files
    const resumeEn = (resumeFiles['../../content/resume/en.md'] as string) || '';
    const resumeAr = (resumeFiles['../../content/resume/ar.md'] as string) || '';
    
    if (!resumeEn && !resumeAr) {
      console.warn('Warning: Resume content files were not found during bundling.');
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const systemPrompt = `
      You are Omar Abbas's Interactive Terminal AI Assistant (OMARTERM). 
      Your ONLY purpose is to answer questions about Omar's professional career, skills, projects, and education based on the CV data provided below.
      
      STRICT RULES:
      1. ONLY answer questions related to Omar's CV.
      2. If a user asks about anything unrelated to Omar (e.g., general knowledge, math, other people, general help), respond politely in the user's language that you are specialized ONLY in Omar's professional profile.
      3. Answer in the same language as the user's query (Arabic or English).
      4. Keep responses concise and "terminal-like" (direct and informative).
      5. Omar is a Techno-Functional Engineer (Software Engineering + Business/SAP).
      
      CV DATA (ENGLISH):
      ${resumeEn}
      
      CV DATA (ARABIC):
      ${resumeAr}
    `;

    const result = await model.generateContent([
      { text: systemPrompt },
      { text: `User Question: ${message}` }
    ]);

    const responseText = result.response.text();

    return new Response(JSON.stringify({ reply: responseText }), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store'
      }
    });

  } catch (error: any) {
    console.error('Chat API Error:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal Server Error', 
      message: error?.message || 'An unexpected error occurred'
    }), { status: 500 });
  }
};
