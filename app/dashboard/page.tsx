"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { MetropoleList } from "@/components/metropole-list"
import { DashboardStats } from "@/components/dashboard-stats"

export default function DashboardPage() {
  const [selectedProduct, setSelectedProduct] = useState<string>("casaprimavera") // Casa Primavera
  const [refreshKey, setRefreshKey] = useState(0)

  const handleStatusUpdate = () => {
    // Força a atualização dos componentes
    setRefreshKey((prev) => prev + 1)
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Casa Primavera" text="Gerencie seus leads de decoração e móveis para casa de forma eficiente." />
      <div className="grid gap-6">
        <DashboardStats 
          key={`stats-${refreshKey}`} 
          product={selectedProduct}
          refreshTrigger={refreshKey} 
        />
        <MetropoleList
          key={`list-${refreshKey}`}
          onProductChange={setSelectedProduct}
          onStatusUpdate={handleStatusUpdate}
        />
      </div>
    </DashboardShell>
  )
}
