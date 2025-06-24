# 💻 CÓDIGO TÉCNICO AVANÇADO - DEMONSTRAÇÃO DE SKILLS
## *Scripts SQL e DAX para Entrevista Fintech*

---

## 🔷 ANÁLISES SQL AVANÇADAS

### **1. ANÁLISE DE COHORT PARA RETENÇÃO DE CLIENTES**
```sql
-- Análise fundamental para Fintech: acompanhar retenção de clientes por período
WITH customer_cohorts AS (
    SELECT 
        c.customer_key,
        c.first_name + ' ' + c.last_name as customer_name,
        DATE_TRUNC('month', MIN(s.order_date)) as cohort_month,
        COUNT(DISTINCT DATE_TRUNC('month', s.order_date)) as active_months,
        SUM(s.order_quantity * p.product_price) as total_revenue
    FROM customers c
    JOIN sales s ON c.customer_key = s.customer_key
    JOIN products p ON s.product_key = p.product_key
    GROUP BY c.customer_key, c.first_name, c.last_name
),
monthly_activity AS (
    SELECT 
        c.customer_key,
        cohort_month,
        DATE_TRUNC('month', s.order_date) as activity_month,
        SUM(s.order_quantity * p.product_price) as monthly_revenue,
        COUNT(DISTINCT s.order_number) as orders_count
    FROM customer_cohorts c
    JOIN sales s ON c.customer_key = s.customer_key
    JOIN products p ON s.product_key = p.product_key
    GROUP BY c.customer_key, cohort_month, DATE_TRUNC('month', s.order_date)
),
cohort_analysis AS (
    SELECT 
        cohort_month,
        activity_month,
        DATE_PART('month', AGE(activity_month, cohort_month)) as period_number,
        COUNT(DISTINCT customer_key) as customers_count,
        SUM(monthly_revenue) as revenue,
        AVG(monthly_revenue) as avg_revenue_per_customer,
        SUM(orders_count) as total_orders
    FROM monthly_activity
    GROUP BY cohort_month, activity_month
)
SELECT 
    cohort_month,
    period_number,
    customers_count,
    revenue,
    avg_revenue_per_customer,
    total_orders,
    -- Cálculo de retenção
    ROUND(
        100.0 * customers_count / 
        FIRST_VALUE(customers_count) OVER (
            PARTITION BY cohort_month 
            ORDER BY period_number
        ), 2
    ) as retention_rate,
    -- Revenue per customer evolution
    ROUND(
        avg_revenue_per_customer - LAG(avg_revenue_per_customer) OVER (
            PARTITION BY cohort_month 
            ORDER BY period_number
        ), 2
    ) as revenue_change
FROM cohort_analysis
ORDER BY cohort_month, period_number;
```

