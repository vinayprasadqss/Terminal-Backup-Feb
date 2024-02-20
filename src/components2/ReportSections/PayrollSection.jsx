import React, { useEffect, useState } from "react";
import VSGraph from "../graphs/VSGraph";
import AreaChart from "../graphs/AreaChart";
import millify from "millify";

const PayrollSection = ({ state, ts, img1, img, tsq }) => {
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

  const FindYearData2 = () => {
    const arr = tsq?.filter(
      (f) =>
        (f?.tsq_bq_year === 2019 && f?.tsq_bq_quarter === 1) ||
        (f?.tsq_bq_year === 2020 && f?.tsq_bq_quarter === 1) ||
        (f?.tsq_bq_year === 2021 && f?.tsq_bq_quarter === 1) ||
        (f?.tsq_bq_year === 2022 && f?.tsq_bq_quarter === 1) ||
        (f?.tsq_bq_year === 2023 && f?.tsq_bq_quarter === 1)
    );
    setTab(arr?.sort((a, b) => a?.tsq_bq_year - b?.tsq_bq_year));
  };

  useEffect(() => {
    if (tsq?.length > 0) {
      FindYearData2();
    }
  }, [tsq]);

  useEffect(() => {
    if (ts?.length > 0) {
      FindYearData();
    }
  }, []);

  //   useEffect(() => {
  //     if (graph?.length > 0) {
  //       makeTable();
  //     }
  //   }, [graph]);

  //   console.log(tab);

  return (
    <section className="payroll">
      <div className="head-bar">
        <div className="h-left">
          <h3>
            Employment & payroll Analysis:
            <span>{state?.firmo_bq_company_name}</span>
          </h3>
          <div className="y-bar"></div>
          <h4>
            Sector: <span>{state?.firmo_bq_irs_sector_name}</span>
          </h4>
          <h4>
            Industry: <span>{state?.firmo_bq_irs_industry_name}</span>
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
      <div className="paywrapper">
        <div className="py1">
          <div className="bar"></div>
          <h4>Annual Yoy</h4>
          <h4>Key Performance indicator</h4>
          <br></br>
          <div className="shortwrap">
            <div className="scard">
              <p>Employment Growth</p>
              <span>
                {millify(Number(graph[0]?.ts_bq_gross_profit_per_emp))}
              </span>
            </div>
            <div className="scard">
              <p>Employment Change</p>
              <span> {millify(Number(graph[0]?.ts_bq_gross_profit))}</span>
            </div>
          </div>
          <div className="shortwrap">
            <div className="scard">
              <p>Payroll Growth</p>
              <span>{millify(Number(graph[0]?.ts_bq_payroll))}</span>
            </div>
            <div className="scard">
              <p>Payroll Change</p>
              <span>(${millify(Number(graph[0]?.ts_bq_payroll))})</span>
            </div>
          </div>
          <div className="shortwrap">
            <div className="scard">
              <p>Payroll Per Employee Change</p>
              <span>{millify(Number(graph[0]?.ts_bq_payroll))}</span>
            </div>
            <div className="scard">
              <p>Payroll Per Employee Growth</p>
              <span>{millify(Number(graph[0]?.ts_bq_payroll_per_emp))}</span>
            </div>
          </div>
          <div className="shortwrap">
            <div className="scard">
              <p>Revenue Growth</p>
              <span>{millify(Number(graph[0]?.ts_bq_revenue))}</span>
            </div>
            <div className="scard">
              <p>Revenue Change</p>
              <span>(${millify(Number(graph[0]?.ts_bq_revenue_per_emp))})</span>
            </div>
          </div>
          <div className="end">
            <p>
              All Companies are US based companies with at least one full time
              employee. Payroll and Employment records are update monthly.
            </p>
          </div>
        </div>
        <div className="py2">
          <table className="py2table">
            <thead>
              <th>Summery</th>
              <th>2019</th>
              <th>2020</th>
              <th>2021</th>
              <th>2022</th>
              <th>2023</th>
            </thead>
            <tbody>
              <tr>
                <td>PAYROLL EXPANSE</td>
                <td>
                  $
                  {millify(
                    Number(
                      graph[0]?.ts_bq_year === 2019
                        ? graph[0]?.ts_bq_payroll
                        : 0
                    )
                  )}
                </td>
                <td>
                  {" "}
                  $
                  {millify(
                    Number(
                      graph[0]?.ts_bq_year === 2020
                        ? graph[0]?.ts_bq_payroll
                        : 0
                    )
                  )}
                </td>
                <td>
                  {" "}
                  $
                  {millify(
                    Number(
                      graph[0]?.ts_bq_year === 2021
                        ? graph[0]?.ts_bq_payroll
                        : 0
                    )
                  )}
                </td>
                <td>
                  {" "}
                  $
                  {millify(
                    Number(
                      graph[0]?.ts_bq_year === 2022
                        ? graph[0]?.ts_bq_payroll
                        : 0
                    )
                  )}
                </td>
                <td>
                  {" "}
                  $
                  {millify(
                    Number(
                      graph[0]?.ts_bq_year === 2023
                        ? graph[0]?.ts_bq_payroll
                        : 0
                    )
                  )}
                </td>
              </tr>

              <tr>
                <td>Employment</td>
                <td>
                  {" "}
                  $
                  {millify(
                    Number(
                      graph[0]?.ts_bq_year === 2019
                        ? graph[0]?.ts_bq_gross_profit_per_emp
                        : 0
                    )
                  )}
                </td>
                <td>
                  {" "}
                  $
                  {millify(
                    Number(
                      graph[0]?.ts_bq_year === 2020
                        ? graph[0]?.ts_bq_gross_profit_per_emp
                        : 0
                    )
                  )}
                </td>
                <td>
                  {" "}
                  $
                  {millify(
                    Number(
                      graph[0]?.ts_bq_year === 2021
                        ? graph[0]?.ts_bq_gross_profit_per_emp
                        : 0
                    )
                  )}
                </td>
                <td>
                  {" "}
                  $
                  {millify(
                    Number(
                      graph[0]?.ts_bq_year === 2022
                        ? graph[0]?.ts_bq_gross_profit_per_emp
                        : 0
                    )
                  )}
                </td>
                <td>
                  {" "}
                  $
                  {millify(
                    Number(
                      graph[0]?.ts_bq_year === 2023
                        ? graph[0]?.ts_bq_gross_profit_per_emp
                        : 0
                    )
                  )}
                </td>
              </tr>
              <tr>
                <td>Payroll Per Employee</td>
                <td>
                  {" "}
                  $
                  {millify(
                    Number(
                      graph[0]?.ts_bq_year === 2019
                        ? graph[0]?.ts_bq_payroll_per_emp
                        : 0
                    )
                  )}
                </td>
                <td>
                  {" "}
                  $
                  {millify(
                    Number(
                      graph[0]?.ts_bq_year === 2020
                        ? graph[0]?.ts_bq_payroll_per_emp
                        : 0
                    )
                  )}
                </td>
                <td>
                  {" "}
                  $
                  {millify(
                    Number(
                      graph[0]?.ts_bq_year === 2021
                        ? graph[0]?.ts_bq_payroll_per_emp
                        : 0
                    )
                  )}
                </td>
                <td>
                  {" "}
                  $
                  {millify(
                    Number(
                      graph[0]?.ts_bq_year === 2022
                        ? graph[0]?.ts_bq_payroll_per_emp
                        : 0
                    )
                  )}
                </td>
                <td>
                  {" "}
                  $
                  {millify(
                    Number(
                      graph[0]?.ts_bq_year === 2023
                        ? graph[0]?.ts_bq_payroll_per_emp
                        : 0
                    )
                  )}
                </td>
              </tr>
            </tbody>
          </table>

          <div className="vscard">
            <h4>Employment vs Revenue Trend</h4>
            <VSGraph
              containerId="overlay1"
              data1={[
                Number(
                  graph[0]?.ts_bq_year === 2019
                    ? graph[0]?.ts_bq_net_income_per_emp
                    : 0
                ),
                Number(
                  graph[0]?.ts_bq_year === 2020
                    ? graph[0]?.ts_bq_net_income_per_emp
                    : 0
                ),
                Number(
                  graph[0]?.ts_bq_year === 2021
                    ? graph[0]?.ts_bq_net_income_per_emp
                    : 0
                ),
                Number(
                  graph[0]?.ts_bq_year === 2022
                    ? graph[0]?.ts_bq_net_income_per_emp
                    : 0
                ),
                Number(
                  graph[0]?.ts_bq_year === 2023
                    ? graph[0]?.ts_bq_net_income_per_emp
                    : 0
                ),
              ]}
              data2={[
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

          <div className="vscard">
            <h4>Employment vs Payroll Per Employee</h4>
            <VSGraph
              data1={[
                Number(
                  graph[0]?.ts_bq_year === 2019
                    ? graph[0]?.ts_bq_net_income_per_emp
                    : 0
                ),
                Number(
                  graph[0]?.ts_bq_year === 2020
                    ? graph[0]?.ts_bq_net_income_per_emp
                    : 0
                ),
                Number(
                  graph[0]?.ts_bq_year === 2021
                    ? graph[0]?.ts_bq_net_income_per_emp
                    : 0
                ),
                Number(
                  graph[0]?.ts_bq_year === 2022
                    ? graph[0]?.ts_bq_net_income_per_emp
                    : 0
                ),
                Number(
                  graph[0]?.ts_bq_year === 2023
                    ? graph[0]?.ts_bq_net_income_per_emp
                    : 0
                ),
              ]}
              data2={[
                Number(
                  graph[0]?.ts_bq_year === 2019
                    ? graph[0]?.ts_bq_payroll_per_emp
                    : 0
                ),
                Number(
                  graph[0]?.ts_bq_year === 2020
                    ? graph[0]?.ts_bq_payroll_per_emp
                    : 0
                ),
                Number(
                  graph[0]?.ts_bq_year === 2021
                    ? graph[0]?.ts_bq_payroll_per_emp
                    : 0
                ),
                Number(
                  graph[0]?.ts_bq_year === 2022
                    ? graph[0]?.ts_bq_payroll_per_emp
                    : 0
                ),
                Number(
                  graph[0]?.ts_bq_year === 2023
                    ? graph[0]?.ts_bq_payroll_per_emp
                    : 0
                ),
              ]}
              containerId="overlay2"
            />
          </div>
        </div>
        <div className="py3">
          <div className="py3card">
            <h5>Quarterly Revenue</h5>
            <AreaChart
              containerId={"QuerterlyEmployment"}
              xlabel={["2019Q1", "2020Q2", "2021Q3", "2022Q4", "2023Q5"]}
              bgcolor="#d2d2d2"
              labelcolor={"#000"}
              height={125}
              linecolor={"#303c92"}
              width={400}
              data1={[
                Number(
                  tab[0]?.tsq_bq_year === 2019 ? tab[0]?.tsq_bq_revenue : 0
                ),
                Number(
                  tab[0]?.tsq_bq_year === 2020 ? tab[0]?.tsq_bq_revenue : 0
                ),
                Number(
                  tab[0]?.tsq_bq_year === 2021 ? tab[0]?.tsq_bq_revenue : 0
                ),
                Number(
                  tab[0]?.tsq_bq_year === 2022 ? tab[0]?.tsq_bq_revenue : 0
                ),
                Number(
                  tab[0]?.tsq_bq_year === 2023 ? tab[0]?.tsq_bq_revenue : 0
                ),
              ]}
            />
          </div>
          <div className="py3card">
            <h5>Quarterly Payroll</h5>
            <AreaChart
              containerId={"QuerterlyEmployment2"}
              data={[1.5, 1.7, 1.9, 2.1, 2.4]}
              xlabel={["2019Q1", "2020Q2", "2021Q3", "2022Q4", "2023Q5"]}
              bgcolor="#d2d2d2"
              labelcolor={"#000"}
              linecolor={"#303c92"}
              height={125}
              width={400}
              data1={[
                Number(
                  tab[0]?.tsq_bq_year === 2019 ? tab[0]?.tsq_bq_payroll : 0
                ),
                Number(
                  tab[0]?.tsq_bq_year === 2020 ? tab[0]?.tsq_bq_payroll : 0
                ),
                Number(
                  tab[0]?.tsq_bq_year === 2021 ? tab[0]?.tsq_bq_payroll : 0
                ),
                Number(
                  tab[0]?.tsq_bq_year === 2022 ? tab[0]?.tsq_bq_payroll : 0
                ),
                Number(
                  tab[0]?.tsq_bq_year === 2023 ? tab[0]?.tsq_bq_payroll : 0
                ),
              ]}
            />
          </div>
          <div className="py3card">
            <h5>Quarterly Employment</h5>
            <AreaChart
              containerId={"QuerterlyEmployment3"}
              xlabel={["2019Q1", "2020Q2", "2021Q3", "2022Q4", "2023Q5"]}
              bgcolor="#d2d2d2"
              labelcolor={"#000"}
              height={125}
              linecolor={"#303c92"}
              width={400}
              data1={[
                Number(
                  tab[0]?.tsq_bq_year === 2019
                    ? tab[0]?.tsq_bq_current_employees_plan
                    : 0
                ),
                Number(
                  tab[0]?.tsq_bq_year === 2020
                    ? tab[0]?.tsq_bq_current_employees_plan
                    : 0
                ),
                Number(
                  tab[0]?.tsq_bq_year === 2021
                    ? tab[0]?.tsq_bq_current_employees_plan
                    : 0
                ),
                Number(
                  tab[0]?.tsq_bq_year === 2022
                    ? tab[0]?.tsq_bq_current_employees_plan
                    : 0
                ),
                Number(
                  tab[0]?.tsq_bq_year === 2023
                    ? tab[0]?.tsq_bq_current_employees_plan
                    : 0
                ),
              ]}
            />
          </div>
          <div className="py3card">
            <h5>Quarterly Employment</h5>
            <AreaChart
              containerId={"QuerterlyEmployment4"}
              data={[1.5, 1.7, 1.9, 2.1, 2.4]}
              xlabel={["2019Q1", "2020Q2", "2021Q3", "2022Q4", "2023Q5"]}
              bgcolor="#d2d2d2"
              labelcolor={"#000"}
              linecolor={"#303c92"}
              height={125}
              width={400}
              data1={[
                Number(
                  tab[0]?.tsq_bq_year === 2019
                    ? tab[0]?.tsq_bq_payroll_per_emp
                    : 0
                ),
                Number(
                  tab[0]?.tsq_bq_year === 2020
                    ? tab[0]?.tsq_bq_payroll_per_emp
                    : 0
                ),
                Number(
                  tab[0]?.tsq_bq_year === 2021
                    ? tab[0]?.tsq_bq_payroll_per_emp
                    : 0
                ),
                Number(
                  tab[0]?.tsq_bq_year === 2022
                    ? tab[0]?.tsq_bq_payroll_per_emp
                    : 0
                ),
                Number(
                  tab[0]?.tsq_bq_year === 2023
                    ? tab[0]?.tsq_bq_payroll_per_emp
                    : 0
                ),
              ]}
            />
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

export default PayrollSection;
