import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL_PUBLIC ||
    process.env.SUPABASE_URL

  const anon =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_PUBLIC ||
    process.env.SUPABASE_ANON_KEY

  return createBrowserClient(url!, anon!)
}
