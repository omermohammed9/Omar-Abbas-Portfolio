import type { APIRoute } from 'astro';
import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'node:fs/promises';
import path from 'node:path';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { message, language = 'en' } = await request.json();

    if (!message) {
      return new Response(JSON.stringify({ error: 'Message is required' }), { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'API Key not configured' }), { status: 500 });
    }

    // Load CV Content
    const resumeEnPath = path.resolve('./src/content/resume/en.md');
    const resumeArPath = path.resolve('./src/content/resume/ar.md');
    
    let resumeEn = '';
    let resumeAr = '';
    
    try {
      resumeEn = await fs.readFile(resumeEnPath, 'utf-8');
      resumeAr = await fs.readFile(resumeArPath, 'utf-8');
    } catch (e) {
      console.error('Error reading resume files:', e);
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
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
};
