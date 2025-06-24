# Guia Completo - Análise de Dados de Bicicletas para Power BI

## 📊 FASE 1: ANÁLISE EXPLORATÓRIA DOS DADOS

### Estrutura dos Dados Identificada:

#### **Tabelas Principais:**
1. **Customer.csv** - Dados dos clientes (18k+ registros)
2. **Sales Data 2020/2021/2022.csv** - Dados de vendas por ano
3. **Product.csv** - Catálogo de produtos (295 produtos)
4. **Returns Data.csv** - Dados de devoluções
5. **Territory.csv** - Territórios de vendas
6. **Calendar.csv** - Calendário para análises temporais
7. **Product Categories.csv** - Categorias de produtos
8. **Product Subcategories.csv** - Subcategorias de produtos

#### **Relacionamentos Identificados:**
- **Customer** ↔ **Sales Data** (via CustomerKey)
- **Product** ↔ **Sales Data** (via ProductKey)
- **Territory** ↔ **Sales Data** (via TerritoryKey)
- **Product** ↔ **Product Subcategories** (via ProductSubcategoryKey)
- **Product Subcategories** ↔ **Product Categories** (via CategoryKey)
- **Calendar** ↔ **Sales Data** (via OrderDate)
- **Returns Data** ↔ **Product/Territory** (via ProductKey/TerritoryKey)

---

## 🔧 FASE 2: PREPARAÇÃO DOS DADOS NO POWER BI

### Passo 1: Importação dos Dados
1. Abrir Power BI Desktop
2. **Obter Dados** → **Texto/CSV**
3. Importar todos os arquivos da pasta `Files/`
4. Para cada arquivo, verificar:
   - Tipos de dados corretos
   - Headers promovidos
   - Codificação adequada

### Passo 2: Tratamento dos Dados (Power Query)
#### **Tabela Customer:**
- Converter `BirthDate` para Date
- Criar coluna calculada `Idade` = `DATEDIFF(Customer[BirthDate], TODAY(), YEAR)`
- Padronizar `Gender` (M/F)
- Tratar valores nulos em `AnnualIncome`

#### **Tabelas Sales Data:**
- Unificar as 3 tabelas (2020, 2021, 2022) em uma única tabela `Sales`
- Converter `OrderDate` e `StockDate` para Date
- Adicionar coluna `Year` = `YEAR(Sales[OrderDate])`
- Adicionar coluna `Month` = `MONTH(Sales[OrderDate])`

#### **Tabela Product:**
- Converter `ProductCost` e `ProductPrice` para Currency
- Criar coluna `Margem` = `Product[ProductPrice] - Product[ProductCost]`
- Criar coluna `% Margem` = `DIVIDE(Product[Margem], Product[ProductPrice])`

### Passo 3: Modelagem de Dados
1. **Criar relacionamentos** no Model View:
   - Sales → Customer (CustomerKey)
   - Sales → Product (ProductKey)  
   - Sales → Territory (TerritoryKey)
   - Product → Product Subcategories (ProductSubcategoryKey)
   - Product Subcategories → Product Categories (CategoryKey)

2. **Configurar direção de filtro** como necessário
3. **Marcar tabela Calendar** como tabela de datas

---

## 📈 FASE 3: CRIAÇÃO DAS MÉTRICAS (DAX)

### Métricas Financeiras:
```dax
Receita Total = 
SUMX(
    Sales,
    Sales[OrderQuantity] * RELATED(Product[ProductPrice])
)

Custo Total = 
SUMX(
    Sales,
    Sales[OrderQuantity] * RELATED(Product[ProductCost])
)

Lucro Total = [Receita Total] - [Custo Total]

Margem % = DIVIDE([Lucro Total], [Receita Total])
```

### Métricas de Vendas:
```dax
Total Vendas = SUM(Sales[OrderQuantity])

Total Pedidos = DISTINCTCOUNT(Sales[OrderNumber])

Ticket Médio = DIVIDE([Receita Total], [Total Pedidos])

Itens por Pedido = DIVIDE([Total Vendas], [Total Pedidos])
```

### Métricas de Devoluções:
```dax
Total Devoluções = SUM('Returns Data'[ReturnQuantity])

Taxa de Devolução = 
DIVIDE(
    [Total Devoluções],
    [Total Vendas]
)
```

### Métricas de Clientes:
```dax
Total Clientes = DISTINCTCOUNT(Sales[CustomerKey])

Clientes Ativos = 
CALCULATE(
    [Total Clientes],
    Sales[OrderDate] >= TODAY() - 365
)

Receita por Cliente = DIVIDE([Receita Total], [Total Clientes])
```

---

## 🎨 FASE 4: CRIAÇÃO DOS DASHBOARDS

### Dashboard 1: Visão Executiva
- **KPI Cards:** Receita, Lucro, Margem %, Total Vendas
- **Gráfico de Linha:** Evolução da receita por mês
- **Gráfico de Barras:** Top 10 produtos por receita
- **Mapa:** Vendas por território
- **Gauge:** Meta vs Realizado

### Dashboard 2: Análise de Produtos
- **Matriz:** Receita por categoria e subcategoria
- **Scatter Plot:** Preço vs Volume de vendas
- **Gráfico de Rosca:** Participação por categoria
- **Tabela:** Top produtos com margem e devoluções

### Dashboard 3: Análise de Clientes
- **Histograma:** Distribuição por faixa etária
- **Gráfico de Barras:** Receita por faixa de renda
- **Scatter Plot:** Idade vs Ticket médio
- **Funil:** Clientes por educação e ocupação

### Dashboard 4: Análise Temporal
- **Gráfico de Linha:** Vendas mensais por ano
- **Heatmap:** Vendas por dia da semana/mês
- **Waterfall:** Variação mensal da receita
- **Cards:** Crescimento YoY e MoM

---

## 🎯 FASE 5: INSIGHTS ESPERADOS

### Análises Principais:
1. **Sazonalidade** das vendas
2. **Produtos mais lucrativos** vs mais vendidos
3. **Perfil dos melhores clientes**
4. **Territórios com melhor performance**
5. **Impacto das devoluções** na rentabilidade
6. **Oportunidades de cross-sell**

### Recomendações de Negócio:
- Estratégias para produtos de baixa margem
- Campanhas direcionadas por perfil de cliente
- Ações para reduzir devoluções
- Expansão em territórios promissores

---

## 📱 PRÓXIMA FASE: PÁGINA WEB

Após finalizar o Power BI, criaremos uma página web interativa com:
- Dashboard resumido
- Gráficos interativos com Chart.js/D3.js
- Análises complementares
- Design moderno e responsivo
