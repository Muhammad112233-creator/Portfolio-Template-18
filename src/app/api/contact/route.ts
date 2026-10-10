import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message, company } = body ?? {};

    // Honeypot anti-spam check
    if (company && String(company).trim().length > 0) {
      return NextResponse.json({ ok: true });
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      ok: true,
      filedAt: new Date().toISOString(),
      summary: {
        name: String(name).slice(0, 120),
        email: String(email).slice(0, 120),
        subject: String(subject || "Project enquiry").slice(0, 200),
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid request payload." },
      { status: 400 }
    );
  }
}
