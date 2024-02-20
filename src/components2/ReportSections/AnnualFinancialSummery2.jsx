import React, { useState, useEffect } from "react";
import BarChart from "../graphs/BarChart";
import AreaChart from "../graphs/AreaChart";
import MultiAreaGraph from "../graphs/MultiAreaGraph";
import { reporttabledata3, reporttabledata4 } from "../../constants/Report";
import millify from "millify";

const AnnualFinancialSummery2 = ({ state, tsq, img1, img }) => {
  const [graphYear, setGraphYear] = useState([]);
  const [easy, setEasy] = useState([]);
  const [qtable, setQtable] = useState([]);

  const FindYearData = () => {
    const arr = tsq?.filter(
      (f) =>
        (f?.tsq_bq_year === 2019 && f?.tsq_bq_quarter === 1) ||
        (f?.tsq_bq_year === 2020 && f?.tsq_bq_quarter === 1) ||
        (f?.tsq_bq_year === 2021 && f?.tsq_bq_quarter === 1) ||
        (f?.tsq_bq_year === 2022 && f?.tsq_bq_quarter === 1) ||
        (f?.tsq_bq_year === 2023 && f?.tsq_bq_quarter === 1)
    );
    setGraphYear(arr?.sort((a, b) => a?.tsq_bq_year - b?.tsq_bq_year));

    setQtable(arr);
  };

  useEffect(() => {
    FindYearData();
  }, [tsq]);

  // console.log(qtable);

  const makeTable = () => {
    let arr = [];
    arr.push(
      {
        financial: "revenue",
        y1: "$" + millify(qtable[0]?.tsq_bq_revenue),
        y2: "$" + millify(qtable[1]?.tsq_bq_revenue),
        y3: "$" + millify(qtable[2]?.tsq_bq_revenue),
        y4: "$" + millify(qtable[3]?.tsq_bq_revenue),
        y5: "$" + millify(qtable[4]?.tsq_bq_revenue),
      },
      {
        financial: "cost of revenue",
        y1: "$" + millify(qtable[0]?.tsq_bq_cor),
        y2: "$" + millify(qtable[1]?.tsq_bq_cor),
        y3: "$" + millify(qtable[2]?.tsq_bq_cor),
        y4: "$" + millify(qtable[3]?.tsq_bq_cor),
        y5: "$" + millify(qtable[4]?.tsq_bq_cor),
      },
      {
        financial: "gross profit",
        y1: "$" + millify(qtable[0]?.tsq_bq_gross_profit),
        y2: "$" + millify(qtable[1]?.tsq_bq_gross_profit),
        y3: "$" + millify(qtable[2]?.tsq_bq_gross_profit),
        y4: "$" + millify(qtable[3]?.tsq_bq_gross_profit),
        y5: "$" + millify(qtable[4]?.tsq_bq_gross_profit),
      },
      {
        financial: "opex",
        y1: "$" + millify(qtable[0]?.tsq_bq_operating_expenses),
        y2: "$" + millify(qtable[1]?.tsq_bq_operating_expenses),
        y3: "$" + millify(qtable[2]?.tsq_bq_operating_expenses),
        y4: "$" + millify(qtable[3]?.tsq_bq_operating_expenses),
        y5: "$" + millify(qtable[4]?.tsq_bq_operating_expenses),
      },
      {
        financial: "payroll",
        y1: "$" + millify(qtable[0]?.tsq_bq_payroll),
        y2: "$" + millify(qtable[1]?.tsq_bq_payroll),
        y3: "$" + millify(qtable[2]?.tsq_bq_payroll),
        y4: "$" + millify(qtable[3]?.tsq_bq_payroll),
        y5: "$" + millify(qtable[4]?.tsq_bq_payroll),
      },
      {
        financial: "ebita",
        y1: "$" + millify(qtable[0]?.tsq_bq_ebitda),
        y2: "$" + millify(qtable[1]?.tsq_bq_ebitda),
        y3: "$" + millify(qtable[2]?.tsq_bq_ebitda),
        y4: "$" + millify(qtable[3]?.tsq_bq_ebitda),
        y5: "$" + millify(qtable[4]?.tsq_bq_ebitda),
      },
      {
        financial: "oper inc",
        y1: "$" + millify(qtable[0]?.tsq_bq_operating_income),
        y2: "$" + millify(qtable[1]?.tsq_bq_operating_income),
        y3: "$" + millify(qtable[2]?.tsq_bq_operating_income),
        y4: "$" + millify(qtable[3]?.tsq_bq_operating_income),
        y5: "$" + millify(qtable[4]?.tsq_bq_operating_income),
      },
      {
        financial: "tax & intrest",
        y1: "$" + millify(qtable[0]?.tsq_bq_tax_and_interest),
        y2: "$" + millify(qtable[1]?.tsq_bq_tax_and_interest),
        y3: "$" + millify(qtable[2]?.tsq_bq_tax_and_interest),
        y4: "$" + millify(qtable[3]?.tsq_bq_tax_and_interest),
        y5: "$" + millify(qtable[4]?.tsq_bq_tax_and_interest),
      },
      {
        financial: "net income",
        y1: "$" + millify(qtable[0]?.tsq_bq_net_income),
        y2: "$" + millify(qtable[1]?.tsq_bq_net_income),
        y3: "$" + millify(qtable[2]?.tsq_bq_net_income),
        y4: "$" + millify(qtable[3]?.tsq_bq_net_income),
        y5: "$" + millify(qtable[4]?.tsq_bq_net_income),
      },
      {
        financial: "total asset",
        y1: "$" + millify(qtable[0]?.tsq_bq_total_assets),
        y2: "$" + millify(qtable[1]?.tsq_bq_total_assets),
        y3: "$" + millify(qtable[2]?.tsq_bq_total_assets),
        y4: "$" + millify(qtable[3]?.tsq_bq_total_assets),
        y5: "$" + millify(qtable[4]?.tsq_bq_total_assets),
      }
    );

    setEasy(arr);
  };

  useEffect(() => {
    if (qtable?.length > 0) {
      makeTable();
    }
  }, [qtable?.length]);

  console.log(state);

  return (
    <section className="report2">
      <div className="head-bar">
        <div className="h-left">
          <h3>
            Annual Financial Summery:<span>{state?.firmo_bq_company_name}</span>
          </h3>
          <div className="y-bar"></div>
          <h4>
            Industry: <span>{state?.firmo_bq_irs_industry_name}</span>
          </h4>
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
            <h5>
              Quarterly YoY<br></br> Key Performance Indicators<br></br> 2023 Q2
            </h5>
            <br></br>
            <div className="pcards">
              <div className="pcard">
                <h6>
                  Employment<br></br> Growth
                </h6>
                <h4>-38.0%</h4>
              </div>
              <div className="pcard">
                <h6>
                  Employment<br></br> Change
                </h6>
                <h4>-82</h4>
              </div>
            </div>
            <div className="pcards">
              <div className="pcard">
                <h6>Revenue Growth</h6>
                <h4>-21.0%</h4>
              </div>
              <div className="pcard">
                <h6>Revenue Change</h6>
                <h4>($7.2M)</h4>
              </div>
            </div>
            <div className="pcards">
              <div className="pcard">
                <h6>Operating income Growth</h6>
                <h4>-29.4%</h4>
              </div>
              <div className="pcard">
                <h6>Operating Income Change</h6>
                <h4>($824.5K)</h4>
              </div>
            </div>
            <div className="pcards">
              <div className="pcard">
                <h6>Net Income Growth</h6>
                <h4>-19.1%</h4>
              </div>
              <div className="pcard">
                <h6>Net Income Change</h6>
                <h4>($170.3K)</h4>
              </div>
            </div>
            <br></br>
            <div className="glcard">
              <h6>Company Employment Trends (january of Year)</h6>

              <AreaChart
                data1={qtable?.map((d) => [d?.tsq_bq_current_employees_plan])}
                containerId="container1000"
                width={280}
                height={180}
              />
            </div>
          </div>
          <div className="wl2">
            <div className="wlcard">
              <h6>Gross Profit</h6>
              <MultiAreaGraph
                height={190}
                containerId="container110"
                linecolor={"#303c92"}
                labelcolor={"#000"}
                data1={qtable?.map((d) => d?.tsq_bq_gross_profit)}
                data2={qtable?.map((d) => d?.tsq_bq_operating_income)}
                data3={qtable?.map((d) => d?.tsq_bq_net_income)}
              />
            </div>
            <div className="wlcard">
              <h6>operating Profit</h6>
              <MultiAreaGraph
                height={190}
                containerId="container210"
                linecolor={"#303c92"}
                labelcolor={"#000"}
                data1={qtable?.map((d) => d?.tsq_bq_gross_profit)}
                data2={qtable?.map((d) => d?.tsq_bq_operating_income)}
                data3={qtable?.map((d) => d?.tsq_bq_net_income)}
              />
            </div>
            <div className="wlcard">
              <h6>Net Profit</h6>
              <MultiAreaGraph
                height={190}
                containerId="container310"
                linecolor={"#303c92"}
                labelcolor={"#000"}
                data1={qtable?.map((d) => d?.tsq_bq_gross_profit)}
                data2={qtable?.map((d) => d?.tsq_bq_operating_income)}
                data3={qtable?.map((d) => d?.tsq_bq_net_income)}
              />
            </div>
          </div>
        </div>
        <div className="wright">
          <table className="report-table">
            <thead>
              <th>Financials</th>
              <th>2019 Q1</th>
              <th>2020 Q2</th>
              <th>2021 Q3</th>
              <th>2022 Q4</th>
              <th>2023 Q5</th>
            </thead>
            <tbody>
              {easy?.map((d, i) => (
                <tr className={i % 2 === 0 ? "" : "even"} key={i + "ghfgh"}>
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
              <th>2019 Q1</th>
              <th>2020 Q2</th>
              <th>2021 Q3</th>
              <th>2022 Q4</th>
              <th>2023 Q5</th>
            </thead>
            <tbody>
              {reporttabledata4?.map((d, i) => (
                <tr className={i % 2 === 0 ? "" : "even"}>
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
                height={170}
                containerId="containerw1"
                data1={[
                  Number(
                    qtable[0]?.tsq_bq_year === 2019
                      ? qtable[0]?.tsq_bq_total_assets
                      : 0
                  ),
                  Number(
                    qtable[0]?.tsq_bq_year === 2020
                      ? qtable[0]?.tsq_bq_total_assets
                      : 0
                  ),
                  Number(
                    qtable[0]?.tsq_bq_year === 2021
                      ? qtable[0]?.tsq_bq_total_assets
                      : 0
                  ),
                  Number(
                    qtable[0]?.tsq_bq_year === 2022
                      ? qtable[0]?.tsq_bq_total_assets
                      : 0
                  ),
                  Number(
                    qtable[0]?.tsq_bq_year === 2023
                      ? qtable[0]?.tsq_bq_total_assets
                      : 0
                  ),
                ]}
              />
            </div>
            <div className="gone">
              <h6>Return on assets</h6>
              <BarChart height={170} containerId="container2w" />
            </div>
            <div className="gone">
              <h6>return on sales</h6>
              <BarChart height={170} containerId="containerw3" />
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

export default AnnualFinancialSummery2;
