import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const authHeader = request.headers.get("authorization") ?? "";

    // Temporary debug response — remove after testing
    return NextResponse.json({
      debug: {
        authHeaderPresent: !!authHeader,
        authHeaderPreview: authHeader.slice(0, 40),
        backendUrl: BACKEND_URL,
      }
    }, { status: 200 });

  } catch (err: any) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}