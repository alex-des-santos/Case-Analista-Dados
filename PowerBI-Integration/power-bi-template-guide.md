# Adventure Works - Template Power BI

## 📊 Estrutura de Páginas Recomendada

### Página 1: Overview Executivo
**Layout**: 1000x700px, margins 20px

#### KPIs (Cartões) - Linha Superior
```
[Receita Total] [Lucro Total] [Pedidos] [Margem] [Ticket Médio]
   200x100       200x100      200x100  200x100   200x100
```

#### Gráficos Principais
```
[Evolução Receita - Linha]    [Top Produtos - Barras]
        500x300                      480x300

[Territórios - Rosca]  [Categorias - Barras Agrupadas]
      300x250                    680x250
```

### Página 2: Análise Temporal (Opcional)
- Gráfico de linha com drill-down por ano/mês/dia
- Sazonalidade e tendências
- Comparativo ano anterior

### Página 3: Análise de Produtos (Opcional)
- Matriz de produtos por categoria
- Performance por subcategoria
- Análise de margens por produto

## 🎨 Formatação de Referência

### Paleta de Cores
```css
/* Cores Principais */
--primary-blue: #336BFF      /* Receita, títulos principais */
--success-green: #339966     /* Lucro, valores positivos */
--light-blue: #007AFF        /* Destaque, links */
--white: #FFFFFF             /* Fundo */
--dark-gray: #2D3748         /* Texto principal */
--light-gray: #E2E8F0        /* Bordas, fundos secundários */
```

### Tipografia
- **Fonte Principal**: Segoe UI
- **Títulos**: 16px, Bold
- **Subtítulos**: 14px, Medium  
- **Corpo**: 12px, Regular

### Formatos de Número
```dax
// Moeda
FORMAT(value, "$#,##0,,M")    // $25M formato

// Percentual
FORMAT(value, "0.0%")         // 24.5% formato

// Números
FORMAT(value, "#,##0")        // 1,234 formato
```

## 📋 Checklist de Importação

### ✅ Pré-Importação
- [ ] Power BI Desktop instalado (versão 2.120+)
- [ ] Arquivos CSV baixados do dashboard web
- [ ] Arquivo de medidas DAX baixado
- [ ] README.md com instruções lido

### ✅ Importação de Dados
- [ ] kpi_metrics.csv importado
- [ ] monthly_revenue.csv importado
- [ ] top_products.csv importado
- [ ] territory_sales.csv importado
- [ ] category_performance.csv importado

### ✅ Medidas DAX
- [ ] Receita Total criada
- [ ] Lucro Total criado
- [ ] Margem de Lucro criada
- [ ] Ticket Médio criado
- [ ] Total de Pedidos criado

### ✅ Visuais
- [ ] 5 cartões KPI criados
- [ ] Gráfico de linha (receita temporal)
- [ ] Gráfico de barras (top produtos)
- [ ] Gráfico de rosca (territórios)
- [ ] Gráfico barras agrupadas (categorias)

### ✅ Formatação
- [ ] Cores do tema aplicadas
- [ ] Formatos de moeda configurados
- [ ] Formatos percentuais configurados
- [ ] Títulos e labels ajustados

### ✅ Filtros
- [ ] Filtro de ano adicionado
- [ ] Filtro de território adicionado
- [ ] Filtro de categoria adicionado
- [ ] Sincronização entre páginas

### ✅ Validação
- [ ] Receita total confere com dashboard web
- [ ] Lucro total confere com dashboard web
- [ ] Margem calculada corretamente
- [ ] Filtros funcionando
- [ ] Layout responsivo testado

## 🔧 Medidas DAX Essenciais

```dax
// Receita Total
Receita Total = 
SUMX(
    fat_Sales_Data,
    fat_Sales_Data[OrderQuantity] * RELATED(fat_Product[ProductPrice])
)

// Lucro Total
Lucro Total = 
[Receita Total] - 
SUMX(
    fat_Sales_Data,
    fat_Sales_Data[OrderQuantity] * RELATED(fat_Product[ProductCost])
)

// Margem de Lucro
Margem de Lucro = 
IF(
    [Receita Total] <> 0,
    DIVIDE([Lucro Total], [Receita Total]) * 100,
    0
)

// Ticket Médio
Ticket Médio = 
DIVIDE(
    [Receita Total],
    COUNTROWS(fat_Sales_Data),
    0
)

// Total de Pedidos
Total de Pedidos = COUNTROWS(fat_Sales_Data)
```

## 🚀 Dicas de Performance

### Otimizações
1. **Colunas Calculadas**: Use para campos frequentemente filtrados
2. **Hierarquias de Data**: Crie para análise temporal eficiente
3. **Relacionamentos**: Mantenha 1:N sempre que possível
4. **Agregações**: Configure para grandes volumes de dados

### Melhores Práticas
- Teste com filtros antes de publicar
- Configure refresh automático dos dados
- Use medidas ao invés de colunas calculadas quando possível
- Documente fórmulas complexas

---

**Suporte**: Consulte o arquivo JSON exportado para detalhes específicos de layout e configuração.

**Validação**: Compare sempre os valores finais com o dashboard web original para garantir consistência.
