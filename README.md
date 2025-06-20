# Casa Primavera Dashboard

Sistema de gestão de leads especializado para moda e confecção.

## 🏗️ Características

- **Design Responsivo**: Interface adaptada para desktop, tablet e mobile
- **Gestão de Leads**: Controle completo do funil de vendas
- **Dashboard Inteligente**: Métricas e estatísticas em tempo real
- **Integração WhatsApp**: Contato direto com leads
- **Filtros Avançados**: Busca por nome, email, telefone, cidade e interesse
- **Status Personalizados**: Funil de vendas adaptado para moda

## 🚀 Tecnologias

- **Next.js 15**: Framework React com App Router
- **TypeScript**: Tipagem estática
- **Tailwind CSS**: Estilização
- **Radix UI**: Componentes acessíveis
- **Lucide React**: Ícones

## 📊 Status de Leads

- **Novo**: Lead recém-cadastrado
- **Contato Feito**: Primeiro contato realizado
- **Qualificado**: Lead com potencial confirmado
- **Não Qualificado**: Lead sem fit
- **Qualificado OP**: Lead qualificado para oportunidade
- **Proposta**: Proposta enviada
- **Fechado**: Negócio concluído

## 🔧 Configuração

### Variáveis de Ambiente

```env
TENANT_ID=9
API_BASE_URL=https://backend-ingressar.onrender.com/metropole/v1
PRODUCT_ID=casaprimavera
```

### Instalação

```bash
# Clone o repositório
git clone <repository-url>

# Instale as dependências
npm install or yarn install

# Execute em desenvolvimento
npm run dev or yarn dev

# Build para produção
npm run build or yarn build
```

## 📱 Funcionalidades

### Dashboard Principal
- Métricas de conversão
- Leads por interesse
- Distribuição geográfica
- Taxa de qualificação

### Gestão de Leads
- Lista completa de leads
- Busca e filtros
- Atualização de status
- Visualização detalhada

### Integração WhatsApp
- Template personalizável
- Mensagem automática com nome do lead
- Abertura direta no WhatsApp

## 🎨 Design System

### Cores da LEVA MIDIA
- **Primary**: `rgb(139, 69, 19)` (Marrom)
- **Secondary**: `rgb(255, 193, 7)` (Amarelo)
- **Accent**: `rgb(255, 215, 0)` (Dourado)

### Componentes
- Cards responsivos
- Tabelas adaptáveis
- Formulários validados
- Modais interativos

## 📊 API Integration

### Endpoints Utilizados

**Listar Leads**
```
GET /metropole/v1/data/9/casaprimavera
```

**Atualizar Status**
```
PUT /metropole/v1/update/{leadId}
Body: { "field03": "STATUS" }
```

### Estrutura de Dados

```typescript
interface casaprimaveraLead {
  id: number
  name: string
  email: string
  cellPhone: string
  field01: string      // Cidade/Localização
  field02: string      // Descrição do interesse
  field03: string      // Status do lead
  interessePrincipal: string
  createdAt: string
  updatedAt: string
  // ... outros campos
}
```

## 🔄 White Label

Este sistema utiliza a mesma estrutura visual do CRM da LEVA MIDIA, adaptado especificamente para:

- **Dados do Casa Primavera**: Tenant ID 9, produto 'casaprimavera'
- **Cores da marca**: Esquema marrom/amarelo da LEVA MIDIA
- **Terminologia**: Focada em moda e confecção
- **Campos específicos**: Localização e interesses genéricos

## 📈 Métricas Disponíveis

- Total de leads
- Leads qualificados
- Propostas em andamento
- Negócios fechados
- Taxa de conversão
- Distribuição por interesse
- Análise geográfica

## 🎯 Público-Alvo

Sistema desenvolvido para:
- Empresas de confecção
- Lojas de moda
- Marcas de vestuário
- Profissionais da área têxtil

## 📞 Suporte

Para dúvidas ou suporte técnico, consulte a documentação em /swagger ou entre em contato através dos canais oficiais.

---

**Casa Primavera Dashboard** - Powered by LEVA MIDIA - Transformando leads em vendas.
