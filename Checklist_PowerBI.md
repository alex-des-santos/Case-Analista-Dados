# ✅ CHECKLIST PRÁTICO - POWER BI

## 📥 ETAPA 1: IMPORTAÇÃO (30 min)

### ☐ Importar Dados
- [ ] Abrir Power BI Desktop
- [ ] Obter Dados → Texto/CSV
- [ ] Importar todos os 11 arquivos da pasta Files/
- [ ] Verificar preview de cada arquivo
- [ ] Confirmar headers e tipos de dados

### ☐ Verificações Iniciais
- [ ] Customer.csv - 18k+ linhas ✓
- [ ] Sales Data 2020/2021/2022 - verificar estrutura
- [ ] Product.csv - 295 produtos ✓
- [ ] Territory.csv - 12 territórios ✓
- [ ] Outros arquivos carregados

---

## 🔧 ETAPA 2: TRATAMENTO DE DADOS (45 min)

### ☐ Transformar Sales Data
- [ ] Combinar Sales 2020, 2021, 2022 em uma tabela
- [ ] Converter OrderDate para tipo Date
- [ ] Adicionar coluna Year = YEAR(OrderDate)
- [ ] Adicionar coluna Month = MONTH(OrderDate)

### ☐ Transformar Customer
- [ ] Converter BirthDate para Date
- [ ] Criar coluna Idade (calculada)
- [ ] Verificar valores nulos em AnnualIncome

### ☐ Transformar Product
- [ ] Converter ProductCost para Currency
- [ ] Converter ProductPrice para Currency
- [ ] Criar coluna Margem = ProductPrice - ProductCost

---

## 🔗 ETAPA 3: RELACIONAMENTOS (20 min)

### ☐ Criar Relacionamentos
- [ ] Sales → Customer (CustomerKey)
- [ ] Sales → Product (ProductKey)
- [ ] Sales → Territory (TerritoryKey)
- [ ] Product → Product Subcategories
- [ ] Product Subcategories → Product Categories

### ☐ Configurações
- [ ] Definir direção de filtro
- [ ] Marcar Calendar como tabela de datas
- [ ] Verificar integridade referencial

---

## 📊 ETAPA 4: MÉTRICAS DAX (60 min)

### ☐ Métricas Básicas
```dax
Receita = SUMX(Sales, Sales[OrderQuantity] * RELATED(Product[ProductPrice]))
Custo = SUMX(Sales, Sales[OrderQuantity] * RELATED(Product[ProductCost]))
Lucro = [Receita] - [Custo]
Total Vendas = SUM(Sales[OrderQuantity])
```

### ☐ Métricas Avançadas
- [ ] Margem % = DIVIDE([Lucro], [Receita])
- [ ] Ticket Médio
- [ ] Taxa de Devolução
- [ ] Receita por Cliente

---

## 🎨 ETAPA 5: DASHBOARDS (90 min)

### ☐ Dashboard Executivo
- [ ] 4 Cards KPI principais (Receita, Lucro, Vendas, Margem)
- [ ] Gráfico linha: Receita por mês
- [ ] Gráfico barras: Top 10 produtos
- [ ] Mapa: Vendas por território

### ☐ Dashboard Produtos
- [ ] Matriz: Categoria vs Subcategoria
- [ ] Scatter: Preço vs Volume
- [ ] Rosca: % por categoria
- [ ] Tabela: Top produtos

### ☐ Dashboard Clientes
- [ ] Histograma: Faixa etária
- [ ] Barras: Renda anual
- [ ] Scatter: Idade vs Ticket
- [ ] Funil: Educação/Ocupação

---

## 🎯 VALIDAÇÕES FINAIS

### ☐ Testes de Integridade
- [ ] Totais batem entre visões
- [ ] Filtros funcionam corretamente
- [ ] Drill-down/up operacional
- [ ] Performance adequada

### ☐ Formatação
- [ ] Cores padronizadas (tema bicicletas)
- [ ] Títulos claros e descritivos
- [ ] Números formatados (moeda, %)
- [ ] Layout responsivo

---

## 🚀 PRÓXIMOS PASSOS

### ☐ Insights Identificados
- [ ] Documentar 5 principais insights
- [ ] Identificar oportunidades
- [ ] Sugerir ações para Cleiton

### ☐ Preparar Apresentação
- [ ] Resumo executivo
- [ ] Principais métricas
- [ ] Recomendações de negócio

---

**⏰ Tempo Total Estimado: 4-5 horas**

**💡 Dica:** Salve o arquivo .pbix regularmente e teste cada etapa antes de prosseguir!
