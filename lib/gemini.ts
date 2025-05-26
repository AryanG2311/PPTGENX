// lib/gemini.ts

import { GoogleGenerativeAI } from '@google/generative-ai';

// Keep API key secret in environment variable for production
const genAI = new GoogleGenerativeAI("AIzaSyA2U4cTjAmkX6-7psPij9BI-LenmjyquhA");

export const generatePPT = async ({
  projectName,
  solution,
  problem,
  usp,
}: {
  projectName: string;
  solution: string;
  problem: string;
  usp: string;
}) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
You are an expert hackathon pitch deck generator.

Based on the following details:
- Project Name: ${projectName}
- Problem: ${problem}
- Unique Selling Point: ${usp}

Generate a JSON object with a key "slides", containing an array of exactly 6 objects.
Each object must represent a PowerPoint slide with two fields:
- "title": one of the predefined titles below (use exactly as-is)
- "content": a string OR false if you are unable to generate meaningful content.

Use these exact titles in this exact order:
1. "Problem Statement" – A clear explanation of the issue.
2. "Real-World Case Study" – A relatable example that reflects this problem.
3. "Our MVP Solution" – What we built to solve it.
4. "Unique Selling Proposition" – Why it's better than existing options.
5. "How It Works" – A basic explanation (mention tech if needed).
6. "Future Scope & Impact" – What can be added, and who it can help.

Example format:

{
  "slides": [
    { "title": "Problem Statement", "content": "..." },
    { "title": "Real-World Case Study", "content": false },
    ...
  ]
}

Respond with ONLY the raw JSON. Do not use markdown or explanation.
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