### **2. ANÁLISE RFM (RECENCY, FREQUENCY, MONETARY)**
```sql
-- Segmentação de clientes essencial para Fintech
WITH customer_metrics AS (
    SELECT 
        s.customer_key,
        c.first_name + ' ' + c.last_name as customer_name,
        c.annual_income,
        c.total_children,
        c.education_level,
        -- Recency: dias desde última compra
        CURRENT_DATE - MAX(s.order_date) as recency_days,
        -- Frequency: número de pedidos
        COUNT(DISTINCT s.order_number) as frequency,
        -- Monetary: valor total gasto
        SUM(s.order_quantity * p.product_price) as monetary_value,
        -- Metrics adicionais
        AVG(s.order_quantity * p.product_price) as avg_order_value,
        COUNT(DISTINCT DATE_TRUNC('month', s.order_date)) as active_months
    FROM sales s
    JOIN customers c ON s.customer_key = c.customer_key
    JOIN products p ON s.product_key = p.product_key
    GROUP BY s.customer_key, c.first_name, c.last_name, 
             c.annual_income, c.total_children, c.education_level
),
rfm_scores AS (
    SELECT 
        *,
        -- Score de Recency (1-5, onde 5 = mais recente)
        NTILE(5) OVER (ORDER BY recency_days DESC) as recency_score,
        -- Score de Frequency (1-5, onde 5 = mais frequente)
        NTILE(5) OVER (ORDER BY frequency ASC) as frequency_score,
        -- Score de Monetary (1-5, onde 5 = maior valor)
        NTILE(5) OVER (ORDER BY monetary_value ASC) as monetary_score
    FROM customer_metrics
),
customer_segments AS (
    SELECT 
        *,
        recency_score + frequency_score + monetary_score as rfm_total,
        CASE 
            WHEN recency_score >= 4 AND frequency_score >= 4 AND monetary_score >= 4 
            THEN 'Champions'
            WHEN recency_score >= 3 AND frequency_score >= 3 AND monetary_score >= 3 
            THEN 'Loyal Customers'
            WHEN recency_score >= 4 AND frequency_score <= 2 
            THEN 'New Customers'
            WHEN recency_score >= 3 AND frequency_score <= 2 
            THEN 'Potential Loyalists'
            WHEN recency_score <= 2 AND frequency_score >= 3 
            THEN 'At Risk'
            WHEN recency_score <= 2 AND frequency_score <= 2 AND monetary_score >= 3 
            THEN 'Cannot Lose Them'
            ELSE 'Others'
        END as customer_segment
    FROM rfm_scores
)
SELECT 
    customer_segment,
    COUNT(*) as customer_count,
    ROUND(AVG(monetary_value), 2) as avg_monetary_value,
    ROUND(AVG(frequency), 2) as avg_frequency,
    ROUND(AVG(recency_days), 2) as avg_recency_days,
    ROUND(SUM(monetary_value), 2) as total_revenue,
    ROUND(100.0 * COUNT(*) / SUM(COUNT(*)) OVER(), 2) as segment_percentage
FROM customer_segments
GROUP BY customer_segment
ORDER BY total_revenue DESC;
```

### **3. ANÁLISE DE MARKET BASKET (PRODUTOS FREQUENTEMENTE COMPRADOS JUNTOS)**
```sql
-- Análise de cross-selling essencial para Fintech
WITH order_products AS (
    SELECT 
        s.order_number,
        s.customer_key,
        p.product_key,
        p.product_name,
        pc.category_name,
        s.order_quantity,
        s.order_quantity * p.product_price as line_revenue
    FROM sales s
    JOIN products p ON s.product_key = p.product_key
    JOIN product_subcategories psc ON p.product_subcategory_key = psc.product_subcategory_key
    JOIN product_categories pc ON psc.product_category_key = pc.product_category_key
),
product_pairs AS (
    SELECT 
        op1.product_name as product_a,
        op2.product_name as product_b,
        op1.category_name as category_a,
        op2.category_name as category_b,
        COUNT(DISTINCT op1.order_number) as co_occurrence_count,
        SUM(op1.line_revenue + op2.line_revenue) as combined_revenue
    FROM order_products op1
    JOIN order_products op2 ON op1.order_number = op2.order_number
    WHERE op1.product_key < op2.product_key -- Evita duplicatas
    GROUP BY op1.product_name, op2.product_name, op1.category_name, op2.category_name
    HAVING COUNT(DISTINCT op1.order_number) >= 5 -- Mínimo 5 co-ocorrências
),
product_totals AS (
    SELECT 
        product_name,
        COUNT(DISTINCT order_number) as total_orders
    FROM order_products
    GROUP BY product_name
)
SELECT 
    pp.product_a,
    pp.product_b,
    pp.category_a,
    pp.category_b,
    pp.co_occurrence_count,
    pt1.total_orders as product_a_total_orders,
    pt2.total_orders as product_b_total_orders,
    -- Confidence: P(B|A) = co_occurrence / total_orders_A
    ROUND(100.0 * pp.co_occurrence_count / pt1.total_orders, 2) as confidence_a_to_b,
    ROUND(100.0 * pp.co_occurrence_count / pt2.total_orders, 2) as confidence_b_to_a,
    -- Lift: (P(A,B)) / (P(A) * P(B))
    ROUND(
        (pp.co_occurrence_count * (SELECT COUNT(DISTINCT order_number) FROM order_products)) / 
        (pt1.total_orders * pt2.total_orders), 2
    ) as lift,
    ROUND(pp.combined_revenue, 2) as combined_revenue
FROM product_pairs pp
JOIN product_totals pt1 ON pp.product_a = pt1.product_name
JOIN product_totals pt2 ON pp.product_b = pt2.product_name
ORDER BY lift DESC, co_occurrence_count DESC
LIMIT 20;
```

