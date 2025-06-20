"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
  useDroppable,
} from "@dnd-kit/core"
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Phone, Eye, Calendar, MapPin, User } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import type { Metropole } from "@/types/metropole"

const LEAD_STATUS = [
  { value: "NOVO", label: "Novo", color: "bg-blue-500" },
  { value: "CONTATO_FEITO", label: "Contato Feito", color: "bg-yellow-500" },
  { value: "QUALIFICADO", label: "Qualificado", color: "bg-green-500" },
  { value: "NÃO_QUALIFICADO", label: "Não Qualificado", color: "bg-red-500" },
  { value: "QUALIFICADO_OP", label: "Qualificado OP", color: "bg-purple-500" },
  { value: "PROPOSTA", label: "Proposta", color: "bg-orange-500" },
  { value: "FECHADO", label: "Fechado", color: "bg-teal-500" },
]

interface KanbanBoardProps {
  leads: Metropole[]
  onStatusUpdate: (id: number, newStatus: string) => void
  onWhatsAppClick: (phone: string, name: string) => void
  loading?: boolean
}

interface LeadCardProps {
  lead: Metropole
  onWhatsAppClick: (phone: string, name: string) => void
}

function LeadCard({ lead, onWhatsAppClick }: LeadCardProps) {
  const router = useRouter()
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: lead.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      if (isNaN(date.getTime())) return "Data inválida"
      
      const now = new Date()
      const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)
      
      if (diffInHours < 24 && diffInHours >= 0) {
        if (diffInHours < 1) {
          const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
          return diffInMinutes < 1 ? "Agora mesmo" : `${diffInMinutes}min atrás`
        }
        return `${Math.floor(diffInHours)}h atrás`
      }
      
      return date.toLocaleDateString("pt-BR", { 
        day: "2-digit", 
        month: "2-digit",
        year: "2-digit"
      })
    } catch (error) {
      return "Data inválida"
    }
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`kanban-card cursor-grab active:cursor-grabbing ${
        isDragging ? 'dragging' : ''
      }`}
    >
      <CardContent className="p-4 space-y-3">
        {/* Header com nome e data */}
        <div className="space-y-1">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-sm line-clamp-1 flex items-center gap-1">
              <User className="h-3 w-3 text-gray-500" />
              {lead.name || "Nome não informado"}
            </h3>
            <div className="text-xs text-gray-500 flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatDate(lead.createdAt)}
            </div>
          </div>
          <p className="text-xs text-gray-600">{lead.email || "Email não informado"}</p>
        </div>

        {/* Informações do projeto */}
        <div className="space-y-2">
          {lead.cellPhone && (
            <div className="text-xs text-gray-600 flex items-center gap-1">
              <Phone className="h-3 w-3" />
              {lead.cellPhone}
            </div>
          )}
          
          {lead.field01 && (
            <div className="text-xs text-gray-600 flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {lead.field01}
            </div>
          )}
          
          {lead.interessePrincipal && (
            <div className="text-xs">
              <Badge variant="secondary" className="text-xs">
                {lead.interessePrincipal}
              </Badge>
            </div>
          )}
          
          {lead.field02 && (
            <div className="text-xs text-gray-600 line-clamp-2">
              {lead.field02}
            </div>
          )}
        </div>

        {/* Ações */}
        <div className="flex gap-2 pt-2 border-t">
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              onWhatsAppClick(lead.cellPhone || "", lead.name || "")
            }}
            disabled={!lead.cellPhone}
            className="h-7 px-2 text-xs flex-1"
          >
            <Phone className="h-3 w-3 mr-1" />
            WhatsApp
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              router.push(`/dashboard/detail/${lead.id}`)
            }}
            className="h-7 px-2 text-xs flex-1"
          >
            <Eye className="h-3 w-3 mr-1" />
            Ver
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

interface KanbanColumnProps {
  title: string
  count: number
  color: string
  status: string
  leads: Metropole[]
  onWhatsAppClick: (phone: string, name: string) => void
}

function KanbanColumn({ title, count, color, status, leads, onWhatsAppClick }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  })

  return (
    <div 
      ref={setNodeRef}
      className={`kanban-column bg-gray-50 rounded-lg p-4 min-h-[600px] w-80 flex-shrink-0 ${
        isOver ? 'drag-over' : ''
      }`}
    >
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm text-gray-900">{title}</h3>
          <Badge 
            variant="secondary" 
            className={`${color} text-white text-xs`}
          >
            {count}
          </Badge>
        </div>
      </div>
      
      <SortableContext items={leads} strategy={verticalListSortingStrategy}>
        <div className="space-y-3">
          {leads.map((lead) => (
            <LeadCard
              key={lead.id}
              lead={lead}
              onWhatsAppClick={onWhatsAppClick}
            />
          ))}
        </div>
      </SortableContext>
      
      {leads.length === 0 && (
        <div className={`text-center text-gray-400 text-sm mt-8 p-4 border-2 border-dashed rounded-lg ${
          isOver ? 'border-blue-300 text-blue-500' : 'border-gray-200'
        }`}>
          {isOver ? 'Solte aqui para alterar status' : 'Nenhum lead neste status'}
        </div>
      )}
    </div>
  )
}

export function KanbanBoard({ leads, onStatusUpdate, onWhatsAppClick, loading }: KanbanBoardProps) {
  const [activeId, setActiveId] = useState<string | number | null>(null)
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  // Organizar leads por status
  const leadsByStatus = LEAD_STATUS.reduce((acc, status) => {
    acc[status.value] = leads.filter(lead => (lead.field03 || "NOVO") === status.value)
    return acc
  }, {} as Record<string, Metropole[]>)

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null)

    if (!over) return

    const activeId = active.id
    const overId = over.id

    // Encontrar o lead que está sendo arrastado
    const draggedLead = leads.find(lead => lead.id === activeId)
    if (!draggedLead) return

    // Determinar o novo status baseado em onde foi solto
    let newStatus: string | undefined

    // Se foi solto sobre outro lead, usar o status desse lead
    const overLead = leads.find(lead => lead.id === overId)
    if (overLead) {
      newStatus = overLead.field03 || "NOVO"
    } else {
      // Se foi solto sobre uma coluna (droppable area)
      const overString = overId.toString()
      const statusMatch = LEAD_STATUS.find(status => status.value === overString)
      if (statusMatch) {
        newStatus = statusMatch.value
      }
    }

    // Atualizar se o status mudou
    if (newStatus && draggedLead.field03 !== newStatus) {
      const leadId = typeof activeId === 'number' ? activeId : parseInt(activeId.toString())
      onStatusUpdate(leadId, newStatus)
      toast({
        title: "Status Atualizado",
        description: `Lead movido para ${LEAD_STATUS.find(s => s.value === newStatus)?.label}`,
      })
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
          <p className="text-gray-600">Carregando leads...</p>
        </div>
      </div>
    )
  }

  const activeItem = activeId ? leads.find(lead => lead.id === activeId) : null

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-6 w-max">
          {LEAD_STATUS.map((status) => (
            <KanbanColumn
              key={status.value}
              title={status.label}
              count={leadsByStatus[status.value].length}
              color={status.color}
              status={status.value}
              leads={leadsByStatus[status.value]}
              onWhatsAppClick={onWhatsAppClick}
            />
          ))}
        </div>
      </div>
      
      <DragOverlay>
        {activeItem ? (
          <LeadCard
            lead={activeItem}
            onWhatsAppClick={onWhatsAppClick}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  )
} 