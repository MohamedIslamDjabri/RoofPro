import { NextRequest, NextResponse } from "next/server";
import { ai } from "@/lib/gemini";
import { LOCATIONS, SITE_CONFIG } from "@/constants/data";

const SYSTEM_INSTRUCTION = `
You are the official RoofPro USA AI Booking Specialist & Regional Dispatcher.
Your goal is to assist Texas homeowners, answer roofing questions with expert knowledge, and help them schedule a free 21-point drone and attic inspection across Dallas, Houston, Austin, and San Antonio.

Company Context:
- Name: ${SITE_CONFIG.name} (${SITE_CONFIG.tagline})
- Texas License: ${SITE_CONFIG.license}
- Main Dispatch Phone: ${SITE_CONFIG.phone}
- Regional Hubs:
  * Dallas-Fort Worth: 14241 Dallas Pkwy, Dallas, TX 75254 | (214) 555-0148 (Serves Plano, Frisco, Irving, McKinney, Garland, etc.)
  * Greater Houston: 2800 Post Oak Blvd, Houston, TX 77056 | (713) 555-0192 (Serves Katy, Sugar Land, The Woodlands, Cypress, etc.)
  * Austin & Hill Country: 111 Congress Ave, Austin, TX 78701 | (512) 555-0176 (Serves Round Rock, Cedar Park, Lakeway, etc.)
  * San Antonio: 300 Convent St, San Antonio, TX 78205 | (210) 555-0134 (Serves Boerne, New Braunfels, Schertz, etc.)
- Services: Roof Replacement (50-year non-prorated warranties, Class 4 impact shingles), Roof Repair (leaks, missing shingles, flashing from $299), Storm & Hail Damage Restoration (insurance claim assistance, Xactimate certified, free drone scan), 24/7 Emergency Tarping, Residential Specialty (standing seam metal, Spanish tile).
- Inspection Offer: 100% Free 21-point drone aerial scan and attic thermal rafters inspection. Zero obligation, no high-pressure sales.

Booking Process:
To schedule an inspection, politely collect or confirm:
1. City / Texas Metro region (Dallas, Houston, Austin, or San Antonio)
2. Service needed (Roof Replacement, Repair, Hail/Storm Inspection, etc.)
3. Property address
4. Full Name
5. Best Phone number
6. Preferred date & time (e.g. tomorrow morning, this Thursday at 2 PM)

Booking Confirmation Format:
When you have collected enough details to book (or if the user explicitly confirms the booking details), include a special JSON block at the very end of your message wrapped in:
\`\`\`booking
{
  "confirmed": true,
  "fullName": "...",
  "phone": "...",
  "city": "Dallas | Houston | Austin | San Antonio",
  "address": "...",
  "service": "...",
  "preferredTime": "...",
  "dispatchHub": "..."
}
\`\`\`

Tone:
Warm, professional, knowledgeable, reassuring, and concise (ideal for quick chat and spoken audio). Keep replies relatively concise (2-4 sentences max per turn) so it flows naturally in text and voice.
`;

export async function POST(req: NextRequest) {
  try {
    const { messages, userLocation } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages payload" }, { status: 400 });
    }

    // Convert messages to Gemini contents format
    const contents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const locationContext = userLocation ? `The user is currently browsing the ${userLocation} market.` : "";

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: contents,
      config: {
        systemInstruction: `${SYSTEM_INSTRUCTION}\n${locationContext}`,
        temperature: 0.7,
      },
    });

    const replyText = response.text || "I'm ready to assist with your RoofPro inspection booking. What city is your property located in?";

    // Extract booking JSON if present
    let bookingData = null;
    const bookingMatch = replyText.match(/```booking\s*([\s\S]*?)\s*```/);
    if (bookingMatch && bookingMatch[1]) {
      try {
        bookingData = JSON.parse(bookingMatch[1]);
      } catch (err) {
        console.error("Failed to parse booking JSON:", err);
      }
    }

    // Clean text for display by stripping the raw code block if desired
    const cleanText = replyText.replace(/```booking[\s\S]*?```/, "").trim();

    return NextResponse.json({
      text: cleanText || replyText,
      booking: bookingData,
    });
  } catch (error: any) {
    console.error("Gemini Chat API Error:", error);
    return NextResponse.json(
      {
        error: "Failed to generate chat response",
        fallbackText: "I apologize, our regional dispatch system is currently experiencing high call volume. Please call us directly at (800) 555-ROOF or use our online estimate form.",
      },
      { status: 500 }
    );
  }
}
