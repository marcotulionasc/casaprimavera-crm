# 🧪 Teste dos Mocks - Casa Primavera

## ✅ Status da Implementação

O sistema de mocks foi implementado e está **FORÇADO PARA DEBUG** para garantir que funcione.

## 🚀 Como Testar

### 1. **Acesse o Dashboard Principal**
- URL: `http://localhost:3001/dashboard`
- Você deve ver o badge **"🎭 Modo Demo"** no header
- Deve aparecer um toast: **"Modo Debug Ativo"**
- A lista deve carregar **50 leads simulados**

### 2. **Verificar Console do Navegador** (F12)
Deve aparecer as seguintes mensagens:
```
🚀 Iniciando fetchMetropoles...
⚠️ MODO DEBUG: Forçando uso de mock
🎭 Modo Mock ativado - Usando dados simulados
📊 Mock data recebido: 50 leads
📊 Carregando estatísticas...
🎭 Modo Mock ativado - Usando dados simulados
📈 Stats: 50 leads para estatísticas
```

### 3. **Testar Funcionalidades**

#### ✅ Dashboard (`/dashboard`)
- Lista de 50 leads com nomes brasileiros
- Estatísticas mostrando dados reais
- Filtros funcionando
- Atualização de status funcional

#### ✅ Criar Lead (`/dashboard/create`)
- Formulário totalmente funcional
- Ao salvar: toast "Sucesso! (Demo)"
- Lead é adicionado à lista

#### ✅ Detalhes (`/dashboard/detail/1`)
- Mostra dados completos do lead
- Botão WhatsApp funcional
- Atualização de status funcional

#### ✅ Estatísticas (`/dashboard/stats`)
- Gráficos com dados simulados
- Métricas de conversão
- Distribuição por status

## 🛠️ Debug Manual no Console

Abra o console do navegador (F12) e teste:

```javascript
// Forçar modo mock
window.mockDebug.force()

// Testar sistema completo
window.mockDebug.test()

// Ver todos os dados
window.mockDebug.getAll()

// Resetar dados
window.mockDebug.reset()
```

## 📊 Dados Esperados

### Leads Simulados:
- **50 leads** com dados brasileiros
- **Nomes**: Ana Silva, Carlos Santos, Maria Oliveira...
- **Telefones**: (11) 99999-9999 formatados
- **Status**: NOVO, CONTATO_FEITO, QUALIFICADO, etc.
- **Interesses**: Vestidos de festa, Roupas casuais, etc.
- **Cidades**: São Paulo, Rio de Janeiro, Belo Horizonte...

### Estatísticas:
- Total de leads: ~50
- Qualificados: ~25% do total
- Propostas: ~15% do total  
- Fechados: ~10% do total

## 🎯 Indicadores de Sucesso

✅ Badge "🎭 Modo Demo" visível no header
✅ Toast de confirmação ao carregar
✅ 50 leads na lista
✅ Estatísticas funcionais
✅ Filtros e busca operacionais
✅ Formulário de criação funcional
✅ Detalhes do lead acessíveis
✅ Gráficos e charts renderizando

## 🔧 Modo Produção

Para voltar ao modo normal (detectar API automaticamente):

1. Editar `components/metropole-list.tsx`
2. Comentar as linhas de "MODO DEBUG"
3. Descomentar o código de verificação da API
4. Fazer rebuild: `npm run build`

## 🆘 Troubleshooting

### Problema: "Carregando leads..."
- Verificar console para erros
- Executar `window.mockDebug.test()` no console

### Problema: Badge não aparece
- Mock pode não estar ativado
- Executar `window.mockDebug.force()` no console

### Problema: Dados não carregam
- Verificar se há erros no console
- Confirmar se o servidor está rodando

---

**Status**: ✅ **MOCKS FUNCIONANDO EM MODO DEBUG**
**Última atualização**: Hoje
**Próximo passo**: Testar todas as funcionalidades 