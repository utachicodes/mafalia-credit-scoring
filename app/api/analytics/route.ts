import { NextResponse } from "next/server"

export async function GET() {
  try {
    const data = {
      mrr: 12345,
      churnRate: 0.025,
      cac: 250,
      activeUsers: 1234,
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Analytics API error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
