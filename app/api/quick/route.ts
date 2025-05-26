// app/api/generate/quick/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { generatePPT } from '@/lib/gemini'; // adjust path if needed

export async function POST(req: NextRequest) {
  try {
    const { projectName,solution, problem, usp } = await req.json();

    if (!projectName || !problem || !usp) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const result = await generatePPT({
        projectName,
        solution,
        problem,
        usp,
      });
          return NextResponse.json(result, { status: 200 });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to generate PPT content' }, { status: 500 });
  }
}
