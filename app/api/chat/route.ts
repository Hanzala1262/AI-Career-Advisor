import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();

    const conversation =
      history
        ?.map(
          (msg: any) =>
            `${msg.role === "user" ? "User" : "Assistant"}: ${msg.message}`
        )
        .join("\n") || "";

    const prompt = `
You are CareerAI, an expert AI Career Advisor.

Rules:
- Help students choose the best career.
- Remember everything the user has shared in this conversation.
- Use previous messages while answering.
- Never contradict earlier answers.
- Ask follow-up questions if information is missing.
- Give practical, detailed and personalized advice.
- Be friendly and motivating.
- If the question is unrelated to careers, answer briefly and guide the user back to careers.

Conversation History:
${conversation}

Current User Message:
${message}

Assistant:
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
      {
        status: 500,
      }
    );
  }
}