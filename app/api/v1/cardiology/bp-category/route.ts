import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const authHeader = request.headers.get("authorization") ?? "";

    console.log("[BPCategoryRoute] BACKEND_URL:", BACKEND_URL);
    console.log("[BPCategoryRoute] Auth header present:", !!authHeader);

    const response = await fetch(`${BACKEND_URL}/api/v1/cardiology/bp-category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(authHeader && { Authorization: authHeader }),
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      let errorDetail = "Unknown error";
      try {
        const errorJson = await response.json();
        errorDetail = errorJson.detail || errorDetail;
      } catch { /* ignore */ }
      console.error("[BPCategoryRoute] Backend error:", response.status, errorDetail);
      return NextResponse.json({ error: errorDetail }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });

  } catch (err: any) {
    console.error("[BPCategoryRoute] Caught error:", err?.message, err?.cause);
    return NextResponse.json(
      { error: "Internal server error", detail: err?.message },
      { status: 500 }
    );
  }
}