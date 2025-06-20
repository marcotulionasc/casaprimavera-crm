"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Phone, ArrowLeft, Mail, User, MessageCircle, Calendar, MapPin, Home, Building, FileText, Clock, AlertCircle } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import type { Metropole } from "@/types/metropole"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockDataManager, checkApiHealth } from "@/lib/mock-data"
import { getMockLeadById } from "@/lib/mock-data"

const LEAD_STATUS = [
  { value: "NOVO", label: "Novo", color: "bg-blue-500" },
  { value: "CONTATO_FEITO", label: "Contato Feito", color: "bg-yellow-500" },
  { value: "QUALIFICADO", label: "Qualificado", color: "bg-green-500" },
  { value: "NÃO_QUALIFICADO", label: "Não Qualificado", color: "border-red-400 text-red-400" },
  { value: "QUALIFICADO_OP", label: "Qualificado OP", color: "bg-purple-500" },
  { value: "PROPOSTA", label: "Proposta", color: "bg-orange-500" },
  { value: "FECHADO", label: "Fechado", color: "bg-teal-500" },
]

interface LeadDetailsProps {
  leadId: string
}

export function LeadDetails({ leadId }: LeadDetailsProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [lead, setLead] = useState<Metropole | null>(null)

  useEffect(() => {
    fetchLead()
  }, [leadId])

  const fetchLead = async () => {
    setLoading(true)
    try {
      // Simular delay
      await new Promise(resolve => setTimeout(resolve, 300))
      
      // Buscar lead mockado
      const mockLead = getMockLeadById(parseInt(leadId))
      
      if (mockLead) {
        setLead(mockLead)
      } else {
        toast({
          title: "Lead não encontrado",
          description: "O lead solicitado não foi encontrado",
          variant: "destructive",
        })
        router.push("/dashboard")
      }

    } catch (error) {
      console.error("Erro ao carregar lead:", error)
      toast({
        title: "Erro",
        description: "Erro ao carregar detalhes do lead",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    )
  }

  if (!lead) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Lead não encontrado</h2>
          <Button onClick={() => router.push("/dashboard")} className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar ao Dashboard
          </Button>
        </div>
      </div>
    )
  }

  const status = LEAD_STATUS.find(s => s.value === lead.field03)

  return (
    <div className="container mx-auto py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{lead.name}</h1>
            <p className="text-muted-foreground">Lead #{lead.id}</p>
          </div>
        </div>
        {status && (
          <Badge 
            className={`${status.color} text-white`}
            variant={status.value === "NÃO_QUALIFICADO" ? "outline" : "default"}
          >
            {status.label}
          </Badge>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Informações de Contato */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Informações de Contato
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{lead.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{lead.cellPhone}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{lead.field01}</span>
            </div>
          </CardContent>
        </Card>

        {/* Interesse e Produto */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tag className="h-5 w-5" />
              Interesse Principal
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-medium">{lead.interessePrincipal}</p>
              <p className="text-sm text-muted-foreground mt-1">Produto: {lead.product}</p>
            </div>
            {lead.field02 && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">Observações:</p>
                <p className="text-sm">{lead.field02}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Informações Adicionais */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Informações Adicionais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {lead.field04 && (
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Orçamento:</span>
                <span className="text-sm font-medium">{lead.field04}</span>
              </div>
            )}
            {lead.field05 && (
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Urgência:</span>
                <span className="text-sm font-medium">{lead.field05}</span>
              </div>
            )}
            {lead.field06 && (
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Prazo:</span>
                <span className="text-sm font-medium">{lead.field06}</span>
              </div>
            )}
            {lead.field07 && (
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Tipo:</span>
                <span className="text-sm font-medium">{lead.field07}</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Timeline
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Criado em:</span>
                <span>{new Date(lead.createdAt).toLocaleDateString("pt-BR")}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Última atualização:</span>
                <span>{new Date(lead.updatedAt).toLocaleDateString("pt-BR")}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ações */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Ações Rápidas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 flex-wrap">
            <Button 
              variant="outline"
              onClick={() => window.open(`tel:${lead.cellPhone}`, '_self')}
            >
              <Phone className="mr-2 h-4 w-4" />
              Ligar
            </Button>
            <Button 
              variant="outline"
              onClick={() => window.open(`mailto:${lead.email}`, '_blank')}
            >
              <Mail className="mr-2 h-4 w-4" />
              Email
            </Button>
            <Button 
              variant="outline"
              onClick={() => window.open(`https://wa.me/${lead.cellPhone.replace(/\D/g, '')}`, '_blank')}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              WhatsApp
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
