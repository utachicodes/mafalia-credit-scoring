"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu"
import { User, LogOut, History, Lock, Building2, Settings } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

interface ProfileDropdownProps {
  userName: string
  userEmail: string
  userInitials: string
}

export function ProfileDropdown({ userName, userEmail, userInitials }: ProfileDropdownProps) {
  const { t } = useLanguage()
  const router = useRouter()
  const { toast } = useToast()
  const [userInstitution, setUserInstitution] = useState("")
  const [changePasswordOpen, setChangePasswordOpen] = useState(false)
  const [editInstitutionOpen, setEditInstitutionOpen] = useState(false)
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [loginHistory, setLoginHistory] = useState([
    { id: "1", date: new Date().toISOString(), ip: "192.168.1.1", location: "Dakar, Senegal", device: "Chrome on Windows" },
    { id: "2", date: new Date(Date.now() - 86400000).toISOString(), ip: "192.168.1.2", location: "Dakar, Senegal", device: "Safari on iOS" },
    { id: "3", date: new Date(Date.now() - 172800000).toISOString(), ip: "192.168.1.3", location: "Thiès, Senegal", device: "Chrome on Android" },
  ])

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

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: t("common.error"),
        description: t("auth.common.passwordMismatch"),
      })
      return
    }

    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({
      password: passwordData.newPassword,
    })

    if (error) {
      toast({
        title: t("common.error"),
        description: error.message,
      })
    } else {
      toast({
        title: t("common.success"),
        description: t("profile.passwordChanged"),
      })
      setChangePasswordOpen(false)
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
    }
  }

  const handleUpdateProfile = async () => {
    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({
      data: {
        institution: userInstitution,
      },
    })

    if (error) {
      toast({
        title: t("common.error"),
        description: error.message,
      })
    } else {
      toast({
        title: t("common.success"),
        description: t("profile.updated"),
      })
    }
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
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Settings className="mr-2 h-4 w-4" />
              <span>{t("profile.settings")}</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <Dialog open={changePasswordOpen} onOpenChange={setChangePasswordOpen}>
                <DialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <Lock className="mr-2 h-4 w-4" />
                    <span>{t("profile.changePassword")}</span>
                  </DropdownMenuItem>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{t("profile.changePassword")}</DialogTitle>
                    <DialogDescription>{t("profile.changePasswordDescription")}</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">{t("profile.currentPassword")}</Label>
                      <Input
                        id="current-password"
                        type="password"
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">{t("profile.newPassword")}</Label>
                      <Input
                        id="new-password"
                        type="password"
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">{t("profile.confirmPassword")}</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setChangePasswordOpen(false)}>
                      {t("common.cancel")}
                    </Button>
                    <Button onClick={handleChangePassword}>{t("common.save")}</Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Dialog open={editInstitutionOpen} onOpenChange={setEditInstitutionOpen}>
                <DialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => { e.preventDefault(); setEditInstitutionOpen(true) }}>
                    <Building2 className="mr-2 h-4 w-4" />
                    <span>{t("profile.editInstitution")}</span>
                  </DropdownMenuItem>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{t("profile.editInstitution")}</DialogTitle>
                    <DialogDescription>Update your institution or company name</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="institution">Institution/Company</Label>
                      <Input
                        id="institution"
                        value={userInstitution}
                        onChange={(e) => setUserInstitution(e.target.value)}
                        placeholder="Enter institution or company name"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setEditInstitutionOpen(false)}>
                      {t("common.cancel")}
                    </Button>
                    <Button onClick={() => { handleUpdateProfile(); setEditInstitutionOpen(false) }}>{t("common.save")}</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <History className="mr-2 h-4 w-4" />
              <span>{t("profile.loginHistory")}</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="w-80">
              <div className="p-2 max-h-64 overflow-y-auto">
                {loginHistory.map((entry) => (
                  <div key={entry.id} className="p-2 rounded-lg hover:bg-muted/50 mb-2">
                    <div className="text-xs font-medium">{new Date(entry.date).toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">{entry.device}</div>
                    <div className="text-xs text-muted-foreground">{entry.location} • {entry.ip}</div>
                  </div>
                ))}
              </div>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
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

