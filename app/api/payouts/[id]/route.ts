"use server"

import { NextResponse } from "next/server"

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const { id } = params
  if (!id) {
    return NextResponse.json({ error: "missing id" }, { status: 400 })
  }
  // Without persistence, we return a generic successful placeholder
  return NextResponse.json({
    payout: {
      id,
      status: "succeeded",
      createdAt: new Date().toISOString(),
    },
  })
}

