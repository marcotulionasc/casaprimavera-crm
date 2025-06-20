import { Metropole } from "@/types/metropole"

// Array simples de dados mockados
export const MOCK_LEADS: Metropole[] = [
  {
    id: 1,
    name: "Ana Silva",
    email: "ana.silva@email.com", 
    cellPhone: "(11) 99999-1234",
    product: "casaprimavera",
    interessePrincipal: "Decoração de sala",
    field01: "São Paulo - SP",
    field02: "Quer reformar sala de estar com móveis planejados",
    field03: "NOVO",
    field04: "Orçamento até R$ 15.000",
    field05: "Urgente",
    field06: "2 meses",
    field07: "Primeiro contato",
    createdAt: "2024-12-15T10:30:00Z",
    updatedAt: "2024-12-15T10:30:00Z",
    tenantId: { id: 9 }
  },
  {
    id: 2,
    name: "Carlos Santos",
    email: "carlos.santos@empresa.com",
    cellPhone: "(21) 98888-5678", 
    product: "casaprimavera",
    interessePrincipal: "Móveis de escritório",
    field01: "Rio de Janeiro - RJ",
    field02: "Precisa mobiliar escritório corporativo novo",
    field03: "CONTATO_FEITO",
    field04: "Precisa de orçamento",
    field05: "Flexível",
    field06: "1 meses",
    field07: "Primeiro contato",
    createdAt: "2024-12-14T14:20:00Z",
    updatedAt: "2024-12-15T09:15:00Z",
    tenantId: { id: 9 }
  },
  {
    id: 3,
    name: "Maria Oliveira",
    email: "maria.oliveira@gmail.com",
    cellPhone: "(31) 97777-9012",
    product: "casaprimavera", 
    interessePrincipal: "Quarto de casal",
    field01: "Belo Horizonte - MG",
    field02: "Quer decorar quarto principal com móveis planejados",
    field03: "QUALIFICADO",
    field04: "Orçamento até R$ 12.000",
    field05: "Urgente",
    field06: "3 meses",
    field07: "Cliente recorrente",
    createdAt: "2024-12-13T16:45:00Z",
    updatedAt: "2024-12-15T11:30:00Z",
    tenantId: { id: 9 }
  },
  {
    id: 4,
    name: "João Pereira",
    email: "joao.pereira@email.com",
    cellPhone: "(85) 96666-3456",
    product: "casaprimavera",
    interessePrincipal: "Quarto infantil", 
    field01: "Fortaleza - CE",
    field02: "Quer decorar quarto dos filhos com móveis temáticos",
    field03: "PROPOSTA",
    field04: "Orçamento até R$ 8.000",
    field05: "Flexível",
    field06: "6 meses",
    field07: "Primeiro contato",
    createdAt: "2024-12-12T08:15:00Z",
    updatedAt: "2024-12-14T15:20:00Z",
    tenantId: { id: 9 }
  },
  {
    id: 5,
    name: "Fernanda Costa",
    email: "fernanda.costa@outlook.com",
    cellPhone: "(71) 95555-7890",
    product: "casaprimavera",
    interessePrincipal: "Cozinha planejada",
    field01: "Salvador - BA", 
    field02: "Precisa renovar cozinha com móveis modernos",
    field03: "FECHADO",
    field04: "Orçamento até R$ 25.000",
    field05: "Urgente",
    field06: "1 meses",
    field07: "Cliente recorrente",
    createdAt: "2024-12-11T12:00:00Z",
    updatedAt: "2024-12-15T08:45:00Z",
    tenantId: { id: 9 }
  },
  {
    id: 6,
    name: "Ricardo Lima",
    email: "ricardo.lima@empresa.com",
    cellPhone: "(61) 94444-2468",
    product: "casaprimavera",
    interessePrincipal: "Decoração completa",
    field01: "Brasília - DF",
    field02: "Quer decorar casa inteira, conhecer catálogo completo", 
    field03: "QUALIFICADO_OP",
    field04: "Orçamento alto disponível",
    field05: "Flexível",
    field06: "4 meses",
    field07: "Primeiro contato",
    createdAt: "2024-12-10T09:30:00Z",
    updatedAt: "2024-12-14T16:10:00Z",
    tenantId: { id: 9 }
  },
  {
    id: 7,
    name: "Juliana Ferreira", 
    email: "juliana.ferreira@gmail.com",
    cellPhone: "(41) 93333-1357",
    product: "casaprimavera",
    interessePrincipal: "Área externa",
    field01: "Curitiba - PR",
    field02: "Interessada em móveis para varanda e jardim",
    field03: "NÃO_QUALIFICADO",
    field04: "Orçamento muito baixo",
    field05: "Flexível",
    field06: "8 meses",
    field07: "Primeiro contato",
    createdAt: "2024-12-09T15:20:00Z",
    updatedAt: "2024-12-13T10:15:00Z",
    tenantId: { id: 9 }
  },
  {
    id: 8,
    name: "Paulo Rodrigues",
    email: "paulo.rodrigues@email.com", 
    cellPhone: "(81) 92222-9876",
    product: "casaprimavera",
    interessePrincipal: "Móveis sob medida",
    field01: "Recife - PE",
    field02: "Precisa de consultoria para móveis personalizados",
    field03: "CONTATO_FEITO",
    field04: "Orçamento até R$ 20.000",
    field05: "Urgente",
    field06: "2 meses",
    field07: "Cliente recorrente",
    createdAt: "2024-12-08T11:45:00Z", 
    updatedAt: "2024-12-15T07:30:00Z",
    tenantId: { id: 9 }
  },
  {
    id: 9,
    name: "Camila Almeida",
    email: "camila.almeida@outlook.com",
    cellPhone: "(51) 91111-4567",
    product: "casaprimavera",
    interessePrincipal: "Banheiro planejado",
    field01: "Porto Alegre - RS",
    field02: "Quer reformar banheiros da casa com móveis planejados",
    field03: "PROPOSTA",
    field04: "Orçamento até R$ 18.000",
    field05: "Flexível", 
    field06: "5 meses",
    field07: "Primeiro contato",
    createdAt: "2024-12-07T13:10:00Z",
    updatedAt: "2024-12-14T12:50:00Z",
    tenantId: { id: 9 }
  },
  {
    id: 10,
    name: "Diego Martins",
    email: "diego.martins@gmail.com",
    cellPhone: "(92) 90000-8901",
    product: "casaprimavera",
    interessePrincipal: "Home office",
    field01: "Manaus - AM",
    field02: "Interessado em móveis premium para escritório em casa",
    field03: "FECHADO",
    field04: "Orçamento até R$ 10.000",
    field05: "Urgente",
    field06: "1 meses",
    field07: "Cliente recorrente",
    createdAt: "2024-12-06T17:25:00Z",
    updatedAt: "2024-12-15T14:20:00Z",
    tenantId: { id: 9 }
  }
]

