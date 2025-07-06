// controllers/analysisController.js
import { analyzeWithGemini } from '../services/Service.js';

export const analyzeCode = async (req, res) => {
  try {
    const { code } = req.body;
    console.log("Received code:\n", code);

    const rawText = await analyzeWithGemini(code);
    const sanitized = rawText.replace(/\*/g, '').replace(/\n/g, ' ');

    const timeMatch = sanitized.match(/time complexity[:\-]?\s*O\([^)]*\)/i);
    const spaceMatch = sanitized.match(/space complexity[:\-]?\s*O\([^)]*\)/i);

    const timeComplexity = timeMatch ? timeMatch[0].match(/O\([^)]*\)/i)[0] : "Not found";
    const spaceComplexity = spaceMatch ? spaceMatch[0].match(/O\([^)]*\)/i)[0] : "Not found";
    res.json({ timeComplexity, spaceComplexity });
  } catch (error) {
    console.error("Gemini error:", error);
    res.status(500).json({ error: "Failed to analyze code using Gemini." });
  }
};
