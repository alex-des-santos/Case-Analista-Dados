// Teste dos dados de projeção estruturados
console.log('=== TESTE DOS DADOS DE PROJEÇÃO ESTRUTURADOS ===');

// Simular a lógica da função generateProjectionDataForCSV
const real2022 = [1274378, 1339241, 1448596, 1527813, 1768432, 1826987];
const avgFirst6Months = real2022.reduce((sum, val) => sum + val, 0) / 6;

console.log('Dados reais 2022 (Jan-Jun):', real2022);
console.log('Média dos primeiros 6 meses:', avgFirst6Months.toLocaleString('pt-BR'));

// Projeção conservadora
const baseProjection = avgFirst6Months * 0.85;
const seasonalFactors = [1.05, 1.08, 0.95, 1.12, 1.15, 1.18];

const projectedLast6Months = seasonalFactors.map(factor => 
    Math.round(baseProjection * factor)
);

console.log('\nBase de projeção (85% da média):', baseProjection.toLocaleString('pt-BR'));
console.log('Fatores sazonais:', seasonalFactors);
console.log('Projeção últimos 6 meses:', projectedLast6Months);

// Totais
const totalReal6Months = real2022.reduce((sum, val) => sum + val, 0);
const totalProjected6Months = projectedLast6Months.reduce((sum, val) => sum + val, 0);
const totalProjected2022 = totalReal6Months + totalProjected6Months;

console.log('\n=== TOTAIS ===');
console.log('Total real (6 meses):', totalReal6Months.toLocaleString('pt-BR'));
console.log('Total projetado (6 meses):', totalProjected6Months.toLocaleString('pt-BR'));
console.log('Total 2022 projetado:', totalProjected2022.toLocaleString('pt-BR'));

// Comparação com 2021
const total2021 = 9324203;
const growth = ((totalProjected2022 - total2021) / total2021 * 100);

console.log('\n=== COMPARAÇÃO ===');
console.log('Total 2021:', total2021.toLocaleString('pt-BR'));
console.log('Crescimento vs 2021:', growth.toFixed(1) + '%');

// KPIs
const lucro = Math.round(totalProjected2022 * 0.417);
const pedidos = Math.round(totalProjected2022 / 444.56);

console.log('\n=== KPIs CALCULADOS ===');
console.log('Receita projetada:', (totalProjected2022 / 1000000).toFixed(1) + 'M USD');
console.log('Lucro projetado (41.7%):', (lucro / 1000000).toFixed(1) + 'M USD');
console.log('Pedidos projetados:', pedidos.toLocaleString('pt-BR'));
console.log('Margem mantida:', '41.7%');
console.log('Ticket médio mantido:', 'US$ 444.56');

// Validação
if (totalProjected2022 < total2021 * 1.3) {
    console.log('\n✅ PROJEÇÃO REALISTA E CONSERVADORA!');
} else {
    console.log('\n⚠️ Projeção pode estar otimista');
}

console.log('\n=== ESTRUTURA PARA CSV ===');
console.log('Dados mensais: 12 linhas (6 reais + 6 projetados)');
console.log('Totais: 3 linhas de resumo');
console.log('KPIs: 6 indicadores calculados');
console.log('Metodologia: 4 premissas documentadas');
