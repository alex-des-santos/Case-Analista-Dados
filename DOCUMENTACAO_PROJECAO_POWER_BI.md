# Documentação: Dados de Projeção Adventure Works 2022 para Power BI

## Visão Geral
Este documento explica como utilizar os dados de projeção gerados pelo dashboard Adventure Works no Power BI para criar análises e visualizações consistentes.

## Arquivo CSV de Projeção

### Estrutura do Arquivo
O arquivo CSV exportado (`adventure-works-projecao-2022-[data].csv`) contém:

1. **Dados Mensais** (Janeiro - Dezembro 2022)
2. **Totais Calculados** (Semestres e ano completo)
3. **KPIs Calculados** (Receita, Lucro, Pedidos, etc.)
4. **Metodologia** (Premissas e fatores utilizados)

### Campos Principais

#### Dados Mensais
- `Mes`: Nome do mês
- `Ano`: Ano (2022)
- `Receita_Real`: Receita real dos primeiros 6 meses (Jan-Jun)
- `Receita_Projetada`: Receita projetada dos últimos 6 meses (Jul-Dez)
- `Receita_Total`: Receita total (real + projetada)
- `Tipo_Dado`: "Real" ou "Projetado"
- `Observacoes`: Descrição da origem do dado

#### KPIs Calculados
- `Receita_Total`: US$ 17.1M (receita total projetada)
- `Lucro_Total`: US$ 7.1M (margem de 41.7%)
- `Total_Pedidos`: 38.5K pedidos (ticket médio US$ 444.56)
- `Margem_Lucro`: 41.7% (mantida constante)
- `Ticket_Medio`: US$ 444.56 (mantido constante)
- `Crescimento_vs_2021`: 83.7% (crescimento em relação a 2021)

## Implementação no Power BI

### 1. Importação dos Dados

```dax
// Conectar ao arquivo CSV
let
    Source = Csv.Document(File.Contents("C:\path\to\adventure-works-projecao-2022.csv")),
    #"Promoted Headers" = Table.PromoteHeaders(Source),
    #"Changed Type" = Table.TransformColumnTypes(#"Promoted Headers", {
        {"Mes", type text}, 
        {"Ano", Int64.Type}, 
        {"Receita_Real", Currency.Type}, 
        {"Receita_Projetada", Currency.Type}, 
        {"Receita_Total", Currency.Type}, 
        {"Tipo_Dado", type text}
    })
in
    #"Changed Type"
```

### 2. Criação de Medidas DAX

#### Receita Total com Projeção
```dax
Receita_Com_Projecao = 
VAR ReceitaReal = 
    CALCULATE(
        SUM('ProjecaoAdventure'[Receita_Real]),
        'ProjecaoAdventure'[Tipo_Dado] = "Real"
    )
VAR ReceitaProjetada = 
    CALCULATE(
        SUM('ProjecaoAdventure'[Receita_Projetada]),
        'ProjecaoAdventure'[Tipo_Dado] = "Projetado"
    )
RETURN
    ReceitaReal + ReceitaProjetada
```

#### Indicador de Dados Projetados
```dax
Tem_Projecao = 
IF(
    COUNTROWS(
        FILTER(
            'ProjecaoAdventure',
            'ProjecaoAdventure'[Tipo_Dado] = "Projetado" && 
            'ProjecaoAdventure'[Receita_Projetada] > 0
        )
    ) > 0,
    "Com Projeção",
    "Apenas Real"
)
```

#### Crescimento vs Ano Anterior
```dax
Crescimento_vs_2021 = 
VAR TotalProjetado2022 = [Receita_Com_Projecao]
VAR Total2021 = 9324203  // Total real de 2021
RETURN
    DIVIDE(TotalProjetado2022 - Total2021, Total2021, 0)
```

#### Lucro Projetado
```dax
Lucro_Com_Projecao = 
[Receita_Com_Projecao] * 0.417  // Margem de 41.7%
```

### 3. Formatação Condicional

#### Cores para Dados Reais vs Projetados
```dax
Cor_Por_Tipo = 
SWITCH(
    SELECTEDVALUE('ProjecaoAdventure'[Tipo_Dado]),
    "Real", "#3366FF",        // Azul para dados reais
    "Projetado", "#FF6B35",   // Laranja para dados projetados
    "#808080"                 // Cinza para outros
)
```

