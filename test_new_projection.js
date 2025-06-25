// Script de teste para a nova lógica de projeção (ajustada)

// Dados simulados (valores dos CSVs)
const data2020 = [373275, 382075, 420500, 498900, 535625, 580125, 641500, 668375, 723875, 802750, 895375, 882575]; // Julho = 641500
const data2021 = [557025, 617775, 769900, 949225, 1124200, 1278725, 1349525, 1401200, 1459625, 1575300, 1761475, 2001050]; // Julho = 1349525

const real2022 = [1274378, 1339241, 1448596, 1527813, 1768432, 1826987];

// Nova lógica de projeção
const julyIndex = 6; // Julho é o 7º mês (índice 6)
const july2020 = data2020[julyIndex];  // 641500
const july2021 = data2021[julyIndex];  // 1349525
const july2022Projected = (july2020 + july2021) / 2;

console.log('=== NOVA LÓGICA DE PROJEÇÃO (AJUSTADA) ===');
console.log(`Julho 2020: ${july2020.toLocaleString()}`);
console.log(`Julho 2021: ${july2021.toLocaleString()}`);
console.log(`Julho 2022 Projetado: ${Math.round(july2022Projected).toLocaleString()}`);

// Calcular taxa de crescimento de Julho 2020 para Julho 2021
const growthRate = (july2021 - july2020) / july2020;
console.log(`Taxa de crescimento original: ${(growthRate * 100).toFixed(2)}%`);

// Ajustar taxa para cenário de estagnação
const adjustedGrowthRate = Math.min(growthRate, 0.15); // Máximo 15% por mês
const stagnationFactor = 0.7; // Reduzir a taxa para simular estagnação
const finalGrowthRate = adjustedGrowthRate * stagnationFactor;
console.log(`Taxa de crescimento ajustada: ${(finalGrowthRate * 100).toFixed(2)}%`);

// Projeção para os demais meses (Agosto a Dezembro)
const projectedLast6Months = [];

// Julho 2022 (base)
projectedLast6Months.push(Math.round(july2022Projected));

// Agosto a Dezembro 2022 (aplicando taxa de crescimento ajustada)
for (let i = 1; i < 6; i++) {
    const prevMonth = projectedLast6Months[i - 1];
    const nextMonthProjected = prevMonth * (1 + finalGrowthRate);
    projectedLast6Months.push(Math.round(nextMonthProjected));
}

console.log('\n=== PROJEÇÃO MENSAL (Jul-Dez 2022) ===');
const monthNames = ['Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
projectedLast6Months.forEach((value, index) => {
    console.log(`${monthNames[index]}: ${value.toLocaleString()}`);
});

// Totais
const totalReal6Months = real2022.reduce((sum, val) => sum + val, 0);
const totalProjected6Months = projectedLast6Months.reduce((sum, val) => sum + val, 0);
const totalProjected2022 = totalReal6Months + totalProjected6Months;

console.log('\n=== TOTAIS ===');
console.log(`Total 6 primeiros meses (real): ${totalReal6Months.toLocaleString()}`);
console.log(`Total 6 últimos meses (projetado): ${totalProjected6Months.toLocaleString()}`);
console.log(`Total 2022 projetado: ${totalProjected2022.toLocaleString()}`);

// Comparação com 2021
const total2021 = 9324203; // Dados reais de 2021
const growth2022vs2021 = ((totalProjected2022 - total2021) / total2021 * 100);
console.log(`Crescimento vs 2021: ${growth2022vs2021.toFixed(2)}%`);
