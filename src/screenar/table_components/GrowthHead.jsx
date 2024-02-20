import React from 'react'

const GrowthHead = ({ filters, orderBy, isAsc, handleServerSort }) => {
    return (
        <>

            {
                filters?.bq_current_employees_plan_growth_yoy_mr?.length > 0 &&
                <th><span onClick={() => handleServerSort("bq_current_employees_plan_growth_yoy_mr")}>
                    {orderBy === "bq_current_employees_plan_growth_yoy_mr" ? (
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
                    <i className='bx bxs-sort-alt'></i>Full-Time Headcount Growth (%)</span></th>
            }
            {
                filters?.bq_revenue_growth_yoy_mr?.length > 0 &&
                <th><span onClick={() => handleServerSort("bq_revenue_growth_yoy_mr")}>
                    {orderBy === "bq_revenue_growth_yoy_mr" ? (
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
                    <i className='bx bxs-sort-alt'></i>Revenue Growth (%)
                </span></th>
            }
            {
                filters?.bq_revenue_growth_quarterly_yoy_mr?.length > 0 &&
                <th><span onClick={() => handleServerSort("bq_revenue_growth_quarterly_yoy_mr")}>
                    {orderBy === "bq_revenue_growth_quarterly_yoy_mr" ? (
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
                    <i className='bx bxs-sort-alt'></i>Revenue Growth Quarterly Year Over Year (YOY) (%)</span></th>
            }
            {
                filters?.bq_current_employees_plan_growth_quarterly_yoy_mr?.length > 0 &&
                <th><span onClick={() => handleServerSort("bq_current_employees_plan_growth_quarterly_yoy_mr")}>
                    {orderBy === "bq_current_employees_plan_growth_quarterly_yoy_mr" ? (
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
                    <i className='bx bxs-sort-alt'></i>Full-Time Headcount Growth Quarterly Year Over Year (YOY) (%)</span></th>

            }
            {
                filters?.bq_current_employees_plan_growth_monthly_yoy_mr?.length > 0 &&

                <th><span onClick={() => handleServerSort("bq_current_employees_plan_growth_monthly_yoy_mr")}>
                    {orderBy === "bq_current_employees_plan_growth_monthly_yoy_mr" ? (
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
                    <i className='bx bxs-sort-alt'></i>Full-Time Headcount Growth Monthly Year Over Year (YOY) (%)</span></th>
            }
            {
                filters?.bq_revenue_growth_qoq_mr?.length > 0 &&
                <th><span onClick={() => handleServerSort("bq_revenue_growth_qoq_mr")}>
                    {orderBy === "bq_revenue_growth_qoq_mr" ? (
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
                    <i className='bx bxs-sort-alt'></i>Revenue Growth Quarter Over Quarter (QOQ) (%)
                </span></th>

            }
            {
                filters?.bq_current_employees_plan_growth_qoq_mr?.length > 0 &&
                <th><span onClick={() => handleServerSort("bq_current_employees_plan_growth_qoq_mr")}>
                    {orderBy === "bq_current_employees_plan_growth_qoq_mr" ? (
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
                    <i className='bx bxs-sort-alt'></i>Full-Time Headcount Growth Quarter Over Quarter (QOQ) (%)
                </span></th>
            }
            {
                filters?.bq_current_employees_plan_growth_mom_mr?.length > 0 &&
                <th><span onClick={() => handleServerSort("bq_current_employees_plan_growth_mom_mr")}>
                    {orderBy === "bq_current_employees_plan_growth_mom_mr" ? (
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
                    <i className='bx bxs-sort-alt'></i>Full-Time Headcount Growth Month Over Month (MOM) (%)
                </span></th>
            }





        </>
    )
}

export default GrowthHead