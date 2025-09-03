"use client"

import { Badge } from "@/components/ui/badge"
import { WifiOff } from "lucide-react"

export function ConnectionStatus() {
  return (
    <Badge variant="outline" className="gap-1 text-xs">
      <WifiOff className="h-3 w-3" />
      وضع تجريبي
    </Badge>
  )
}