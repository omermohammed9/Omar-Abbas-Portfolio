import type { APIRoute } from 'astro';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Use import.meta.glob to bundle the resume content into the serverless function at build time
const resumeFiles = import.meta.glob('../../content/resume/*.md', { query: '?raw', import: 'default', eager: true });

export const GET: APIRoute = async () => {
  const apiKey = (import.meta.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY);
  return new Response(JSON.stringify({
    status: 'Chat API is active',
    isServiceAvailable: !!apiKey,
    diagnostics: {
      hasApiKey: !!apiKey,
      availableResumes: Object.keys(resumeFiles)
    }
  }), { status: 200, headers: { 'Content-Type': 'application/json' } });
};

export const POST: APIRoute = async ({ request }) => {
  let body: any = {};
  try {
    body = await request.json().catch(() => ({}));
    const { message, language = 'en', history = [] } = body;

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
    
    // Models to try in order of preference (Updated for April 2026)
    const MODELS_TO_TRY = [
      "gemini-3.1-pro-preview",
      "gemini-3-flash",
      "gemini-3.1-flash-lite-preview",
      "gemini-2.5-flash",
      "gemini-2.0-flash",
      "gemini-flash-latest",
      "gemini-pro-latest"
    ];

    // Select the relevant CV based on the request language
    const relevantCV = language === 'ar' ? (resumeAr || resumeEn) : (resumeEn || resumeAr);

    const systemPrompt = `
      You are Omar Abbas's Interactive Terminal AI Assistant (OMARTERM). 
      Current Date: ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
      
      ROLE:
      You are a world-class career assistant specializing in Omar's professional profile.
      Omar is a Techno-Functional Engineer bridging Software Engineering and Business/SAP.
      
      STRICT RULES:
      1. ONLY answer questions related to Omar's CV and professional profile.
      2. ALWAYS respond in the language the user uses (${language === 'ar' ? 'Arabic' : 'English'} is the current UI language).
      3. Keep responses concise, professional, and formatted for a terminal.
      4. If the question is outside Omar's scope, politely redirect them.
      
      MAGIC MODE (ACTIONS):
      You can trigger UI actions by including them in your JSON response.
      - To change persona: {"action": "SET_PERSONA", "value": "executive" | "engineer"}
      - To change language: {"action": "SET_LANGUAGE", "value": "en" | "ar"}
      - To change theme: {"action": "SET_THEME", "value": "dark" | "light"}
      
      RESPONSE FORMAT:
      You MUST ALWAYS respond in valid JSON format with the following schema:
      {
        "reply": "Your message to the user here...",
        "action": "ACTION_NAME" | null,
        "value": "action_value" | null
      }
      
      CV DATA (${language === 'ar' ? 'ARABIC' : 'ENGLISH'}):
      ${relevantCV}
    `;

    let lastError = null;
    let result = null;

    for (const modelName of MODELS_TO_TRY) {
      try {
        console.log(`Attempting Gemini model: ${modelName}`);
        
        // Try with default version first
        const model = genAI.getGenerativeModel({ 
          model: modelName,
        });
        
        result = await model.generateContent({
          contents: [
            { role: 'user', parts: [{ text: systemPrompt }] },
            ...history,
            { role: 'user', parts: [{ text: `User Question: ${message}` }] }
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
            responseMimeType: "application/json"
          }
        });
        
        if (result && result.response) {
          console.log(`Success with model: ${modelName}`);
          break; // Exit loop on success
        }
      } catch (error: any) {
        console.error(`Error with model ${modelName}:`, error.message);
        lastError = error;
        
        // If 404 or other error, try next model
        continue;
      }
    }

    if (!result) {
      throw lastError || new Error('All Gemini models failed to respond');
    }

    const responseText = result.response.text();
    
    // Parse the JSON to ensure it's valid
    try {
      const jsonResponse = JSON.parse(responseText);
      return new Response(JSON.stringify(jsonResponse), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (e) {
      // Fallback if AI didn't return valid JSON despite instructions
      return new Response(JSON.stringify({ 
        reply: responseText, 
        action: null, 
        value: null 
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

  } catch (error: any) {
    console.error('Chat API Fatal Error:', error);
    
    // Use the language from the already-parsed body
    const lang = body?.language || 'en';
    
    const fallbackMsg = lang === 'ar'
      ? "عذراً، أواجه صعوبة في الاتصال بخوادم الذكاء الاصطناعي حالياً. يرجى المحاولة لاحقاً."
      : "I'm having trouble connecting to the AI servers right now. Please try again later.";

    // Calculate retry timing
    const now = new Date();
    const isQuotaExceeded = error?.message?.includes('429');
    
    // Default retry: 1 minute (for RPM)
    let retryAfter = 60000; 

    if (isQuotaExceeded) {
      // If likely RPD (Daily) quota, calculate time until Midnight PT (08:00 UTC)
      const nextReset = new Date(now);
      nextReset.setUTCHours(8, 0, 0, 0);
      if (nextReset <= now) {
        nextReset.setUTCDate(nextReset.getUTCDate() + 1);
      }
      retryAfter = nextReset.getTime() - now.getTime();
    }

    return new Response(JSON.stringify({ 
      error: 'Execution Error', 
      isFatal: true,
      retryAfter, // in milliseconds
      message: error?.message || 'An unexpected error occurred during processing',
      reply: fallbackMsg
    }), { status: 500 });
  }
};
