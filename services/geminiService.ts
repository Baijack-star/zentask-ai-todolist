
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const refineTaskDescription = async (title: string, currentDescription: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Improve the following task description to be more actionable and clear.
      Task Title: ${title}
      Current Description: ${currentDescription}
      
      Keep it concise (max 2 sentences).`,
      config: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
      }
    });

    return response.text.trim() || currentDescription;
  } catch (error) {
    console.error("AI refinement failed:", error);
    return currentDescription;
  }
};

export const suggestDescription = async (title: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a short, actionable description for a task titled: "${title}".
      Provide only the description text.`,
      config: {
        temperature: 0.7,
      }
    });

    return response.text.trim() || "";
  } catch (error) {
    console.error("AI suggestion failed:", error);
    return "";
  }
};