### 4. Visualizações Recomendadas

#### Gráfico de Linha - Evolução Mensal
- **Eixo X**: Mes
- **Valores**: Receita_Total
- **Série**: Tipo_Dado
- **Formatação**: Linha tracejada para dados projetados

#### Cartões KPI
- **Receita Total**: [Receita_Com_Projecao]
- **Lucro Total**: [Lucro_Com_Projecao]
- **Crescimento**: [Crescimento_vs_2021]

#### Tabela Detalhada
- Mes, Receita_Real, Receita_Projetada, Receita_Total, Tipo_Dado

### 5. Filtros e Slicers

#### Slicer de Tipo de Dados
```dax
Tipo_Visualizacao = 
DATATABLE(
    "Opcao", STRING,
    "Valor", STRING,
    {
        {"Apenas Real", "Real"},
        {"Com Projeção", "Todos"},
        {"Apenas Projetado", "Projetado"}
    }
)
```

#### Medida de Filtro
```dax
Filtro_Tipo_Dados = 
VAR TipoSelecionado = SELECTEDVALUE('Tipo_Visualizacao'[Valor])
RETURN
    SWITCH(
        TipoSelecionado,
        "Real", 'ProjecaoAdventure'[Tipo_Dado] = "Real",
        "Projetado", 'ProjecaoAdventure'[Tipo_Dado] = "Projetado",
        TRUE()  // "Todos" - mostrar ambos
    )
```

## Metodologia da Projeção

### Premissas Utilizadas
1. **Base de Cálculo**: 85% da média dos primeiros 6 meses de 2022
2. **Variação Sazonal**: Fatores entre 95% e 118% por mês
3. **Margem de Lucro**: Mantida constante em 41.7%
4. **Ticket Médio**: Mantido constante em US$ 444.56

### Fatores Sazonais Aplicados
- **Julho**: 105% (ligeiro crescimento de verão)
- **Agosto**: 108% (pico de verão)
- **Setembro**: 95% (volta às aulas - queda)
- **Outubro**: 112% (início de temporada alta)
- **Novembro**: 115% (Black Friday)
- **Dezembro**: 118% (Natal - pico do ano)

### Confiabilidade
- **Nível de Confiança**: 80-85%
- **Tipo de Projeção**: Conservadora
- **Período**: Julho a Dezembro 2022

## Uso Prático no Power BI

### 1. Dashboard Executivo
Crie um dashboard com:
- KPIs principais (receita, lucro, crescimento)
- Gráfico de evolução mensal
- Comparação 2021 vs 2022 projetado
- Indicadores visuais para dados projetados

### 2. Análise de Cenários
Use slicers para alternar entre:
- Cenário real (apenas primeiros 6 meses)
- Cenário projetado (ano completo)
- Comparação lado a lado

### 3. Relatórios Gerenciais
Inclua disclaimers automáticos:
```dax
Disclaimer_Projecao = 
IF(
    [Tem_Projecao] = "Com Projeção",
    "⚠️ Dados incluem projeção para Jul-Dez 2022 baseada em análise preditiva",
    "✅ Dados baseados apenas em informações reais"
)
```

### 4. Exportação para Apresentações
Configure botões de exportação para:
- PDF do relatório completo
- Excel com dados detalhados
- PowerPoint com gráficos principais

## Atualizações e Manutenção

### Quando Atualizar
- Mensalmente (com novos dados reais)
- Trimestralmente (revisão de premissas)
- Anualmente (nova metodologia)

### Como Atualizar
1. Exportar novo CSV do dashboard
2. Substituir arquivo no Power BI
3. Atualizar conexões de dados
4. Validar medidas e visualizações

## Troubleshooting

### Problemas Comuns
1. **Arquivo não carrega**: Verificar caminho e formato CSV
2. **Valores inconsistentes**: Validar tipos de dados na importação
3. **Gráficos não atualizam**: Forçar refresh das medidas

### Contatos
- **Dashboard**: Desenvolvido para Presidente Cleiton
- **Dados**: Baseados nos CSVs originais Adventure Works
- **Metodologia**: Documentada neste arquivo

---

*Documento gerado automaticamente pelo sistema de projeção Adventure Works*
*Data: ${new Date().toLocaleDateString('pt-BR')}*
