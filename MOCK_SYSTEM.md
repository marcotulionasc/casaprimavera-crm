# 🎭 Sistema de Mock - Casa Primavera Dashboard

Este sistema possui um sistema de mock automático que simula dados da API quando ela não está disponível.

## 🚀 Como Funciona

O sistema detecta automaticamente se a API está disponível e:
- ✅ **API Disponível**: Usa dados reais da API
- 🎭 **API Indisponível**: Ativa automaticamente o modo mock com dados simulados

## 📊 Dados Mockados

### Características dos Dados
- **50 leads** simulados por padrão
- **Nomes reais** brasileiros
- **Telefones** com formato correto
- **Status** distribuídos realisticamente
- **Datas** dos últimos 30 dias
- **Interesses** relacionados a moda e confecção

### Status Disponíveis
- `NOVO` - Lead recém-cadastrado
- `CONTATO_FEITO` - Primeiro contato realizado  
- `QUALIFICADO` - Lead com potencial confirmado
- `NÃO_QUALIFICADO` - Lead sem fit
- `QUALIFICADO_OP` - Lead qualificado para oportunidade
- `PROPOSTA` - Proposta enviada
- `FECHADO` - Negócio concluído

### Interesses Principais
- Vestidos de festa
- Roupas casuais
- Uniformes corporativos
- Roupas infantis
- Lingerie
- Moda praia
- Acessórios
- Customização

## 🎯 Funcionalidades Mockadas

### ✅ Listagem de Leads (`/dashboard`)
- Exibe lista completa de leads mockados
- Filtros por nome, email, telefone funcionam
- Paginação implementada
- Atualização de status funcional

### ✅ Criação de Leads (`/dashboard/create`)
- Formulário totalmente funcional
- Leads criados são adicionados à lista
- Validações mantidas
- Redirecionamento após criação

### ✅ Detalhes do Lead (`/dashboard/detail/[id]`)
- Visualização completa dos dados
- Atualização de status funcional
- Histórico simulado
- WhatsApp link funcional

### ✅ Estatísticas (`/dashboard/stats`)
- Gráficos com dados reais simulados
- Métricas de conversão
- Distribuição por status
- Tendências temporais

## 🔍 Indicadores Visuais

### Badge "🎭 Modo Demo"
Aparece no header quando o mock está ativo, indicando que você está visualizando dados de demonstração.

### Mensagens Toast
- "Modo Demo" - Quando o mock é ativado automaticamente
- "Sucesso (Demo)" - Quando operações são realizadas no mock

## 🛠️ Uso Programático

```typescript
import { mockDataManager, enableMockData } from "@/lib/mock-data"

// Ativar modo mock manualmente
enableMockData()

// Verificar se está ativo
if (mockDataManager.isMockEnabled()) {
  console.log("Mock ativo!")
}

// Buscar leads mockados
const leads = await mockDataManager.fetchLeads("9", "casaprimavera")

// Criar novo lead
const newLead = await mockDataManager.createLead({
  name: "João Silva",
  email: "joao@email.com",
  cellPhone: "(11) 99999-9999",
  product: "casaprimavera"
})

// Atualizar lead
const updated = await mockDataManager.updateLead(1, { 
  field03: "QUALIFICADO" 
})
```

## 🔧 Configuração

### Timeout da API
```typescript
// Timeout de 5 segundos para verificar se API está disponível
const apiIsHealthy = await checkApiHealth(tenantId, product)
```

### Quantidade de Dados
```typescript
// Gerar mais ou menos leads mockados
const mockData = generateMockData(100) // 100 leads
```

## 🎨 Personalização

### Adicionar Novos Interesses
```typescript
// Em lib/mock-data.ts
export const INTERESSES = [
  "Vestidos de festa",
  "Seu novo interesse aqui"
]
```

### Modificar Status
```typescript
// Em lib/mock-data.ts
export const STATUS_OPTIONS = [
  "NOVO",
  "SEU_NOVO_STATUS"
]
```

## 🚨 Notas Importantes

1. **Dados Temporários**: Os dados mockados são perdidos ao recarregar a página
2. **Sincronização**: Mudanças no mock não afetam a API real
3. **Desenvolvimento**: Ideal para desenvolvimento quando a API está indisponível
4. **Demonstração**: Perfeito para apresentações e demos

## 🎯 Casos de Uso

- **Desenvolvimento Offline**: Continue trabalhando sem internet
- **Testes de Interface**: Teste todos os cenários possíveis  
- **Demonstrações**: Mostre o sistema funcionando mesmo sem API
- **Treinamento**: Ambiente seguro para aprender o sistema

---

**Dica**: O sistema detecta automaticamente quando a API volta a funcionar e desativa o mock automaticamente! 🚀 