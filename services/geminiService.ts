// This function now calls our own serverless function endpoint.
// The serverless function will then securely call the Gemini API.
export async function suggestTopic() {
  try {
    // The endpoint for our Netlify serverless function.
    const response = await fetch('/.netlify/functions/suggest');
    
    if (!response.ok) {
      throw new Error(`Serverless function failed with status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.error) {
        throw new Error(data.error);
    }

    // The serverless function returns the suggestion directly.
    return data.suggestion;

  } catch (error) {
    console.error("Error calling serverless function:", error);
    // Provide a fun fallback suggestion if the API fails
    return "Qual o melhor nome para uma torradeira com sentimentos?";
  }
}
