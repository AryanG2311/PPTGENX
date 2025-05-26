import { NextRequest, NextResponse } from "next/server";
import { generatePPT2 } from "@/lib/gemini2"; // Ensure correct path

export async function POST(req: NextRequest) {
  try {
    const {
      projectName,
      tagline,
      teamName,
      hackathonName,
      themeCategory,
      problemStatement,
      solutionUSP,
      keyFeatures,
      techStack,
    } = await req.json();

    if (!projectName || !problemStatement || !solutionUSP) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const result = await generatePPT2({
      projectName,
      tagline,
      teamName,
      hackathonName,
      themeCategory,
      problemStatement,
      solutionUSP,
      keyFeatures,
      techStack,
    });

    return NextResponse.json(result, { status: 200 });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Failed to generate PPT content" }, { status: 500 });
  }
}
