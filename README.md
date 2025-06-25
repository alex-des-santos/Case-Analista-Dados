# Adventure Works - Análise de Dados Executiva

## 🎯 Resumo Executivo
Dashboard interativo desenvolvido para análise financeira da Adventure Works, empresa de bicicletas, com projeções de Machine Learning para 2022 e análise de mercado brasileiro.

**📊 Principais Entregas:**
- Dashboard web interativo com métricas financeiras
- Projeções de receita usando Machine Learning (Random Forest)
- Análise de mercado brasileiro por renda per capita
- KPIs executivos: Receita, Lucro, Margem, ROI

## 🔧 Estrutura Técnica

### `/docs/` - Dashboard Principal
- `index.html` - Dashboard interativo responsivo
- `dashboard.js` - Lógica de negócio e visualizações (Chart.js)
- `styles.css` - Interface moderna com alternância USD/BRL

### `/Files/` - Dados Fonte
- Dados originais: Sales Data (2020-2022), Product, Customer, Territory
- `Sales_Forecasting_ML.ipynb` - Notebook Machine Learning
- Arquivos tratados: Returns, Revenue Projections

### `/DadosBrasil/` - Análise Mercado Brasileiro
- Projeções por renda per capita
- Performance por categoria e território
- KPIs regionalizados

## 🚀 Como Executar

```bash
# Clonar repositório
git clone [repo-url]

# Abrir dashboard
cd docs
python -m http.server 8000
# Acesse: http://localhost:8000
```

## 📈 Principais Insights

**Métricas Consolidadas (2020-2022):**
- Receita Total: $24.9M USD
- Lucro: $10.4M USD (41.7% margem)
- 56.046 pedidos
- Ticket médio: $444.56

**Projeções ML para 2022:**
- Modelo Random Forest com 94% de precisão
- Projeção Jul-Dez 2022: crescimento 15.2%
- Foco em categorias Bikes e Components

**Mercado Brasil:**
- Potencial em regiões Sul/Sudeste
- Segmentação por renda per capita
- Oportunidades em categorias premium

## 🛠 Tecnologias Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Visualização**: Chart.js, Font Awesome
- **Machine Learning**: Python, Pandas, Scikit-learn
- **Análise**: Jupyter Notebook, CSV processing
- **Deploy**: GitHub Pages ready

## 📋 Validação dos Dados

- Fórmulas validadas: `OrderQuantity * ProductPrice`
- Dados limpos e tratados para outliers
- Conversão USD/BRL com taxa real
- Métricas auditáveis e rastreáveis

---

*Desenvolvido para demonstrar competências técnicas em análise de dados, visualização e projeções financeiras.*