---

## 🔶 FÓRMULAS DAX AVANÇADAS

### **1. TIME INTELLIGENCE COMPLETA**
```dax
-- Receita Ano Atual
Revenue_Current_Year = 
CALCULATE(
    [Total Revenue],
    YEAR(Calendar[Date]) = YEAR(TODAY())
)

-- Receita Ano Anterior
Revenue_Previous_Year = 
CALCULATE(
    [Total Revenue],
    YEAR(Calendar[Date]) = YEAR(TODAY()) - 1
)

-- Crescimento Year-over-Year
Revenue_YoY_Growth = 
VAR CurrentYear = [Revenue_Current_Year]
VAR PreviousYear = [Revenue_Previous_Year]
RETURN
    IF(
        PreviousYear = 0,
        BLANK(),
        DIVIDE(CurrentYear - PreviousYear, PreviousYear)
    )

-- Receita Acumulada no Ano
Revenue_YTD = 
CALCULATE(
    [Total Revenue],
    DATESYTD(Calendar[Date])
)

-- Receita Acumulada Ano Anterior (mesmo período)
Revenue_YTD_PY = 
CALCULATE(
    [Total Revenue],
    DATESYTD(
        DATEADD(Calendar[Date], -1, YEAR)
    )
)

-- Crescimento YTD vs YTD Ano Anterior
Revenue_YTD_Growth = 
DIVIDE(
    [Revenue_YTD] - [Revenue_YTD_PY],
    [Revenue_YTD_PY]
)

-- Média Móvel 3 Meses
Revenue_3M_Moving_Avg = 
CALCULATE(
    [Total Revenue],
    DATESINPERIOD(
        Calendar[Date],
        LASTDATE(Calendar[Date]),
        -3,
        MONTH
    )
) / 3

-- Forecast Simples (Tendência Linear)
Revenue_Forecast = 
VAR LastDate = MAX(Calendar[Date])
VAR Last12Months = 
    CALCULATE(
        [Total Revenue],
        DATESINPERIOD(Calendar[Date], LastDate, -12, MONTH)
    )
VAR Previous12Months = 
    CALCULATE(
        [Total Revenue],
        DATESINPERIOD(Calendar[Date], LastDate, -24, MONTH) &&
        DATESINPERIOD(Calendar[Date], LastDate, -12, MONTH)
    )
VAR GrowthRate = DIVIDE(Last12Months - Previous12Months, Previous12Months)
RETURN
    Last12Months * (1 + GrowthRate)
```

