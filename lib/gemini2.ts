// lib/gemini.ts

import { GoogleGenerativeAI } from '@google/generative-ai';

// Keep API key secret in environment variable for production
const genAI = new GoogleGenerativeAI("AIzaSyBADA4B7gfQPWheKtDvVdYEIlUgXATgd4E");

export const generatePPT2 = async ({
  projectName,
  tagline,
  teamName,
  hackathonName,
  themeCategory,
  problemStatement,
  solutionUSP,
  keyFeatures,
  techStack,
}: {
  projectName: string;
  tagline: string;
  teamName: string;
  hackathonName: string;
  themeCategory: string;
  problemStatement: string;
  solutionUSP: string;
  keyFeatures: string[];
  techStack: string[];
}) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
You are an expert in creating professional hackathon pitch decks.

Based on the following details:
- Project Name: ${projectName}
- Tagline: ${tagline}
- Team Name: ${teamName}
- Hackathon Name: ${hackathonName}
- Theme/Category: ${themeCategory}
- Problem Statement: ${problemStatement}
- Solution & USP: ${solutionUSP}
- Key Features: ${keyFeatures.join(", ")}
- Tech Stack: ${techStack.join(", ")}

Generate a JSON object with a key "slides", containing an array of exactly 7 objects.
Each object must represent a PowerPoint slide with two fields:
- "title": one of the predefined titles below (use exactly as-is)
- "content": a string OR false if meaningful content cannot be generated.

Use these exact titles in this exact order:
1. "Case Study" – A real-world example related to the problem.
2. "Overview & Significance" – Why this problem is crucial (provide 4 key points).
3. "Key Features" – A list of the provided key features.
4. "Tech Stack" – A list of the provided tech stack.
5. "Feasibility & Viability" – Why this solution is practical and can work at scale.
6. "Impacts & Beliefs" – The broader impact and potential reach.
7. "Business Model Approach" – How it can be monetized or sustained.

Example format:

{
  "slides": [
    { "title": "Case Study", "content": "..." },
    { "title": "Overview & Significance", "content": "- Point 1\n- Point 2\n- Point 3\n- Point 4" },
    ...
  ]
}

Respond with ONLY the raw JSON. Do not use markdown or explanations.
`.trim();

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();

    const cleanedText = text.replace(/^```json|```$/g, '').trim();
    return JSON.parse(cleanedText);
  } catch (error) {
    console.error("Error generating PPT content:", error);
    throw new Error("Failed to generate PPT");
  }
};
