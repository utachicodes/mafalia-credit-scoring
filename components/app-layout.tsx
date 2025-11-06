"use client"

import type React from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return <DashboardSidebar>{children}</DashboardSidebar>
}