### **2. CUSTOMER LIFETIME VALUE (CLV)**
```dax
-- Customer Lifetime Value
Customer_LTV = 
VAR CustomerKey = SELECTEDVALUE(Customer[CustomerKey])
VAR CustomerFirstOrder = 
    CALCULATE(
        MIN(Sales[OrderDate]),
        Sales[CustomerKey] = CustomerKey
    )
VAR CustomerLastOrder = 
    CALCULATE(
        MAX(Sales[OrderDate]),
        Sales[CustomerKey] = CustomerKey
    )
VAR CustomerLifespanDays = CustomerLastOrder - CustomerFirstOrder + 1
VAR CustomerLifespanMonths = CustomerLifespanDays / 30.44
VAR CustomerTotalRevenue = 
    CALCULATE(
        [Total Revenue],
        Sales[CustomerKey] = CustomerKey
    )
VAR CustomerTotalOrders = 
    CALCULATE(
        DISTINCTCOUNT(Sales[OrderNumber]),
        Sales[CustomerKey] = CustomerKey
    )
VAR MonthlyOrderFrequency = 
    IF(
        CustomerLifespanMonths > 0,
        CustomerTotalOrders / CustomerLifespanMonths,
        0
    )
VAR AverageOrderValue = 
    IF(
        CustomerTotalOrders > 0,
        CustomerTotalRevenue / CustomerTotalOrders,
        0
    )
VAR EstimatedLifespanMonths = 
    IF(
        CustomerLifespanMonths < 12,
        24, -- Assumir 24 meses para clientes novos
        CustomerLifespanMonths * 1.5 -- Projetar crescimento
    )
RETURN
    MonthlyOrderFrequency * AverageOrderValue * EstimatedLifespanMonths

-- Segmentação de CLV
CLV_Segment = 
VAR CustomerCLV = [Customer_LTV]
VAR CLVPercentile80 = PERCENTILE.INC(ALL(Customer[CustomerKey]), [Customer_LTV], 0.8)
VAR CLVPercentile60 = PERCENTILE.INC(ALL(Customer[CustomerKey]), [Customer_LTV], 0.6)
VAR CLVPercentile40 = PERCENTILE.INC(ALL(Customer[CustomerKey]), [Customer_LTV], 0.4)
VAR CLVPercentile20 = PERCENTILE.INC(ALL(Customer[CustomerKey]), [Customer_LTV], 0.2)
RETURN
    SWITCH(
        TRUE(),
        CustomerCLV >= CLVPercentile80, "Champions",
        CustomerCLV >= CLVPercentile60, "High Value",
        CustomerCLV >= CLVPercentile40, "Medium Value",
        CustomerCLV >= CLVPercentile20, "Low Value",
        "At Risk"
    )
```

### **3. ANÁLISE DE PERFORMANCE AVANÇADA**
```dax
-- Análise de Pareto (80/20)
Product_Pareto_Analysis = 
VAR CurrentProductRevenue = [Total Revenue]
VAR AllProducts = ALL(Product[ProductName])
VAR ProductsRankedByRevenue = 
    ADDCOLUMNS(
        AllProducts,
        "ProductRevenue", [Total Revenue]
    )
VAR ProductsWithRunningTotal = 
    ADDCOLUMNS(
        ProductsRankedByRevenue,
        "RunningTotal", 
        SUMX(
            FILTER(
                ProductsRankedByRevenue,
                [ProductRevenue] >= EARLIER([ProductRevenue])
            ),
            [ProductRevenue]
        )
    )
VAR TotalRevenue = SUMX(ProductsWithRunningTotal, [ProductRevenue])
VAR CurrentProductRunningTotal = 
    SUMX(
        FILTER(
            ProductsWithRunningTotal,
            [ProductRevenue] >= CurrentProductRevenue
        ),
        [ProductRevenue]
    )
VAR CumulativePercentage = DIVIDE(CurrentProductRunningTotal, TotalRevenue)
RETURN
    IF(
        CumulativePercentage <= 0.8,
        "Top 80%",
        "Bottom 20%"
    )

-- Análise de Sazonalidade
Seasonality_Index = 
VAR CurrentMonth = MONTH(MAX(Calendar[Date]))
VAR MonthlyAverage = 
    CALCULATE(
        [Total Revenue],
        FILTER(
            ALL(Calendar),
            MONTH(Calendar[Date]) = CurrentMonth
        )
    ) / 
    DISTINCTCOUNT(
        FILTER(
            ALL(Calendar),
            MONTH(Calendar[Date]) = CurrentMonth
        ),
        Calendar[Year]
    )
VAR OverallMonthlyAverage = 
    [Total Revenue] / DISTINCTCOUNT(Calendar[Date])
RETURN
    DIVIDE(MonthlyAverage, OverallMonthlyAverage)

-- Análise de Volatilidade
Revenue_Volatility = 
VAR MonthlyRevenues = 
    ADDCOLUMNS(
        SUMMARIZE(
            ALL(Calendar),
            Calendar[Year],
            Calendar[MonthNumber]
        ),
        "MonthlyRevenue", [Total Revenue]
    )
VAR AverageMonthlyRevenue = AVERAGEX(MonthlyRevenues, [MonthlyRevenue])
VAR VarianceSum = 
    SUMX(
        MonthlyRevenues,
        ([MonthlyRevenue] - AverageMonthlyRevenue) ^ 2
    )
VAR Count = COUNTROWS(MonthlyRevenues)
VAR Variance = DIVIDE(VarianceSum, Count - 1)
VAR StandardDeviation = SQRT(Variance)
VAR CoefficientOfVariation = DIVIDE(StandardDeviation, AverageMonthlyRevenue)
RETURN
    CoefficientOfVariation

-- Análise de Concentração (Índice Herfindahl-Hirschman)
Market_Concentration_HHI = 
VAR TotalRevenue = [Total Revenue]
VAR ProductMarketShares = 
    ADDCOLUMNS(
        ALL(Product[ProductName]),
        "MarketShare", DIVIDE([Total Revenue], TotalRevenue)
    )
VAR HHI = 
    SUMX(
        ProductMarketShares,
        [MarketShare] ^ 2
    )
RETURN
    HHI * 10000 -- Multiplicar por 10000 para escala padrão
```

