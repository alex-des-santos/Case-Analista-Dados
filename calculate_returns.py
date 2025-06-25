#!/usr/bin/env python3
"""
Script para calcular devoluções corretas usando fat_returns_data.csv
"""
import pandas as pd
import json
from pathlib import Path

def calculate_returns():
    """Calcula devoluções usando dados corretos"""
    
    print("🔄 Calculando devoluções com fat_returns_data.csv...")
    
    # Carregar arquivo com preços corretos
    returns = pd.read_csv("Files/fat_returns_data.csv", sep=';')
    
    print(f"✅ Carregado: {len(returns):,} registros de devoluções")
    print(f"📊 Estrutura: {list(returns.columns)}")
    
    # Calcular valor total de devoluções
    returns['ReturnValue'] = returns['ReturnQuantity'] * returns['ProductPrice']
    total_returns = returns['ReturnValue'].sum()
    
    # Converter ReturnDate para datetime
    returns['ReturnDate'] = pd.to_datetime(returns['ReturnDate'], format='%d/%m/%Y')
    
    # Calcular por ano
    returns_by_year = returns.groupby(returns['ReturnDate'].dt.year)['ReturnValue'].sum().to_dict()
    
    # Estatísticas detalhadas
    total_quantity = returns['ReturnQuantity'].sum()
    avg_price = returns['ProductPrice'].mean()
    
    print("\n📋 RESULTADOS:")
    print(f"💰 Total Devoluções: ${total_returns:,.2f}")
    print(f"📦 Quantidade Total: {total_quantity:,}")
    print(f"💵 Preço Médio: ${avg_price:.2f}")
    
    print("\n📅 Por ano:")
    for year, value in sorted(returns_by_year.items()):
        print(f"   {year}: ${value:,.2f}")
    
    # Criar dados para JavaScript
    js_data = {
        "totalReturns": float(total_returns),
        "returnsByYear": {str(k): float(v) for k, v in returns_by_year.items()},
        "metadata": {
            "total_records": len(returns),
            "total_quantity": int(total_quantity),
            "average_price": float(avg_price)
        }
    }
    
    # Salvar JSON
    output_dir = Path("docs/data")
    output_dir.mkdir(exist_ok=True)
    
    with open(output_dir / "returns_data.json", 'w') as f:
        json.dump(js_data, f, indent=2)
    
    print(f"\n✅ Dados salvos em: docs/data/returns_data.json")
    
    return js_data

if __name__ == "__main__":
    calculate_returns()
