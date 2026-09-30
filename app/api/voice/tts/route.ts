import { NextRequest, NextResponse } from "next/server";
import { ai } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const { text, voice = "Kore" } = await req.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Missing or invalid text parameter" }, { status: 400 });
    }

    // Limit text length for TTS voice responses to keep latency ultra low
    const trimmedText = text.slice(0, 400);

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash-lite-tts",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: trimmedText,
              speechMetadata: {
                style: "Friendly, clear, professional Texas roofing dispatcher",
              },
            },
          ],
        },
      ],
      config: {
        responseModalities: ["AUDIO"],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voice }, // 'Kore', 'Zephyr', 'Puck'
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

    if (!base64Audio) {
      return NextResponse.json({ error: "No audio generated" }, { status: 500 });
    }

    return NextResponse.json({
      audio: base64Audio,
      mimeType: "audio/wav",
    });
  } catch (error: any) {
    console.error("Gemini TTS API Error:", error);
    return NextResponse.json(
      { error: "TTS generation failed", message: error?.message },
      { status: 500 }
    );
  }
}
