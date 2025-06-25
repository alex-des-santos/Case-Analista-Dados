// Teste da projeção ajustada (75% da média)
console.log('=== TESTE DA PROJEÇÃO AJUSTADA ===');

const real2022 = [1274378, 1339241, 1448596, 1527813, 1768432, 1826987];
const avgFirst6Months = real2022.reduce((sum, val) => sum + val, 0) / 6;

// Nova configuração: 75% da média
const baseProjection = avgFirst6Months * 0.75;
const seasonalFactors = [1.02, 1.05, 0.96, 1.08, 1.10, 1.12];

const projectedLast6Months = seasonalFactors.map(factor => 
    Math.round(baseProjection * factor)
);

console.log('Base de projeção (75% da média):', baseProjection.toLocaleString('pt-BR'));
console.log('Projeção últimos 6 meses:', projectedLast6Months);

// Totais
const totalReal6Months = real2022.reduce((sum, val) => sum + val, 0);
const totalProjected6Months = projectedLast6Months.reduce((sum, val) => sum + val, 0);
const totalProjected2022 = totalReal6Months + totalProjected6Months;

console.log('\n=== TOTAIS AJUSTADOS ===');
console.log('Total real (6 meses):', totalReal6Months.toLocaleString('pt-BR'));
console.log('Total projetado (6 meses):', totalProjected6Months.toLocaleString('pt-BR'));
console.log('Total 2022 projetado:', totalProjected2022.toLocaleString('pt-BR'));

// Comparação
const total2021 = 9324203;
const growth = ((totalProjected2022 - total2021) / total2021 * 100);

console.log('\n=== VALIDAÇÃO ===');
console.log('Crescimento vs 2021:', growth.toFixed(1) + '%');

if (totalProjected2022 < total2021 * 1.3) {
    console.log('✅ PROJEÇÃO REALISTA!');
    
    console.log('\n=== VALORES FINAIS PARA DASHBOARD ===');
    console.log('Receita:', (totalProjected2022 / 1000000).toFixed(1) + 'M USD');
    console.log('Lucro:', (totalProjected2022 * 0.417 / 1000000).toFixed(1) + 'M USD');
    console.log('Crescimento:', growth.toFixed(1) + '%');
} else {
    console.log('⚠️ Ainda precisa ajustar');
}
