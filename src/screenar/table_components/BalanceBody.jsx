import React from 'react'

const BalanceBody = ({ filters, d }) => {
    return (
        <>
            {
                filters?.bq_current_assets_mr?.length > 0 &&
                <td><p>{d?.fields?.hasOwnProperty("bq_current_assets_mr") ?
                    d?.fields?.bq_current_assets_mr : "N/A"}</p></td>
            }
            {
                filters?.bq_cash_mr?.length > 0 &&
                <td><p>{d?.fields?.hasOwnProperty("bq_cash_mr") ?
                    d?.fields?.bq_cash_mr : "N/A"}</p></td>
            }
            {
                filters?.bq_trade_notes_and_accounts_receivable_mr?.length > 0 &&
                <td><p>{d?.fields?.hasOwnProperty("bq_trade_notes_and_accounts_receivable_mr") ?
                    d?.fields?.bq_trade_notes_and_accounts_receivable_mr : "N/A"}</p></td>
            }
            {
                filters?.bq_less_allowance_for_bad_debts_mr?.length > 0 &&
                <td><p>{d?.fields?.hasOwnProperty("bq_less_allowance_for_bad_debts_mr") ?
                    d?.fields?.bq_less_allowance_for_bad_debts_mr : "N/A"}</p></td>
            }
            {
                filters?.bq_inventories_mr?.length > 0 &&
                <td><p>{d?.fields?.hasOwnProperty("bq_inventories_mr") ?
                    d?.fields?.bq_inventories_mr : "N/A"}</p></td>
            }
            {
                filters?.bq_us_government_obligations_mr?.length > 0 &&
                <td><p>{d?.fields?.hasOwnProperty("bq_us_government_obligations_mr") ?
                    d?.fields?.bq_us_government_obligations_mr : "N/A"}</p></td>
            }
            {
                filters?.bq_tax_exempt_securities_mr?.length > 0 &&
                <td><p>{d?.fields?.hasOwnProperty("bq_tax_exempt_securities_mr") ?
                    d?.fields?.bq_tax_exempt_securities_mr : "N/A"}</p></td>
            }
            {
                filters?.bq_other_current_assets_mr?.length > 0 &&
                <td><p>{d?.fields?.hasOwnProperty("bq_other_current_assets_mr") ?
                    d?.fields?.bq_other_current_assets_mr : "N/A"}</p></td>
            }
            {
                filters?.bq_non_current_assets_mr?.length > 0 &&
                <td><p>{d?.fields?.hasOwnProperty("bq_non_current_assets_mr") ?
                    d?.fields?.bq_non_current_assets_mr : "N/A"}</p></td>
            }
            {
                filters?.bq_loans_to_shareholders_mr?.length > 0 &&
                <td><p>{d?.fields?.hasOwnProperty("bq_loans_to_shareholders_mr") ?
                    d?.fields?.bq_loans_to_shareholders_mr : "N/A"}</p></td>
            }
            {
                filters?.bq_mortgage_and_real_estate_loans_mr?.length > 0 &&
                <td><p>{d?.fields?.hasOwnProperty("bq_mortgage_and_real_estate_loans_mr") ?
                    d?.fields?.bq_mortgage_and_real_estate_loans_mr : "N/A"}</p></td>
            }
            {
                filters?.bq_other_investments_mr?.length > 0 &&
                <td><p>{d?.fields?.hasOwnProperty("bq_other_investments_mr") ?
                    d?.fields?.bq_other_investments_mr : "N/A"}</p></td>
            }
            {
                filters?.bq_buildings_and_other_depreciable_assets_mr?.length > 0 &&
                <td><p>{d?.fields?.hasOwnProperty("bq_buildings_and_other_depreciable_assets_mr") ?
                    d?.fields?.bq_buildings_and_other_depreciable_assets_mr : "N/A"}</p></td>
            }
            {
                filters?.bq_less_accumulated_depreciation_mr?.length > 0 &&
                <td><p>{d?.fields?.hasOwnProperty("bq_less_accumulated_depreciation_mr") ?
                    d?.fields?.bq_less_accumulated_depreciation_mr : "N/A"}</p></td>
            }
            {
                filters?.bq_depletable_assets_mr?.length > 0 &&
                <td><p>{d?.fields?.hasOwnProperty("bq_depletable_assets_mr") ?
                    d?.fields?.bq_depletable_assets_mr : "N/A"}</p></td>
            }
            {
                filters?.bq_less_accumulated_depletion_mr?.length > 0 &&
                <td><p>{d?.fields?.hasOwnProperty("bq_less_accumulated_depletion_mr") ?
                    d?.fields?.bq_less_accumulated_depletion_mr : "N/A"}</p></td>
            }
            {
                filters?.bq_land_mr?.length > 0 &&
                <td><p>{d?.fields?.hasOwnProperty("bq_land_mr") ?
                    d?.fields?.bq_land_mr : "N/A"}</p></td>
            }
            {
                filters?.bq_intangible_assets_amortizable_mr?.length > 0 &&
                <td><p>{d?.fields?.hasOwnProperty("bq_intangible_assets_amortizable_mr") ?
                    d?.fields?.bq_intangible_assets_amortizable_mr : "N/A"}</p></td>
            }
            {
                filters?.bq_less_accumulated_amortization_mr?.length > 0 &&
                <td><p>{d?.fields?.hasOwnProperty("bq_less_accumulated_amortization_mr") ?
                    d?.fields?.bq_less_accumulated_amortization_mr : "N/A"}</p></td>
            }
            {
                filters?.bq_other_non_current_assets_mr?.length > 0 &&
                <td><p>{d?.fields?.hasOwnProperty("bq_other_non_current_assets_mr") ?
                    d?.fields?.bq_other_non_current_assets_mr : "N/A"}</p></td>
            }
            {
                filters?.bq_total_liabilities_and_equity_mr?.length > 0 &&
                <td><p>{d?.fields?.hasOwnProperty("bq_total_liabilities_and_equity_mr") ?
                    d?.fields?.bq_total_liabilities_and_equity_mr : "N/A"}</p></td>
            }
            {
                filters?.bq_current_liabilities_mr?.length > 0 &&
                <td><p>{d?.fields?.hasOwnProperty("bq_current_liabilities_mr") ?
                    d?.fields?.bq_current_liabilities_mr : "N/A"}</p></td>
            }
            {
                filters?.bq_accounts_payable_mr?.length > 0 &&
                <td><p>{d?.fields?.hasOwnProperty("bq_accounts_payable_mr") ?
                    d?.fields?.bq_accounts_payable_mr : "N/A"}</p></td>
            }
            {
                filters?.bq_mortgages_notes_bonds_payable_less_than_1year_mr?.length > 0 &&
                <td><p>{d?.fields?.hasOwnProperty("bq_mortgages_notes_bonds_payable_less_than_1year_mr") ?
                    d?.fields?.bq_mortgages_notes_bonds_payable_less_than_1year_mr : "N/A"}</p></td>
            }
            {
                filters?.bq_other_current_liabilities_mr?.length > 0 &&
                <td><p>{d?.fields?.hasOwnProperty("bq_other_current_liabilities_mr") ?
                    d?.fields?.bq_other_current_liabilities_mr : "N/A"}</p></td>
            }
            {
                filters?.bq_non_current_liabilities_mr?.length > 0 &&
                <td><p>{d?.fields?.hasOwnProperty("bq_non_current_liabilities_mr") ?
                    d?.fields?.bq_non_current_liabilities_mr : "N/A"}</p></td>
            }
            {
                filters?.bq_loans_from_shareholders_mr?.length > 0 &&
                <td><p>{d?.fields?.hasOwnProperty("bq_loans_from_shareholders_mr") ?
                    d?.fields?.bq_loans_from_shareholders_mr : "N/A"}</p></td>
            }
            {
                filters?.bq_mortgages_notes_bonds_payable_more_than_1year_mr?.length > 0 &&
                <td><p>{d?.fields?.hasOwnProperty("bq_mortgages_notes_bonds_payable_more_than_1year_mr") ?
                    d?.fields?.bq_mortgages_notes_bonds_payable_more_than_1year_mr : "N/A"}</p></td>
            }
            {
                filters?.bq_other_non_current_liabilities_mr?.length > 0 &&
                <td><p>{d?.fields?.hasOwnProperty("bq_other_non_current_liabilities_mr") ?
                    d?.fields?.bq_other_non_current_liabilities_mr : "N/A"}</p></td>
            }
            {
                filters?.bq_shareholders_equity_mr?.length > 0 &&
                <td><p>{d?.fields?.hasOwnProperty("bq_shareholders_equity_mr") ?
                    d?.fields?.bq_shareholders_equity_mr : "N/A"}</p></td>
            }



        </>
    )
}

export default BalanceBody