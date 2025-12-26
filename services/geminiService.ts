import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateBedtimeStory = async (theme: string, childName: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a short, soothing bedtime story (approx 150 words) for a child named ${childName}. 
      The theme is: ${theme}. 
      Include a subtle moral about healthy habits or kindness. 
      Keep the tone gentle and safe.`,
      config: {
        thinkingConfig: { thinkingBudget: 0 }
      }
    });
    return response.text || "Once upon a time...";
  } catch (error) {
    console.error("Error generating story:", error);
    return "Once upon a time, the internet was a bit slow, but the stars still shone brightly outside...";
  }
};

export const checkContentSafety = async (text: string): Promise<boolean> => {
  // Simulates the AI monitoring feature
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze this text for child safety (bullying, predatory, violence, self-harm). 
      Text: "${text}"
      Reply with JSON only: {"safe": boolean, "reason": "string"}.`,
       config: {
        responseMimeType: "application/json",
      },
    });
    const result = JSON.parse(response.text || '{"safe": true}');
    return result.safe;
  } catch (error) {
    return true; // Fail open for demo purposes, in prod would fail closed
  }
};