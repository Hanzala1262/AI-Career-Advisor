import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const prompt = `
You are CareerAI, an expert AI Career Advisor.

Rules:
- Help students choose the best career.
- Ask follow-up questions before giving advice.
- Give clear and practical guidance.
- Be friendly and motivating.
- If the user asks unrelated questions, answer briefly and bring the conversation back to careers.

User:
${message}
`;

    const result = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    return NextResponse.json({
      reply: result.text,
    });
  } catch (error: any) {
    console.error("Gemini Error:", error);

    return NextResponse.json(
      {
        reply: error?.message || "Something went wrong.",
      },
      { status: 500 }
    );
  }
}