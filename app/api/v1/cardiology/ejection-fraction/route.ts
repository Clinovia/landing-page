// landing-page/app/api/v1/cardiology/ejection-fraction/route.ts

import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const authHeader = request.headers.get("authorization") ?? "";

    // Forward request to FastAPI backend
    const response = await fetch(
      `${BACKEND_URL}/api/v1/cardiology/ejection-fraction`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(authHeader && { Authorization: authHeader }),
        },
        body: JSON.stringify(body),
      }
    );

    // If backend returns error
    if (!response.ok) {
      let errorDetail = "Unknown error";

      try {
        const errorJson = await response.json();
        errorDetail = errorJson.detail || errorDetail;
      } catch {
        /* ignore parse error */
      }

      return NextResponse.json(
        { error: errorDetail },
        { status: response.status }
      );
    }

    // Success
    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (err: any) {
    console.error("[EjectionFractionRoute] Error:", err);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
