"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Loader2, Phone, Eye, ChevronLeft, ChevronRight, Search, Filter, Plus, HelpCircle, Calendar, MapPin, Home, Grid3X3, TableIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import type { Metropole } from "@/types/metropole"
import { useProductConfig } from "@/hooks/use-product-config"
import { getMockLeads, USE_MOCK } from "@/lib/mock-data"
import { KanbanBoard } from "@/components/kanban-board"

const LEAD_STATUS = [
  { value: "NOVO", label: "Novo", color: "bg-blue-500" },
  { value: "CONTATO_FEITO", label: "Contato Feito", color: "bg-yellow-500" },
  { value: "QUALIFICADO", label: "Qualificado", color: "bg-green-500" },
  { value: "NÃO_QUALIFICADO", label: "Não Qualificado", color: "border-red-400 text-red-400" },
  { value: "QUALIFICADO_OP", label: "Qualificado OP", color: "bg-purple-500" },
  { value: "PROPOSTA", label: "Proposta", color: "bg-orange-500" },
  { value: "FECHADO", label: "Fechado", color: "bg-teal-500" },
]

interface MetropoleListProps {
  onProductChange?: (product: string) => void
  onStatusUpdate?: () => void
  refreshTrigger?: number
}

export function MetropoleList({ onProductChange, onStatusUpdate, refreshTrigger }: MetropoleListProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [metropoles, setMetropoles] = useState<Metropole[]>([])
  const [updatingId, setUpdatingId] = useState<number | null>(null)
  const tenantId = "9"
  const [product, setProduct] = useState<string>("casaprimavera")
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<"table" | "kanban">("table")
  const { products } = useProductConfig()

  // Paginação
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    fetchMetropoles()
    if (onProductChange) {
      onProductChange(product)
    }
  }, [product, refreshTrigger])

  const fetchMetropoles = async () => {
    setLoading(true)
    try {
      console.log("📊 Carregando dados mock simples...")
      
      // Simular um pequeno delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Usar dados mockados simples
      const mockData = getMockLeads()
      console.log(`✅ ${mockData.length} leads carregados`)
      
      setMetropoles(mockData)
      
      toast({
        title: "Dados Carregados",
        description: `${mockData.length} leads encontrados`,
      })
      
    } catch (error) {
      console.error("Erro:", error)
      toast({
        title: "Erro",
        description: "Erro ao carregar dados",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleWhatsAppClick = (phone: string, name: string) => {
    const formattedPhone = phone.replace(/\D/g, "")
    const message = encodeURIComponent(
      `Olá ${name}, estamos entrando em contato sobre seu interesse em nossos produtos.`,
    )
    window.open(`https://wa.me/${formattedPhone}?text=${message}`, "_blank")
  }

  const handleStatusUpdate = async (id: number, newStatus: string) => {
    setUpdatingId(id)
    try {
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 300))
      
      // Atualizar na lista local
      setMetropoles(prev => 
        prev.map(lead => 
          lead.id === id 
            ? { ...lead, field03: newStatus, updatedAt: new Date().toISOString() }
            : lead
        )
      )

      toast({
        title: "Sucesso",
        description: "Status atualizado com sucesso",
      })

      if (onStatusUpdate) {
        onStatusUpdate()
      }
    } catch (error) {
      console.error("Erro ao atualizar status:", error)
      toast({
        title: "Erro", 
        description: "Erro ao atualizar status",
        variant: "destructive",
      })
    } finally {
      setUpdatingId(null)
    }
  }

  // Filtrar leads por termo de busca (REMOVIDO filtro de origem quiz/premium)
  const filteredMetropoles = metropoles.filter((lead) => {
    // Filtro de busca
    const matchesSearch =
      lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.cellPhone?.includes(searchTerm) ||
      lead.interessePrincipal?.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesSearch
  }).sort((a, b) => {
    // Garantir ordenação do mais recente para o mais antigo nos dados filtrados também
    const dateA = new Date(a.createdAt).getTime()
    const dateB = new Date(b.createdAt).getTime()
    return dateB - dateA // Ordem decrescente (mais recente primeiro)
  })

  // Atualizar total de páginas baseado nos dados filtrados
  useEffect(() => {
    setTotalPages(Math.ceil(filteredMetropoles.length / itemsPerPage))
    setCurrentPage(1) // Resetar para primeira página quando filtros mudarem
  }, [filteredMetropoles.length, itemsPerPage])

  // Obter os leads da página atual
  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredMetropoles.slice(startIndex, endIndex)
  }

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleRefresh = () => {
    fetchMetropoles()
    if (onStatusUpdate) {
      onStatusUpdate()
    }
  }

  // Função para formatar data de forma mais legível
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      
      // Verificar se a data é válida
      if (isNaN(date.getTime())) {
        return "Data inválida"
      }
      
      const now = new Date()
      const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)
      
      // Se foi há menos de 24 horas
      if (diffInHours < 24 && diffInHours >= 0) {
        if (diffInHours < 1) {
          const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
          if (diffInMinutes < 1) {
            return "Agora mesmo"
          }
          return `${diffInMinutes}min atrás`
        }
        return `${Math.floor(diffInHours)}h atrás`
      }
      
      const today = new Date()
      const yesterday = new Date(today)
      yesterday.setDate(yesterday.getDate() - 1)
      
      // Resetar horas para comparação de datas
      const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate())
      const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate())
      const yesterdayOnly = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate())
      
      if (dateOnly.getTime() === todayOnly.getTime()) {
        return `Hoje, ${date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}`
      } else if (dateOnly.getTime() === yesterdayOnly.getTime()) {
        return `Ontem, ${date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}`
      } else {
        // Para datas mais antigas, mostrar data completa
        return `${date.toLocaleDateString("pt-BR", { 
          day: "2-digit", 
          month: "2-digit",
          year: "2-digit"
        })}, ${date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}`
      }
    } catch (error) {
      console.error("Erro ao formatar data:", error)
      return "Data inválida"
    }
  }

  return (
    <div className="w-full overflow-hidden">
      <Card className="bg-white border-gray-200 shadow-sm">
        <CardHeader className="bg-white text-gray-900 border-b border-gray-200 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Home className="h-6 w-6" />
                Leads Casa Primavera
              </CardTitle>
              <CardDescription className="text-gray-600 text-sm sm:text-base">
                Gerencie seus leads de moda e confecção de forma eficiente. Ordenado por mais recentes.
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              {/* Toggle de visualização */}
              <div className="flex items-center border rounded-lg p-1 bg-gray-100">
                <Button
                  variant={viewMode === "table" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("table")}
                  className="h-8 px-3"
                >
                  <TableIcon className="h-4 w-4 mr-1" />
                  Tabela
                </Button>
                <Button
                  variant={viewMode === "kanban" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("kanban")}
                  className="h-8 px-3"
                >
                  <Grid3X3 className="h-4 w-4 mr-1" />
                  Kanban
                </Button>
              </div>
              <Button onClick={handleRefresh} variant="outline" size="sm" className="self-start sm:self-auto">
                <Plus className="h-4 w-4 mr-2" />
                Atualizar
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-4 sm:p-6 space-y-4">
          {/* Filtros e Busca - Responsivo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Produto</label>
              <Select value={product} onValueChange={setProduct}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione o produto" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((prod) => (
                    <SelectItem key={prod.id} value={prod.id}>
                      {prod.name || prod.id}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1 sm:col-span-1 lg:col-span-2">
              <label className="text-sm font-medium text-gray-700">Buscar</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar por nome, email, telefone ou interesse..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          {/* Estatísticas rápidas */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="text-center">
              <div className="text-lg sm:text-xl font-bold text-gray-900">{filteredMetropoles.length}</div>
              <div className="text-xs sm:text-sm text-gray-600">Total</div>
            </div>
            <div className="text-center">
              <div className="text-lg sm:text-xl font-bold text-green-600">
                {filteredMetropoles.filter(m => m.field03 === "QUALIFICADO" || m.field03 === "QUALIFICADO_OP").length}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">Qualificados</div>
            </div>
            <div className="text-center">
              <div className="text-lg sm:text-xl font-bold text-orange-600">
                {filteredMetropoles.filter(m => m.field03 === "PROPOSTA").length}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">Propostas</div>
            </div>
            <div className="text-center">
              <div className="text-lg sm:text-xl font-bold text-teal-600">
                {filteredMetropoles.filter(m => m.field03 === "FECHADO").length}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">Fechados</div>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2 text-gray-600">Carregando leads...</span>
            </div>
          ) : viewMode === "kanban" ? (
            <div className="space-y-4">
              {/* Estatísticas para KANBAN */}
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>{filteredMetropoles.length} leads encontrados</span>
                <span>Arraste os cards entre as colunas para alterar o status</span>
              </div>
              <KanbanBoard
                leads={filteredMetropoles}
                onStatusUpdate={handleStatusUpdate}
                onWhatsAppClick={handleWhatsAppClick}
                loading={loading}
              />
            </div>
          ) : (
            <>
              {/* Desktop Table - Melhorada para responsividade */}
              <div className="hidden xl:block">
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="font-semibold w-[200px]">Cliente</TableHead>
                        <TableHead className="font-semibold w-[180px]">Data</TableHead>
                        <TableHead className="font-semibold w-[160px]">Contato</TableHead>
                        <TableHead className="font-semibold w-[180px]">Projeto</TableHead>
                        <TableHead className="font-semibold w-[120px]">Interesse</TableHead>
                        <TableHead className="font-semibold w-[140px]">Status</TableHead>
                        <TableHead className="font-semibold w-[120px] text-center">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getCurrentPageItems().map((lead) => {
                        const currentStatus = LEAD_STATUS.find((s) => s.value === lead.field03) || LEAD_STATUS[0]

                        return (
                          <TableRow key={lead.id} className="hover:bg-gray-50">
                            <TableCell className="font-medium">
                              <div className="space-y-1">
                                <div className="font-semibold text-sm line-clamp-1">{lead.name || "Nome não informado"}</div>
                                <div className="text-xs text-gray-500 line-clamp-1">{lead.email || "Email não informado"}</div>
                              </div>
                            </TableCell>
                            <TableCell className="text-sm">
                              <div className="flex items-center gap-1 text-gray-600">
                                <Calendar className="h-3 w-3 text-gray-400" />
                                <span className="text-xs">{formatDate(lead.createdAt)}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm">
                                <div className="font-medium text-xs">{lead.cellPhone || "Não informado"}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="text-xs text-gray-600 line-clamp-2">
                                {lead.field02 || "Não especificado"}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="text-xs text-gray-600 line-clamp-2">
                                {lead.interessePrincipal || "N/A"}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Select
                                value={lead.field03 || "NOVO"}
                                onValueChange={(value) => handleStatusUpdate(lead.id, value)}
                                disabled={updatingId === lead.id}
                              >
                                <SelectTrigger className="w-32 h-8 text-xs">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {LEAD_STATUS.map((status) => (
                                    <SelectItem key={status.value} value={status.value}>
                                      {status.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </TableCell>
                            <TableCell>
                              <div className="flex justify-center gap-1">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleWhatsAppClick(lead.cellPhone || "", lead.name || "")}
                                  disabled={!lead.cellPhone}
                                  className="h-8 w-8 p-0"
                                >
                                  <Phone className="h-3 w-3" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => router.push(`/dashboard/detail/${lead.id}`)}
                                  className="h-8 w-8 p-0"
                                >
                                  <Eye className="h-3 w-3" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* Mobile/Tablet Cards */}
              <div className="xl:hidden">
                <div className="space-y-4">
                  {getCurrentPageItems().map((lead) => {
                    const currentStatus = LEAD_STATUS.find((s) => s.value === lead.field03) || LEAD_STATUS[0]

                    return (
                      <Card key={lead.id} className="border border-gray-200 hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            {/* Header com nome e data */}
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <h3 className="font-semibold text-sm">{lead.name || "Nome não informado"}</h3>
                                <p className="text-xs text-gray-500">{lead.email || "Email não informado"}</p>
                              </div>
                              <div className="text-xs text-gray-500">
                                {formatDate(lead.createdAt)}
                              </div>
                            </div>

                            {/* Informações do projeto */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                              <div>
                                <span className="text-gray-600">📱 </span>
                                <span>{lead.cellPhone || "Não informado"}</span>
                              </div>
                              {lead.field02 && (
                                <div className="sm:col-span-2">
                                  <span className="text-gray-600">🏠 </span>
                                  <span>{lead.field02}</span>
                                </div>
                              )}
                              {lead.interessePrincipal && (
                                <div className="sm:col-span-2">
                                  <span className="text-gray-600">💼 </span>
                                  <span>{lead.interessePrincipal}</span>
                                </div>
                              )}
                            </div>

                            {/* Status e ações */}
                            <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t">
                              <div className="flex-1">
                                <Select
                                  value={lead.field03 || "NOVO"}
                                  onValueChange={(value) => handleStatusUpdate(lead.id, value)}
                                  disabled={updatingId === lead.id}
                                >
                                  <SelectTrigger className="h-8 text-xs">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {LEAD_STATUS.map((status) => (
                                      <SelectItem key={status.value} value={status.value}>
                                        {status.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleWhatsAppClick(lead.cellPhone || "", lead.name || "")}
                                  disabled={!lead.cellPhone}
                                  className="h-8 px-3"
                                >
                                  <Phone className="h-3 w-3 mr-1" />
                                  WhatsApp
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => router.push(`/dashboard/detail/${lead.id}`)}
                                  className="h-8 px-3"
                                >
                                  <Eye className="h-3 w-3 mr-1" />
                                  Ver
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>

              {/* Paginação */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between px-2">
                  <div className="text-sm text-gray-700">
                    Página {currentPage} de {totalPages} • {filteredMetropoles.length} leads encontrados
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={goToPreviousPage}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Anterior
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={goToNextPage}
                      disabled={currentPage === totalPages}
                    >
                      Próxima
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