// Função simples para buscar todos os leads
export function getMockLeads(): Metropole[] {
  return MOCK_LEADS
}

// Função para buscar lead por ID
export function getMockLeadById(id: number): Metropole | undefined {
  return MOCK_LEADS.find(lead => lead.id === id)
}

// Variável para controlar se está usando mock (simples)
export let USE_MOCK = true

// Função para ativar mock
export function enableMock() {
  USE_MOCK = true
  console.log("🎭 Mock ativado - usando dados simulados")
}

// Função para desativar mock  
export function disableMock() {
  USE_MOCK = false
  console.log("🌐 Mock desativado - usando API real")
}

// Status disponíveis no sistema
export const STATUS_OPTIONS = [
  "NOVO",
  "CONTATO_FEITO", 
  "QUALIFICADO",
  "NÃO_QUALIFICADO",
  "QUALIFICADO_OP",
  "PROPOSTA",
  "FECHADO"
]

// Interesses principais
export const INTERESSES = [
  "Decoração de sala",
  "Móveis de escritório", 
  "Quarto de casal",
  "Quarto infantil",
  "Cozinha planejada",
  "Banheiro planejado",
  "Área externa",
  "Móveis sob medida",
  "Home office",
  "Decoração completa",
  "Closet planejado",
  "Lavanderia"
]

// Cidades para variar os dados
export const CIDADES = [
  "São Paulo - SP",
  "Rio de Janeiro - RJ",
  "Belo Horizonte - MG",
  "Salvador - BA",
  "Fortaleza - CE",
  "Brasília - DF",
  "Curitiba - PR",
  "Recife - PE",
  "Porto Alegre - RS",
  "Manaus - AM"
]

