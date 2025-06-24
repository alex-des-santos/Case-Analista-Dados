# Integração Dashboard Web → Power BI

## 1. Power BI Custom Visual
**Vantagem**: Integração nativa, dados dinâmicos, publicação no Power BI Service
**Complexidade**: Média/Alta

### Estrutura necessária:
```
AdventureWorks-CustomVisual/
├── pbiviz.json (configuração)
├── src/
│   ├── visual.ts (código principal)
│   ├── settings.ts (configurações)
│   └── style/visual.less (estilos)
├── assets/ (ícones, etc.)
└── capabilities.json (definições de dados)
```

### Ferramentas necessárias:
- Node.js
- Power BI Tools CLI: `npm install -g powerbi-visuals-tools`
- TypeScript

### Processo:
1. `pbiviz new AdventureWorksCustomVisual`
2. Adaptar código JavaScript para TypeScript
3. Definir binding de dados no capabilities.json
4. Empacotar: `pbiviz package`
5. Importar no Power BI Desktop

## 2. Web URL Embedding
**Vantagem**: Mais simples, mantém funcionalidades JS
**Desvantagem**: Dados estáticos, limitações de segurança

### Requisitos:
- Hospedar dashboard em servidor HTTPS
- Configurar CORS adequadamente
- Power BI Premium ou Pro

### Implementação:
1. Hospedar em GitHub Pages, Azure, AWS, etc.
2. No Power BI: Insert → Web URL
3. Configurar parâmetros de URL para filtros

## 3. Power BI Embedded + iframe
**Vantagem**: Controle total, interação com dados do Power BI
**Complexidade**: Alta

### Tecnologias:
- Power BI Embedded APIs
- Azure App Service
- JavaScript SDK do Power BI

## 4. Exportação de Dados + Recriação
**Vantagem**: Dados nativos do Power BI, performance
**Desvantagem**: Requer recriação dos gráficos

### Processo:
1. Exportar dados do dashboard para JSON/CSV
2. Importar no Power BI como fonte de dados
3. Recriar visualizações usando elementos nativos do Power BI
