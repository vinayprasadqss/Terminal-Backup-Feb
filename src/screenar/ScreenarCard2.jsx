import { Checkbox, Skeleton } from 'antd';
import React, { useState } from 'react'
import SfcCard2 from './SfcCard2';
import ScreenerCardSlider from './ScreenerCardSlider';
import ScreenarCardInput from './ScreenarCardInput';
import SfcCard4 from './SfcCard4';

const ScreenarCard2 = ({ title, data, name, filters, setFilters, floading, flag, setFlag, classname }) => {
    const [show, setShow] = useState(false);
    const [tempState, setTempState] = useState([])


    const handleChange = (d, names) => {
        let temp = filters;

        if (names === "bq_ebitda_mr" ||
            names === "bq_total_assets_mr"
            || names === "bq_net_income_mr"
            || names === "bq_ebitda_margin_mr" ||
            names === "bq_net_profit_margin_mr"
            || names === "bq_current_employees_plan_mr" ||
            names === "bq_revenue_mr" ||
            names === "bq_revenue_growth_yoy_mr" ||
            names === "bq_current_employees_plan_growth_yoy_mr" ||
            names === "bq_cor_mr" || names === "bq_gross_profit_mr" || names === "bq_payroll_mr" ||
            names === "bq_operating_expenses_mr" || names === "bq_operating_income_mr" ||
            names === "bq_tax_and_interest_mr" || names === "bq_asset_turnover_mr" ||
            names === "bq_return_on_assets_mr" || names === "bq_return_on_sales_mr" ||
            names === "bq_revenue_growth_quarterly_yoy_mr" ||
            names === "bq_current_employees_plan_growth_quarterly_yoy_mr" ||
            names === "bq_current_employees_plan_growth_monthly_yoy_mr" ||
            names === "bq_revenue_growth_qoq_mr" ||
            names === "bq_current_employees_plan_growth_qoq_mr" ||
            names === "bq_current_employees_plan_growth_mom_mr"
        ) {

            return setFilters((prev) => ({ ...prev, [names]: d }))
        }
        else {
            if (temp[names]?.find((f) => f === d)) {
                temp[names] = temp[names].filter((dz) => dz !== d);
            } else {
                temp[names].push(d);
            }
            setTempState([...temp[names]])
            setFilters(temp);
            setFlag(!flag)
        }



    }

    const clear = (names) => {
        console.log(names)
        if (names === "bq_organization_cik") {
            setFilters((prev) => ({ ...prev, [names]: [] }))
        }
        let temp = filters;
        temp[names] = [];
        setFlag(!flag)

    }




    return (
        <div className={`sfcl ${classname ? classname : ""}`}>
            <div className='h-bar'></div>
            <div className="sfc-content">
                <div className='sfc-top' onClick={() => setShow(!show)} style={{ cursor: "pointer" }}>
                    <h4>{title || "Company Structure Filters"}</h4>
                    <span >
                        {show ? <i className='bx bxs-chevron-down'></i>
                            : <i className='bx bx-chevron-up'></i>}</span>
                </div>
                {show && <div className="sfc-content-wrap">

                    {
                        data?.length > 0 ? data?.map((d) => {
                            if (d?.name === "bq_current_employees_plan_mr") {
                                // return <ScreenerCardSlider d={d} tempState={tempState}
                                //     handleChange={handleChange}
                                //     floading={floading}
                                //     filters={filters} />
                                return <ScreenarCardInput d={d} tempState={tempState}
                                    handleChange={handleChange}
                                    floading={floading}
                                    filters={filters} />
                            }
                            else if (d?.name === "bq_organization_cik") {
                                return <SfcCard4 d={d} tempState={tempState}
                                    handleChange={handleChange}
                                    floading={floading}
                                    filters={filters}
                                    clear={clear}
                                />
                            }
                            else if (d?.name === "bq_ebitda_mr"
                                || d?.name === "bq_total_assets_mr"
                                || d?.name === "bq_net_income_mr"
                                || d?.name === "bq_ebitda_margin_mr"
                                || d?.name === "bq_net_profit_margin_mr"
                                || d?.name === "bq_revenue_mr" ||
                                d?.name === "bq_current_employees_plan_growth_yoy_mr"
                                || d?.name === "bq_revenue_growth_yoy_mr" ||
                                d?.name === "bq_cor_mr" || d?.name === "bq_gross_profit_mr" || d?.name === "bq_payroll_mr" ||
                                d?.name === "bq_operating_expenses_mr" || d?.name === "bq_operating_income_mr" ||
                                d?.name === "bq_tax_and_interest_mr" || d?.name === "bq_asset_turnover_mr" ||
                                d?.name === "bq_return_on_assets_mr" || d?.name === "bq_return_on_sales_mr" ||
                                d?.name === "bq_revenue_growth_quarterly_yoy_mr" ||
                                d?.name === "bq_current_employees_plan_growth_quarterly_yoy_mr" ||
                                d?.name === "bq_current_employees_plan_growth_monthly_yoy_mr" ||
                                d?.name === "bq_revenue_growth_qoq_mr" ||
                                d?.name === "bq_current_employees_plan_growth_qoq_mr" ||
                                d?.name === "bq_current_employees_plan_growth_mom_mr"
                            ) {
                                return <ScreenarCardInput d={d} tempState={tempState}
                                    handleChange={handleChange}
                                    floading={floading}
                                    filters={filters}
                                    clear={clear} />
                            }
                            else {
                                return <SfcCard2 d={d} tempState={tempState}
                                    handleChange={handleChange}
                                    floading={floading}
                                    filters={filters}
                                    clear={clear}
                                />
                            }

                        }) : ""
                    }


                </div>}

            </div>


        </div>
    )
}

export default ScreenarCard2
