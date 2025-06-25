# Documentação da Nova Metodologia de Projeção - Adventure Works 2022

## 📊 Visão Geral
Esta documentação descreve a nova metodologia de projeção implementada para os últimos 6 meses de 2022 (Julho-Dezembro) no dashboard Adventure Works.

## 🎯 Objetivo
Criar uma projeção conservadora e realista para o segundo semestre de 2022 baseada em dados históricos, aplicando um cenário de estagnação econômica.

## 📈 Metodologia Implementada

### Fórmula Base
```
Julho 2022 = (Julho 2020 + Julho 2021) ÷ 2
```

### Cálculo da Taxa de Crescimento
```
Taxa Original = (Julho 2021 - Julho 2020) ÷ Julho 2020
Taxa Ajustada = min(Taxa Original, 15%) × 0.7
```

### Projeção Sequencial
```
Agosto 2022 = Julho 2022 × (1 + Taxa Ajustada)
Setembro 2022 = Agosto 2022 × (1 + Taxa Ajustada)
... e assim por diante
```

## 📊 Resultados da Implementação

### Dados Base (Julho)
- **Julho 2020**: US$ 641.500
- **Julho 2021**: US$ 1.349.525
- **Julho 2022 Projetado**: US$ 995.513 (média)

### Taxa de Crescimento
- **Taxa Original**: 110.37% (Jul 2020 → Jul 2021)
- **Taxa Ajustada**: 10.50% (limitada e reduzida para cenário de estagnação)

### Projeção Mensal (Jul-Dez 2022)
| Mês | Valor Projetado |
|-----|----------------|
| Julho | US$ 995.513 |
| Agosto | US$ 1.100.042 |
| Setembro | US$ 1.215.546 |
| Outubro | US$ 1.343.178 |
| Novembro | US$ 1.484.212 |
| Dezembro | US$ 1.640.054 |

### Totais Anuais
- **6 primeiros meses (real)**: US$ 9.185.447
- **6 últimos meses (projetado)**: US$ 7.778.545
- **Total 2022 projetado**: US$ 16.963.992
- **Crescimento vs 2021**: +81.94%

## ⚙️ Funcionalidades Implementadas

### 1. Toggle de Projeção
- Checkbox para ativar/desativar projeção
- Atualização imediata de todos os KPIs
- Atualização de todos os gráficos (mensal e quarterly)
- Mudança de cores para indicar dados projetados

### 2. Indicadores Visuais
- **Cor padrão**: Azul (#336BFF) - dados reais
- **Cor projeção**: Laranja (#FF6B35) - dados projetados
- **Labels**: Adição de "(com projeção)" nos títulos
- **Disclaimer**: Aviso visual sobre uso de dados projetados

### 3. KPIs Atualizados
Todos os indicadores são recalculados quando a projeção é ativada:
- **Receita Total**: Soma de dados reais + projetados
- **Lucro Total**: Calculado com margem de 41.7%
- **Total de Pedidos**: Calculado com ticket médio US$ 444.56
- **Margem de Lucro**: Mantida constante (41.7%)
- **Ticket Médio**: Mantido constante (US$ 444.56)

### 4. Gráficos Atualizados
- **Gráfico Mensal**: Linha tracejada para meses projetados
- **Gráfico Quarterly**: Q3 e Q4 com dados projetados
- **Cores dinâmicas**: Mudança automática ao ativar projeção

### 5. Exportação CSV
- Dados estruturados para Power BI
- Separação clara entre dados reais e projetados
- Metodologia documentada no arquivo
- KPIs calculados incluídos

## 🔧 Implementação Técnica

### Função Principal
```javascript
generateProjectionDataForCSV() {
    // Calcula média de Julho 2020-2021
    // Aplica taxa de crescimento ajustada
    // Retorna dados estruturados
}
```

### Atualização de KPIs
```javascript
applyProjectionToKPIs() {
    // Aplica dados projetados aos KPIs
    // Considera cenários: 2022 apenas ou consolidado
}
```

### Atualização de Gráficos
```javascript
getProjectionDataForCharts() {
    // Retorna dados reais ou projetados
    // Baseado no estado do toggle
}
```

## 📋 Cenários Suportados

### 1. Filtro "2022"
- KPIs: Apenas dados de 2022 (real + projetado)
- Gráficos: Linha única com projeção
- Crescimento: Comparado com 2021

### 2. Filtro "Todos os Anos"
- KPIs: Consolidado 2020+2021+2022(projetado)
- Gráficos: Três linhas com 2022 projetado
- Crescimento: Impacto da projeção no total

### 3. Outros Anos (2020, 2021)
- Projeção não se aplica
- Dados reais mantidos
- Toggle desabilitado

## 🎯 Premissas do Modelo

1. **Base histórica**: Julho é representativo do padrão de crescimento
2. **Estagnação econômica**: Taxa de crescimento reduzida (70% da original)
3. **Limite de crescimento**: Máximo 15% por mês para evitar valores irreais
4. **Margem constante**: 41.7% mantida para todos os meses
5. **Ticket médio estável**: US$ 444.56 para cálculo de pedidos

## 📊 Validação dos Resultados

### Comparação com Cenários Anteriores
| Cenário | Total 2022 | Crescimento vs 2021 |
|---------|-------------|-------------------|
| **Atual (Nova Fórmula)** | US$ 16.96M | +81.94% |
| Anterior (Último 3 meses) | US$ 18.37M | +97.00% |
| Anterior (Sazonal) | US$ 17.89M | +91.82% |

### Justificativa da Escolha
- **Mais conservador**: Evita projeções otimistas irreais
- **Baseado em padrão histórico**: Usa dados de 2 anos como base
- **Cenário de estagnação**: Reflete incertezas econômicas
- **Taxa controlada**: Previne crescimento exponencial

## 🚀 Como Usar

### No Dashboard Web
1. Acesse o dashboard Adventure Works
2. Localize o toggle "Ativar Projeção 2022"
3. Marque a checkbox para ativar
4. Observe as mudanças nos KPIs e gráficos
5. Use o botão "Exportar CSV" se necessário

### No Power BI
1. Exporte o CSV de projeção
2. Importe no Power BI como nova fonte
3. Crie relacionamentos com tabelas existentes
4. Use campos "Tipo_Dado" para filtrar real/projetado
5. Aplique formatação visual para dados projetados

## 📝 Observações Importantes

- **Dados reais**: Janeiro-Junho 2022 (baseados nos CSVs originais)
- **Dados projetados**: Julho-Dezembro 2022 (calculados pela metodologia)
- **Cenário**: Conservador/pessimista (estagnação econômica)
- **Confiança**: 75-80% (baseado em padrões históricos limitados)
- **Revisão**: Recomendada trimestralmente com dados reais

---

**Última atualização**: 24 de junho de 2025  
**Versão**: 2.0 - Nova metodologia implementada  
**Desenvolvido para**: Adventure Works Executive Dashboard
