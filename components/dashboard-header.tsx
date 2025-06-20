"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"

interface DashboardHeaderProps {
  heading: string
  text?: string
  children?: React.ReactNode
}

export function DashboardHeader({ heading, text, children }: DashboardHeaderProps) {
  const [isMockMode] = useState(true) // Sempre true agora com mock simples

  return (
    <div className="flex items-center justify-between px-2">
      <div className="grid gap-1">
        <div className="flex items-center gap-2">
          <h1 className="font-heading text-3xl md:text-4xl">{heading}</h1>
          {isMockMode && (
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-300">
              🎭 Modo Demo
            </Badge>
          )}
        </div>
        {text && <p className="text-lg text-muted-foreground">{text}</p>}
      </div>
      {children}
    </div>
  )
}
