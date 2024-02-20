import React, { useState, useEffect } from "react";
import AreaChart from "../graphs/AreaChart";
import MultiAreaGraph from "../graphs/MultiAreaGraph";
import { reporttabledata, reporttabledata2 } from "../../constants/Report";
import BarChart from "../graphs/BarChart";
import millify from "millify";

const AnnualFinancialSummery = ({ state, ts, img1, img, tsm }) => {
  const [graphYear, setGraphYear] = useState([]);
  const [easy, setEasy] = useState([]);

  const FindYearData = () => {
    const arr = ts?.filter(
      (f) =>
        f?.ts_bq_year === 2019 ||
        f?.ts_bq_year === 2020 ||
        f?.ts_bq_year === 2021 ||
        f?.ts_bq_year === 2022 ||
        f?.ts_bq_year === 2023
    );
    setGraphYear(arr?.sort((a, b) => a?.ts_bq_year - b?.ts_bq_year));
  };

  const FindYearData2 = () => {
    const arr = tsm?.filter(
      (f) =>
        f?.tsm_bq_year === 2019 ||
        f?.tsm_bq_year === 2020 ||
        f?.tsm_bq_year === 2021 ||
        f?.tsm_bq_year === 2022 ||
        f?.tsm_bq_year === 2023
    );
    setEasy(arr?.sort((a, b) => a?.tsm_bq_year - b?.tsm_bq_year));
  };

  useEffect(() => {
    FindYearData();
  }, [ts]);

  useEffect(() => {
    FindYearData2();
  }, [tsm]);

  // console.log(easy, "easy", tsm);
  return (
    <section className="report">
      <div className="head-bar">
        <div className="h-left">
          <h3>
            Annual Financial Summery:<span>{state?.firmo_bq_company_name}</span>
          </h3>
          <div className="y-bar"></div>
          <h4>
            Sector: <span>{state?.firmo_bq_irs_sector_name}</span>
          </h4>
        </div>
        <div className="h-right">
          <img src={img} />
          <div className="text-group">
            <h4>Operating Status</h4>
            <span>|</span>
            <h4 className="b">
              {state?.firmo_bq_company_isactive === 1 ? "Active" : "Inactive"}
            </h4>
          </div>
        </div>
      </div>
      <div className="wraper">
        <div className="wleft">
          <div className="wl1">
            <div className="wtop"></div>
            <h5>YoY Key Performance Indicators 2023</h5>
            <br></br>
            <div className="pcards">
              <div className="pcard">
                <h6>
                  Employment<br></br> Growth
                </h6>
                <h4>
                  {state?.hasOwnProperty(
                    "mr_bq_current_employees_plan_growth_yoy_mr"
                  )
                    ? millify(
                      Number(
                        state?.mr_bq_current_employees_plan_growth_yoy_mr
                      )
                    ) + "%"
                    : "N/A"}
                </h4>
              </div>
              <div className="pcard">
                <h6>
                  Employment<br></br> Change
                </h6>
                <h4>
                  {state?.hasOwnProperty("mr_bq_revenue_mr_per_emp")
                    ? millify(state?.mr_bq_revenue_mr_per_emp)
                    : "N/A"}
                </h4>
              </div>
            </div>
            <div className="pcards">
              <div className="pcard">
                <h6>Revenue Growth</h6>
                <h4>
                  {state?.hasOwnProperty("mr_bq_revenue_growth_yoy_mr")
                    ? millify(state?.mr_bq_revenue_growth_yoy_mr) + "%"
                    : "N/A"}
                </h4>
              </div>
              <div className="pcard">
                <h6>Revenue Change</h6>
                <h4>
                  {state?.hasOwnProperty("mr_bq_revenue_mr")
                    ? millify(state?.mr_bq_revenue_mr)
                    : "N/A"}
                </h4>
              </div>
            </div>
            <div className="pcards">
              <div className="pcard">
                <h6>Operating income Growth</h6>
                <h4>N/A</h4>
              </div>
              <div className="pcard">
                <h6>Operating Income Change</h6>
                <h4>
                  {state?.hasOwnProperty("mr_bq_operating_income_mr")
                    ? millify(state?.mr_bq_operating_income_mr)
                    : "N/A"}
                </h4>
              </div>
            </div>
            <div className="pcards">
              <div className="pcard">
                <h6>Net Income Growth</h6>
                <h4>N/A</h4>
              </div>
              <div className="pcard">
                <h6>Net Income Change</h6>
                <h4>
                  {state?.hasOwnProperty("mr_bq_net_income_mr")
                    ? millify(state?.mr_bq_net_income_mr)
                    : "N/A"}
                </h4>
              </div>
            </div>
            <br></br>
            <div className="glcard">
              <h6>Company Employment Trends (january of Year)</h6>
              {/* <SingleLineChart containerId="container121" /> */}
              <AreaChart
                containerId="container121"
                width={280}
                height={220}
                data1={[
                  Number(
                    graphYear[0]?.ts_bq_year === 2019
                      ? graphYear[0]?.ts_bq_revenue_per_emp
                      : 0
                  ),
                  Number(
                    graphYear[0]?.ts_bq_year === 2020
                      ? graphYear[0]?.ts_bq_revenue_per_emp
                      : 0
                  ),
                  Number(
                    graphYear[0]?.ts_bq_year === 2021
                      ? graphYear[0]?.ts_bq_revenue_per_emp
                      : 0
                  ),
                  Number(
                    graphYear[0]?.ts_bq_year === 2022
                      ? graphYear[0]?.ts_bq_revenue_per_emp
                      : 0
                  ),
                  Number(
                    graphYear[0]?.ts_bq_year === 2023
                      ? graphYear[0]?.ts_bq_revenue_per_emp
                      : 0
                  ),
                ]}
              />
            </div>
          </div>
          <div className="wl2">
            <div className="wlcard">
              <h6>Selling Totals</h6>
              {/* <MultiLineChart containerId="container11" /> */}
              <MultiAreaGraph
                containerId="container11"
                linecolor={"#303c92"}
                labelcolor={"#000"}
                data1={[
                  Number(
                    easy[0]?.tsm_bq_year === 2019
                      ? easy[0]?.tsm_bq_current_employees_plan
                      : 0
                  ),
                  Number(
                    easy[0]?.tsm_bq_year === 2020
                      ? easy[0]?.tsm_bq_current_employees_plan
                      : 0
                  ),
                  Number(
                    easy[0]?.tsm_bq_year === 2021
                      ? easy[0]?.tsm_bq_current_employees_plan
                      : 0
                  ),
                  Number(
                    easy[0]?.tsm_bq_year === 2022
                      ? easy[0]?.tsm_bq_current_employees_plan
                      : 0
                  ),
                  Number(
                    easy[0]?.tsm_bq_year === 2023
                      ? easy[0]?.tsm_bq_current_employees_plan
                      : 0
                  ),
                ]}
                data2={[
                  Number(
                    easy[1]?.tsm_bq_year === 2019
                      ? easy[1]?.tsm_bq_current_employees_plan
                      : 0
                  ),
                  Number(
                    easy[1]?.tsm_bq_year === 2020
                      ? easy[1]?.tsm_bq_current_employees_plan
                      : 0
                  ),
                  Number(
                    easy[1]?.tsm_bq_year === 2021
                      ? easy[1]?.tsm_bq_current_employees_plan
                      : 0
                  ),
                  Number(
                    easy[1]?.tsm_bq_year === 2022
                      ? easy[1]?.tsm_bq_current_employees_plan
                      : 0
                  ),
                  Number(
                    easy[1]?.tsm_bq_year === 2023
                      ? easy[1]?.tsm_bq_current_employees_plan
                      : 0
                  ),
                ]}
                data3={[
                  Number(
                    easy[2]?.tsm_bq_year === 2019
                      ? easy[2]?.tsm_bq_current_employees_plan
                      : 0
                  ),
                  Number(
                    easy[2]?.tsm_bq_year === 2020
                      ? easy[2]?.tsm_bq_current_employees_plan
                      : 0
                  ),
                  Number(
                    easy[2]?.tsm_bq_year === 2021
                      ? easy[2]?.tsm_bq_current_employees_plan
                      : 0
                  ),
                  Number(
                    easy[2]?.tsm_bq_year === 2022
                      ? easy[2]?.tsm_bq_current_employees_plan
                      : 0
                  ),
                  Number(
                    easy[2]?.tsm_bq_year === 2023
                      ? easy[2]?.tsm_bq_current_employees_plan
                      : 0
                  ),
                ]}
              />
            </div>
            <div className="wlcard">
              <h6>operating Totals</h6>
              {/* <MultiLineChart containerId="container21" /> */}
              <MultiAreaGraph
                containerId="container21"
                linecolor={"#303c92"}
                labelcolor={"#000"}
                data1={[
                  Number(
                    easy[0]?.tsm_bq_year === 2019
                      ? easy[0]?.tsm_bq_current_employees_plan_seasonal
                      : 0
                  ),
                  Number(
                    easy[0]?.tsm_bq_year === 2020
                      ? easy[0]?.tsm_bq_current_employees_plan_seasonal
                      : 0
                  ),
                  Number(
                    easy[0]?.tsm_bq_year === 2021
                      ? easy[0]?.tsm_bq_current_employees_plan_seasonal
                      : 0
                  ),
                  Number(
                    easy[0]?.tsm_bq_year === 2022
                      ? easy[0]?.tsm_bq_current_employees_plan_seasonal
                      : 0
                  ),
                  Number(
                    easy[0]?.tsm_bq_year === 2023
                      ? easy[0]?.tsm_bq_current_employees_plan_seasonal
                      : 0
                  ),
                ]}
                data2={[
                  Number(
                    easy[1]?.tsm_bq_year === 2019
                      ? easy[1]?.tsm_bq_current_employees_plan_seasonal
                      : 0
                  ),
                  Number(
                    easy[1]?.tsm_bq_year === 2020
                      ? easy[1]?.tsm_bq_current_employees_plan_seasonal
                      : 0
                  ),
                  Number(
                    easy[1]?.tsm_bq_year === 2021
                      ? easy[1]?.tsm_bq_current_employees_plan_seasonal
                      : 0
                  ),
                  Number(
                    easy[1]?.tsm_bq_year === 2022
                      ? easy[1]?.tsm_bq_current_employees_plan_seasonal
                      : 0
                  ),
                  Number(
                    easy[1]?.tsm_bq_year === 2023
                      ? easy[1]?.tsm_bq_current_employees_plan_seasonal
                      : 0
                  ),
                ]}
                data3={[
                  Number(
                    easy[2]?.tsm_bq_year === 2019
                      ? easy[2]?.tsm_bq_current_employees_plan_seasonal
                      : 0
                  ),
                  Number(
                    easy[2]?.tsm_bq_year === 2020
                      ? easy[2]?.tsm_bq_current_employees_plan_seasonal
                      : 0
                  ),
                  Number(
                    easy[2]?.tsm_bq_year === 2021
                      ? easy[2]?.tsm_bq_current_employees_plan_seasonal
                      : 0
                  ),
                  Number(
                    easy[2]?.tsm_bq_year === 2022
                      ? easy[2]?.tsm_bq_current_employees_plan_seasonal
                      : 0
                  ),
                  Number(
                    easy[2]?.tsm_bq_year === 2023
                      ? easy[2]?.tsm_bq_current_employees_plan_seasonal
                      : 0
                  ),
                ]}
              />
            </div>
            <div className="wlcard">
              <h6>profit Totals</h6>
              {/* <MultiLineChart containerId="container31" /> */}
              <MultiAreaGraph
                containerId="container31"
                linecolor={"#303c92"}
                labelcolor={"#000"}
                data1={[
                  Number(
                    easy[0]?.tsm_bq_year === 2019 ? easy[0]?.tsm_bq_payroll : 0
                  ),
                  Number(
                    easy[0]?.tsm_bq_year === 2020 ? easy[0]?.tsm_bq_payroll : 0
                  ),
                  Number(
                    easy[0]?.tsm_bq_year === 2021 ? easy[0]?.tsm_bq_payroll : 0
                  ),
                  Number(
                    easy[0]?.tsm_bq_year === 2022 ? easy[0]?.tsm_bq_payroll : 0
                  ),
                  Number(
                    easy[0]?.tsm_bq_year === 2023 ? easy[0]?.tsm_bq_payroll : 0
                  ),
                ]}
                data2={[
                  Number(
                    easy[1]?.tsm_bq_year === 2019 ? easy[1]?.tsm_bq_payroll : 0
                  ),
                  Number(
                    easy[1]?.tsm_bq_year === 2020 ? easy[1]?.tsm_bq_payroll : 0
                  ),
                  Number(
                    easy[1]?.tsm_bq_year === 2021 ? easy[1]?.tsm_bq_payroll : 0
                  ),
                  Number(
                    easy[1]?.tsm_bq_year === 2022 ? easy[1]?.tsm_bq_payroll : 0
                  ),
                  Number(
                    easy[1]?.tsm_bq_year === 2023 ? easy[1]?.tsm_bq_payroll : 0
                  ),
                ]}
                data3={[
                  Number(
                    easy[2]?.tsm_bq_year === 2019 ? easy[2]?.tsm_bq_payroll : 0
                  ),
                  Number(
                    easy[2]?.tsm_bq_year === 2020 ? easy[2]?.tsm_bq_payroll : 0
                  ),
                  Number(
                    easy[2]?.tsm_bq_year === 2021 ? easy[2]?.tsm_bq_payroll : 0
                  ),
                  Number(
                    easy[2]?.tsm_bq_year === 2022 ? easy[2]?.tsm_bq_payroll : 0
                  ),
                  Number(
                    easy[2]?.tsm_bq_year === 2023 ? easy[2]?.tsm_bq_payroll : 0
                  ),
                ]}
              />
            </div>
          </div>
        </div>
        <div className="wright">
          <table className="report-table">
            <thead>
              <th>Financials</th>
              <th>2019</th>
              <th>2020</th>
              <th>2021</th>
              <th>2022</th>
              <th>2023</th>
            </thead>
            <tbody>
              {reporttabledata?.map((d, i) => (
                <tr className={i % 2 === 0 ? "" : "even"} key={i + "ghfg"}>
                  <td>{d?.financial}</td>
                  <td>{d?.y1}</td>
                  <td>{d?.y2}</td>
                  <td>{d?.y3}</td>
                  <td>{d?.y4}</td>
                  <td>{d?.y5}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <table className="report-table">
            <thead>
              <th>% of Revenue</th>
              <th>2019</th>
              <th>2020</th>
              <th>2021</th>
              <th>2022</th>
              <th>2023</th>
            </thead>
            <tbody>
              {reporttabledata2?.map((d, i) => (
                <tr className={i % 2 === 0 ? "" : "even"} key={i + "gfdgfdg"}>
                  <td>{d?.financial}</td>
                  <td>{d?.y1}</td>
                  <td>{d?.y2}</td>
                  <td>{d?.y3}</td>
                  <td>{d?.y4}</td>
                  <td>{d?.y5}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h5>Company Financial Ratios</h5>
          <div className="bar-graphs">
            <div className="gone">
              <h6>Assets turnover</h6>
              <BarChart
                containerId="container1"
                data1={[
                  Number(
                    graphYear[0]?.ts_bq_year === 2019
                      ? graphYear[0]?.ts_bq_asset_turnover
                      : 0
                  ),
                  Number(
                    graphYear[0]?.ts_bq_year === 2020
                      ? graphYear[0]?.ts_bq_asset_turnover
                      : 0
                  ),
                  Number(
                    graphYear[0]?.ts_bq_year === 2021
                      ? graphYear[0]?.ts_bq_asset_turnover
                      : 0
                  ),
                  Number(
                    graphYear[0]?.ts_bq_year === 2022
                      ? graphYear[0]?.ts_bq_asset_turnover
                      : 0
                  ),
                  Number(
                    graphYear[0]?.ts_bq_year === 2023
                      ? graphYear[0]?.ts_bq_asset_turnover
                      : 0
                  ),
                ]}
              />
            </div>
            <div className="gone">
              <h6>Return on assets</h6>
              <BarChart
                containerId="container2"
                data1={[
                  Number(
                    graphYear[0]?.ts_bq_year === 2019
                      ? graphYear[0]?.ts_bq_return_on_assets
                      : 0
                  ),
                  Number(
                    graphYear[0]?.ts_bq_year === 2020
                      ? graphYear[0]?.ts_bq_return_on_assets
                      : 0
                  ),
                  Number(
                    graphYear[0]?.ts_bq_year === 2021
                      ? graphYear[0]?.ts_bq_return_on_assets
                      : 0
                  ),
                  Number(
                    graphYear[0]?.ts_bq_year === 2022
                      ? graphYear[0]?.ts_bq_return_on_assets
                      : 0
                  ),
                  Number(
                    graphYear[0]?.ts_bq_year === 2023
                      ? graphYear[0]?.ts_bq_return_on_assets
                      : 0
                  ),
                ]}
              />
            </div>
            <div className="gone">
              <h6>return on sales</h6>
              <BarChart
                containerId="container3"
                data1={[
                  Number(
                    graphYear[0]?.ts_bq_year === 2019
                      ? graphYear[0]?.ts_bq_return_on_sales
                      : 0
                  ),
                  Number(
                    graphYear[0]?.ts_bq_year === 2020
                      ? graphYear[0]?.ts_bq_return_on_sales
                      : 0
                  ),
                  Number(
                    graphYear[0]?.ts_bq_year === 2021
                      ? graphYear[0]?.ts_bq_return_on_sales
                      : 0
                  ),
                  Number(
                    graphYear[0]?.ts_bq_year === 2022
                      ? graphYear[0]?.ts_bq_return_on_sales
                      : 0
                  ),
                  Number(
                    graphYear[0]?.ts_bq_year === 2023
                      ? graphYear[0]?.ts_bq_return_on_sales
                      : 0
                  ),
                ]}
              />
            </div>
          </div>
        </div>
      </div>
      {/* <div className='last-foot'>
                <p>© 2023 BrightQuery, Inc. All rights reserved. U.S. patent pending. Contact: <span>sales@brightquery.com</span> or 1-888-BQDATA1.</p>
                <img className='minlogo' src={img1} />
            </div> */}
    </section>
  );
};

export default AnnualFinancialSummery;
