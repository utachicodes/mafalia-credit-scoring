"use server"

import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"

export async function POST(_: Request, { params }: { params: { id: string } }) {
  const { id } = params
  if (!id) return NextResponse.json({ error: "missing id" }, { status: 400 })
  try {
    const admin = createAdminClient()
    const { error } = await admin.from("payouts").update({ status: "succeeded" }).eq("id", id)
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json({ id, status: "succeeded" })
  } catch (e) {
    return NextResponse.json({ error: "internal_error" }, { status: 500 })
  }
}

