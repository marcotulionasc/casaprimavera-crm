"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { useProductConfig } from "@/hooks/use-product-config"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { mockDataManager, checkApiHealth } from "@/lib/mock-data"

export function MetropoleForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { products } = useProductConfig()
  const [formType, setFormType] = useState<"premium" | "quiz">("premium")
  const [isUsingMock, setIsUsingMock] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cellPhone: "",
    product: "",
    interessePrincipal: "morar", // Valor padrão para o formulário premium
    field01: "", // Quiz: interest / Premium: financing
    field02: "", // Quiz: awareness / Premium: timeframe
    field03: "", // Status
    field04: "", // Quiz: financing / Premium: "Você pretende:"
    field05: "", // Quiz: consultant / Premium: "Já possui o valor de entrada ou pretende financiar?"
    field06: "", // Quiz: purpose / Premium: "Está buscando imóvel há quanto tempo?"
    field07: "", // Premium: interessePrincipal (morar/investir)
    field08: "", // Não usado
    field09: "", // Não usado
    tenantId: 9, // Valor hardcoded conforme solicitado
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleRadioChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleFormTypeChange = (type: "premium" | "quiz") => {
    setFormType(type)

    // Resetar campos específicos de cada tipo de formulário
    if (type === "premium") {
      setFormData({
        ...formData,
        interessePrincipal: "morar",
        field01: "", // financing
        field02: "", // timeframe
        field03: "",
        field04: "Você pretende:",
        field05: "Já possui o valor de entrada ou pretende financiar?",
        field06: "Está buscando imóvel há quanto tempo?",
        field07: "morar", // interessePrincipal (morar/investir)
        field08: "",
        field09: "",
      })
    } else if (type === "quiz") {
      setFormData({
        ...formData,
        interessePrincipal: "",
        field01: "", // interest
        field02: "", // awareness
        field03: "",
        field04: "", // financing
        field05: "", // consultant
        field06: "", // purpose
        field07: "",
        field08: "",
        field09: "",
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Verificar se a API está funcionando
      const apiIsHealthy = await checkApiHealth("9", "casaprimavera")
      
      if (!apiIsHealthy) {
        // Usar dados mockados
        console.log("🎭 API não disponível, criando lead nos dados mockados")
        mockDataManager.enableMock()
        setIsUsingMock(true)
        
        await mockDataManager.createLead({
          ...formData,
          field03: "NOVO", // Status inicial
          tenantId: { id: formData.tenantId }
        })
        
        toast({
          title: "Sucesso! (Demo)",
          description: "Lead cadastrado com sucesso nos dados de demonstração.",
        })
      } else {
        // Usar API real
        setIsUsingMock(false)
        const payload = {
          ...formData,
          tenantId: {
            id: formData.tenantId,
          },
        }

        const response = await fetch("https://backend-ingressar.onrender.com/metropole/v1/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        })

        if (!response.ok) {
          throw new Error("Falha ao enviar dados")
        }

        toast({
          title: "Sucesso!",
          description: "Lead cadastrado com sucesso.",
        })
      }

      router.push("/dashboard")
      router.refresh()
    } catch (error) {
      console.error("Erro ao enviar dados:", error)
      
      // Fallback para dados mockados
      try {
        console.log("🎭 Erro na API, criando lead nos dados mockados como fallback")
        mockDataManager.enableMock()
        setIsUsingMock(true)
        
        await mockDataManager.createLead({
          ...formData,
          field03: "NOVO", // Status inicial
          tenantId: { id: formData.tenantId }
        })
        
        toast({
          title: "Sucesso! (Demo)",
          description: "Lead cadastrado nos dados de demonstração devido a erro na API.",
        })
        
        router.push("/dashboard")
        router.refresh()
      } catch (mockError) {
        console.error("Erro mesmo com dados mockados:", mockError)
        toast({
          title: "Erro",
          description: "Ocorreu um erro ao cadastrar o lead.",
          variant: "destructive",
        })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Cadastrar Novo Lead</CardTitle>
          <CardDescription>Preencha os dados do novo lead para o CRM.</CardDescription>
          <div className="mt-4">
            <Label>Tipo de Formulário</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              <Button
                type="button"
                variant={formType === "premium" ? "default" : "outline"}
                onClick={() => handleFormTypeChange("premium")}
              >
                Premium (Lançamento)
              </Button>
              <Button
                type="button"
                variant={formType === "quiz" ? "default" : "outline"}
                onClick={() => handleFormTypeChange("quiz")}
              >
                Quiz
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo*</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email{formType === "quiz" ? "" : "*"}</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required={formType !== "quiz"}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cellPhone">Telefone/WhatsApp*</Label>
              <Input
                id="cellPhone"
                name="cellPhone"
                value={formData.cellPhone}
                onChange={handleChange}
                required
                placeholder="(00) 00000-0000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="product">Produto de Interesse*</Label>
              <Select value={formData.product} onValueChange={(value) => handleSelectChange("product", value)}>
                <SelectTrigger id="product">
                  <SelectValue placeholder="Selecione um produto" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.id}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {formType === "premium" && (
            <>
              <div className="space-y-2">
                <Label>Você pretende:</Label>
                <RadioGroup
                  value={formData.interessePrincipal}
                  onValueChange={(value) => handleRadioChange("interessePrincipal", value)}
                  className="flex space-x-4 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="morar" id="morar" />
                    <Label htmlFor="morar">Morar</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="investir" id="investir" />
                    <Label htmlFor="investir">Investir</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="field01">Já possui o valor de entrada ou pretende financiar?</Label>
                <Select value={formData.field01} onValueChange={(value) => handleSelectChange("field01", value)}>
                  <SelectTrigger id="field01">
                    <SelectValue placeholder="Selecione uma opção" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Tenho parte do valor">Tenho parte do valor</SelectItem>
                    <SelectItem value="Vou financiar com FGTS">Vou financiar com FGTS</SelectItem>
                    <SelectItem value="Sim, tenho o valor total">Sim, tenho o valor total</SelectItem>
                    <SelectItem value="Sim, tenho o valor de entrada">Sim, tenho o valor de entrada</SelectItem>
                    <SelectItem value="Não, preciso de financiamento">Não, preciso de financiamento</SelectItem>
                    <SelectItem value="Estou pesquisando">Estou pesquisando</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="field02">Está buscando imóvel há quanto tempo?</Label>
                <Select value={formData.field02} onValueChange={(value) => handleSelectChange("field02", value)}>
                  <SelectTrigger id="field02">
                    <SelectValue placeholder="Selecione uma opção" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Comecei agora, mas quero decidir rápido">
                      Comecei agora, mas quero decidir rápido
                    </SelectItem>
                    <SelectItem value="Já venho buscando e ainda não encontrei o ideal">
                      Já venho buscando e ainda não encontrei o ideal
                    </SelectItem>
                    <SelectItem value="Menos de 1 mês">Menos de 1 mês</SelectItem>
                    <SelectItem value="1-3 meses">1-3 meses</SelectItem>
                    <SelectItem value="3-6 meses">3-6 meses</SelectItem>
                    <SelectItem value="Mais de 6 meses">Mais de 6 meses</SelectItem>
                    <SelectItem value="Apenas pesquisando">Apenas pesquisando</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {formType === "quiz" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="field01">Já pensou em morar ou investir perto do Galleria Shopping?</Label>
                <Select value={formData.field01} onValueChange={(value) => handleSelectChange("field01", value)}>
                  <SelectTrigger id="field01">
                    <SelectValue placeholder="Selecione uma opção" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Sim, mas achei que fosse caro demais.</SelectItem>
                    <SelectItem value="no">Não, ainda não considerei.</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="field02">
                  Sabia que o metro quadrado na região já chegou a R$ 16 mil, mas o City Galleria está entrando com
                  cerca de R$ 8 mil?
                </Label>
                <Select value={formData.field02} onValueChange={(value) => handleSelectChange("field02", value)}>
                  <SelectTrigger id="field02">
                    <SelectValue placeholder="Selecione uma opção" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no">Não sabia. Isso me interessou.</SelectItem>
                    <SelectItem value="yes">Já sabia, e por isso quero ver mais.</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="field06">Você busca:</Label>
                <Select value={formData.field06} onValueChange={(value) => handleSelectChange("field06", value)}>
                  <SelectTrigger id="field06">
                    <SelectValue placeholder="Selecione uma opção" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="live">Um imóvel pra morar com localização e padrão.</SelectItem>
                    <SelectItem value="invest">Um investimento com alto potencial de valorização.</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="field04">Usaria FGTS ou financiamento?</Label>
                <Select value={formData.field04} onValueChange={(value) => handleSelectChange("field04", value)}>
                  <SelectTrigger id="field04">
                    <SelectValue placeholder="Selecione uma opção" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Sim, pretendo usar FGTS ou Financiamento.</SelectItem>
                    <SelectItem value="no">Não preciso.</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="field05">Está disposto(a) a conversar com um consultor?</Label>
                <Select value={formData.field05} onValueChange={(value) => handleSelectChange("field05", value)}>
                  <SelectTrigger id="field05">
                    <SelectValue placeholder="Selecione uma opção" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Sim, quero mais detalhes direto com alguém.</SelectItem>
                    <SelectItem value="no">Não, só estou olhando por curiosidade.</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => router.push("/dashboard")}>
            Cancelar
          </Button>
          <Button type="submit" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Cadastrar Lead
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
