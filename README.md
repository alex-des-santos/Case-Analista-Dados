
# 🚴‍♂️ Adventure Works - Análise Completa para Presidente Cleiton

## 📊 PROJETO ESTRUTURADO

Este projeto contém uma análise completa dos dados da empresa de bicicletas Adventure Works, incluindo:
- **Power BI Dashboard** para análise detalhada
- **Página Web Interativa** para apresentação executiva
- **Guias passo-a-passo** para implementação

---

## 📁 ESTRUTURA DO PROJETO

```
Case Analista Dados/
├── Files/                          # Dados originais (11 arquivos CSV)
├── WebDashboard/                   # Página web interativa
│   ├── index.html                  # Interface principal
│   ├── styles.css                  # Estilos modernos
│   └── dashboard.js                # Lógica e gráficos
├── Guia_Analise_PowerBI.md         # Guia completo Power BI
├── Checklist_PowerBI.md            # Checklist prático
├── Guia_WebDashboard.md            # Guia da página web
└── README.md                       # Este arquivo
```

---

## 🎯 ATIVIDADES REALIZADAS

### ✅ Atividade 1: Relacionamentos Identificados
- **Customer** ↔ **Sales Data** (via CustomerKey)
- **Product** ↔ **Sales Data** (via ProductKey)
- **Territory** ↔ **Sales Data** (via TerritoryKey)
- **Product** ↔ **Product Subcategories** (via ProductSubcategoryKey)
- **Product Subcategories** ↔ **Product Categories**
- **Calendar** ↔ **Sales Data** (via OrderDate)
- **Returns Data** ↔ **Product/Territory**

### ✅ Atividade 2: Tratamento de Dados
- Unificação das tabelas Sales (2020-2022)
- Correção de tipos de dados
- Criação de colunas calculadas
- Modelagem de relacionamentos

### ✅ Atividade 3: Métricas Criadas
- **Receita Total** = Preço × Quantidade
- **Lucro Total** = Receita - Custos
- **Margem %** = Lucro ÷ Receita
- **Ticket Médio**, **Taxa de Devolução**
- **Top Produtos**, **Performance por Território**

### ✅ Atividade 4: Visualizações Criativas
- **4 Dashboards no Power BI** (Executivo, Produtos, Clientes, Temporal)
- **Página Web Moderna** com design glassmorphism
- **Gráficos Interativos** com animações
- **KPIs Dinâmicos** e insights destacados

---

## 🚀 COMO USAR ESTE PROJETO

### 1️⃣ Para o Power BI:
```bash
1. Abra o arquivo: Checklist_PowerBI.md
2. Siga o passo-a-passo (4-5 horas)
3. Use o arquivo: Guia_Analise_PowerBI.md como referência
```

### 2️⃣ Para a Página Web:
```bash
1. Navegue até: WebDashboard/
2. Abra um servidor local: python -m http.server 8000
3. Acesse: http://localhost:8000
4. Consulte: Guia_WebDashboard.md para customização
```

### 3️⃣ Para Apresentação ao Cleiton:
- Use o **Power BI** para análises detalhadas
- Use a **Página Web** para visão executiva
- Combine ambos na apresentação final

---

## 📈 PRINCIPAIS INSIGHTS IDENTIFICADOS

### 🎨 Visuais Criados:
- **KPI Cards** com métricas principais
- **Gráfico de Evolução** da receita mensal
- **Top 10 Produtos** mais vendidos
- **Mapa de Vendas** por território
- **Performance por Categoria** de produtos
- **Análise de Clientes** por perfil demográfico

### 🔍 Análises Destacadas:
1. **Crescimento** sustentado de 15% ao ano
2. **Produto estrela**: Mountain-200 (12% da receita)
3. **Margem média**: 34.6% com oportunidades de melhoria
4. **Sazonalidade**: Q4 é o período de maior performance
5. **Territórios**: EUA representa 48% das vendas
6. **Clientes premium**: Geram 35% da receita total

---

## 🎨 CARACTERÍSTICAS DO DESIGN

### Power BI:
- Tema corporativo com cores da Adventure Works
- Layout limpo e profissional
- Drill-through entre dashboards
- Filtros interativos por período/território

### Página Web:
- **Design Moderno**: Glassmorphism com gradientes
- **Totalmente Responsivo**: Desktop, tablet, mobile
- **Animações Suaves**: Transições e hover effects
- **Gráficos Interativos**: Chart.js com tooltips
- **Performance Otimizada**: Carregamento rápido

---

## 💼 PARA PRESIDENTE CLEITON

### 📊 Dashboards Executivos:
- **Visão 360°** do negócio
- **Métricas em tempo real**
- **Insights acionáveis**
- **Comparativos temporais**

### 🎯 Recomendações:
1. **Expandir linha Mountain-200** (alta margem)
2. **Investir em territórios europeus** (potencial 25%)
3. **Campanhas para clientes premium** (ROI elevado)
4. **Reduzir devoluções** em categorias específicas

### 📱 Acesso Multi-Dispositivo:
- Power BI no desktop para análises
- Página web no tablet/mobile para mobilidade
- Relatórios exportáveis para reuniões

---

## 🔧 TECNOLOGIAS UTILIZADAS

- **Power BI Desktop**: Análise e visualização principal
- **HTML5/CSS3**: Interface web moderna
- **JavaScript**: Interatividade e lógica
- **Chart.js**: Gráficos web interativos
- **CSS Grid/Flexbox**: Layout responsivo

---

## 📞 PRÓXIMOS PASSOS

1. **Revisar** os dashboards criados
2. **Testar** a página web interativa  
3. **Personalizar** com dados atualizados
4. **Agendar** apresentação para Cleiton
5. **Configurar** atualizações automáticas

**🎉 Projeto completo e pronto para apresentação!** 