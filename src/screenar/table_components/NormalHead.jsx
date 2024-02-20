import React from 'react'

const NormalHead = ({ filters, handleServerSort, orderBy, isAsc }) => {
    return (
        <>

            {
                filters?.bq_ebitda_mr?.length > 0 &&
                <th><span onClick={() => handleServerSort("bq_ebitda_mr")}>
                    {orderBy === "bq_ebitda_mr" ? (
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
                    <i className='bx bxs-sort-alt'></i>EBITDA</span></th>
            }
            {
                filters?.bq_total_assets_mr?.length > 0 &&
                <th><span onClick={() => handleServerSort("bq_total_assets_mr")}>
                    {orderBy === "bq_total_assets_mr" ? (
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

                    <i className='bx bxs-sort-alt'></i>Total Assets</span></th>
            }
            {
                filters?.bq_net_income_mr?.length > 0
                && <th><span onClick={() => handleServerSort("bq_net_income_mr")}>
                    {orderBy === "bq_net_income_mr" ? (
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
                    <i className='bx bxs-sort-alt'></i>Net Income</span></th>
            }
            {
                filters?.bq_ebitda_margin_mr?.length > 0 &&
                <th><span onClick={() => handleServerSort("bq_ebitda_margin_mr")}>
                    {orderBy === "bq_ebitda_margin_mr" ? (
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
                    <i className='bx bxs-sort-alt'></i>EBITDA Margin</span></th>
            }
            {
                filters?.bq_net_profit_margin_mr?.length > 0 &&
                <th><span onClick={() => handleServerSort("bq_net_profit_margin_mr")}>
                    {orderBy === "bq_net_profit_margin_mr" ? (
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

                    <i className='bx bxs-sort-alt'></i>Net Income Margin</span></th>
            }
            {
                filters?.bq_cor_mr?.length > 0 &&
                <th><span onClick={() => handleServerSort("bq_cor_mr")}>
                    {orderBy === "bq_cor_mr" ? (
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

                    <i className='bx bxs-sort-alt'></i>Cost of Revenue (COR)
                </span></th>
            }
            {
                filters?.bq_gross_profit_mr?.length > 0 &&
                <th><span onClick={() => handleServerSort("bq_gross_profit_mr")}>
                    {orderBy === "bq_gross_profit_mr" ? (
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

                    <i className='bx bxs-sort-alt'></i>Gross Profit
                </span></th>
            }
            {
                filters?.bq_payroll_mr?.length > 0 &&
                <th><span onClick={() => handleServerSort("bq_payroll_mr")}>
                    {orderBy === "bq_payroll_mr" ? (
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

                    <i className='bx bxs-sort-alt'></i>Payroll
                </span></th>
            }

            {
                filters?.bq_operating_expenses_mr?.length > 0 &&
                <th><span onClick={() => handleServerSort("bq_operating_expenses_mr")}>
                    {orderBy === "bq_operating_expenses_mr" ? (
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

                    <i className='bx bxs-sort-alt'></i>Operating Expenses
                </span></th>
            }
            {
                filters?.bq_operating_income_mr?.length > 0 &&
                <th><span onClick={() => handleServerSort("bq_operating_income_mr")}>
                    {orderBy === "bq_operating_income_mr" ? (
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

                    <i className='bx bxs-sort-alt'></i>Operating Income

                </span></th>
            }
            {
                filters?.bq_tax_and_interest_mr?.length > 0 &&
                <th><span onClick={() => handleServerSort("bq_tax_and_interest_mr")}>
                    {orderBy === "bq_tax_and_interest_mr" ? (
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
                    <i className='bx bxs-sort-alt'></i>Tax And Interest
                </span></th>
            }
            {
                filters?.bq_asset_turnover_mr?.length > 0 &&
                <th><span onClick={() => handleServerSort("bq_asset_turnover_mr")}>
                    {orderBy === "bq_asset_turnover_mr" ? (
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
                    <i className='bx bxs-sort-alt'></i>Asset Turnover

                </span></th>
            }
            {
                filters?.bq_return_on_assets_mr?.length > 0 &&
                <th><span onClick={() => handleServerSort("bq_return_on_assets_mr")}>
                    {orderBy === "bq_return_on_assets_mr" ? (
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
                    <i className='bx bxs-sort-alt'></i>Return On Assets

                </span></th>
            }
            {
                filters?.bq_return_on_sales_mr?.length > 0 &&
                <th><span onClick={() => handleServerSort("bq_return_on_sales_mr")}>
                    {orderBy === "bq_return_on_sales_mr" ? (
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
                    <i className='bx bxs-sort-alt'></i>Return On Sales


                </span></th>
            }



        </>
    )
}

export default NormalHead