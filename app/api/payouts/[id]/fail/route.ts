"use server"

import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const { id } = params
  if (!id) return NextResponse.json({ error: "missing id" }, { status: 400 })
  let reason: string | null = null
  try {
    const body = await req.json().catch(() => ({} as any))
    reason = typeof body?.reason === "string" ? body.reason : null
  } catch {}
  try {
    const admin = createAdminClient()
    const { error } = await admin.from("payouts").update({ status: "failed", metadata: { fail_reason: reason } }).eq("id", id)
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json({ id, status: "failed", reason })
  } catch (e) {
    return NextResponse.json({ error: "internal_error" }, { status: 500 })
  }
}

