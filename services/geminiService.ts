import { GoogleGenAI, Type } from "@google/genai";
import { QuoteRequest } from "../types";

// Initialize Gemini Client
// I'm assuming the environment is set up correctly. If not, that's on the ops team.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const parseLogisticsRequest = async (prompt: string): Promise<QuoteRequest | null> => {
  try {
    const modelId = "gemini-2.5-flash"; // Fast and efficient for extraction
    
    const response = await ai.models.generateContent({
      model: modelId,
      contents: `Extract logistics details from this request: "${prompt}". 
      If a field is missing, infer a reasonable default for a B2B shipment.
      Urgency should be Standard, Express, or Critical.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            origin: { type: Type.STRING },
            destination: { type: Type.STRING },
            weight: { type: Type.STRING },
            urgency: { type: Type.STRING, enum: ["Standard", "Express", "Critical"] },
            type: { type: Type.STRING, description: "Type of goods, e.g. Documents, Pallet, Machinery" }
          },
          required: ["origin", "destination", "weight", "urgency", "type"]
        }
      }
    });

    const text = response.text;
    if (!text) return null;
    
    return JSON.parse(text) as QuoteRequest;
  } catch (error) {
    console.error("Gemini failed to parse logistics request:", error);
    return null;
  }
};