import { NextResponse } from "next/server"

export async function GET() {
  const data = {
    mrr: 12345,
    churnRate: 0.025,
    cac: 250,
    activeUsers: 1234,
  }

  return NextResponse.json(data)
}
