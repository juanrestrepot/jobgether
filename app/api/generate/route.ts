import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { currentRole, skills, interests, incomeGoal } = await request.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY is not configured' },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    // Using gemini-2.5-flash (fast and efficient)
    // Alternative: gemini-2.5-pro (more powerful but slower)
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = `You are an expert remote recruitment consultant. Based on the user's background, suggest 3 modern remote job titles they can transition into.

User Information:
- Current Role/Background: ${currentRole}
- Top 3 Skills: ${skills}
- What they enjoy doing: ${interests}
- Income Goal: ${incomeGoal} USD/Year

For each job, provide:
1. A realistic match percentage (based on skill transferability)
2. A short, compelling one-sentence explanation of why this role fits them
3. A realistic remote salary range in USD (considering their background and the role)

RETURN ONLY RAW JSON. Do not use Markdown code blocks. The JSON structure must be an array of exactly 3 objects with this exact format:
[{"title": "Job Title", "match": 85, "reasoning": "One sentence explanation", "salary": "$45k - $60k USD"}]`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean the response - remove markdown code blocks if present
    let cleanedText = text.trim();
    if (cleanedText.startsWith('```json')) {
      cleanedText = cleanedText.replace(/^```json\n?/, '').replace(/\n?```$/, '');
    } else if (cleanedText.startsWith('```')) {
      cleanedText = cleanedText.replace(/^```\n?/, '').replace(/\n?```$/, '');
    }

    // Parse JSON
    const jobs = JSON.parse(cleanedText);

    // Validate structure
    if (!Array.isArray(jobs) || jobs.length !== 3) {
      throw new Error('Invalid response format from AI');
    }

    return NextResponse.json({ jobs });
  } catch (error: any) {
    console.error('Error generating job matches:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate job matches' },
      { status: 500 }
    );
  }
}

