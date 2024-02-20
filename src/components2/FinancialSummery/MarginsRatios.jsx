import millify from 'millify';
import React, { useEffect, useState } from 'react';
import MultiLineGraph from './MultiLineChart';
import { Switch } from 'antd';

/*import { Space, Table, Tag } from 'antd';
const { Column, ColumnGroup } = Table;*/


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

const MarginRations = ({ state, loading, img, toggle, setToggle }) => {
    const [years, setYears] = useState(); //For Quarters
    const [ny, setNy] = useState(); //For Years

    ///Quarter based data
    const checkYear = () => {
        let temp2 = [];

        if (state?.hasOwnProperty("quarterly_revenue")) {
            if (state?.quarterly_revenue?.length > 0 && state?.quarterly_revenue[0]?.hasOwnProperty("year")) {
                temp2 = state?.quarterly_revenue?.sort((a, b) => {
                    if (a?.year !== b?.year) {
                        return a?.year - b?.year;
                    }
                    return a?.quarter - b?.quarter;
                });
            }
        }

        if (temp2.length > 3) {
            setYears([
                { year: temp2[0]?.year, quarter: temp2[0]?.quarter },
                { year: temp2[1]?.year, quarter: temp2[1]?.quarter },
                { year: temp2[2]?.year, quarter: temp2[2]?.quarter },
                { year: temp2[3]?.year, quarter: temp2[3]?.quarter },
            ]?.reverse());
        } else if (temp2.length === 3) {
            setYears([
                { year: temp2[temp2?.length - 3]?.year - 1, quarter: temp2[temp2?.length - 3]?.quarter },
                { year: temp2[temp2?.length - 3]?.year, quarter: temp2[temp2?.length - 3]?.quarter },
                { year: temp2[temp2?.length - 2]?.year, quarter: temp2[temp2?.length - 2]?.quarter },
                { year: temp2[temp2?.length - 1]?.year, quarter: temp2[temp2?.length - 1]?.quarter },
            ]?.reverse());
        } else if (temp2.length === 2) {
            setYears([
                { year: temp2[temp2?.length - 2]?.year - 2, quarter: temp2[temp2?.length - 2]?.quarter },
                { year: temp2[temp2?.length - 2]?.year - 1, quarter: temp2[temp2?.length - 2]?.quarter },
                { year: temp2[temp2?.length - 2]?.year, quarter: temp2[temp2?.length - 2]?.quarter },
                { year: temp2[temp2?.length - 1]?.year, quarter: temp2[temp2?.length - 1]?.quarter },
            ]?.reverse());
        } else if (temp2.length === 1) {
            setYears([
                { year: temp2[temp2?.length - 1]?.year - 3, quarter: temp2[temp2?.length - 1]?.quarter },
                { year: temp2[temp2?.length - 1]?.year - 2, quarter: temp2[temp2?.length - 1]?.quarter },
                { year: temp2[temp2?.length - 1]?.year - 1, quarter: temp2[temp2?.length - 1]?.quarter },
                { year: temp2[temp2?.length - 1]?.year, quarter: temp2[temp2?.length - 1]?.quarter },
            ]?.reverse());
        } else {
            // console.log("else")
            setYears([
                { year: 2022, quarter: 4 },
                { year: 2023, quarter: 1 },
                { year: 2023, quarter: 2 },
                { year: 2023, quarter: 3 },
            ]?.reverse());
        }
    };
    ///Years based
    const checkNYear = () => {
        let temp2 = [];
        if (state?.hasOwnProperty("yearly_revenue")) {
            if (state?.yearly_revenue?.length > 0 && state?.yearly_revenue[0]?.hasOwnProperty("year")) {
                // console.log("if")
                temp2 = state?.yearly_revenue?.sort((a, b) => a?.year - b?.year);
                // console.log(temp2)
                if (temp2?.length > 3) {
                    setNy([temp2[0]?.year, temp2[1]?.year, temp2[2]?.year, temp2[3]?.year]?.reverse());
                } else if (temp2?.length === 3) {
                    setNy([temp2[0]?.year - 1, temp2[1]?.year, temp2[2]?.year]?.reverse());
                } else if (temp2?.length === 2) {
                    setNy([temp2[0]?.year - 2, temp2[0]?.year - 1, temp2[0]?.year, temp2[1]?.year]?.reverse());
                } else if (temp2?.length === 1) {
                    setNy([temp2[0]?.year - 3, temp2[0]?.year - 2, temp2[0]?.year - 1, temp2[0]?.year]?.reverse());
                }
            } else {
                setNy([2020, 2021, 2022, 2023]?.reverse());
            }
        } else {
            setNy([2020, 2021, 2022, 2023]?.reverse());
        }
    };


    // console.log(ny)

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
                {loading ? <div className='loader'>
                    <img src={img} /></div> :
                    <table cellPadding={"0"} cellSpacing={"0"} style={{ userSelect: "none" }}>
                        <thead>
                            <tr>
                                <th></th>
                                {
                                    toggle === true ?
                                        ny?.map((d, i) => (
                                            <th><strong> {d}</strong></th>
                                        )) :
                                        years?.map((d, i) => (
                                            <th><strong>Q{d?.quarter} {d?.year}</strong></th>
                                        ))
                                }
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>Gross Profit Margin</th>

                                {
                                    toggle === true ?
                                        ny?.map((d, i) => {
                                            let t = 0;
                                            t = state?.yearly_bq_gross_profit_margin?.find((f) => (f?.year === d))
                                            if (t?.bq_gross_profit_margin) {
                                                return <td key={i + "bq_gross_profit_margin"}>
                                                    {/* {Number(t?.bq_gross_profit_margin) < 0 ? "-$" : "$"} */}
                                                    {Math.abs(Number(t?.bq_gross_profit_margin * 100)).toFixed(2) + "%"}
                                                </td>
                                            } else {
                                                return <td>-</td>
                                            }
                                        }) :
                                        years?.map((d, i) => {
                                            let t = 0;
                                            t = state?.quarterly_bq_gross_profit_margin?.find((f) => (f?.year === d?.year) && (f?.quarter === d?.quarter))
                                            if (t?.bq_gross_profit_margin) {
                                                return <td key={i + "bq_gross_profit_margin"}>
                                                    {/* {Number(t?.bq_gross_profit_margin) < 0 ? "-$" : "$"} */}
                                                    {Math.abs(Number(t?.bq_gross_profit_margin * 100)).toFixed(2) + "%"}
                                                </td>
                                            } else {
                                                return <td>-</td>
                                            }
                                        })
                                }

                            </tr>
                            <tr>
                                <th>Net Profit Margin</th>
                                {
                                    toggle === true ?
                                        ny?.map((d, i) => {
                                            let t = 0;
                                            t = state?.yearly_bq_net_profit_margin?.find((f) => (f?.year === d))
                                            if (t?.bq_net_profit_margin) {
                                                return <td key={i + "bq_net_profit_margin"}>
                                                    {/* {Number(t?.bq_net_profit_margin) < 0 ? "-$" : "$"} */}
                                                    {Math.abs(Number(t?.bq_net_profit_margin * 100)).toFixed(2)}%
                                                </td>
                                            } else {
                                                return <td>-</td>
                                            }
                                        }) :
                                        years?.map((d, i) => {
                                            let t = 0;
                                            t = state?.quarterly_bq_net_profit_margin?.find((f) => (f?.year === d?.year) && (f?.quarter === d?.quarter))
                                            if (t?.bq_net_profit_margin) {
                                                return <td key={i + "bq_net_profit_margin"}>
                                                    {/* {Number(t?.bq_net_profit_margin) < 0 ? "-$" : "$"} */}
                                                    {Math.abs(Number(t?.bq_net_profit_margin * 100)).toFixed(2)}%
                                                </td>
                                            } else {
                                                return <td>-</td>
                                            }
                                        })
                                }

                            </tr>
                            <tr>
                                <th>EBITDA Margin</th>

                                {
                                    toggle === true ?
                                        ny?.map((d, i) => {
                                            let t = 0;
                                            t = state?.yearly_bq_ebitda_margin?.find((f) => (f?.year === d))
                                            if (t?.bq_ebitda_margin) {
                                                return <td key={i + "bq_ebitda_margin"}>
                                                    {/* {Number(t?.bq_ebitda_margin) < 0 ? "-$" : "$"} */}
                                                    {Math.abs(Number(t?.bq_ebitda_margin * 100)).toFixed(2)}%
                                                </td>
                                            } else {
                                                return <td>-</td>
                                            }
                                        }) :
                                        years?.map((d, i) => {
                                            let t = 0;
                                            t = state?.quarterly_bq_ebitda_margin?.find((f) => (f?.year === d?.year) && (f?.quarter === d?.quarter))
                                            if (t?.bq_ebitda_margin) {
                                                return <td key={i + "bq_ebitda_margin"}>
                                                    {/* {Number(t?.bq_ebitda_margin) < 0 ? "-$" : "$"} */}
                                                    {Math.abs(Number(t?.bq_ebitda_margin * 100)).toFixed(2)}%
                                                </td>
                                            } else {
                                                return <td>-</td>
                                            }
                                        })
                                }

                            </tr>
                            <tr>
                                <th>Asset Turnover</th>
                                {
                                    toggle === true ? ny?.map((d, i) => {
                                        let t = 0;
                                        t = state?.yearly_bq_asset_turnover
                                            ?.find((f) => (f?.year === d))
                                        if (t?.bq_asset_turnover) {
                                            return <td key={i + "bq_asset_turnover"}>
                                                {/* {Number(t?.bq_asset_turnover) < 0 ? "-$" : "$"} */}
                                                {Math.abs(Number(t?.bq_asset_turnover)).toFixed(2)}
                                            </td>
                                        } else {
                                            return <td>-</td>
                                        }
                                    }) :
                                        years?.map((d, i) => {
                                            let t = 0;
                                            t = state?.quarterly_bq_asset_turnover
                                                ?.find((f) => (f?.year === d?.year) && (f?.quarter === d?.quarter))
                                            if (t?.bq_asset_turnover) {
                                                return <td key={i + "bq_asset_turnover"}>
                                                    {/* {Number(t?.bq_asset_turnover) < 0 ? "-$" : "$"} */}
                                                    {Math.abs(Number(t?.bq_asset_turnover)).toFixed(2)}
                                                </td>
                                            } else {
                                                return <td>-</td>
                                            }
                                        })
                                }

                            </tr>
                            <tr>
                                <th>Return on Assets</th>
                                {
                                    toggle === true ?
                                        ny?.map((d, i) => {
                                            let t = 0;
                                            t = state?.yearly_bq_return_on_assets?.find((f) => (f?.year === d))
                                            if (t?.bq_return_on_assets) {
                                                return <td key={i + "bq_return_on_assets"}>
                                                    {/* {Number(t?.bq_return_on_assets) < 0 ? "-$" : "$"} */}
                                                    {Math.abs(Number(t?.bq_return_on_assets * 100)).toFixed(2)}%
                                                </td>
                                            } else {
                                                return <td>-</td>
                                            }
                                        }) :
                                        years?.map((d, i) => {
                                            let t = 0;
                                            t = state?.quarterly_bq_return_on_assets?.find((f) => (f?.year === d?.year) && (f?.quarter === d?.quarter))
                                            if (t?.bq_return_on_assets) {
                                                return <td key={i + "bq_return_on_assets"}>
                                                    {/* {Number(t?.bq_return_on_assets) < 0 ? "-$" : "$"} */}
                                                    {Math.abs(Number(t?.bq_return_on_assets * 100)).toFixed(2)}%
                                                </td>
                                            } else {
                                                return <td>-</td>
                                            }
                                        })
                                }

                            </tr>
                            <tr>
                                <th>Return on Sales</th>
                                {
                                    toggle === true ?
                                        ny?.map((d, i) => {
                                            let t = 0;
                                            t = state?.yearly_bq_return_on_sales?.find((f) => (f?.year === d))
                                            if (t?.bq_return_on_sales) {
                                                return <td key={i + "bq_return_on_sales"}>
                                                    {/* {Number(t?.bq_return_on_sales) < 0 ? "-$" : "$"} */}
                                                    {Math.abs(Number(t?.bq_return_on_sales * 100)).toFixed(2)}%
                                                </td>

                                            } else {
                                                return <td>-</td>
                                            }
                                        }) :
                                        years?.map((d, i) => {
                                            let t = 0;
                                            t = state?.quarterly_bq_return_on_sales?.find((f) => (f?.year === d?.year) && (f?.quarter === d?.quarter))
                                            if (t?.bq_return_on_sales) {
                                                return <td key={i + "bq_return_on_sales"}>
                                                    {/* {Number(t?.bq_return_on_sales) < 0 ? "-$" : "$"} */}
                                                    {Math.abs(Number(t?.bq_return_on_sales * 100)).toFixed(2)}%
                                                </td>

                                            } else {
                                                return <td>-</td>
                                            }
                                        })
                                }

                            </tr>
                        </tbody>
                    </table>
                }

                {/* <br></br>
            <MultiLineGraph xlabel={[...years?.map((d) => d?.year + " Q" + d?.quarter)]}
                containerId="container1" datasets={dataset} width={900} height={400} /> */}
            </div >
        </>

    )
}
export default MarginRations;