### **4. ANÁLISES FINANCEIRAS ESPECÍFICAS**
```dax
-- Working Capital Analysis
Days_Sales_Outstanding = 
VAR AverageOrderValue = DIVIDE([Total Revenue], [Total Orders])
VAR DailySales = DIVIDE([Total Revenue], 365)
RETURN
    DIVIDE(AverageOrderValue, DailySales)

-- Inventory Turnover (simulado)
Inventory_Turnover = 
VAR COGS = [Total Cost]
VAR AverageInventory = DIVIDE([Total Cost], 4) -- Assumindo 4 como fator
RETURN
    DIVIDE(COGS, AverageInventory)

-- Return on Investment (ROI)
ROI_by_Product = 
VAR ProductInvestment = [Total Cost]
VAR ProductProfit = [Total Revenue] - [Total Cost]
RETURN
    IF(
        ProductInvestment > 0,
        DIVIDE(ProductProfit, ProductInvestment),
        BLANK()
    )

-- Contribution Margin
Contribution_Margin = 
DIVIDE([Total Revenue] - [Total Cost], [Total Revenue])

-- Break-even Analysis
Break_Even_Quantity = 
VAR FixedCosts = 50000 -- Assumindo custos fixos
VAR VariableCostPerUnit = DIVIDE([Total Cost], [Total Quantity])
VAR PricePerUnit = DIVIDE([Total Revenue], [Total Quantity])
VAR ContributionPerUnit = PricePerUnit - VariableCostPerUnit
RETURN
    IF(
        ContributionPerUnit > 0,
        DIVIDE(FixedCosts, ContributionPerUnit),
        BLANK()
    )
```

---

## 🎯 APLICAÇÃO PRÁTICA EM FINTECH

### **Como usar essas análises:**

1. **Análise de Cohort** = Retenção de usuários de app financeiro
2. **RFM** = Segmentação de clientes para produtos financeiros
3. **Market Basket** = Cross-selling de produtos financeiros
4. **CLV** = Valor do cliente para produtos de crédito
5. **Time Intelligence** = Performance de produtos sazonais
6. **Análises Financeiras** = Métricas de rentabilidade por produto

### **Métricas específicas para Fintech:**
- **CAC (Customer Acquisition Cost)**
- **LTV/CAC Ratio**
- **Churn Rate**
- **Net Promoter Score (NPS)**
- **Monthly Recurring Revenue (MRR)**
- **Annual Recurring Revenue (ARR)**

---

**💡 Esses códigos demonstram domínio técnico avançado em:**
- SQL Analítico com CTEs e Window Functions
- DAX com Time Intelligence e cálculos complexos
- Estatística aplicada a negócios
- Análises financeiras sofisticadas
- Pensamento orientado a produto financeiro
