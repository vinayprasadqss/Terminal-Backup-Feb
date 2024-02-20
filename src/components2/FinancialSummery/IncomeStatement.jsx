import { Switch } from 'antd';
import millify from 'millify';
import React, { useEffect, useState } from 'react';





const leftHead = [
    'Revenue',
    'Cost of Revenue',
    'Gross Profit',
    'Operating Expenses',
    'Operating Income',
    'Tax and Interest Expenses',
    'Net Income',
    'EBITDA',
    'Employment',
    'Payroll'
]

const IncomeStatement = ({ state, loading, img, toggle, setToggle }) => {




    const [years, setYears] = useState(
        // [{ year: 2022, quarter: 4 },
        // { year: 2023, quarter: 1 },
        // { year: 2023, quarter: 2 },
        // { year: 2023, quarter: 3 },
        // ]
    );
    const [ny, setNy] = useState()


    const checkYear = () => {
        if (state?.hasOwnProperty("quarterly_revenue")) {
            if (state?.quarterly_revenue?.length > 0 && state?.quarterly_revenue[0]?.hasOwnProperty("year")) {
                let temp2 = state?.quarterly_revenue?.sort((a, b) => {
                    if (a?.year !== b?.year) {
                        return a?.year - b?.year;
                    }
                    return a?.quarter - b?.quarter;
                });
                if (temp2?.length === 4) {
                    // console.log("hhhh", temp2)
                    setYears([{ year: temp2[0]?.year, quarter: temp2[0]?.quarter },
                    { year: temp2[1]?.year, quarter: temp2[1]?.quarter },
                    { year: temp2[2]?.year, quarter: temp2[2]?.quarter },
                    { year: temp2[3]?.year, quarter: temp2[3]?.quarter },
                    ]?.reverse())
                }
                else if (temp2?.length === 3) {
                    setYears([
                        { year: temp2[temp2?.length - 3]?.year - 1, quarter: temp2[temp2?.length - 3]?.quarter },
                        { year: temp2[temp2?.length - 3]?.year, quarter: temp2[temp2?.length - 3]?.quarter },
                        { year: temp2[temp2?.length - 2]?.year, quarter: temp2[temp2?.length - 2]?.quarter },
                        { year: temp2[temp2?.length - 1]?.year, quarter: temp2[temp2?.length - 1]?.quarter },



                    ]?.reverse())
                }
                else if (temp2?.length === 2) {
                    setYears([
                        { year: temp2[temp2?.length - 2]?.year - 2, quarter: temp2[temp2?.length - 2]?.quarter },
                        { year: temp2[temp2?.length - 2]?.year - 1, quarter: temp2[temp2?.length - 2]?.quarter },
                        { year: temp2[temp2?.length - 2]?.year, quarter: temp2[temp2?.length - 2]?.quarter },
                        { year: temp2[temp2?.length - 1]?.year, quarter: temp2[temp2?.length - 1]?.quarter },



                    ]?.reverse())
                }
                else if (temp2?.length === 1) {
                    setYears([
                        { year: temp2[temp2?.length - 1]?.year - 3, quarter: temp2[temp2?.length - 1]?.quarter },
                        { year: temp2[temp2?.length - 1]?.year - 2, quarter: temp2[temp2?.length - 1]?.quarter },
                        { year: temp2[temp2?.length - 1]?.year - 1, quarter: temp2[temp2?.length - 1]?.quarter },
                        { year: temp2[temp2?.length - 1]?.year, quarter: temp2[temp2?.length - 1]?.quarter },



                    ]?.reverse())
                }
            } else {
                // console.log("gfdgfd")
                setYears([{ year: 2022, quarter: 4 },
                { year: 2023, quarter: 1 },
                { year: 2023, quarter: 2 },
                { year: 2023, quarter: 3 },
                ]?.reverse())
            }
        } else {
            setYears([{ year: 2022, quarter: 4 },
            { year: 2023, quarter: 1 },
            { year: 2023, quarter: 2 },
            { year: 2023, quarter: 3 },
            ]?.reverse())
        }
    }

    const checkNYear = () => {
        if (state?.hasOwnProperty("yearly_revenue")) {
            if (state?.yearly_revenue?.length > 0 && state?.yearly_revenue[0]?.hasOwnProperty("year")) {
                let temp2 = state?.yearly_revenue?.sort((a, b) => a?.year - b?.year)

                if (temp2?.length === 4) {
                    setNy([temp2[0]?.year, temp2[1]?.year, temp2[2]?.year, temp2[3]?.year]?.reverse());
                }
                else if (temp2?.length === 3) {
                    setNy([temp2[0]?.year - 0, temp2[0]?.year - 1, temp2[1]?.year, temp2[2]?.year]?.reverse())
                }
                else if (temp2?.length === 2) {
                    setNy([temp2[0]?.year - 2, temp2[0]?.year - 1, temp2[0]?.year, temp2[1]?.year]?.reverse())
                }
                else if (temp2?.length === 1) {
                    setNy([temp2[0]?.year - 3, temp2[0]?.year - 2, temp2[0]?.year - 1, temp2[0]?.year]?.reverse())
                }
            } else {
                setNy([2020, 2021, 2022, 2023]?.reverse())
            }
        } else {
            setNy([2020, 2021, 2022, 2023]?.reverse())
        }
    }



    useEffect(() => {
        checkYear()
        if (toggle) {

        } checkNYear()


    }, [state, toggle])

    // console.log(years)

    return (
        <>
            <div className="switch">
                Quarterly{" "}
                <Switch checked={toggle} onChange={(e) => { setToggle(e) }} size="small" />{" "}
                Yearly
            </div>
            <div className={"tableWrapper"}>
                {loading ? <div className="loader">
                    <img src={img} />
                </div> :



                    <table cellPadding={"0"} cellSpacing={"0"} style={{ userSelect: "none" }}>
                        <thead>
                            <tr>
                                <th></th>
                                {
                                    toggle === true ? ny?.map((d) => (
                                        <th><strong>{d}</strong></th>
                                    )) :
                                        years?.map((d, i) => (
                                            <th><strong>Q{d?.quarter} {d?.year}</strong></th>
                                        ))
                                }


                            </tr>
                        </thead>
                        <tbody >
                            <tr>
                                <th><strong>Revenue</strong></th>
                                {toggle === true ? ny?.map((d, i) => {
                                    let t = 0;
                                    t = state?.yearly_revenue?.find((f) => (f?.year === d))
                                    if (t?.revenue) {
                                        return <td key={i + "yrevenue"}>{t?.revenue < 0 ? "-$" + millify(Math.abs(t?.revenue)) :
                                            "$" + millify(Math.abs(t?.revenue))}</td>
                                    } else {
                                        return <td>-</td>
                                    }
                                }) :
                                    years?.map((d, i) => {
                                        let t = 0;
                                        t = state?.quarterly_revenue?.find((f) => (f?.year === d?.year) && (f?.quarter === d?.quarter))
                                        if (t?.revenue) {
                                            return <td key={i + "revenue"}>{t?.revenue < 0 ? "-$" + millify(Math.abs(t?.revenue)) :
                                                "$" + millify(Math.abs(t?.revenue))}</td>
                                        } else {
                                            return <td>-</td>
                                        }
                                    })
                                }

                            </tr>
                            <tr>
                                <th>Cost of Revenue</th>
                                {
                                    toggle === true ? ny?.map((d, i) => {
                                        let t = 0;
                                        t = state?.yearly_bq_cor?.find((f) => (f?.year === d))
                                        if (t?.bq_cor) {
                                            return <td key={i + "ybq_cor"}>{t?.bq_cor < 0 ? "-$" + millify(Math.abs(t?.bq_cor)) :
                                                "$" + millify(Math.abs(t?.bq_cor))}</td>
                                        } else {
                                            return <td>-</td>
                                        }
                                    }) :
                                        years?.map((d, i) => {
                                            let t = 0;
                                            t = state?.quarterly_bq_cor?.find((f) => (f?.year === d?.year) && (f?.quarter === d?.quarter))
                                            if (t?.bq_cor) {
                                                return <td key={i + "bq_cor"}>{t?.bq_cor < 0 ? "-$" + millify(Math.abs(t?.bq_cor)) :
                                                    "$" + millify(Math.abs(t?.bq_cor))}</td>
                                            } else {
                                                return <td>-</td>
                                            }
                                        })
                                }
                            </tr>
                            <tr>
                                <th><strong>Gross Profit</strong></th>
                                {
                                    toggle === true ?
                                        ny?.map((d, i) => {
                                            let t = 0;
                                            t = state?.yearly_bq_gross_profit?.find((f) => (f?.year === d))
                                            if (t?.bq_gross_profit) {
                                                return <td key={i + "ygp"}>{t?.bq_gross_profit < 0 ? "-$" + millify(Math.abs(t?.bq_gross_profit)) :
                                                    "$" + millify(Math.abs(t?.bq_gross_profit))}</td>
                                            } else {
                                                return <td>-</td>
                                            }
                                        }) :
                                        years?.map((d, i) => {
                                            let t = 0;
                                            t = state?.quarterly_bq_gross_profit?.find((f) => (f?.year === d?.year) && (f?.quarter === d?.quarter))
                                            if (t?.bq_gross_profit) {
                                                return <td key={i + "gp"}>{t?.bq_gross_profit < 0 ? "-$" + millify(Math.abs(t?.bq_gross_profit)) :
                                                    "$" + millify(Math.abs(t?.bq_gross_profit))}</td>
                                            } else {
                                                return <td>-</td>
                                            }
                                        })
                                }
                            </tr>
                            <tr>
                                <th>Operating Expenses</th>
                                {
                                    toggle === true ? ny?.map((d, i) => {
                                        let t = 0;
                                        t = state?.yearly_bq_operating_expenses?.find((f) => (f?.year === d))
                                        if (t?.bq_operating_expenses) {
                                            return <td key={i + "yoe"}>{t?.bq_operating_expenses < 0 ? "-$" + millify(Math.abs(t?.bq_operating_expenses)) :
                                                "$" + millify(Math.abs(t?.bq_operating_expenses))}</td>
                                        } else {
                                            return <td>-</td>
                                        }
                                    }) :
                                        years?.map((d, i) => {
                                            let t = 0;
                                            t = state?.quarterly_bq_operating_expenses?.find((f) => (f?.year === d?.year) && (f?.quarter === d?.quarter))
                                            if (t?.bq_operating_expenses) {
                                                return <td key={i + "oe"}>{t?.bq_operating_expenses < 0 ? "-$" + millify(Math.abs(t?.bq_operating_expenses)) :
                                                    "$" + millify(Math.abs(t?.bq_operating_expenses))}</td>
                                            } else {
                                                return <td>-</td>
                                            }
                                        })
                                }
                            </tr>
                            <tr>
                                <th><strong>Operating Income</strong></th>
                                {
                                    toggle === true ? ny?.map((d, i) => {
                                        let t = 0;
                                        t = state?.yearly_bq_operating_income?.find((f) => (f?.year === d))
                                        if (t?.bq_operating_income) {
                                            return <td key={i + "yoi"}>{t?.bq_operating_income < 0 ? "-$" + millify(Math.abs(t?.bq_operating_income)) :
                                                "$" + millify(Math.abs(t?.bq_operating_income))}</td>
                                        } else {
                                            return <td>-</td>
                                        }
                                    }) :
                                        years?.map((d, i) => {
                                            let t = 0;
                                            t = state?.quarterly_bq_operating_income?.find((f) => (f?.year === d?.year) && (f?.quarter === d?.quarter))
                                            if (t?.bq_operating_income) {
                                                return <td key={i + "oi"}>{t?.bq_operating_income < 0 ? "-$" + millify(Math.abs(t?.bq_operating_income)) :
                                                    "$" + millify(Math.abs(t?.bq_operating_income))}</td>
                                            } else {
                                                return <td>-</td>
                                            }
                                        })
                                }
                            </tr>
                            <tr>
                                <th>Tax and Interest Expenses</th>
                                {
                                    toggle === true ? ny?.map((d, i) => {
                                        let t = 0;
                                        t = state?.yearly_bq_tax_and_interest?.find((f) => (f?.year === d))
                                        if (t?.bq_tax_and_interest) {
                                            return <td key={i + "ytex"}>{t?.bq_tax_and_interest < 0 ? "-$" + millify(Math.abs(t?.bq_tax_and_interest)) :
                                                "$" + millify(Math.abs(t?.bq_tax_and_interest))}</td>
                                        } else {
                                            return <td>-</td>
                                        }
                                    }) :
                                        years?.map((d, i) => {
                                            let t = 0;
                                            t = state?.quarterly_bq_tax_and_interest?.find((f) => (f?.year === d?.year) && (f?.quarter === d?.quarter))
                                            if (t?.bq_tax_and_interest) {
                                                return <td key={i + "tex"}>{t?.bq_tax_and_interest < 0 ? "-$" + millify(Math.abs(t?.bq_tax_and_interest)) :
                                                    "$" + millify(Math.abs(t?.bq_tax_and_interest))}</td>
                                            } else {
                                                return <td>-</td>
                                            }
                                        })
                                }
                            </tr>
                            <tr>
                                <th><strong>Net Income</strong></th>
                                {
                                    toggle === true ? ny?.map((d, i) => {
                                        let t = 0;
                                        t = state?.yearly_bq_net_income?.find((f) => (f?.year === d))
                                        if (t?.bq_net_income) {

                                            return <td key={i + "yNI"}>{t?.bq_net_income < 0 ? "-$" + millify(Math.abs(t?.bq_net_income)) :
                                                "$" + millify(Math.abs(t?.bq_net_income))}</td>
                                        } else {
                                            return <td>-</td>
                                        }
                                    }) :
                                        years?.map((d, i) => {
                                            let t = 0;
                                            t = state?.quarterly_bq_net_income?.find((f) => (f?.year === d?.year) && (f?.quarter === d?.quarter))
                                            if (t?.bq_net_income) {

                                                return <td key={i + "NI"}>{t?.bq_net_income < 0 ? "-$" + millify(Math.abs(t?.bq_net_income)) :
                                                    "$" + millify(Math.abs(t?.bq_net_income))}</td>
                                            } else {
                                                return <td>-</td>
                                            }
                                        })
                                }
                            </tr>
                            <tr>
                                <td colSpan={"5"}></td>
                            </tr>
                            <tr>
                                <th><strong>EBITDA</strong></th>
                                {
                                    toggle === true ? ny?.map((d, i) => {
                                        let t = 0;
                                        t = state?.yearly_ebitda?.find((f) => (f?.year === d))
                                        if (t?.ebitda) {

                                            return <td key={i + "ebitda"}>{t?.ebitda < 0 ? "-$" + millify(Math.abs(t?.ebitda)) : "$" + millify(Math.abs(t?.ebitda))}</td>
                                        } else {
                                            return <td>-</td>
                                        }
                                    }) :
                                        years?.map((d, i) => {
                                            let t = 0;
                                            t = state?.quarterly_ebitda?.find((f) => (f?.year === d?.year) && (f?.quarter === d?.quarter))
                                            if (t?.ebitda) {

                                                return <td key={i + "ebitda"}>{t?.ebitda < 0 ? "-$" + millify(Math.abs(t?.ebitda)) : "$" + millify(Math.abs(t?.ebitda))}</td>
                                            } else {
                                                return <td>-</td>
                                            }
                                        })
                                }
                            </tr>
                            <tr>
                                <td colSpan={"5"}></td>
                            </tr>
                            <tr>
                                <th><strong>Employment</strong></th>
                                {
                                    toggle === true ? ny?.map((d, i) => {
                                        let t = 0;
                                        t = state?.yearly_headcount
                                            ?.find((f) => (f?.year === d))
                                        if (t?.headcount) {

                                            return <td key={i + "headcount"}>{t?.headcount < 0 ? millify(Math.abs(t?.headcount)) :
                                                millify(Math.abs(t?.headcount))}</td>
                                        } else {
                                            return <td>-</td>
                                        }
                                    }) :
                                        years?.map((d, i) => {
                                            let t = 0;
                                            t = state?.quarterly_headcount
                                                ?.find((f) => (f?.year === d?.year) && (f?.quarter === d?.quarter))
                                            if (t?.headcount) {

                                                return <td key={i + "headcount"}>{t?.headcount < 0 ? millify(Math.abs(t?.headcount)) :
                                                    millify(Math.abs(t?.headcount))}</td>
                                            } else {
                                                return <td>-</td>
                                            }
                                        })
                                }

                            </tr>

                            <tr>
                                <th><strong>Payroll</strong></th>
                                {
                                    toggle === true ? ny?.map((d, i) => {
                                        let t = 0;
                                        t = state?.yearly_bq_payroll?.find((f) => (f?.year === d))
                                        if (t?.bq_payroll) {

                                            return <td key={i + "NI"}>{t?.bq_payroll < 0 ? "-$" + millify(Math.abs(t?.bq_payroll)) :
                                                "$" + millify(Math.abs(t?.bq_payroll))}</td>
                                        } else {
                                            return <td>-</td>
                                        }
                                    }) :
                                        years?.map((d, i) => {
                                            let t = 0;
                                            t = state?.quarterly_bq_payroll?.find((f) => (f?.year === d?.year) && (f?.quarter === d?.quarter))
                                            if (t?.bq_payroll) {

                                                return <td key={i + "NI"}>{t?.bq_payroll < 0 ? "-$" + millify(Math.abs(t?.bq_payroll)) :
                                                    "$" + millify(Math.abs(t?.bq_payroll))}</td>
                                            } else {
                                                return <td>-</td>
                                            }
                                        })
                                }

                            </tr>

                        </tbody>
                    </table>

                }


            </div>
        </>

    )
}
export default IncomeStatement;
