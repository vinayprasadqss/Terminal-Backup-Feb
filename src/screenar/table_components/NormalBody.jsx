import React from 'react'

const NormalBody = ({ d, filters }) => {
    return (
        <>
            <td><p>{d?.fields?.hasOwnProperty("bq_revenue_mr") ?
                d?.fields?.bq_revenue_mr : "N/A"}</p></td>

            <td><p>{d?.fields?.hasOwnProperty("bq_current_employees_plan_mr") ?
                d?.fields?.bq_current_employees_plan_mr : "N/A"}</p></td>
            {
                filters?.bq_ebitda_mr?.length > 0 &&
                <td><p>{d?.fields?.hasOwnProperty("bq_ebitda_mr") ?
                    d?.fields?.bq_ebitda_mr : "N/A"}</p></td>
            }
            {
                filters?.bq_total_assets_mr?.length > 0 &&
                <td><p>{d?.fields?.hasOwnProperty("bq_total_assets_mr") ?
                    d?.fields?.bq_total_assets_mr : "N/A"}</p></td>
            }
            {
                filters?.bq_net_income_mr?.length > 0 &&
                <td><p>{d?.fields?.hasOwnProperty("bq_net_income_mr") ?
                    d?.fields?.bq_net_income_mr : "N/A"}</p></td>
            }
            {
                filters?.bq_ebitda_margin_mr?.length > 0 &&
                <td><p>{d?.fields?.hasOwnProperty("bq_ebitda_margin_mr") ?
                    d?.fields?.bq_ebitda_margin_mr : "N/A"}</p></td>
            }
            {
                filters?.bq_net_profit_margin_mr?.length > 0 &&
                <td><p>{d?.fields?.hasOwnProperty("bq_net_profit_margin_mr") ?
                    d?.fields?.bq_net_profit_margin_mr : "N/A"}</p></td>
            }
            {
                filters?.bq_cor_mr?.length > 0 &&
                <td><p>{d?.fields?.hasOwnProperty("bq_cor_mr") ?
                    d?.fields?.bq_cor_mr : "N/A"}</p></td>
            }
            {
                filters?.bq_gross_profit_mr?.length > 0 &&
                <td><p>{d?.fields?.hasOwnProperty("bq_gross_profit_mr") ?
                    d?.fields?.bq_gross_profit_mr : "N/A"}</p></td>
            }
            {
                filters?.bq_payroll_mr?.length > 0 &&
                <td><p>{d?.fields?.hasOwnProperty("bq_payroll_mr") ?
                    d?.fields?.bq_payroll_mr : "N/A"}</p></td>
            }
            {
                filters?.bq_operating_expenses_mr?.length > 0 &&
                <td><p>{d?.fields?.hasOwnProperty("bq_operating_expenses_mr") ?
                    d?.fields?.bq_operating_expenses_mr : "N/A"}</p></td>
            }
            {
                filters?.bq_operating_income_mr?.length > 0 &&
                <td><p>{d?.fields?.hasOwnProperty("bq_operating_income_mr") ?
                    d?.fields?.bq_operating_income_mr : "N/A"}</p></td>
            }
            {
                filters?.bq_tax_and_interest_mr?.length > 0 &&
                <td><p>{d?.fields?.hasOwnProperty("bq_tax_and_interest_mr") ?
                    d?.fields?.bq_tax_and_interest_mr : "N/A"}</p></td>
            }
            {
                filters?.bq_asset_turnover_mr?.length > 0 &&
                <td><p>{d?.fields?.hasOwnProperty("bq_asset_turnover_mr") ?
                    d?.fields?.bq_asset_turnover_mr : "N/A"}</p></td>
            }
            {
                filters?.bq_return_on_assets_mr?.length > 0 &&
                <td><p>{d?.fields?.hasOwnProperty("bq_return_on_assets_mr") ?
                    d?.fields?.bq_return_on_assets_mr : "N/A"}</p></td>
            }
            {
                filters?.bq_return_on_sales_mr?.length > 0 &&
                <td><p>{d?.fields?.hasOwnProperty("bq_return_on_sales_mr") ?
                    d?.fields?.bq_return_on_sales_mr : "N/A"}</p></td>
            }

        </>
    )
}

export default NormalBody