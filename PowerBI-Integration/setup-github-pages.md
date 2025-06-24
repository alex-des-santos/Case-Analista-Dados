# Configuração GitHub Pages para Power BI Integration

## Passos para hospedar o dashboard:

### 1. Criar repositório no GitHub
```bash
git init
git add .
git commit -m "Dashboard Adventure Works para Power BI"
git branch -M main
git remote add origin https://github.com/[SEU_USUARIO]/adventure-works-dashboard.git
git push -u origin main
```

### 2. Ativar GitHub Pages
1. Ir em Settings do repositório
2. Seção "Pages"
3. Source: "Deploy from a branch"
4. Branch: "main"
5. Folder: "/ (root)"

### 3. URL gerada:
`https://[SEU_USUARIO].github.io/adventure-works-dashboard/PowerBI-Integration/dashboard-powerbi.html`

### 4. Integrar no Power BI:
1. Power BI Desktop
2. Insert → Web URL
3. Colar a URL do GitHub Pages
4. Configurar tamanho e posicionamento

## Configurações CORS (se necessário):
```html
<meta http-equiv="Content-Security-Policy" content="frame-ancestors 'self' https://app.powerbi.com https://msit.powerbi.com;">
```

## Parâmetros de URL para filtros:
- `?year=2020` - Filtrar por ano
- `?currency=BRL` - Mostrar em Real
- `?compact=true` - Versão compacta

Exemplo: 
`https://[SEU_USUARIO].github.io/adventure-works-dashboard/PowerBI-Integration/dashboard-powerbi.html?year=2021&currency=USD`
