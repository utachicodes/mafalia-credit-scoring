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
} from "@/components/ui/dropdown-menu"
import { Bell, CheckCircle, AlertCircle, Info, X } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { formatDateForLanguage } from "@/lib/date-utils"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Notification {
  id: string
  type: "success" | "warning" | "info" | "error"
  title: string
  message: string
  timestamp: string
  read: boolean
}

export function NotificationsDropdown() {
  const { t, language } = useLanguage()
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    setNotifications([
      {
        id: "1",
        type: "success",
        title: t("notifications.loanApproved.title"),
        message: t("notifications.loanApproved.message"),
        timestamp: new Date().toISOString(),
        read: false,
      },
      {
        id: "2",
        type: "info",
        title: t("notifications.paymentReceived.title"),
        message: t("notifications.paymentReceived.message"),
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        read: false,
      },
      {
        id: "3",
        type: "warning",
        title: t("notifications.paymentDue.title"),
        message: t("notifications.paymentDue.message"),
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        read: false,
      },
    ])
  }, [language, t])

  const unreadCount = notifications.filter((n) => !n.read).length

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "warning":
        return <AlertCircle className="h-4 w-4 text-orange-600" />
      case "error":
        return <X className="h-4 w-4 text-red-600" />
      default:
        return <Info className="h-4 w-4 text-blue-600" />
    }
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 hover:bg-muted/50 transition-all duration-200 relative"
          aria-label={t("navigation.notifications")}
        >
          <Bell className="h-4 w-4" aria-hidden="true" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary animate-pulse" aria-hidden="true" />
          )}
          <span className="sr-only">{t("navigation.notifications")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <DropdownMenuLabel className="p-0">{t("notifications.title")}</DropdownMenuLabel>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead} className="h-7 text-xs">
              {t("notifications.markAllRead")}
            </Button>
          )}
        </div>
        <ScrollArea className="h-[400px]">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-sm text-muted-foreground">{t("notifications.empty")}</div>
          ) : (
            <div className="p-2">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`relative p-3 rounded-lg mb-2 transition-colors ${
                    !notification.read ? "bg-primary/5 border border-primary/20" : "bg-muted/30"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">{getIcon(notification.type)}</div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium text-foreground">{notification.title}</p>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => deleteNotification(notification.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">{notification.message}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDateForLanguage(notification.timestamp, language)}
                      </p>
                    </div>
                  </div>
                  {!notification.read && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 h-6 text-xs"
                      onClick={() => markAsRead(notification.id)}
                    >
                      {t("notifications.markRead")}
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
        {notifications.length > 0 && (
          <div className="p-2 border-t border-border">
            <DropdownMenuItem asChild>
              <Button variant="ghost" className="w-full justify-center" onClick={() => setNotifications([])}>
                {t("notifications.clearAll")}
              </Button>
            </DropdownMenuItem>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

