import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv';
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const analyzeWithGemini = async (code) => {
    console.log("fun2")
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `Analyze the time and space complexity of the following code:\n\n${code}. Just the time and space complexity  in separate lines. It should have the following format:\n\nTime Complexity: O(n)\nSpace Complexity: O(n)`
  });

  const rawText = await response.text;
  return rawText;
};
