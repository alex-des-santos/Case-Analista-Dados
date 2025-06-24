// Dashboard Data Management
class DashboardData {
    constructor() {
        this.data = {
            revenue: { total: 82660000, change: 15.2 }, // Total de todos os anos
            profit: { total: 28547600, change: 18.7 },
            orders: { total: 173584, change: 12.3 },
            margin: { total: 35, change: 2.1 }
        };
        
        // Currency settings
        this.currency = {
            current: 'USD',
            exchangeRate: 5.25, // USD to BRL
            lastUpdated: new Date().toLocaleString('pt-BR')
        };
        
        // Data storage for different years and periods
        this.rawData = {
            revenueByYear: {
                2020: [2030000, 2020000, 2000000, 1950000, 2100000, 2150000, 2200000, 2300000, 2000000, 2080000, 2240000, 2250000],
                2021: [2250000, 2200000, 2300000, 2150000, 2400000, 2350000, 2500000, 2600000, 2100000, 2300000, 2400000, 2450000],
                2022: [2610000, 2600000, 2700000, 2550000, 2800000, 2750000, 2900000, 3000000, 2400000, 2630000, 2800000, 2600000]
            },
            allYearsData: {
                products: ['Mountain-200 Black', 'Road-250 Red', 'Mountain-400-W', 'Road-350-W Yellow', 'Mountain-500 Silver', 'Road-750 Black', 'Mountain-100 Silver', 'Road-550-W Yellow', 'Mountain-300 Black', 'Road-450 Red'],
                productSales: [8500000, 7800000, 6900000, 6200000, 5800000, 5300000, 4900000, 4500000, 4100000, 3800000],
                territories: ['Estados Unidos', 'Canadá', 'França', 'Alemanha', 'Austrália', 'Reino Unido'],
                territorySales: [35000000, 18500000, 12800000, 9200000, 4700000, 2460000],
                categories: ['Bikes', 'Components', 'Clothing', 'Accessories'],
                categoryRevenue: [58600000, 13200000, 7300000, 3560000],
                categoryProfit: [20510000, 4620000, 2555000, 1247000]
            }
        };
          this.charts = {};
        this.currentPeriod = 'month';
        this.currentYear = 'all';
        this.init();
    }    init() {
        this.updateKPIs();
        this.initializeCharts();
        this.setupEventListeners();
        this.updateExchangeRateDisplay();
        this.updateExchangeRatePeriodically();
        this.updateBrazilProjection();
    }    // Update KPI Cards
    updateKPIs() {
        // Revenue
        document.getElementById('totalRevenue').textContent = 
            this.formatCurrency(this.convertCurrency(this.data.revenue.total));
        document.getElementById('revenueChange').textContent = 
            `+${this.data.revenue.change}%`;

        // Profit
        document.getElementById('totalProfit').textContent = 
            this.formatCurrency(this.convertCurrency(this.data.profit.total));
        document.getElementById('profitChange').textContent = 
            `+${this.data.profit.change}%`;

        // Orders
        document.getElementById('totalOrders').textContent = 
            this.formatNumber(this.data.orders.total);
        document.getElementById('ordersChange').textContent = 
            `+${this.data.orders.change}%`;        // Margin (calcular baseado na receita e lucro atuais)
        const currentMargin = Math.round((this.data.profit.total / this.data.revenue.total) * 100);
        document.getElementById('profitMargin').textContent = 
            `${currentMargin}%`;
        document.getElementById('marginChange').textContent = 
            `+${this.data.margin.change}%`;
    }

    // Initialize Charts
    initializeCharts() {
        this.createRevenueChart();
        this.createTopProductsChart();
        this.createTerritoryChart();
        this.createCategoryChart();
    }

