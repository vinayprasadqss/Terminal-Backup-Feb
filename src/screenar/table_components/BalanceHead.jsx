import React from 'react'

const BalanceHead = ({ filters, handleServerSort, orderBy, isAsc }) => {
    return (
        <>

            {
                filters?.bq_current_assets_mr?.length > 0 &&
                <th><span onClick={() => handleServerSort("bq_current_assets_mr")}>
                    {orderBy === "bq_current_assets_mr" ? (
                        isAsc === "True" ? (
                            <i
                                className="bx bx-sort-up"
                            ></i>
                        ) : (
                            <i
                                className="bx bx-sort-down"
                            ></i>
                        )
                    ) : (
                        ""
                    )}
                    <i className='bx bxs-sort-alt'></i>Current Assets


                </span></th>
            }
            {
                filters?.bq_cash_mr?.length > 0 &&
                <th><span onClick={() => handleServerSort("bq_cash_mr")}>
                    {orderBy === "bq_cash_mr" ? (
                        isAsc === "True" ? (
                            <i
                                className="bx bx-sort-up"
                            ></i>
                        ) : (
                            <i
                                className="bx bx-sort-down"
                            ></i>
                        )
                    ) : (
                        ""
                    )}
                    <i className='bx bxs-sort-alt'></i>Cash


                </span></th>
            }
            {
                filters?.bq_trade_notes_and_accounts_receivable_mr?.length > 0 &&
                <th><span onClick={() => handleServerSort("bq_trade_notes_and_accounts_receivable_mr")}>
                    {orderBy === "bq_trade_notes_and_accounts_receivable_mr" ? (
                        isAsc === "True" ? (
                            <i
                                className="bx bx-sort-up"
                            ></i>
                        ) : (
                            <i
                                className="bx bx-sort-down"
                            ></i>
                        )
                    ) : (
                        ""
                    )}
                    <i className='bx bxs-sort-alt'></i>Trade Notes and Accounts Receivable


                </span></th>
            }
            {
                filters?.bq_less_allowance_for_bad_debts_mr?.length > 0 &&
                <th><span onClick={() => handleServerSort("bq_less_allowance_for_bad_debts_mr")}>
                    {orderBy === "bq_less_allowance_for_bad_debts_mr" ? (
                        isAsc === "True" ? (
                            <i
                                className="bx bx-sort-up"
                            ></i>
                        ) : (
                            <i
                                className="bx bx-sort-down"
                            ></i>
                        )
                    ) : (
                        ""
                    )}
                    <i className='bx bxs-sort-alt'></i>Less Allowance for Bad Debts



                </span></th>
            }
            {
                filters?.bq_inventories_mr?.length > 0 &&
                <th><span onClick={() => handleServerSort("bq_inventories_mr")}>
                    {orderBy === "bq_inventories_mr" ? (
                        isAsc === "True" ? (
                            <i
                                className="bx bx-sort-up"
                            ></i>
                        ) : (
                            <i
                                className="bx bx-sort-down"
                            ></i>
                        )
                    ) : (
                        ""
                    )}
                    <i className='bx bxs-sort-alt'></i>Inventories



                </span></th>
            }
            {
                filters?.bq_us_government_obligations_mr?.length > 0 &&
                <th><span onClick={() => handleServerSort("bq_us_government_obligations_mr")}>
                    {orderBy === "bq_us_government_obligations_mr" ? (
                        isAsc === "True" ? (
                            <i
                                className="bx bx-sort-up"
                            ></i>
                        ) : (
                            <i
                                className="bx bx-sort-down"
                            ></i>
                        )
                    ) : (
                        ""
                    )}
                    <i className='bx bxs-sort-alt'></i>U.S. Government Obligations




                </span></th>
            }
            {
                filters?.bq_tax_exempt_securities_mr?.length > 0 &&
                <th><span onClick={() => handleServerSort("bq_tax_exempt_securities_mr")}>
                    {orderBy === "bq_tax_exempt_securities_mr" ? (
                        isAsc === "True" ? (
                            <i
                                className="bx bx-sort-up"
                            ></i>
                        ) : (
                            <i
                                className="bx bx-sort-down"
                            ></i>
                        )
                    ) : (
                        ""
                    )}
                    <i className='bx bxs-sort-alt'></i>Tax Exempt Securities
                </span></th>
            }

            {
                filters?.bq_other_current_assets_mr?.length > 0 &&
                <th><span onClick={() => handleServerSort("bq_other_current_assets_mr")}>
                    {orderBy === "bq_other_current_assets_mr" ? (
                        isAsc === "True" ? (
                            <i
                                className="bx bx-sort-up"
                            ></i>
                        ) : (
                            <i
                                className="bx bx-sort-down"
                            ></i>
                        )
                    ) : (
                        ""
                    )}
                    <i className='bx bxs-sort-alt'></i>Other Current Assets

                </span></th>
            }
            {
                filters?.bq_non_current_assets_mr?.length > 0 &&
                <th><span onClick={() => handleServerSort("bq_non_current_assets_mr")}>
                    {orderBy === "bq_non_current_assets_mr" ? (
                        isAsc === "True" ? (
                            <i
                                className="bx bx-sort-up"
                            ></i>
                        ) : (
                            <i
                                className="bx bx-sort-down"
                            ></i>
                        )
                    ) : (
                        ""
                    )}
                    <i className='bx bxs-sort-alt'></i>Non Current Assets

                </span></th>
            }
            {
                filters?.bq_loans_to_shareholders_mr?.length > 0 &&
                <th><span onClick={() => handleServerSort("bq_loans_to_shareholders_mr")}>
                    {orderBy === "bq_loans_to_shareholders_mr" ? (
                        isAsc === "True" ? (
                            <i
                                className="bx bx-sort-up"
                            ></i>
                        ) : (
                            <i
                                className="bx bx-sort-down"
                            ></i>
                        )
                    ) : (
                        ""
                    )}
                    <i className='bx bxs-sort-alt'></i>Loans to Shareholders

                </span></th>
            }
            {
                filters?.bq_mortgage_and_real_estate_loans_mr?.length > 0 &&
                <th><span onClick={() => handleServerSort("bq_mortgage_and_real_estate_loans_mr")}>
                    {orderBy === "bq_mortgage_and_real_estate_loans_mr" ? (
                        isAsc === "True" ? (
                            <i
                                className="bx bx-sort-up"
                            ></i>
                        ) : (
                            <i
                                className="bx bx-sort-down"
                            ></i>
                        )
                    ) : (
                        ""
                    )}
                    <i className='bx bxs-sort-alt'></i>Mortgage and Real Estate Loans



                </span></th>
            }
            {
                filters?.bq_other_investments_mr?.length > 0 &&
                <th><span onClick={() => handleServerSort("bq_other_investments_mr")}>
                    {orderBy === "bq_other_investments_mr" ? (
                        isAsc === "True" ? (
                            <i
                                className="bx bx-sort-up"
                            ></i>
                        ) : (
                            <i
                                className="bx bx-sort-down"
                            ></i>
                        )
                    ) : (
                        ""
                    )}
                    <i className='bx bxs-sort-alt'></i>Other Investments



                </span></th>
            }
            {
                filters?.bq_buildings_and_other_depreciable_assets_mr?.length > 0 &&
                <th><span onClick={() => handleServerSort("bq_buildings_and_other_depreciable_assets_mr")}>
                    {orderBy === "bq_buildings_and_other_depreciable_assets_mr" ? (
                        isAsc === "True" ? (
                            <i
                                className="bx bx-sort-up"
                            ></i>
                        ) : (
                            <i
                                className="bx bx-sort-down"
                            ></i>
                        )
                    ) : (
                        ""
                    )}
                    <i className='bx bxs-sort-alt'></i>Buildings and Other Depreciable Assets
                </span></th>
            }
            {
                filters?.bq_less_accumulated_depreciation_mr?.length > 0 &&
                <th><span onClick={() => handleServerSort("bq_less_accumulated_depreciation_mr")}>
                    {orderBy === "bq_less_accumulated_depreciation_mr" ? (
                        isAsc === "True" ? (
                            <i
                                className="bx bx-sort-up"
                            ></i>
                        ) : (
                            <i
                                className="bx bx-sort-down"
                            ></i>
                        )
                    ) : (
                        ""
                    )}
                    <i className='bx bxs-sort-alt'></i>Less Accumulated Depreciation
                </span></th>
            }
            {
                filters?.bq_depletable_assets_mr?.length > 0 &&
                <th><span onClick={() => handleServerSort("bq_depletable_assets_mr")}>
                    {orderBy === "bq_depletable_assets_mr" ? (
                        isAsc === "True" ? (
                            <i
                                className="bx bx-sort-up"
                            ></i>
                        ) : (
                            <i
                                className="bx bx-sort-down"
                            ></i>
                        )
                    ) : (
                        ""
                    )}
                    <i className='bx bxs-sort-alt'></i>Depletable Assets

                </span></th>
            }
            {
                filters?.bq_less_accumulated_depletion_mr?.length > 0 &&
                <th><span onClick={() => handleServerSort("bq_less_accumulated_depletion_mr")}>
                    {orderBy === "bq_less_accumulated_depletion_mr" ? (
                        isAsc === "True" ? (
                            <i
                                className="bx bx-sort-up"
                            ></i>
                        ) : (
                            <i
                                className="bx bx-sort-down"
                            ></i>
                        )
                    ) : (
                        ""
                    )}
                    <i className='bx bxs-sort-alt'></i>Less Accumulate Depletion

                </span></th>
            }
            {
                filters?.bq_land_mr?.length > 0 &&
                <th><span onClick={() => handleServerSort("bq_land_mr")}>
                    {orderBy === "bq_land_mr" ? (
                        isAsc === "True" ? (
                            <i
                                className="bx bx-sort-up"
                            ></i>
                        ) : (
                            <i
                                className="bx bx-sort-down"
                            ></i>
                        )
                    ) : (
                        ""
                    )}
                    <i className='bx bxs-sort-alt'></i>Land (Net of Any Amortization)

                </span></th>
            }
            {
                filters?.bq_intangible_assets_amortizable_mr?.length > 0 &&
                <th><span onClick={() => handleServerSort("bq_intangible_assets_amortizable_mr")}>
                    {orderBy === "bq_intangible_assets_amortizable_mr" ? (
                        isAsc === "True" ? (
                            <i
                                className="bx bx-sort-up"
                            ></i>
                        ) : (
                            <i
                                className="bx bx-sort-down"
                            ></i>
                        )
                    ) : (
                        ""
                    )}
                    <i className='bx bxs-sort-alt'></i>Intangible Assets (Amortizable Only)

                </span></th>
            }
            {
                filters?.bq_less_accumulated_amortization_mr?.length > 0 &&
                <th><span onClick={() => handleServerSort("bq_less_accumulated_amortization_mr")}>
                    {orderBy === "bq_less_accumulated_amortization_mr" ? (
                        isAsc === "True" ? (
                            <i
                                className="bx bx-sort-up"
                            ></i>
                        ) : (
                            <i
                                className="bx bx-sort-down"
                            ></i>
                        )
                    ) : (
                        ""
                    )}
                    <i className='bx bxs-sort-alt'></i>Less Accumulated Amortization

                </span></th>
            }
            {
                filters?.bq_other_non_current_assets_mr?.length > 0 &&
                <th><span onClick={() => handleServerSort("bq_other_non_current_assets_mr")}>
                    {orderBy === "bq_other_non_current_assets_mr" ? (
                        isAsc === "True" ? (
                            <i
                                className="bx bx-sort-up"
                            ></i>
                        ) : (
                            <i
                                className="bx bx-sort-down"
                            ></i>
                        )
                    ) : (
                        ""
                    )}
                    <i className='bx bxs-sort-alt'></i>Other Non Current Assets


                </span></th>
            }
            {
                filters?.bq_total_liabilities_and_equity_mr?.length > 0 &&
                <th><span onClick={() => handleServerSort("bq_total_liabilities_and_equity_mr")}>
                    {orderBy === "bq_total_liabilities_and_equity_mr" ? (
                        isAsc === "True" ? (
                            <i
                                className="bx bx-sort-up"
                            ></i>
                        ) : (
                            <i
                                className="bx bx-sort-down"
                            ></i>
                        )
                    ) : (
                        ""
                    )}
                    <i className='bx bxs-sort-alt'></i>Total Liabilities and Shareholders Equity
                </span></th>
            }
            {
                filters?.bq_current_liabilities_mr?.length > 0 &&
                <th><span onClick={() => handleServerSort("bq_current_liabilities_mr")}>
                    {orderBy === "bq_current_liabilities_mr" ? (
                        isAsc === "True" ? (
                            <i
                                className="bx bx-sort-up"
                            ></i>
                        ) : (
                            <i
                                className="bx bx-sort-down"
                            ></i>
                        )
                    ) : (
                        ""
                    )}
                    <i className='bx bxs-sort-alt'></i>Current Liabilities
                </span></th>
            }
            {
                filters?.bq_accounts_payable_mr?.length > 0 &&
                <th><span onClick={() => handleServerSort("bq_accounts_payable_mr")}>
                    {orderBy === "bq_accounts_payable_mr" ? (
                        isAsc === "True" ? (
                            <i
                                className="bx bx-sort-up"
                            ></i>
                        ) : (
                            <i
                                className="bx bx-sort-down"
                            ></i>
                        )
                    ) : (
                        ""
                    )}
                    <i className='bx bxs-sort-alt'></i>Accounts Payable
                </span></th>
            }
            {
                filters?.bq_mortgages_notes_bonds_payable_less_than_1year_mr?.length > 0 &&
                <th><span onClick={() => handleServerSort("bq_mortgages_notes_bonds_payable_less_than_1year_mr")}>
                    {orderBy === "bq_mortgages_notes_bonds_payable_less_than_1year_mr" ? (
                        isAsc === "True" ? (
                            <i
                                className="bx bx-sort-up"
                            ></i>
                        ) : (
                            <i
                                className="bx bx-sort-down"
                            ></i>
                        )
                    ) : (
                        ""
                    )}
                    <i className='bx bxs-sort-alt'></i>Mortgages, Notes, Bonds Payable in Less Than 1 Year
                </span></th>
            }
            {
                filters?.bq_other_current_liabilities_mr?.length > 0 &&
                <th><span onClick={() => handleServerSort("bq_other_current_liabilities_mr")}>
                    {orderBy === "bq_other_current_liabilities_mr" ? (
                        isAsc === "True" ? (
                            <i
                                className="bx bx-sort-up"
                            ></i>
                        ) : (
                            <i
                                className="bx bx-sort-down"
                            ></i>
                        )
                    ) : (
                        ""
                    )}
                    <i className='bx bxs-sort-alt'></i>Other Current Liabilities

                </span></th>
            }
            {
                filters?.bq_non_current_liabilities_mr?.length > 0 &&
                <th><span onClick={() => handleServerSort("bq_non_current_liabilities_mr")}>
                    {orderBy === "bq_non_current_liabilities_mr" ? (
                        isAsc === "True" ? (
                            <i
                                className="bx bx-sort-up"
                            ></i>
                        ) : (
                            <i
                                className="bx bx-sort-down"
                            ></i>
                        )
                    ) : (
                        ""
                    )}
                    <i className='bx bxs-sort-alt'></i>Non Current Liabilities
                </span></th>
            }
            {
                filters?.bq_loans_from_shareholders_mr?.length > 0 &&
                <th><span onClick={() => handleServerSort("bq_loans_from_shareholders_mr")}>
                    {orderBy === "bq_loans_from_shareholders_mr" ? (
                        isAsc === "True" ? (
                            <i
                                className="bx bx-sort-up"
                            ></i>
                        ) : (
                            <i
                                className="bx bx-sort-down"
                            ></i>
                        )
                    ) : (
                        ""
                    )}
                    <i className='bx bxs-sort-alt'></i>Loans from Shareholders

                </span></th>
            }
            {
                filters?.bq_mortgages_notes_bonds_payable_more_than_1year_mr?.length > 0 &&
                <th><span onClick={() => handleServerSort("bq_mortgages_notes_bonds_payable_more_than_1year_mr")}>
                    {orderBy === "bq_mortgages_notes_bonds_payable_more_than_1year_mr" ? (
                        isAsc === "True" ? (
                            <i
                                className="bx bx-sort-up"
                            ></i>
                        ) : (
                            <i
                                className="bx bx-sort-down"
                            ></i>
                        )
                    ) : (
                        ""
                    )}
                    <i className='bx bxs-sort-alt'></i>Mortgages, Notes, Bonds Payable in 1 Year or More

                </span></th>
            }

            {
                filters?.bq_other_non_current_liabilities_mr?.length > 0 &&
                <th><span onClick={() => handleServerSort("bq_other_non_current_liabilities_mr")}>
                    {orderBy === "bq_other_non_current_liabilities_mr" ? (
                        isAsc === "True" ? (
                            <i
                                className="bx bx-sort-up"
                            ></i>
                        ) : (
                            <i
                                className="bx bx-sort-down"
                            ></i>
                        )
                    ) : (
                        ""
                    )}
                    <i className='bx bxs-sort-alt'></i>Other Non Current Liabilities
                </span></th>
            }

            {
                filters?.bq_shareholders_equity_mr?.length > 0 &&
                <th><span onClick={() => handleServerSort("bq_shareholders_equity_mr")}>
                    {orderBy === "bq_shareholders_equity_mr" ? (
                        isAsc === "True" ? (
                            <i
                                className="bx bx-sort-up"
                            ></i>
                        ) : (
                            <i
                                className="bx bx-sort-down"
                            ></i>
                        )
                    ) : (
                        ""
                    )}
                    <i className='bx bxs-sort-alt'></i>Shareholders Equity
                </span></th>
            }


        </>
    )
}

export default BalanceHead