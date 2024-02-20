import React, { useEffect, useState } from "react";
import AreaChart from "../graphs/AreaChart";
import VSGraph from "../graphs/VSGraph";
import millify from "millify";

const PeerReportSection = ({ state, ts, img1, img }) => {
  const [graph, setGraph] = useState([]);
  const [tab, setTab] = useState([]);
  const FindYearData = () => {
    const arr = ts?.filter(
      (f) =>
        f?.ts_bq_year === 2019 ||
        f?.ts_bq_year === 2020 ||
        f?.ts_bq_year === 2021 ||
        f?.ts_bq_year === 2022 ||
        f?.ts_bq_year === 2023
    );
    setGraph(arr?.sort((a, b) => a?.ts_bq_year - b?.ts_bq_year));
  };

  useEffect(() => {
    if (ts?.length > 0) {
      FindYearData();
    }
  }, []);

  return (
    <section className="peer">
      <div className="head-bar">
        <div className="h-left">
          <h3>
            Company vs Peer Group Analysis:
            <span>{state?.firmo_bq_company_name}</span>
          </h3>
          <div className="y-bar"></div>
        </div>
        <div className="h-right">
          <img src={img} />
          <div className="text-group"></div>
        </div>
      </div>
      <div className="pwrap">
        <div className="pleft">
          <div className="pcard">
            <div className="bar"></div>
            <h4>YoY Company KPI's</h4>
            <h4 className="title">{state?.firmo_bq_company_name}</h4>
            <h4 className="title2">{state?.firmo_bq_irs_sector_name}</h4>
            <div className="black"></div>
            <div className="shortcard">
              <div className="scard">
                <p>Employment Growth</p>
                <span>{millify(Number(graph[0]?.ts_bq_ebitda))}</span>
              </div>
              <div className="scard">
                <p>Employment</p>
                <span>{millify(Number(graph[0]?.ts_bq_ebitda_per_emp))}</span>
              </div>
            </div>
            <div className="shortcard">
              <div className="scard">
                <p>Revenue Growth</p>
                <span>{millify(Number(graph[0]?.ts_bq_revenue_per_emp))}</span>
              </div>
              <div className="scard">
                <p>Revenue</p>
                <span>${millify(Number(graph[0]?.ts_bq_revenue))}</span>
              </div>
            </div>
            <div className="shortcard">
              <div className="scard">
                <p>Operating Income Growth</p>
                <span>{millify(Number(graph[0]?.ts_bq_operating_income))}</span>
              </div>
              <div className="scard">
                <p>
                  Operating Income <br />
                  Margin
                </p>
                <span>
                  {millify(Number(graph[0]?.ts_bq_operating_income_per_emp))}
                </span>
              </div>
            </div>
            <div className="shortcard">
              <div className="scard">
                <p>Net Income Growth</p>
                <span>
                  {millify(Number(graph[0]?.ts_bq_net_income_per_emp))}
                </span>
              </div>
              <div className="scard">
                <p>Net Income Margin</p>
                <span>
                  {millify(Number(graph[0]?.ts_bq_net_profit_margin))}
                </span>
              </div>
            </div>
            <div className="dgraph">
              <h5>Company Employment Trends</h5>
              <AreaChart
                data1={[
                  Number(
                    graph[0]?.ts_bq_year === 2019
                      ? graph[0]?.ts_bq_ebitda_per_emp
                      : 0
                  ),
                  Number(
                    graph[0]?.ts_bq_year === 2020
                      ? graph[0]?.ts_bq_ebitda_per_emp
                      : 0
                  ),
                  Number(
                    graph[0]?.ts_bq_year === 2021
                      ? graph[0]?.ts_bq_ebitda_per_emp
                      : 0
                  ),
                  Number(
                    graph[0]?.ts_bq_year === 2022
                      ? graph[0]?.ts_bq_ebitda_per_emp
                      : 0
                  ),
                  Number(
                    graph[0]?.ts_bq_year === 2023
                      ? graph[0]?.ts_bq_ebitda_per_emp
                      : 0
                  ),
                ]}
                containerId={"trends"}
              />
            </div>
          </div>
          <div className="pcard">
            <div className="bar"></div>
            <h4>YoY Company KPI's</h4>
            <h4 className="title">{state?.firmo_bq_company_name}</h4>
            <h4>{state?.firmo_bq_irs_sector_name}</h4>
            <div className="black"></div>
            <div className="shortcard">
              <div className="scard">
                <p>Employment Growth</p>
                <span>{millify(Number(graph[0]?.ts_bq_ebitda))}</span>
              </div>
              <div className="scard">
                <p>AVG Employment</p>
                <span>
                  {millify(Number(graph[0]?.ts_bq_ebitda_per_emp / 2))}
                </span>
              </div>
            </div>
            <div className="shortcard">
              <div className="scard">
                <p>Revenue Growth</p>
                <span>{millify(Number(graph[0]?.ts_bq_revenue_per_emp))}</span>
              </div>
              <div className="scard">
                <p>avg Revenue</p>
                <span>${millify(Number(graph[0]?.ts_bq_revenue))}</span>
              </div>
            </div>
            <div className="shortcard">
              <div className="scard">
                <p>Operating Income Growth</p>
                <span>{millify(Number(graph[0]?.ts_bq_operating_income))}</span>
              </div>
              <div className="scard">
                <p>
                  Operating Income <br></br>Margin
                </p>
                <span>
                  {millify(Number(graph[0]?.ts_bq_operating_income_per_emp))}
                </span>
              </div>
            </div>
            <div className="shortcard">
              <div className="scard">
                <p>Net Income Growth</p>
                <span>
                  {" "}
                  {millify(Number(graph[0]?.ts_bq_net_income_per_emp))}
                </span>
              </div>
              <div className="scard">
                <p>Net Income Margin</p>
                <span>
                  {" "}
                  {millify(Number(graph[0]?.ts_bq_net_profit_margin))}
                </span>
              </div>
            </div>
            <div className="dgraph">
              <h5>Company Employment Trends</h5>
              <AreaChart
                data1={[
                  Number(
                    graph[0]?.ts_bq_year === 2019 ? graph[0]?.ts_bq_revenue : 0
                  ),
                  Number(
                    graph[0]?.ts_bq_year === 2020 ? graph[0]?.ts_bq_revenue : 0
                  ),
                  Number(
                    graph[0]?.ts_bq_year === 2021 ? graph[0]?.ts_bq_revenue : 0
                  ),
                  Number(
                    graph[0]?.ts_bq_year === 2022 ? graph[0]?.ts_bq_revenue : 0
                  ),
                  Number(
                    graph[0]?.ts_bq_year === 2023 ? graph[0]?.ts_bq_revenue : 0
                  ),
                ]}
                containerId={"trends2"}
              />
            </div>
          </div>
        </div>
        <div className="pright">
          <div className="topcard">
            <h5># Active Companies Filtered</h5>
            <h3>53.9K</h3>
          </div>
          <p className="top-s">
            Operating Status <b>|</b>{" "}
            <span>
              {state?.firmo_bq_company_isactive === 1 ? "Active" : "Inactive"}
            </span>
          </p>
          <div className="lwrap">
            <div className="lcard">
              <h4>Company Revenues</h4>
              <AreaChart
                containerId={"comrev"}
                labelcolor={"#000"}
                linecolor={"#4d8eff"}
                bgcolor={"rgba(0, 92, 197, 0.378)"}
                height={150}
                data1={[
                  Number(
                    graph[0]?.ts_bq_year === 2019 ? graph[0]?.ts_bq_revenue : 0
                  ),
                  Number(
                    graph[0]?.ts_bq_year === 2020 ? graph[0]?.ts_bq_revenue : 0
                  ),
                  Number(
                    graph[0]?.ts_bq_year === 2021 ? graph[0]?.ts_bq_revenue : 0
                  ),
                  Number(
                    graph[0]?.ts_bq_year === 2022 ? graph[0]?.ts_bq_revenue : 0
                  ),
                  Number(
                    graph[0]?.ts_bq_year === 2023 ? graph[0]?.ts_bq_revenue : 0
                  ),
                ]}
              />
            </div>
            <div className="lcard">
              <h4>Avg Peer Group Revenues</h4>
              <AreaChart
                containerId={"peerRev"}
                labelcolor={"#000"}
                linecolor={"#4d8eff"}
                bgcolor={"rgba(0, 92, 197, 0.378)"}
                data={[3.8, 3.8, 4.3, 4.7, 5.0]}
                height={150}
                data1={[
                  Number(
                    graph[0]?.ts_bq_year === 2019
                      ? graph[0]?.ts_bq_revenue / 2
                      : 0
                  ),
                  Number(
                    graph[0]?.ts_bq_year === 2020
                      ? graph[0]?.ts_bq_revenue / 2
                      : 0
                  ),
                  Number(
                    graph[0]?.ts_bq_year === 2021
                      ? graph[0]?.ts_bq_revenue / 2
                      : 0
                  ),
                  Number(
                    graph[0]?.ts_bq_year === 2022
                      ? graph[0]?.ts_bq_revenue / 2
                      : 0
                  ),
                  Number(
                    graph[0]?.ts_bq_year === 2023
                      ? graph[0]?.ts_bq_revenue / 2
                      : 0
                  ),
                ]}
              />
            </div>
          </div>
          <div className="lwrap">
            <div className="lcard">
              <h4>Company Profit Analysis</h4>
              <VSGraph
                containerId={"profitAnalysis1"}
                height={200}
                data1={[
                  Number(
                    graph[0]?.ts_bq_year === 2019 ? graph[0]?.ts_bq_revenue : 0
                  ),
                  Number(
                    graph[0]?.ts_bq_year === 2020 ? graph[0]?.ts_bq_revenue : 0
                  ),
                  Number(
                    graph[0]?.ts_bq_year === 2021 ? graph[0]?.ts_bq_revenue : 0
                  ),
                  Number(
                    graph[0]?.ts_bq_year === 2022 ? graph[0]?.ts_bq_revenue : 0
                  ),
                  Number(
                    graph[0]?.ts_bq_year === 2023 ? graph[0]?.ts_bq_revenue : 0
                  ),
                ]}
                data2={[
                  Number(
                    graph[0]?.ts_bq_year === 2019
                      ? graph[0]?.ts_bq_gross_profit
                      : 0
                  ),
                  Number(
                    graph[0]?.ts_bq_year === 2020
                      ? graph[0]?.ts_bq_gross_profit
                      : 0
                  ),
                  Number(
                    graph[0]?.ts_bq_year === 2021
                      ? graph[0]?.ts_bq_gross_profit
                      : 0
                  ),
                  Number(
                    graph[0]?.ts_bq_year === 2022
                      ? graph[0]?.ts_bq_gross_profit
                      : 0
                  ),
                  Number(
                    graph[0]?.ts_bq_year === 2023
                      ? graph[0]?.ts_bq_gross_profit
                      : 0
                  ),
                ]}
              />
            </div>
            <div className="lcard">
              <h4>Avg Peer Group Profit Analysis</h4>
              <VSGraph
                data1={[
                  Number(
                    graph[0]?.ts_bq_year === 2019 ? graph[0]?.ts_bq_revenue : 0
                  ),
                  Number(
                    graph[0]?.ts_bq_year === 2020 ? graph[0]?.ts_bq_revenue : 0
                  ),
                  Number(
                    graph[0]?.ts_bq_year === 2021 ? graph[0]?.ts_bq_revenue : 0
                  ),
                  Number(
                    graph[0]?.ts_bq_year === 2022 ? graph[0]?.ts_bq_revenue : 0
                  ),
                  Number(
                    graph[0]?.ts_bq_year === 2023 ? graph[0]?.ts_bq_revenue : 0
                  ),
                ]}
                data2={[
                  Number(
                    graph[0]?.ts_bq_year === 2019
                      ? graph[0]?.ts_bq_gross_profit
                      : 0
                  ),
                  Number(
                    graph[0]?.ts_bq_year === 2020
                      ? graph[0]?.ts_bq_gross_profit
                      : 0
                  ),
                  Number(
                    graph[0]?.ts_bq_year === 2021
                      ? graph[0]?.ts_bq_gross_profit
                      : 0
                  ),
                  Number(
                    graph[0]?.ts_bq_year === 2022
                      ? graph[0]?.ts_bq_gross_profit
                      : 0
                  ),
                  Number(
                    graph[0]?.ts_bq_year === 2023
                      ? graph[0]?.ts_bq_gross_profit
                      : 0
                  ),
                ]}
                containerId={"profitAnalysis2"}
                height={200}
              />
            </div>
          </div>
          <div className="lwrap">
            <div className="lcard">
              <h4>Company Total Assets</h4>
              <AreaChart
                containerId={"totalAssests"}
                labelcolor={"#000"}
                linecolor={"#4d8eff"}
                bgcolor={"rgba(0, 92, 197, 0.378)"}
                height={150}
                data1={[
                  Number(
                    graph[0]?.ts_bq_year === 2019
                      ? graph[0]?.ts_bq_total_assets
                      : 0
                  ),
                  Number(
                    graph[0]?.ts_bq_year === 2020
                      ? graph[0]?.ts_bq_total_assets
                      : 0
                  ),
                  Number(
                    graph[0]?.ts_bq_year === 2021
                      ? graph[0]?.ts_bq_total_assets
                      : 0
                  ),
                  Number(
                    graph[0]?.ts_bq_year === 2022
                      ? graph[0]?.ts_bq_total_assets
                      : 0
                  ),
                  Number(
                    graph[0]?.ts_bq_year === 2023
                      ? graph[0]?.ts_bq_total_assets
                      : 0
                  ),
                ]}
              />
            </div>
            <div className="lcard">
              <h4>Avg Peer Group total Assests</h4>
              <AreaChart
                containerId={"totalAssests2"}
                labelcolor={"#000"}
                linecolor={"#4d8eff"}
                bgcolor={"rgba(0, 92, 197, 0.378)"}
                data={[3.8, 3.8, 4.3, 4.7, 5.0]}
                height={150}
                data1={[
                  Number(
                    graph[0]?.ts_bq_year === 2019
                      ? graph[0]?.ts_bq_total_assets_per_emp
                      : 0
                  ),
                  Number(
                    graph[0]?.ts_bq_year === 2020
                      ? graph[0]?.ts_bq_total_assets_per_emp
                      : 0
                  ),
                  Number(
                    graph[0]?.ts_bq_year === 2021
                      ? graph[0]?.ts_bq_total_assets_per_emp
                      : 0
                  ),
                  Number(
                    graph[0]?.ts_bq_year === 2022
                      ? graph[0]?.ts_bq_total_assets_per_emp
                      : 0
                  ),
                  Number(
                    graph[0]?.ts_bq_year === 2023
                      ? graph[0]?.ts_bq_total_assets_per_emp
                      : 0
                  ),
                ]}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="last-foot">
        <p>
          © 2024 BrightQuery, Inc. All rights reserved. U.S. patent pending.
          Contact: <span>sales@brightquery.com</span> or 1-888-BQDATA1.
        </p>
        <img className="minlogo" src={img1} />
      </div>
    </section>
  );
};

export default PeerReportSection;
