import React from 'react'

const GrowthRangeBody = ({ filters, d }) => {
    return (
        <>
            {
                filters?.bq_current_employees_plan_growth_yoy_mr?.length > 0 &&
                <td><p>{d?.fields?.hasOwnProperty("bq_current_employees_plan_growth_yoy_mr") ?
                    d?.fields?.bq_current_employees_plan_growth_yoy_mr : "N/A"}</p></td>
            }
            {
                filters?.bq_revenue_growth_yoy_mr?.length > 0 &&
                <td><p>{d?.fields?.hasOwnProperty("bq_revenue_growth_yoy_mr") ?
                    d?.fields?.bq_revenue_growth_yoy_mr : "N/A"}</p></td>
            }
            {
                filters?.bq_revenue_growth_quarterly_yoy_mr?.length > 0 &&
                <td><p>{d?.fields?.hasOwnProperty("bq_revenue_growth_quarterly_yoy_mr") ?
                    d?.fields?.bq_revenue_growth_quarterly_yoy_mr : "N/A"}</p></td>
            }
            {
                filters?.bq_current_employees_plan_growth_quarterly_yoy_mr?.length > 0 &&
                <td><p>{d?.fields?.hasOwnProperty("bq_current_employees_plan_growth_quarterly_yoy_mr") ?
                    d?.fields?.bq_current_employees_plan_growth_quarterly_yoy_mr : "N/A"}</p></td>
            }
            {
                filters?.bq_current_employees_plan_growth_monthly_yoy_mr?.length > 0 &&
                <td><p>{d?.fields?.hasOwnProperty("bq_current_employees_plan_growth_monthly_yoy_mr") ?
                    d?.fields?.bq_current_employees_plan_growth_monthly_yoy_mr : "N/A"}</p></td>
            }
            {
                filters?.bq_revenue_growth_qoq_mr?.length > 0 &&
                <td><p>{d?.fields?.hasOwnProperty("bq_revenue_growth_qoq_mr") ?
                    d?.fields?.bq_revenue_growth_qoq_mr : "N/A"}</p></td>
            }
            {
                filters?.bq_current_employees_plan_growth_qoq_mr?.length > 0 &&
                <td><p>{d?.fields?.hasOwnProperty("bq_current_employees_plan_growth_qoq_mr") ?
                    d?.fields?.bq_current_employees_plan_growth_qoq_mr : "N/A"}</p></td>
            }
            {
                filters?.bq_current_employees_plan_growth_mom_mr?.length > 0 &&
                <td><p>{d?.fields?.hasOwnProperty("bq_current_employees_plan_growth_mom_mr") ?
                    d?.fields?.bq_current_employees_plan_growth_mom_mr : "N/A"}</p></td>
            }



        </>
    )
}

export default GrowthRangeBody