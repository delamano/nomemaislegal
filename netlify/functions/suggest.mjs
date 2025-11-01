
import { GoogleGenAI } from "@google/genai";

// This is the serverless function that will run on Netlify's backend.
// It securely accesses the API key from environment variables.
const API_KEY = process.env.API_KEY;

// The handler function is the entry point for the serverless function.
export const handler = async (event, context) => {
  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }
  
  if (!API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "API key is not configured on the server." }),
    };
  }

  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Sugira um tópico de votação divertido e criativo para um site sobre nomes. O tópico deve ser uma pergunta curta. Por exemplo: "Qual é o nome mais legal para um gato preto?". A resposta deve conter apenas a pergunta, sem aspas e sem texto adicional.`,
        config: {
            temperature: 1,
            topP: 0.95,
            maxOutputTokens: 50,
        }
    });

    const text = response.text.trim();
    const suggestion = text.replace(/^"|"$|^\*|\*$/g, '');

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ suggestion }),
    };
  } catch (error) {
    console.error("Error in serverless function:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to get suggestion from Gemini API." }),
    };
  }
};
