"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { createClient } from "@/lib/supabase/client"

interface UserInfo {
  name?: string | null
  avatar_url?: string | null
  email?: string | null
}

export function UserAvatar({ size = 36 }: { size?: number }) {
  const [user, setUser] = useState<UserInfo | null>(null)

  useEffect(() => {
    const supabase = createClient()
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      const u = data?.user
      if (!u) {
        setUser(null)
        return
      }
      const name = (u.user_metadata?.name as string | undefined) || undefined
      const avatar_url = (u.user_metadata?.avatar_url as string | undefined) || undefined
      const email = u.email || undefined
      setUser({ name: name ?? null, avatar_url: avatar_url ?? null, email: email ?? null })
    }
    getUser()
  }, [])

  const initials = (() => {
    const source = user?.name || user?.email || ""
    if (!source) return "?"
    const parts = source.split(/[\s.@_]+/).filter(Boolean)
    const first = parts[0]?.[0] || ""
    const second = parts.length > 1 ? parts[1]?.[0] : ""
    return (first + second).toUpperCase() || (source[0] || "?").toUpperCase()
  })()

  if (user?.avatar_url) {
    return (
      <div className="rounded-full overflow-hidden ring-2 ring-background" style={{ width: size, height: size }}>
        <Image src={user.avatar_url} alt={user.name || "User"} width={size} height={size} />
      </div>
    )
  }

  return (
    <div
      className="rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-sm ring-2 ring-background"
      style={{ width: size, height: size }}
    >
      <span className="text-xs font-semibold text-primary-foreground">{initials}</span>
    </div>
  )
}
