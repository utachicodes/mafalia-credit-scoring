import { createClient } from "@/lib/supabase/server"

export async function logAudit(params: {
  endpoint: string
  method: string
  resourceId?: string
  ip?: string
  meta?: Record<string, any>
}) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    const { data: profile } = user
      ? await supabase.from("profiles").select("role").eq("id", user.id).single()
      : { data: null }

    await supabase.from("audit_logs").insert({
      user_id: user?.id || null,
      role: profile?.role || "GUEST",
      endpoint: params.endpoint,
      method: params.method,
      resource_id: params.resourceId,
      ip: params.ip,
      meta: params.meta,
    })
  } catch (error) {
    console.error("[v0] Audit log failed:", error)
  }
}
