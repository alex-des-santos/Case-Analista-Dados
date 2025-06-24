// Script para capturar parâmetros da URL e integrar com Power BI
// Adicionar ao dashboard-powerbi.html

class PowerBIIntegration {
    constructor() {
        this.urlParams = new URLSearchParams(window.location.search);
        this.setupURLParameters();
        this.setupPowerBIMessages();
    }

    // Capturar parâmetros da URL
    setupURLParameters() {
        // Filtro por ano
        const year = this.urlParams.get('year');
        if (year && ['2020', '2021', '2022', 'all'].includes(year)) {
            if (window.dashboard) {
                window.dashboard.currentYear = year;
                window.dashboard.filterByYear(year);
            }
        }

        // Moeda
        const currency = this.urlParams.get('currency');
        if (currency && ['USD', 'BRL'].includes(currency)) {
            if (window.dashboard) {
                window.dashboard.currency.current = currency;
                window.dashboard.updateKPIs();
            }
        }

        // Modo compacto
        const compact = this.urlParams.get('compact');
        if (compact === 'true') {
            this.enableCompactMode();
        }

        // Tema
        const theme = this.urlParams.get('theme');
        if (theme && ['light', 'dark'].includes(theme)) {
            this.applyTheme(theme);
        }
    }

    // Configurar comunicação com Power BI
    setupPowerBIMessages() {
        // Escutar mensagens do Power BI
        window.addEventListener('message', (event) => {
            if (event.origin !== 'https://app.powerbi.com' && 
                event.origin !== 'https://msit.powerbi.com') {
                return;
            }

            const data = event.data;
            
            // Processar filtros vindos do Power BI
            if (data.type === 'filter') {
                this.handlePowerBIFilter(data);
            }
            
            // Processar mudanças de contexto
            if (data.type === 'context') {
                this.handlePowerBIContext(data);
            }
        });

        // Enviar dados para o Power BI
        this.sendDataToPowerBI();
    }

    // Processar filtros do Power BI
    handlePowerBIFilter(data) {
        if (data.year && window.dashboard) {
            window.dashboard.filterByYear(data.year);
        }
        
        if (data.territory && window.dashboard) {
            this.filterByTerritory(data.territory);
        }
    }

    // Processar contexto do Power BI
    handlePowerBIContext(data) {
        if (data.width && data.height) {
            this.adjustSize(data.width, data.height);
        }
        
        if (data.theme) {
            this.applyTheme(data.theme);
        }
    }

    // Enviar dados para o Power BI
    sendDataToPowerBI() {
        if (window.parent && window.dashboard) {
            const dashboardData = {
                type: 'dashboardData',
                kpis: {
                    revenue: window.dashboard.data.revenue.total,
                    profit: window.dashboard.data.profit.total,
                    orders: window.dashboard.data.orders.total,
                    margin: window.dashboard.data.margin.total,
                    averageTicket: window.dashboard.data.averageTicket.total
                },
                timestamp: new Date().toISOString()
            };

            window.parent.postMessage(dashboardData, '*');
        }
    }

    // Modo compacto
    enableCompactMode() {
        document.body.classList.add('compact-mode');
        
        const style = document.createElement('style');
        style.textContent = `
            .compact-mode .kpi-card {
                padding: 10px;
                min-height: 80px;
            }
            
            .compact-mode .kpi-value {
                font-size: 1.2rem;
            }
            
            .compact-mode .kpi-icon {
                width: 40px;
                height: 40px;
                font-size: 1.2rem;
            }
            
            .compact-mode .dashboard-header {
                padding: 10px 0;
            }
            
            .compact-mode h1 {
                font-size: 1.5rem;
            }
        `;
        document.head.appendChild(style);
    }

    // Aplicar tema
    applyTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.add('dark-theme');
            
            const darkStyle = document.createElement('style');
            darkStyle.textContent = `
                .dark-theme {
                    background: #1e1e1e;
                    color: white;
                }
                
                .dark-theme .kpi-card,
                .dark-theme .chart-container {
                    background: #2d2d2d;
                    border-color: #404040;
                    color: white;
                }
                
                .dark-theme .dashboard-header {
                    background: #2d2d2d;
                    border-color: #404040;
                }
            `;
            document.head.appendChild(darkStyle);
        }
    }

    // Ajustar tamanho
    adjustSize(width, height) {
        const container = document.querySelector('.dashboard-container');
        if (container) {
            container.style.width = width + 'px';
            container.style.height = height + 'px';
            
            // Ajustar grid baseado no tamanho
            if (width < 800) {
                container.classList.add('mobile-layout');
            }
        }
    }

    // Filtrar por território
    filterByTerritory(territory) {
        // Implementar filtro por território se necessário
        console.log('Filtering by territory:', territory);
    }

    // Método para exportar dados para Power BI
    exportToPowerBI() {
        if (window.dashboard) {
            const exportData = {
                metadata: {
                    title: 'Adventure Works Dashboard Export',
                    timestamp: new Date().toISOString(),
                    source: 'Web Dashboard'
                },
                kpis: window.dashboard.data,
                monthlyRevenue: window.dashboard.rawData.revenueByYear,
                products: {
                    names: window.dashboard.rawData.allYearsData.products,
                    sales: window.dashboard.rawData.allYearsData.productSales
                },
                territories: {
                    names: window.dashboard.rawData.allYearsData.territories,
                    sales: window.dashboard.rawData.allYearsData.territorySales
                }
            };

            // Enviar para o Power BI
            if (window.parent) {
                window.parent.postMessage({
                    type: 'exportData',
                    data: exportData
                }, '*');
            }

            // Também baixar como JSON
            const blob = new Blob([JSON.stringify(exportData, null, 2)], 
                { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'adventure-works-powerbi-export.json';
            a.click();
            URL.revokeObjectURL(url);
        }
    }
}

// Inicializar integração quando o dashboard estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    // Aguardar dashboard carregar
    setTimeout(() => {
        window.powerBIIntegration = new PowerBIIntegration();
        
        // Adicionar botão de export (se não estiver em modo compacto)
        if (!new URLSearchParams(window.location.search).get('compact')) {
            const exportBtn = document.createElement('button');
            exportBtn.textContent = 'Exportar para Power BI';
            exportBtn.className = 'export-powerbi-btn';
            exportBtn.style.cssText = `
                position: fixed;
                top: 10px;
                right: 10px;
                background: #0078d4;
                color: white;
                border: none;
                padding: 10px 15px;
                border-radius: 4px;
                cursor: pointer;
                z-index: 1000;
            `;
            exportBtn.onclick = () => window.powerBIIntegration.exportToPowerBI();
            document.body.appendChild(exportBtn);
        }
    }, 2000);
});
