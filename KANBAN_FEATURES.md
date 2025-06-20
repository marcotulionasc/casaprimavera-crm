# 🎯 Sistema KANBAN - Casa Primavera CRM

## 📋 Funcionalidades Implementadas

### ✅ Visualização KANBAN
- **Toggle de Visualização**: Botão para alternar entre visualização de Tabela e KANBAN
- **Colunas de Status**: 7 colunas baseadas no status dos leads:
  - 🔵 **Novo** (NOVO)
  - 🟡 **Contato Feito** (CONTATO_FEITO)  
  - 🟢 **Qualificado** (QUALIFICADO)
  - 🔴 **Não Qualificado** (NÃO_QUALIFICADO)
  - 🟣 **Qualificado OP** (QUALIFICADO_OP)
  - 🟠 **Proposta** (PROPOSTA)
  - 🟦 **Fechado** (FECHADO)

### 🎪 Funcionalidades de Drag & Drop
- **Arrastar e Soltar**: Possibilidade de arrastar leads entre as colunas
- **Atualização Automática**: Status do lead é atualizado automaticamente ao mover
- **Feedback Visual**: 
  - Colunas destacam quando um card está sendo arrastado sobre elas
  - Cards têm animação de hover e drag
  - Toast de confirmação quando status é atualizado
- **Responsive**: Funciona em desktop e tablets

### 🎨 Interface e UX
- **Cards Informativos**: Cada lead é exibido como um card com:
  - Nome e email do cliente
  - Telefone com ícone
  - Localização (se disponível)
  - Interesse principal como badge
  - Descrição do projeto
  - Botões de ação (WhatsApp e Ver detalhes)
- **Indicadores Visuais**: 
  - Contador de leads por coluna
  - Cores diferentes para cada status
  - Indicação de colunas vazias
- **Filtros**: Os mesmos filtros da tabela funcionam no KANBAN

## 🛠️ Tecnologias Utilizadas

- **@dnd-kit/core**: Sistema de drag and drop moderno e acessível
- **@dnd-kit/sortable**: Para funcionalidades de ordenação
- **@dnd-kit/utilities**: Utilitários para transformações CSS
- **Tailwind CSS**: Para estilização responsiva
- **Lucide React**: Ícones modernos

## 🚀 Como Usar

1. **Acessar o Dashboard**: Navegue para a página principal do dashboard
2. **Alternar Visualização**: Clique no botão "Kanban" no header
3. **Gerenciar Leads**: 
   - Arraste cards entre colunas para mudar status
   - Use WhatsApp para contato direto
   - Clique em "Ver" para detalhes completos
4. **Filtrar**: Use os filtros de produto e busca normalmente

## 🔧 Configuração Técnica

### Dependências Instaladas
```bash
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities --legacy-peer-deps
```

### Componentes Criados
- `components/kanban-board.tsx`: Componente principal do KANBAN
- `components/metropole-list.tsx`: Atualizado com toggle de visualização

### Estilos Personalizados
- Classes CSS adicionadas em `app/globals.css` para animações suaves
- Feedback visual durante drag and drop
- Responsive design

## 📱 Responsividade

- **Desktop**: Experiência completa com drag and drop
- **Tablet**: Funciona normalmente
- **Mobile**: Fallback para visualização em cards (tabela original)

## 🎯 Próximas Melhorias

- [ ] Filtros específicos do KANBAN
- [ ] Ordenação dentro das colunas
- [ ] Ações em lote no KANBAN
- [ ] Personalização de colunas
- [ ] Métricas de conversão por coluna
- [ ] Histórico de mudanças de status

## 🐛 Troubleshooting

Se houver problemas com dependências:
```bash
npm install --legacy-peer-deps
```

Se o drag and drop não funcionar:
- Verifique se as dependências @dnd-kit estão instaladas
- Confirme que não há conflitos de versão com React
- Teste em navegador compatível (Chrome, Firefox, Safari)

---

**Desenvolvido para Casa Primavera - Móveis e Decoração** 🏠✨

## 📝 Atualização de Dados

Os dados foram atualizados para refletir o negócio real da Casa Primavera:

### 🏠 Categorias de Interesse
- **Decoração de sala** - Móveis e acessórios para sala de estar
- **Móveis de escritório** - Soluções corporativas e home office
- **Quarto de casal** - Móveis planejados para quarto principal
- **Quarto infantil** - Decoração temática para crianças
- **Cozinha planejada** - Móveis sob medida para cozinha
- **Banheiro planejado** - Soluções modernas para banheiro
- **Área externa** - Móveis para varanda e jardim
- **Móveis sob medida** - Projetos personalizados
- **Home office** - Escritório em casa
- **Decoração completa** - Reforma total da casa
- **Closet planejado** - Organização de roupas
- **Lavanderia** - Móveis para área de serviço

### 💰 Orçamentos Realistas
- Faixas de orçamento de R$ 5.000 a R$ 50.000
- Baseados em projetos reais de móveis e decoração
- Diferentes categorias de investimento 