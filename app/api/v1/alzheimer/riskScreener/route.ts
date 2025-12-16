import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const authHeader = request.headers.get("authorization") ?? "";
    
    // 🔍 DEBUG LOGGING
    console.log("🔍 [RiskScreener Next.js] Received request");
    console.log("🔍 Auth header present:", !!authHeader);
    console.log("🔍 Auth header (first 50):", authHeader.substring(0, 50));
    console.log("🔍 Backend URL:", `${BACKEND_URL}/api/v1/alzheimer/riskScreener`);

    // Forward request to FastAPI backend
    const response = await fetch(
      `${BACKEND_URL}/api/v1/alzheimer/riskScreener`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(authHeader && { Authorization: authHeader }),
        },
        body: JSON.stringify(body),
      }
    );

    console.log("🔍 Backend response status:", response.status);

    // If backend returns error
    if (!response.ok) {
      let errorDetail = "Unknown error";
      try {
        const errorJson = await response.json();
        errorDetail = errorJson.detail || errorDetail;
        console.log("🔴 Backend error:", errorDetail);
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
    console.log("✅ Success!");
    return NextResponse.json(data, { status: 200 });
  } catch (err: any) {
    console.error("[RiskScreenerRoute] Error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}