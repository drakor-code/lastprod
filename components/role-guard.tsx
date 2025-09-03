"use client"

import type React from "react"
import { useAuth } from "./auth-context"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Lock } from "lucide-react"

interface RoleGuardProps {
  children: React.ReactNode
  resource: string
  action?: "create" | "read" | "update" | "delete" | "manage"
  fallback?: React.ReactNode
  showError?: boolean
}

export function RoleGuard({ children, resource, action = "read", fallback = null, showError = false }: RoleGuardProps) {
  const { user } = useAuth()

  if (!user) {
    return showError ? (
      <Alert variant="destructive">
        <Lock className="h-4 w-4" />
        <AlertDescription>يجب تسجيل الدخول للوصول إلى هذا المحتوى</AlertDescription>
      </Alert>
    ) : (
      fallback
    )
  }

  // Simple permission check - admin can do everything, employee has limited access
  const hasAccess = user.role === "admin" || (user.role === "employee" && action !== "delete" && resource !== "users")

  if (!hasAccess) {
    return showError ? (
      <Alert variant="destructive">
        <Lock className="h-4 w-4" />
        <AlertDescription>ليس لديك صلاحية للوصول إلى هذا المحتوى</AlertDescription>
      </Alert>
    ) : (
      fallback
    )
  }

  return <>{children}</>
}