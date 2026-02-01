
import { GoogleGenAI, Type } from "@google/genai";

// Always use a named parameter for initialization and rely on process.env.API_KEY directly.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAIAssistantResponse = async (prompt: string, context?: any) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `
        You are "FinNexus AI", a specialized credit analyst and customer support bot for an Indian NBFC. 
        Context: ${JSON.stringify(context || {})}
        
        Guidelines:
        - Provide expert advice on RBI regulations (Fair Practices Code, Digital Lending Guidelines).
        - Help users interpret credit scores or loan application data.
        - Be professional, concise, and accurate about Indian financial context.
        
        User Query: ${prompt}
      `,
    });
    // Use .text property directly, not as a method call.
    return response.text || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The AI assistant is currently unavailable. Please check your system configuration.";
  }
};

export const analyzeLoanRisk = async (applicationData: any) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze the following Indian NBFC loan application for risk markers. 
      Data: ${JSON.stringify(applicationData)}
      `,
      config: {
        responseMimeType: "application/json",
        // Implementing responseSchema as per guidelines for robust JSON output.
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: {
              type: Type.NUMBER,
              description: 'Risk Score from 0 to 100.',
            },
            factors: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'The top 3 risk factors identified.',
            },
            recommendation: {
              type: Type.STRING,
              description: 'Final recommendation: Approve, Reject, or Review.',
            }
          },
          required: ['score', 'factors', 'recommendation'],
          propertyOrdering: ['score', 'factors', 'recommendation'],
        }
      }
    });
    // Use .text property directly and trim whitespace before parsing.
    const jsonStr = response.text?.trim() || "{}";
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Gemini Risk Analysis Error:", error);
    return { score: 50, factors: ["Error in analysis"], recommendation: "Review" };
  }
};
