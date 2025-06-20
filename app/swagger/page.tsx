"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Code, Database, Settings } from "lucide-react"

export default function SwaggerPage() {
  return (
    <DashboardShell>
      <DashboardHeader 
        heading="API Documentation" 
        text="Documentação da API do Casa Primavera - LEVA MIDIA" 
      />
      
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              Endpoints Principais
            </CardTitle>
            <CardDescription>
              API Base: https://backend-ingressar.onrender.com/metropole/v1
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-green-50 text-green-700">GET</Badge>
                    <code className="text-sm">/data/4/casaprimavera</code>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Listar todos os leads do Casa Primavera</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-orange-50 text-orange-700">PUT</Badge>
                    <code className="text-sm">/update/{`{leadId}`}</code>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Atualizar status de um lead específico</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">POST</Badge>
                    <code className="text-sm">/send</code>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Criar novo lead</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Configurações do Tenant
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Tenant ID:</span>
                  <Badge variant="secondary">4</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Product:</span>
                  <Badge variant="secondary">casaprimavera</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Cliente:</span>
                  <Badge>Casa Primavera</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Status Disponíveis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  { value: "NOVO", label: "Novo" },
                  { value: "CONTATO_FEITO", label: "Contato Feito" },
                  { value: "QUALIFICADO", label: "Qualificado" },
                  { value: "NÃO_QUALIFICADO", label: "Não Qualificado" },
                  { value: "QUALIFICADO_OP", label: "Qualificado OP" },
                  { value: "PROPOSTA", label: "Proposta" },
                  { value: "FECHADO", label: "Fechado" },
                ].map((status) => (
                  <div key={status.value} className="flex justify-between text-sm">
                    <span>{status.label}</span>
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded">{status.value}</code>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Exemplo de Response - Lead</CardTitle>
            <CardDescription>Estrutura de dados retornada pela API</CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-50 p-4 rounded-lg text-sm overflow-x-auto">
{`{
  "id": 123,
  "name": "Nome do Lead",
  "email": "email@exemplo.com",
  "cellPhone": "(11) 99999-9999",
  "field01": "Cidade/Localização",
  "field02": "Descrição do interesse",
  "field03": "STATUS",
  "interessePrincipal": "Tipo de produto",
  "createdAt": "2024-01-01T10:00:00Z",
  "updatedAt": "2024-01-01T11:00:00Z"
}`}
            </pre>
          </CardContent>
        </Card>

        <Card className="border-amber-200 bg-amber-50">
          <CardHeader>
            <CardTitle className="text-amber-800">Powered by LEVA MIDIA</CardTitle>
            <CardDescription className="text-amber-700">
              Dashboard white-label desenvolvido pela LEVA MIDIA para múltiplos tenants
            </CardDescription>
          </CardHeader>
          <CardContent className="text-amber-700">
            <p className="text-sm">
              Este sistema utiliza a mesma base de código para diferentes clientes, 
              mantendo a consistência visual e funcional across all tenants.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
} 