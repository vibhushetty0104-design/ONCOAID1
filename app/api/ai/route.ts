import { NextResponse } from "next/server";
import { orchestrateAIRequest } from "@/lib/ai/orchestrator";
import { AIRequest } from "@/lib/ai/types";

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => null)) as {
      prompt?: string;
      taskHint?: string;
      conversationHistory?: Array<{
        role: "user" | "assistant" | "system";
        content: string;
      }>;
      patientContext?: {
        cancerType?: string;
        stage?: string;
        city?: string;
      };
    } | null;

    const prompt = body?.prompt?.trim();
    if (!prompt) {
      return NextResponse.json(
        { error: "Please share a question or report excerpt." },
        { status: 400 }
      );
    }

    // Extract client IP identifier for rate limiting
    const forwardedFor = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");
    const clientIdentifier = forwardedFor
      ? forwardedFor.split(",")[0].trim()
      : realIp || "anonymous-client";

    const aiRequest: AIRequest = {
      prompt,
      taskHint: body?.taskHint,
      conversationHistory: body?.conversationHistory,
      patientContext: body?.patientContext,
    };

    const { success, response, status } = await orchestrateAIRequest(
      aiRequest,
      clientIdentifier
    );

    return NextResponse.json(
      {
        message: response.message,
        provider: response.provider,
        category: response.category,
        cached: response.cached,
        suggestedFollowUps: response.suggestedFollowUps,
        doctorQuestions: response.doctorQuestions,
      },
      { status }
    );
  } catch (error) {
    console.error("AI Route Unhandled Error:", error);
    return NextResponse.json(
      {
        error: "The ONCO-AID clinical service encountered a temporary error. Please retry.",
        message:
          "The ONCO-AID educational service is temporarily unavailable. Please retry or discuss your questions directly with your healthcare provider.\n\n*Notice: ONCO-AID provides educational guidance only.*",
      },
      { status: 500 }
    );
  }
}
