// Teste básico da classe DashboardData

console.log('=== TESTE BÁSICO DA CLASSE ===');

// Teste 1: Verificar se Chart.js está disponível
if (typeof Chart !== 'undefined') {
    console.log('✅ Chart.js está disponível');
} else {
    console.log('❌ Chart.js não está disponível');
}

// Teste 2: Definir uma versão simplificada da classe para teste
class TestDashboard {
    constructor() {
        console.log('TestDashboard: Iniciando constructor...');
        this.data = {
            revenue: { total: 24914585, change: 15.2 },
            profit: { total: 10394625, change: 18.7 }
        };
        console.log('TestDashboard: Dados inicializados');
        this.init();
    }
    
    init() {
        console.log('TestDashboard: Iniciando init...');
        try {
            this.updateKPIs();
            console.log('✅ TestDashboard inicializado com sucesso');
        } catch (error) {
            console.error('❌ Erro no TestDashboard:', error);
        }
    }
    
    updateKPIs() {
        console.log('TestDashboard: Atualizando KPIs...');
        const revenueElement = document.getElementById('totalRevenue');
        if (revenueElement) {
            revenueElement.textContent = `$${this.data.revenue.total.toLocaleString()}`;
            console.log('✅ KPI de receita atualizado');
        } else {
            console.log('❌ Elemento totalRevenue não encontrado');
        }
    }
    
    formatCurrency(value) {
        return `$${value.toLocaleString()}`;
    }
    
    convertCurrency(value) {
        return value;
    }
}

// Teste 3: Tentar inicializar a classe de teste
try {
    console.log('Tentando criar TestDashboard...');
    window.testDashboard = new TestDashboard();
} catch (error) {
    console.error('❌ Erro ao criar TestDashboard:', error);
}

// Teste 4: Tentar carregar a classe original após alguns segundos
setTimeout(() => {
    console.log('=== TESTANDO CLASSE ORIGINAL ===');
    try {
        if (typeof DashboardData !== 'undefined') {
            console.log('✅ DashboardData está definida');
            console.log('Tentando criar DashboardData...');
            window.originalDashboard = new DashboardData();
            console.log('✅ DashboardData criada com sucesso');
        } else {
            console.log('❌ DashboardData não está definida');
        }
    } catch (error) {
        console.error('❌ Erro ao criar DashboardData:', error);
        console.error('Stack trace:', error.stack);
    }
}, 2000);