// Função para gerar dados mockados
export function generateMockData(count: number = 50): Metropole[] {
  const mockData: Metropole[] = []
  
  for (let i = 1; i <= count; i++) {
    const createdDate = new Date()
    createdDate.setDate(createdDate.getDate() - Math.floor(Math.random() * 30)) // Últimos 30 dias
    
    const updatedDate = new Date(createdDate)
    updatedDate.setHours(updatedDate.getHours() + Math.floor(Math.random() * 48)) // Até 48h depois
    
    const lead: Metropole = {
      id: i,
      name: generateRandomName(),
      email: `cliente${i}@email.com`,
      cellPhone: generateRandomPhone(),
      product: "casaprimavera",
      interessePrincipal: INTERESSES[Math.floor(Math.random() * INTERESSES.length)],
      field01: CIDADES[Math.floor(Math.random() * CIDADES.length)], // Cidade
      field02: generateRandomDescription(), // Descrição do interesse
      field03: STATUS_OPTIONS[Math.floor(Math.random() * STATUS_OPTIONS.length)], // Status
      field04: Math.random() > 0.3 ? `Orçamento até R$ ${Math.floor(Math.random() * 45 + 5) * 1000}` : "Precisa de orçamento",
      field05: Math.random() > 0.5 ? "Urgente" : "Flexível",
      field06: `${Math.floor(Math.random() * 12) + 1} meses`,
      field07: Math.random() > 0.7 ? "Cliente recorrente" : "Primeiro contato",
      createdAt: createdDate.toISOString(),
      updatedAt: updatedDate.toISOString(),
      tenantId: {
        id: 9
      }
    }
    
    mockData.push(lead)
  }
  
  return mockData
}

// Nomes aleatórios para os leads
const NOMES = [
  "Ana Silva", "Carlos Santos", "Maria Oliveira", "João Pereira", "Fernanda Costa",
  "Ricardo Lima", "Juliana Ferreira", "Paulo Rodrigues", "Camila Almeida", "Diego Martins",
  "Larissa Barbosa", "Rafael Gomes", "Beatriz Nascimento", "Lucas Carvalho", "Gabriela Souza",
  "Thiago Ribeiro", "Vanessa Dias", "Bruno Moreira", "Patrícia Cardoso", "Marcelo Teixeira",
  "Aline Correia", "Gustavo Pinto", "Priscila Rocha", "André Monteiro", "Carolina Farias",
  "Felipe Araújo", "Renata Castro", "Rodrigo Mendes", "Isabela Ramos", "Leonardo Vieira"
]

function generateRandomName(): string {
  return NOMES[Math.floor(Math.random() * NOMES.length)]
}

function generateRandomPhone(): string {
  const ddd = Math.floor(Math.random() * 89) + 11 // DDD de 11 a 99
  const numero = Math.floor(Math.random() * 900000000) + 100000000 // 9 dígitos
  return `(${ddd}) ${String(numero).slice(0,5)}-${String(numero).slice(5)}`
}

function generateRandomDescription(): string {
  const descricoes = [
    "Interessado em móveis planejados para sala",
    "Precisa renovar cozinha com móveis modernos",
    "Quer decorar quarto de casal completo", 
    "Interessado em móveis sob medida",
    "Precisa de móveis para área externa",
    "Quer conhecer catálogo completo de decoração",
    "Interessado em promoções de móveis",
    "Precisa de consultoria em design de interiores",
    "Quer fazer reforma completa da casa",
    "Interessado em linha premium de móveis",
    "Busca móveis para home office planejado",
    "Precisa decorar quarto infantil temático",
    "Quer móveis para escritório corporativo",
    "Interessado em banheiro planejado moderno"
  ]
  return descricoes[Math.floor(Math.random() * descricoes.length)]
}

// Classe para gerenciar os dados mockados
export class MockDataManager {
  private static instance: MockDataManager
  private data: Metropole[]
  private isUsingMock: boolean = false

  private constructor() {
    this.data = generateMockData()
  }

  static getInstance(): MockDataManager {
    if (!MockDataManager.instance) {
      MockDataManager.instance = new MockDataManager()
    }
    return MockDataManager.instance
  }

  enableMock(): void {
    this.isUsingMock = true
    console.log("🎭 Modo Mock ativado - Usando dados simulados")
  }

  disableMock(): void {
    this.isUsingMock = false
    console.log("🌐 Modo Mock desativado - Usando API real")
  }

  isMockEnabled(): boolean {
    return this.isUsingMock
  }

  // Simular GET /data/{tenantId}/{product}
  async fetchLeads(tenantId: string, product: string): Promise<Metropole[]> {
    if (!this.isUsingMock) {
      throw new Error("Mock não está habilitado")
    }

    // Simular delay da API
    await new Promise(resolve => setTimeout(resolve, 500))
    
    return this.data.filter(lead => 
      lead.tenantId?.id === parseInt(tenantId) && 
      lead.product === product
    )
  }

  // Simular POST /send
  async createLead(leadData: Partial<Metropole>): Promise<Metropole> {
    if (!this.isUsingMock) {
      throw new Error("Mock não está habilitado")
    }

    await new Promise(resolve => setTimeout(resolve, 300))

    const newLead: Metropole = {
      id: Math.max(...this.data.map(l => l.id)) + 1,
      name: leadData.name || "",
      email: leadData.email || "",
      cellPhone: leadData.cellPhone || "",
      product: leadData.product || "casaprimavera",
      interessePrincipal: leadData.interessePrincipal || "",
      field01: leadData.field01 || "",
      field02: leadData.field02 || "",
      field03: leadData.field03 || "NOVO",
      field04: leadData.field04 || "",
      field05: leadData.field05 || "",
      field06: leadData.field06 || "",
      field07: leadData.field07 || "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tenantId: leadData.tenantId || { id: 9 }
    }

    this.data.push(newLead)
    return newLead
  }

