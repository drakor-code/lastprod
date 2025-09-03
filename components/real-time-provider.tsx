"use client"

import { createContext, useContext, type ReactNode } from "react"

interface RealTimeEvent {
  type: string
  data?: any
  userId?: string
  timestamp: string
}

interface RealTimeContextType {
  isConnected: boolean
  lastEvent: RealTimeEvent | null
  connectionStatus: "connecting" | "connected" | "disconnected" | "error"
}

const RealTimeContext = createContext<RealTimeContextType | undefined>(undefined)

export function RealTimeProvider({ children }: { children: ReactNode }) {
  // Mock real-time connection for frontend-only demo
  const contextValue: RealTimeContextType = {
    isConnected: false,
    lastEvent: null,
    connectionStatus: "disconnected",
  }

  return (
    <RealTimeContext.Provider value={contextValue}>
      {children}
    </RealTimeContext.Provider>
  )
}

export function useRealTime() {
  const context = useContext(RealTimeContext)
  if (context === undefined) {
    throw new Error("useRealTime must be used within a RealTimeProvider")
  }
  return context
}