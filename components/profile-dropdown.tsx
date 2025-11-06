"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, LogOut, History, Settings } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface ProfileDropdownProps {
  userName: string
  userEmail: string
  userInitials: string
}

export function ProfileDropdown({ userName, userEmail, userInitials }: ProfileDropdownProps) {
  const { t } = useLanguage()
  const router = useRouter()
  const [userInstitution, setUserInstitution] = useState("")

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUserInstitution(user.user_metadata?.institution || user.user_metadata?.company || "")
      }
    })
  }, [])

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/auth/login")
    router.refresh()
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-9 w-9 rounded-full p-0 hover:bg-muted/50 transition-all duration-200">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-md ring-2 ring-background hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-105">
              <span className="text-xs font-semibold text-primary-foreground">{userInitials}</span>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64">
          <DropdownMenuLabel>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{userName}</p>
              <p className="text-xs leading-none text-muted-foreground">{userEmail}</p>
              {userInstitution && <p className="text-xs leading-none text-muted-foreground">{userInstitution}</p>}
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => router.push("/profile")}>
            <User className="mr-2 h-4 w-4" />
            <span>{t("profile.viewProfile")}</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/settings")}>
            <Settings className="mr-2 h-4 w-4" />
            <span>{t("profile.settings")}</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/profile/login-history")}>
            <History className="mr-2 h-4 w-4" />
            <span>{t("profile.loginHistory")}</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
            <LogOut className="mr-2 h-4 w-4" />
            <span>{t("auth.signOut")}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