  // Simular PUT /update/{id}
  async updateLead(id: number, updates: Partial<Metropole>): Promise<Metropole> {
    if (!this.isUsingMock) {
      throw new Error("Mock não está habilitado")
    }

    await new Promise(resolve => setTimeout(resolve, 300))

    const leadIndex = this.data.findIndex(lead => lead.id === id)
    if (leadIndex === -1) {
      throw new Error("Lead não encontrado")
    }

    this.data[leadIndex] = {
      ...this.data[leadIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    }

    return this.data[leadIndex]
  }

  // Buscar lead por ID
  async getLeadById(id: number): Promise<Metropole | null> {
    if (!this.isUsingMock) {
      throw new Error("Mock não está habilitado")
    }

    await new Promise(resolve => setTimeout(resolve, 200))
    
    return this.data.find(lead => lead.id === id) || null
  }

  // Obter todos os dados (para debug)
  getAllData(): Metropole[] {
    return this.data
  }

  // Resetar dados
  resetData(): void {
    this.data = generateMockData()
    console.log("🔄 Dados mockados resetados")
  }
}

// Instância global
export const mockDataManager = MockDataManager.getInstance()

// Função de conveniência para ativar o mock automaticamente
export function enableMockData(): void {
  mockDataManager.enableMock()
}

// Função para forçar o modo mock (para debug)
export function forceMockMode(): void {
  console.log("🚀 FORÇANDO MODO MOCK PARA DEBUG")
  mockDataManager.enableMock()
  
  // Testar se os dados estão sendo gerados
  const testData = mockDataManager.getAllData()
  console.log(`📊 Dados mockados disponíveis: ${testData.length} leads`)
  console.log("📝 Primeiro lead:", testData[0])
}

// Função para resetar e testar mocks
export async function testMockSystem(): Promise<void> {
  console.log("🧪 TESTANDO SISTEMA DE MOCK")
  
  mockDataManager.enableMock()
  
  try {
    // Testar busca de leads
    const leads = await mockDataManager.fetchLeads("9", "casaprimavera")
    console.log(`✅ fetchLeads: ${leads.length} leads encontrados`)
    
    // Testar criação de lead
    const newLead = await mockDataManager.createLead({
      name: "Teste Mock",
      email: "teste@mock.com",
      cellPhone: "(11) 99999-9999",
      product: "casaprimavera"
    })
    console.log(`✅ createLead: Lead criado com ID ${newLead.id}`)
    
    // Testar atualização
    const updated = await mockDataManager.updateLead(newLead.id, { field03: "QUALIFICADO" })
    console.log(`✅ updateLead: Status atualizado para ${updated.field03}`)
    
    console.log("🎉 Sistema de mock funcionando perfeitamente!")
    
  } catch (error) {
    console.error("❌ Erro no sistema de mock:", error)
  }
}

// Adicionar ao objeto window para debug no console
if (typeof window !== 'undefined') {
  (window as any).mockDebug = {
    force: forceMockMode,
    test: testMockSystem,
    enable: enableMockData,
    getAll: () => mockDataManager.getAllData(),
    reset: () => mockDataManager.resetData()
  }
  console.log("🛠️ Funções de debug disponíveis em window.mockDebug")
}

// Hook para detectar se a API está funcionando
export async function checkApiHealth(tenantId: string, product: string): Promise<boolean> {
  try {
    console.log(`🔍 Verificando API: https://backend-ingressar.onrender.com/metropole/v1/data/${tenantId}/${product}`)
    
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 3000) // Timeout de 3 segundos
    
    const response = await fetch(
      `https://backend-ingressar.onrender.com/metropole/v1/data/${tenantId}/${product}`,
      { 
        method: 'GET',
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
    
    clearTimeout(timeoutId)
    
    console.log(`📊 Status da API: ${response.status}`)
    
    // Se a resposta não for ok ou estiver vazia, considerar como indisponível
    if (!response.ok) {
      console.log(`❌ API retornou erro: ${response.status} ${response.statusText}`)
      return false
    }
    
    const data = await response.json()
    console.log(`✅ API funcionando, ${Array.isArray(data) ? data.length : 0} leads encontrados`)
    
    return true
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        console.log("⏰ API timeout - usando mock")
      } else {
        console.log(`❌ Erro na API:`, error.message)
      }
    } else {
      console.log("❌ Erro desconhecido na API:", error)
    }
    return false
  }
} 