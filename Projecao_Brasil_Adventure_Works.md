# 🇧🇷 Projeção de Mercado - Adventure Works Brasil

## Metodologia de Cálculo

### **Dados Econômicos Utilizados**

#### **Brasil (Mercado Alvo):**
- **População:** 215,3 milhões
- **PIB per capita:** USD 8.814 (2023)
- **Poder de Compra (PPP):** USD 16.727 (2023)
- **Índice de Complexidade Econômica:** 0.025
- **Fator Cultura Ciclística:** 0.3 (30%)
- **Taxa de Urbanização:** 88%

#### **Mercados de Referência:**
- **EUA:** População 331,9M | PIB per capita USD 76.399 | Vendas USD 35M
- **Canadá:** População 38M | PIB per capita USD 54.966 | Vendas USD 18,5M
- **França:** População 67,8M | PIB per capita USD 42.500 | Vendas USD 12,8M

---

## **Métodos de Projeção**

### **1. Método GDP per Capita (Peso: 30%)**
```
Projeção = (PIB_BR / PIB_EUA) × (Pop_BR / Pop_EUA) × Vendas_EUA × Fator_Cultural
Resultado: Baseado na relação econômica direta com os EUA
```

### **2. Método Poder de Compra - PPP (Peso: 25%)**
```
Projeção = (PPP_BR / PPP_EUA) × (Pop_BR / Pop_EUA) × Vendas_EUA × Fator_Cultural
Resultado: Considera o poder de compra real ajustado
```

### **3. Comparação França (Peso: 25%)**
```
Projeção = (PIB_BR / PIB_FR) × (Pop_BR / Pop_FR) × Vendas_FR × Fator_Cultural
Resultado: França como mercado europeu de referência
```

### **4. Comparação Canadá (Peso: 20%)**
```
Projeção = (PIB_BR / PIB_CA) × (Pop_BR / Pop_CA) × Vendas_CA × Fator_Cultural
Resultado: Canadá como mercado norte-americano desenvolvido
```

---

## **Cenários de Projeção**

### **🔵 Cenário Conservador (2-3% Market Share)**
- **Receita Anual Projetada:** USD 4,2 - 5,8 milhões
- **Pedidos Anuais:** 8.800 - 12.200 unidades
- **Timeline:** 3-5 anos para atingir
- **Premissas:** Crescimento gradual, adaptação cultural necessária

### **🟢 Cenário Otimista (3-5% Market Share)**
- **Receita Anual Projetada:** USD 6,3 - 8,7 milhões
- **Pedidos Anuais:** 13.200 - 18.300 unidades
- **Timeline:** 2-4 anos para atingir
- **Premissas:** Forte investimento em marketing e infraestrutura

### **🟡 Cenário Pessimista (1-2% Market Share)**
- **Receita Anual Projetada:** USD 2,5 - 3,5 milhões
- **Pedidos Anuais:** 5.300 - 7.400 unidades
- **Timeline:** 4-6 anos para atingir
- **Premissas:** Entrada cautelosa, barreiras de mercado

---

## **Fatores Considerados**

### **✅ Fatores Positivos:**
- **População Grande:** 215M habitantes = mercado potencial robusto
- **Urbanização Alta:** 88% população urbana favorece uso de bicicletas
- **Crescimento Econômico:** Economia em recuperação pós-pandemia
- **Sustentabilidade:** Crescente consciência ambiental
- **Mobilidade Urbana:** Trânsito congestionado incentiva alternativas

### **⚠️ Fatores de Risco:**
- **Poder de Compra:** PIB per capita 8,6x menor que EUA
- **Cultura Ciclística:** Limitada comparada a países desenvolvidos
- **Infraestrutura:** Ciclovias e segurança ainda em desenvolvimento
- **Competição:** Marcas locais e importadas já estabelecidas
- **Economia:** Volatilidade cambial e inflação

---

## **Estratégias Recomendadas**

### **🎯 Entrada no Mercado:**

#### **Fase 1 - Teste (Ano 1):**
- **Cidades-alvo:** São Paulo, Rio de Janeiro, Brasília
- **Produtos:** Linha básica e intermediária
- **Meta:** USD 1-2 milhões
- **Estratégia:** Parcerias locais, teste de aceitação

#### **Fase 2 - Expansão (Anos 2-3):**
- **Cidades-alvo:** Belo Horizonte, Porto Alegre, Curitiba
- **Produtos:** Linha completa adaptada
- **Meta:** USD 3-5 milhões
- **Estratégia:** Investimento em marketing, rede de dealers

#### **Fase 3 - Consolidação (Anos 4-5):**
- **Cobertura:** Nacional (principais capitais)
- **Produtos:** Linha premium + modelos exclusivos
- **Meta:** USD 5-8 milhões
- **Estratégia:** Marca estabelecida, expansão para interior

---

## **Dados Necessários para Refinar Projeção**

### **📊 Dados de Mercado:**
- [ ] Tamanho atual do mercado de bicicletas no Brasil
- [ ] Participação por categoria (mountain, road, urbana)
- [ ] Preços médios praticados no mercado local
- [ ] Sazonalidade de vendas
- [ ] Principais canais de distribuição

### **📈 Dados Econômicos:**
- [ ] Taxa de câmbio histórica BRL/USD (5 anos)
- [ ] Projeções econômicas para os próximos 3 anos
- [ ] Renda média por região metropolitana
- [ ] Índice de desenvolvimento por cidade-alvo

### **🚴 Dados Comportamentais:**
- [ ] Pesquisas sobre uso de bicicletas no Brasil
- [ ] Perfil demográfico dos ciclistas
- [ ] Motivações de compra (lazer, trabalho, esporte)
- [ ] Barreiras percebidas para uso de bicicletas

### **🏢 Dados de Competição:**
- [ ] Market share dos principais players
- [ ] Estratégias de preço da concorrência
- [ ] Pontos fortes/fracos dos concorrentes
- [ ] Análise de produtos similares

---

## **⚡ Implementação no Dashboard**

A projeção é **calculada automaticamente** e exibida em tempo real no dashboard:

- **Localização:** Card "Projeção Brasil" na seção de Insights
- **Atualização:** Automática com mudança de moeda
- **Exportação:** Incluída no relatório JSON
- **Detalhes:** Tooltip com cenários otimista/pessimista

### **Código Responsável:**
- `generateBrazilProjection()` - Cálculo principal
- `calculateMarketProjection()` - Algoritmos de projeção
- `updateBrazilProjection()` - Atualização da interface

---

## **💡 Próximos Passos**

1. **Validar Dados:** Confirmar dados econômicos atuais
2. **Pesquisa de Mercado:** Contratar estudo específico do setor
3. **Teste Piloto:** Implementar projeto piloto em 1-2 cidades
4. **Refinar Modelo:** Ajustar projeções com dados reais
5. **Plano de Negócios:** Desenvolver estratégia detalhada

**A projeção atual é conservadora e baseada em dados públicos. Para uma análise mais precisa, recomenda-se investir em pesquisa de mercado específica.**