    // Revenue Trend Chart
    createRevenueChart() {
        const ctx = document.getElementById('revenueChart').getContext('2d');
        
        const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 
                       'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
        
        // Get data based on current filters
        const currentYearData = this.getRevenueDataForChart();
        
        this.charts.revenue = new Chart(ctx, {
            type: 'line',
            data: {
                labels: currentYearData.labels,
                datasets: currentYearData.datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            padding: 20,
                            font: { size: 12, weight: '600' }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#ffffff',
                        bodyColor: '#ffffff',
                        borderColor: 'rgb(51, 102, 255)',
                        borderWidth: 1,
                        callbacks: {
                            label: (context) => {
                                return `${context.dataset.label}: ${this.formatCurrency(this.convertCurrency(context.raw))}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(0, 0, 0, 0.1)' },
                        ticks: {
                            callback: (value) => this.formatCurrency(this.convertCurrency(value), true)
                        }
                    },
                    x: {
                        grid: { display: false }
                    }
                }
            }
        });
    }

    // Get revenue data based on current filters
    getRevenueDataForChart() {
        const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 
                       'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
        
        if (this.currentPeriod === 'quarter') {
            const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
            const quarterlyData = this.getQuarterlyData();
            
            return {
                labels: quarters,
                datasets: quarterlyData
            };
        }
        
        // Monthly data
        if (this.currentYear === 'all') {
            return {
                labels: months,
                datasets: [{
                    label: '2022',
                    data: this.rawData.revenueByYear[2022],
                    borderColor: 'rgb(51, 102, 255)',
                    backgroundColor: 'rgba(51, 102, 255, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: 'rgb(51, 102, 255)',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 3,
                    pointRadius: 6
                }, {
                    label: '2021',
                    data: this.rawData.revenueByYear[2021],
                    borderColor: 'rgb(156, 163, 175)',
                    backgroundColor: 'rgba(156, 163, 175, 0.1)',
                    borderWidth: 2,
                    fill: false,
                    tension: 0.4,
                    pointBackgroundColor: 'rgb(156, 163, 175)',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 4
                }, {
                    label: '2020',
                    data: this.rawData.revenueByYear[2020],
                    borderColor: 'rgb(229, 231, 235)',
                    backgroundColor: 'rgba(229, 231, 235, 0.1)',
                    borderWidth: 2,
                    fill: false,
                    tension: 0.4,
                    pointBackgroundColor: 'rgb(229, 231, 235)',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 4
                }]
            };
        } else {
            // Single year data
            return {
                labels: months,
                datasets: [{
                    label: this.currentYear,
                    data: this.rawData.revenueByYear[this.currentYear],
                    borderColor: 'rgb(51, 102, 255)',
                    backgroundColor: 'rgba(51, 102, 255, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: 'rgb(51, 102, 255)',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 3,
                    pointRadius: 6
                }]
            };
        }
    }

    // Get quarterly data
    getQuarterlyData() {
        const getQuarterlySum = (yearData) => {
            return [
                yearData[0] + yearData[1] + yearData[2], // Q1
                yearData[3] + yearData[4] + yearData[5], // Q2
                yearData[6] + yearData[7] + yearData[8], // Q3
                yearData[9] + yearData[10] + yearData[11] // Q4
            ];
        };

        if (this.currentYear === 'all') {
            return [{
                label: '2022',
                data: getQuarterlySum(this.rawData.revenueByYear[2022]),
                borderColor: 'rgb(51, 102, 255)',
                backgroundColor: 'rgba(51, 102, 255, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: 'rgb(51, 102, 255)',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 3,
                pointRadius: 6
            }, {
                label: '2021',
                data: getQuarterlySum(this.rawData.revenueByYear[2021]),
                borderColor: 'rgb(156, 163, 175)',
                backgroundColor: 'rgba(156, 163, 175, 0.1)',
                borderWidth: 2,
                fill: false,
                tension: 0.4,
                pointBackgroundColor: 'rgb(156, 163, 175)',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 4
            }, {
                label: '2020',
                data: getQuarterlySum(this.rawData.revenueByYear[2020]),
                borderColor: 'rgb(229, 231, 235)',
                backgroundColor: 'rgba(229, 231, 235, 0.1)',
                borderWidth: 2,
                fill: false,
                tension: 0.4,
                pointBackgroundColor: 'rgb(229, 231, 235)',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 4
            }];
        } else {
            return [{
                label: this.currentYear,
                data: getQuarterlySum(this.rawData.revenueByYear[this.currentYear]),
                borderColor: 'rgb(51, 102, 255)',
                backgroundColor: 'rgba(51, 102, 255, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: 'rgb(51, 102, 255)',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 3,
                pointRadius: 6            }];
        }
    }

    // Top Products Chart
    createTopProductsChart() {
        const ctx = document.getElementById('topProductsChart').getContext('2d');
        
        const products = this.rawData.allYearsData.products;
        const sales = this.rawData.allYearsData.productSales.map(value => this.convertCurrency(value));

        this.charts.topProducts = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: products,
                datasets: [{
                    data: sales,                    backgroundColor: [
                        'rgb(51, 102, 255)', 'rgb(51, 153, 102)', 'rgb(0, 122, 255)', 'rgb(51, 187, 102)',
                        'rgb(32, 68, 61)', 'rgb(156, 163, 175)', 'rgb(120, 53, 15)', 'rgb(255, 0, 0)',
                        'rgb(51, 102, 255)', 'rgb(51, 153, 102)'
                    ],
                    borderRadius: 8,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: (context) => this.formatCurrency(context.raw)
                        }
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        grid: { color: 'rgba(0, 0, 0, 0.1)' },
                        ticks: {
                            callback: (value) => this.formatCurrency(value, true)
                        }
                    },
                    y: {
                        grid: { display: false },
                        ticks: {
                            font: { size: 10 }
                        }
                    }
                }
            }
        });
    }

    // Territory Sales Chart
    createTerritoryChart() {
        const ctx = document.getElementById('territoryChart').getContext('2d');
        
        const territories = this.rawData.allYearsData.territories;
        const sales = this.rawData.allYearsData.territorySales.map(value => this.convertCurrency(value));
        
        this.charts.territory = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: territories,
                datasets: [{
                    data: sales,                    backgroundColor: [
                        'rgb(51, 102, 255)', 'rgb(51, 153, 102)', 'rgb(0, 122, 255)', 
                        'rgb(32, 68, 61)', 'rgb(51, 187, 102)', 'rgb(156, 163, 175)'
                    ],
                    borderWidth: 3,
                    borderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true,
                            font: { size: 11 }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((context.raw / total) * 100).toFixed(1);
                                return `${context.label}: ${this.formatCurrency(context.raw)} (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });
    }

    // Category Performance Chart
    createCategoryChart() {
        const ctx = document.getElementById('categoryChart').getContext('2d');
        
        const categories = this.rawData.allYearsData.categories;
        const revenue = this.rawData.allYearsData.categoryRevenue.map(value => this.convertCurrency(value));
        const profit = this.rawData.allYearsData.categoryProfit.map(value => this.convertCurrency(value));
        
        this.charts.category = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: categories,                datasets: [{
                    label: 'Receita',
                    data: revenue,
                    backgroundColor: 'rgba(51, 102, 255, 0.8)',
                    borderColor: 'rgb(51, 102, 255)',
                    borderWidth: 2,
                    borderRadius: 8,
                    borderSkipped: false
                }, {
                    label: 'Lucro',
                    data: profit,
                    backgroundColor: 'rgba(51, 153, 102, 0.8)',
                    borderColor: 'rgb(51, 153, 102)',
                    borderWidth: 2,
                    borderRadius: 8,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            padding: 20
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                return `${context.dataset.label}: ${this.formatCurrency(context.raw)}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(0, 0, 0, 0.1)' },
                        ticks: {
                            callback: (value) => this.formatCurrency(value, true)
                        }
                    },
                    x: {
                        grid: { display: false }
                    }
                }
            }
        });
    }

    // Event Listeners
    setupEventListeners() {
        // Year Filter
        const yearFilter = document.getElementById('yearFilter');
        if (yearFilter) {
            yearFilter.addEventListener('change', (e) => {
                this.filterByYear(e.target.value);
            });
        }

        // Refresh Button
        const refreshBtn = document.getElementById('refreshBtn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                this.refreshData();
            });
        }

        // Chart Period Buttons
        document.querySelectorAll('.chart-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Remove active class from all buttons
                document.querySelectorAll('.chart-btn').forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                e.target.classList.add('active');
                // Update chart period
                this.updateChartPeriod(e.target.dataset.period);
            });
        });

        // Currency Toggle
        const currencyToggle = document.getElementById('currencyToggle');
        if (currencyToggle) {
            currencyToggle.addEventListener('change', (e) => {
                this.toggleCurrency(e.target.checked);
            });
        }

        // Export Button
        const exportBtn = document.getElementById('exportBtn');
        if (exportBtn) {
            exportBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.exportReport();
            });
        }

        // Share Button
        const shareBtn = document.getElementById('shareBtn');
        if (shareBtn) {
            shareBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.shareReport();
            });
        }
    }

    // Filter by Year
    filterByYear(year) {
        console.log(`Filtering data for year: ${year}`);
        this.currentYear = year;
        
        this.addLoadingState();
        
        // Update data based on year filter
        this.updateDataForYear(year);
        
        setTimeout(() => {
            // Destroy and recreate revenue chart with filtered data
            if (this.charts.revenue) {
                this.charts.revenue.destroy();
            }
            this.createRevenueChart();
            
            this.removeLoadingState();
            this.showNotification(`Dados filtrados para ${year === 'all' ? 'todos os anos' : year}`);
        }, 800);
    }    // Update data for specific year
    updateDataForYear(year) {
        // Calcular totais reais de cada ano
        const year2020Total = this.rawData.revenueByYear[2020].reduce((sum, month) => sum + month, 0);
        const year2021Total = this.rawData.revenueByYear[2021].reduce((sum, month) => sum + month, 0);
        const year2022Total = this.rawData.revenueByYear[2022].reduce((sum, month) => sum + month, 0);
        
        if (year === 'all') {
            // Média ponderada dos 3 anos para as porcentagens
            const totalRevenue = year2020Total + year2021Total + year2022Total;
            const totalProfit = Math.round(totalRevenue * 0.345);
            const totalOrders = Math.round(totalRevenue / 476);
            
            // Calcular crescimento médio ano a ano
            const revenueGrowth2021 = ((year2021Total - year2020Total) / year2020Total) * 100;
            const revenueGrowth2022 = ((year2022Total - year2021Total) / year2021Total) * 100;
            const avgRevenueGrowth = (revenueGrowth2021 + revenueGrowth2022) / 2;
            
            this.data = {
                revenue: { total: totalRevenue, change: Math.round(avgRevenueGrowth * 10) / 10 },
                profit: { total: totalProfit, change: Math.round((avgRevenueGrowth + 3) * 10) / 10 }, // Lucro cresce um pouco mais
                orders: { total: totalOrders, change: Math.round((avgRevenueGrowth - 2) * 10) / 10 }, // Pedidos crescem um pouco menos
                margin: { total: 35, change: 2.1 }
            };
        } else {
            // Calculate data for specific year
            const yearData = this.rawData.revenueByYear[year];
            const totalRevenue = yearData.reduce((sum, month) => sum + month, 0);
            
            // Calcular crescimento comparado ao ano anterior
            let revenueChange = 0;
            if (year === '2022') {
                revenueChange = ((year2022Total - year2021Total) / year2021Total) * 100;
            } else if (year === '2021') {
                revenueChange = ((year2021Total - year2020Total) / year2020Total) * 100;
            } else {
                revenueChange = 8.5; // 2020 como base
            }
            
            this.data = {
                revenue: { 
                    total: totalRevenue, 
                    change: Math.round(revenueChange * 10) / 10
                },
                profit: { 
                    total: Math.round(totalRevenue * 0.345), 
                    change: Math.round((revenueChange + 3) * 10) / 10 // Lucro cresce um pouco mais
                },
                orders: { 
                    total: Math.round(totalRevenue / 476), 
                    change: Math.round((revenueChange - 1.5) * 10) / 10 // Pedidos crescem um pouco menos
                },
                margin: { total: 35, change: 2.1 }
            };
        }
        
        this.updateKPIs();
    }

    // Refresh Data
    refreshData() {
        this.addLoadingState();
        document.querySelector('#refreshBtn i').style.animation = 'spin 1s linear infinite';
        
        setTimeout(() => {
            this.removeLoadingState();
            document.querySelector('#refreshBtn i').style.animation = '';
            this.showNotification('Dados atualizados com sucesso!');
        }, 2000);
    }

    // Update Chart Period
    updateChartPeriod(period) {
        console.log(`Updating chart period to: ${period}`);
        this.currentPeriod = period;
        
        this.addLoadingState();
        
        setTimeout(() => {
            // Destroy and recreate revenue chart with new period
            if (this.charts.revenue) {
                this.charts.revenue.destroy();
            }
            this.createRevenueChart();
            
            this.removeLoadingState();
            this.showNotification(`Período alterado para ${period === 'month' ? 'mensal' : 'trimestral'}`);
        }, 600);
    }// Toggle Currency
    toggleCurrency(isBRL) {
        const newCurrency = isBRL ? 'BRL' : 'USD';
        
        if (newCurrency !== this.currency.current) {
            this.currency.current = newCurrency;
            this.addLoadingState();
            
            // Update currency labels
            this.updateCurrencyLabels(isBRL);
              setTimeout(() => {
                // Update all displays
                this.updateKPIs();
                this.updateAllCharts();
                this.updateBrazilProjection();
                this.removeLoadingState();
                
                const currencyName = isBRL ? 'Real (BRL)' : 'Dólar (USD)';
                this.showNotification(`Moeda alterada para ${currencyName}`);
            }, 800);
        }
    }

    // Update currency labels active state
    updateCurrencyLabels(isBRL) {
        const usdLabel = document.getElementById('usdLabel');
        const brlLabel = document.getElementById('brlLabel');
        
        if (usdLabel && brlLabel) {
            if (isBRL) {
                usdLabel.classList.remove('active');
                brlLabel.classList.add('active');
            } else {
                brlLabel.classList.remove('active');
                usdLabel.classList.add('active');
            }
        }
    }

    // Update all charts with new currency
    updateAllCharts() {
        // Destroy and recreate all charts
        Object.keys(this.charts).forEach(chartKey => {
            if (this.charts[chartKey]) {
                this.charts[chartKey].destroy();
            }
        });
        
        // Recreate charts
        this.createRevenueChart();
        this.createTopProductsChart();
        this.createTerritoryChart();
        this.createCategoryChart();
    }

    // Convert currency
    convertCurrency(value) {
        if (this.currency.current === 'BRL') {
            return value * this.currency.exchangeRate;
        }
        return value;
    }

    // Update exchange rate display
    updateExchangeRateDisplay() {
        const exchangeRateEl = document.getElementById('exchangeRate');
        const lastUpdatedEl = document.getElementById('lastUpdated');
        
        if (exchangeRateEl && lastUpdatedEl) {
            const rateSpan = exchangeRateEl.querySelector('span');
            if (rateSpan) {
                rateSpan.textContent = `1 USD = ${this.currency.exchangeRate.toFixed(2)} BRL`;
            }
            lastUpdatedEl.textContent = this.currency.lastUpdated;
        }
    }

    // Update exchange rate periodically
    updateExchangeRatePeriodically() {
        // Update exchange rate every 30 seconds
        setInterval(() => {
            this.updateExchangeRate();
        }, 30000);
    }

    // Simulate exchange rate update (in real scenario, fetch from API)
    updateExchangeRate() {
        // Simulate slight variation in exchange rate
        const variation = (Math.random() - 0.5) * 0.1; // ±0.05
        this.currency.exchangeRate = Math.max(5.0, Math.min(5.5, this.currency.exchangeRate + variation));
        this.currency.lastUpdated = new Date().toLocaleString('pt-BR');
        
        this.updateExchangeRateDisplay();
        
        // Add visual indication of update
        this.showExchangeRateUpdate();
        
        // If currently showing BRL, update all displays
        if (this.currency.current === 'BRL') {
            this.updateKPIs();
            this.updateAllCharts();
        }
    }

    // Show visual indication of exchange rate update
    showExchangeRateUpdate() {
        const exchangeRateEl = document.getElementById('exchangeRate');
        if (exchangeRateEl) {
            exchangeRateEl.style.animation = 'pulse 0.5s ease';
            setTimeout(() => {
                exchangeRateEl.style.animation = '';
            }, 500);
        }
    }

    // Export Report functionality
    exportReport() {
        this.addLoadingState();
        
        // Simulate export process
        setTimeout(() => {
            const reportData = this.generateReportData();
            this.downloadJSON(reportData, 'adventure-works-report.json');
            this.removeLoadingState();
            this.showNotification('Relatório exportado com sucesso!');
        }, 1500);
    }

    // Share Report functionality
    shareReport() {
        if (navigator.share) {
            navigator.share({
                title: 'Adventure Works - Dashboard Executivo',
                text: 'Confira os dados de performance da Adventure Works',
                url: window.location.href
            }).then(() => {
                this.showNotification('Relatório compartilhado com sucesso!');
            }).catch((error) => {
                this.copyToClipboard();
            });
        } else {
            this.copyToClipboard();
        }
    }

    // Generate report data for export
    generateReportData() {
        const currentDate = new Date().toLocaleString('pt-BR');
        
        return {
            metadata: {
                title: 'Adventure Works - Relatório Executivo',
                generatedAt: currentDate,
                currency: this.currency.current,
                exchangeRate: this.currency.current === 'BRL' ? this.currency.exchangeRate : null,
                filterYear: this.currentYear,
                period: this.currentPeriod
            },
            kpis: {
                totalRevenue: {
                    value: this.data.revenue.total,
                    formatted: this.formatCurrency(this.convertCurrency(this.data.revenue.total)),
                    change: this.data.revenue.change
                },
                totalProfit: {
                    value: this.data.profit.total,
                    formatted: this.formatCurrency(this.convertCurrency(this.data.profit.total)),
                    change: this.data.profit.change
                },
                totalOrders: {
                    value: this.data.orders.total,
                    formatted: this.formatNumber(this.data.orders.total),
                    change: this.data.orders.change
                },
                profitMargin: {
                    value: this.data.margin.total,
                    formatted: `${this.data.margin.total}%`,
                    change: this.data.margin.change
                }
            },
            revenueByYear: this.rawData.revenueByYear,
            topProducts: {
                names: this.rawData.allYearsData.products,
                sales: this.rawData.allYearsData.productSales
            },
            territorySales: {
                territories: this.rawData.allYearsData.territories,
                sales: this.rawData.allYearsData.territorySales
            },
            categoryPerformance: {
                categories: this.rawData.allYearsData.categories,
                revenue: this.rawData.allYearsData.categoryRevenue,
                profit: this.rawData.allYearsData.categoryProfit
            },
            brazilProjection: this.generateBrazilProjection()
        };
    }

    // Generate Brazil market projection
    generateBrazilProjection() {
        // Dados econômicos para projeção (podem ser atualizados com dados reais)
        const economicData = {
            brazil: {
                population: 215300000, // 215.3 milhões
                gdpPerCapita: 8814, // USD 2023
                purchasingPowerParity: 16727, // USD PPP 2023
                economicComplexity: 0.025, // Índice de complexidade econômica
                cyclingCulture: 0.3, // Fator de cultura ciclística (0-1)
                urbanization: 0.88 // 88% urbanização
            },
            usa: {
                population: 331900000,
                gdpPerCapita: 76399,
                purchasingPowerParity: 76399,
                sales: 35000000 // Vendas atuais nos EUA
            },
            canada: {
                population: 38000000,
                gdpPerCapita: 54966,
                purchasingPowerParity: 54966,
                sales: 18500000 // Vendas atuais no Canadá
            },
            france: {
                population: 67750000,
                gdpPerCapita: 42500,
                purchasingPowerParity: 50500,
                sales: 12800000 // Vendas atuais na França
            }
        };

        // Cálculo da projeção baseada em múltiplos fatores
        const projections = this.calculateMarketProjection(economicData);
        
        return {
            methodology: 'Projeção baseada em GDP per capita, população, poder de compra e fatores culturais',
            assumptions: {
                exchangeRate: this.currency.exchangeRate,
                marketPenetration: '2-5% (conservador para mercado emergente)',
                growthPeriod: '3-5 anos para atingir projeção completa'
            },
            economicFactors: economicData.brazil,
            projections: projections
        };
    }

    // Calculate market projection for Brazil
    calculateMarketProjection(data) {
        const brazil = data.brazil;
        
        // Método 1: Baseado em GDP per capita (relativo aos EUA)
        const gdpRatio = brazil.gdpPerCapita / data.usa.gdpPerCapita;
        const populationRatio = brazil.population / data.usa.population;
        const gdpProjection = data.usa.sales * gdpRatio * populationRatio * brazil.cyclingCulture;

        // Método 2: Baseado em poder de compra (PPP)
        const ppyRatio = brazil.purchasingPowerParity / data.usa.purchasingPowerParity;
        const ppyProjection = data.usa.sales * ppyRatio * populationRatio * brazil.cyclingCulture;

        // Método 3: Comparação com França (mercado similar em desenvolvimento)
        const franceGdpRatio = brazil.gdpPerCapita / data.france.gdpPerCapita;
        const francePopRatio = brazil.population / data.france.population;
        const franceProjection = data.france.sales * franceGdpRatio * francePopRatio * brazil.cyclingCulture;

        // Método 4: Comparação com Canadá
        const canadaGdpRatio = brazil.gdpPerCapita / data.canada.gdpPerCapita;
        const canadaPopRatio = brazil.population / data.canada.population;
        const canadaProjection = data.canada.sales * canadaGdpRatio * canadaPopRatio * brazil.cyclingCulture;

        // Projeção conservadora (média ponderada)
        const conservativeProjection = (
            gdpProjection * 0.3 + 
            ppyProjection * 0.25 + 
            franceProjection * 0.25 + 
            canadaProjection * 0.2
        );

        // Projeção otimista (cenário de crescimento)
        const optimisticProjection = conservativeProjection * 1.5;

        // Projeção pessimista (cenário conservador)
        const pessimisticProjection = conservativeProjection * 0.6;

        return {
            conservative: {
                annualRevenue: Math.round(conservativeProjection),
                formatted: this.formatCurrency(conservativeProjection),
                orders: Math.round(conservativeProjection / 476), // Ticket médio atual
                marketShare: '2-3%'
            },
            optimistic: {
                annualRevenue: Math.round(optimisticProjection),
                formatted: this.formatCurrency(optimisticProjection),
                orders: Math.round(optimisticProjection / 476),
                marketShare: '3-5%'
            },
            pessimistic: {
                annualRevenue: Math.round(pessimisticProjection),
                formatted: this.formatCurrency(pessimisticProjection),
                orders: Math.round(pessimisticProjection / 476),
                marketShare: '1-2%'
            },
            methodology: {
                gdpBased: Math.round(gdpProjection),
                ppyBased: Math.round(ppyProjection),
                franceBased: Math.round(franceProjection),
                canadaBased: Math.round(canadaProjection)
            }
        };
    }

    // Download JSON file
    downloadJSON(data, filename) {
        const jsonStr = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // Copy URL to clipboard
    copyToClipboard() {
        navigator.clipboard.writeText(window.location.href).then(() => {
            this.showNotification('Link copiado para a área de transferência!');
        }).catch(() => {
            this.showNotification('Não foi possível copiar o link');
        });
    }

    // Update Brazil projection display
    updateBrazilProjection() {
        const projectionEl = document.getElementById('brazilProjection');
        if (projectionEl) {
            const projection = this.generateBrazilProjection();
            const conservativeValue = this.formatCurrency(this.convertCurrency(projection.projections.conservative.annualRevenue));
            projectionEl.innerHTML = `${conservativeValue}/ano`;
            
            // Add tooltip with more details
            projectionEl.title = `Cenários: Conservador: ${this.formatCurrency(this.convertCurrency(projection.projections.conservative.annualRevenue))}, Otimista: ${this.formatCurrency(this.convertCurrency(projection.projections.optimistic.annualRevenue))}`;
        }
    }    // Format currency values
    formatCurrency(value, abbreviated = false) {
        const currency = this.currency.current;
        const roundedValue = Math.round(value);
        const symbol = currency === 'BRL' ? 'R$' : 'US$';
        
        // Para KPIs principais, sempre usar abreviação
        if (roundedValue >= 1000000) {
            const millions = roundedValue / 1000000;
            return `${symbol} ${millions.toFixed(1)} Mi`;
        } else if (roundedValue >= 1000) {
            const thousands = roundedValue / 1000;
            return `${symbol} ${thousands.toFixed(0)} mil`;
        }
        
        // Para valores pequenos ou quando não abreviado
        if (abbreviated) {
            return new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: currency,
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
                notation: 'compact',
                compactDisplay: 'short'
            }).format(roundedValue);
        }
        
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(roundedValue);
    }    // Format number values
    formatNumber(value) {
        const roundedValue = Math.round(value);
        
        if (roundedValue >= 1000000) {
            const millions = roundedValue / 1000000;
            return `${millions.toFixed(1)} Mi`;
        } else if (roundedValue >= 1000) {
            const thousands = roundedValue / 1000;
            return `${thousands.toFixed(0)} mil`;
        }
        
        return new Intl.NumberFormat('pt-BR').format(roundedValue);
    }

    // Add loading state to dashboard
    addLoadingState() {
        document.body.style.cursor = 'wait';
        document.querySelectorAll('.kpi-value, .kpi-change').forEach(el => {
            el.style.opacity = '0.6';
        });
    }

    // Remove loading state from dashboard
    removeLoadingState() {
        document.body.style.cursor = 'default';
        document.querySelectorAll('.kpi-value, .kpi-change').forEach(el => {
            el.style.opacity = '1';
        });
    }

    // Show notification message
    showNotification(message) {
        // Create notification element if it doesn't exist
        let notification = document.getElementById('notification');
        if (!notification) {
            notification = document.createElement('div');
            notification.id = 'notification';
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--primary-blue);
                color: white;
                padding: 15px 20px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                z-index: 1000;
                transform: translateX(100%);
                transition: transform 0.3s ease;
            `;
            document.body.appendChild(notification);
        }
        
        notification.textContent = message;
        notification.style.transform = 'translateX(0)';
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
        }, 3000);
    }
}

// Initialize Dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.dashboard = new DashboardData();
    
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Add animation observer for elements coming into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            }
        });
    }, observerOptions);
    
    // Observe all main sections
    document.querySelectorAll('.kpi-card, .chart-container, .insight-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        observer.observe(el);
    });
    
    // Add fadeInUp animation and pulse animation for exchange rate
    const fadeStyle = document.createElement('style');
    fadeStyle.textContent = `
        @keyframes fadeInUp {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.02); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(fadeStyle);
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DashboardData;
}
