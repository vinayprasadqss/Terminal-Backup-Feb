import React, { useEffect, useState } from "react";
import AreaChart from "../graphs/AreaChart";
import millify from "millify";

const CompanySummerySection = ({ state, ts, img1, img }) => {
  const [graphYear, setGraphYear] = useState([]);
  const [web, setWeb] = useState();

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
    // console.log(arr);
  };

  useEffect(() => {
    FindYearData();
  }, [ts]);

  useEffect(() => {
    // console.log("sfdgfdsgsdf");
    if (
      state?.firmo_bq_website?.includes("http://") ||
      state?.firmo_bq_website?.includes("https://")
    ) {
      return setWeb(state?.firmo_bq_website);
    } else {
      setWeb(`http://www.${state?.firmo_bq_website}`);

      return;
    }
  }, [state]);

  // console.log(graphYear, "graph year");
  return (
    <section className="summeryreport">
      <div className="head-bar">
        <div className="h-left">
          <h3>
            Company Summery:<span>{state?.firmo_bq_company_name}</span>
          </h3>
          <div className="y-bar"></div>
          <h4 style={{ color: "#fff" }}> </h4>
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
      <div className="sumwrap">
        <div className="s1">
          <h5>Business identity</h5>
          <table className="sumtable">
            <tbody>
              <tr>
                <td>Company | bq id or ein | Ticker</td>
                <td>
                  |
                  {state?.hasOwnProperty("firmo_bq_company_name")
                    ? state?.firmo_bq_company_name
                    : "N/A"}
                  |
                  {state?.hasOwnProperty("bq_organization_id")
                    ? state?.bq_organization_id
                    : "N/A"}
                </td>
              </tr>
              <tr>
                <td>Company Status</td>
                <td>
                  {state?.hasOwnProperty("firmo_bq_company_isactive")
                    ? state?.firmo_bq_company_isactive === 1
                      ? "Active"
                      : "Inactive"
                    : "N/A"}
                </td>
              </tr>
              <tr>
                <td>EIN</td>
                <td>
                  {state?.hasOwnProperty("firmo_bq_company_ein")
                    ? state?.firmo_bq_company_ein
                    : "N/A"}
                </td>
              </tr>
              <tr>
                <td>Year Founded</td>
                <td>
                  {state?.hasOwnProperty("firmo_bq_year_founded")
                    ? state?.firmo_bq_year_founded
                    : "N/A"}
                </td>
              </tr>
              <tr>
                <td>Holding Company</td>
                <td>No</td>
              </tr>
              <tr>
                <td>Non Profit</td>
                <td>
                  {state?.hasOwnProperty("firmo_bq_non_profit_indicator")
                    ? state?.firmo_bq_non_profit_indicator === 0
                      ? "No"
                      : "Yes"
                    : "N/A"}
                </td>
              </tr>
              <tr>
                <td>Ticker</td>
                <td>
                  {state?.hasOwnProperty("firmo_bq_ticker")
                    ? state?.firmo_bq_ticker
                    : "N/A"}
                </td>
              </tr>
              <tr>
                <td>Parent Ticker</td>
                <td>N/A</td>
              </tr>
              <tr>
                <td>S&P 500 Company</td>
                <td>N/A</td>
              </tr>
              <tr>
                <td>CIK</td>
                <td>
                  {state?.hasOwnProperty("firmo_bq_cik")
                    ? state?.firmo_bq_cik
                    : "N/A"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="s2">
          <h5>Location Information</h5>
          <table className="sumtable">
            <tbody>
              <tr>
                <td>Deliverable Address?</td>
                <td>yes</td>
              </tr>
              <tr>
                <td>Address Type</td>
                <td>
                  {state?.hasOwnProperty("firmo_bq_company_address1_rdi")
                    ? state?.firmo_bq_company_address1_rdi
                    : "N/A"}
                </td>
              </tr>
              <tr>
                <td>Zip Code Type</td>
                <td>
                  {state?.hasOwnProperty("firmo_bq_company_address1_zip_type")
                    ? state?.firmo_bq_company_address1_zip_type
                    : "N/A"}
                </td>
              </tr>
              <tr>
                <td>Website</td>
                <td style={{ textTransform: "none", color: "#4d8eff" }}>
                  {state?.hasOwnProperty("firmo_bq_website") ? (
                    <a href={web} style={{ textDecoration: "none" }}>
                      {web}
                    </a>
                  ) : (
                    "N/A"
                  )}
                </td>
              </tr>
              <tr>
                <td>Phone</td>
                <td>
                  {state?.hasOwnProperty("firmo_bq_company_phone")
                    ? state?.firmo_bq_company_phone
                    : "N/A"}
                </td>
              </tr>
              <tr>
                <td>Contact</td>
                <td>Bonnie Schmidt</td>
              </tr>
              <tr>
                <td>Address</td>
                <td>
                  {state?.hasOwnProperty("firmo_bq_company_address1_line_1")
                    ? state?.firmo_bq_company_address1_line_1
                    : "N/A"}
                </td>
              </tr>
              <tr>
                <td>City</td>
                <td>
                  {state?.hasOwnProperty("firmo_bq_company_address1_city")
                    ? state?.firmo_bq_company_address1_city
                    : "N/A"}
                </td>
              </tr>
              <tr>
                <td>Zip</td>
                <td>
                  {state?.hasOwnProperty("firmo_bq_company_address1_zip5")
                    ? state?.firmo_bq_company_address1_zip5
                    : "N/A"}
                </td>
              </tr>
              <tr>
                <td>County</td>
                <td>
                  {state?.hasOwnProperty(
                    "firmo_bq_company_address1_county_name"
                  )
                    ? state?.firmo_bq_company_address1_county_name
                    : "N/A"}
                </td>
              </tr>
              <tr>
                <td>Country</td>
                <td>United States</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="s3">
          <h5>Industry Classification</h5>
          <table className="sumtable">
            <tbody>
              <tr>
                <td>IRS sector</td>
                <td>
                  {state?.hasOwnProperty("firmo_bq_irs_sector_name")
                    ? state?.firmo_bq_irs_sector_name
                    : "N/A"}
                </td>
              </tr>
              <tr>
                <td>IRS Industry</td>
                <td>
                  {state?.hasOwnProperty("firmo_bq_irs_industry_name")
                    ? state?.firmo_bq_irs_industry_name
                    : "N/A"}
                </td>
              </tr>
              <tr>
                <td>Naics Sector</td>
                <td>
                  {state?.hasOwnProperty("firmo_bq_naics_sector_name")
                    ? state?.firmo_bq_naics_sector_name
                    : "N/A"}
                </td>
              </tr>
              <tr>
                <td>Naics Sector Code</td>
                <td>
                  {state?.hasOwnProperty("firmo_bq_naics_sector_code")
                    ? state?.firmo_bq_naics_sector_code
                    : "N/A"}
                </td>
              </tr>
              <tr>
                <td>Naics Industry Code</td>
                <td>
                  {state?.hasOwnProperty("firmo_bq_naics_code")
                    ? state?.firmo_bq_naics_code
                    : "N/A"}
                </td>
              </tr>
              <tr>
                <td>SIC Sector</td>
                <td>
                  {state?.hasOwnProperty("firmo_bq_sic_sector_name")
                    ? state?.firmo_bq_sic_sector_name
                    : "N/A"}
                </td>
              </tr>
              <tr>
                <td>SIC Sector Code</td>
                <td>
                  {state?.hasOwnProperty("firmo_bq_sic_sector_code")
                    ? state?.firmo_bq_sic_sector_code
                    : "N/A"}
                </td>
              </tr>
              <tr>
                <td>SIC Industry Codes</td>
                <td>
                  {state?.hasOwnProperty("firmo_bq_sic_code")
                    ? state?.firmo_bq_sic_code
                    : "N/A"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="sumwrap2">
        <div className="s21">
          <div className="bar"></div>
          <h5>Revenue</h5>
          <p className="y">YOY Key Performance Indicators</p>
          <div className="swrap">
            <div className="scard">
              <p>Revenue Growth (Year Over Year)</p>
              <span>
                {state?.hasOwnProperty("mr_bq_revenue_growth_yoy_mr")
                  ? state?.mr_bq_revenue_growth_yoy_mr.toFixed(2) + "%"
                  : "N/A"}
              </span>
            </div>
            <div className="scard">
              <p>
                Revenue Change<br></br>
                <i style={{ color: "transparent" }}>fg</i>
              </p>
              <span>
                {state?.hasOwnProperty("mr_bq_revenue_mr")
                  ? millify(state?.mr_bq_revenue_mr)
                  : "N/A"}
              </span>
            </div>
          </div>
          <div className="dgraph">
            <h4>Annual Revenue (Fiscal Year)</h4>
            <AreaChart
              data1={[
                Number(
                  graphYear[0]?.ts_bq_year === 2019
                    ? graphYear[0]?.ts_bq_revenue
                    : 0
                ),
                Number(
                  graphYear[0]?.ts_bq_year === 2020
                    ? graphYear[0]?.ts_bq_revenue
                    : 0
                ),
                Number(
                  graphYear[0]?.ts_bq_year === 2021
                    ? graphYear[0]?.ts_bq_revenue
                    : 0
                ),
                Number(
                  graphYear[0]?.ts_bq_year === 2022
                    ? graphYear[0]?.ts_bq_revenue
                    : 0
                ),
                Number(
                  graphYear[0]?.ts_bq_year === 2023
                    ? graphYear[0]?.ts_bq_revenue
                    : 0
                ),
              ]}
              containerId="annualRevenuegraph"
            />
          </div>
        </div>
        <div className="s21">
          <div className="bar"></div>
          <h5>Employment</h5>
          <p className="y">YOY Key Performance Indicators</p>
          <div className="swrap">
            <div className="scard">
              <p>Employment Growth (Year Over Year)</p>
              <span>
                {state?.hasOwnProperty(
                  "mr_bq_current_employees_plan_growth_yoy_mr"
                )
                  ? state?.mr_bq_current_employees_plan_growth_yoy_mr.toFixed(2) + "%"
                  : "N/A"}
              </span>
            </div>
            <div className="scard">
              <p>
                Employment Change<br></br>
                <i style={{ color: "transparent" }}>fg</i>
              </p>
              <span>
                {state?.hasOwnProperty("mr_bq_revenue_mr_per_emp")
                  ? millify(state?.mr_bq_revenue_mr_per_emp)
                  : "N/A"}
              </span>
            </div>
          </div>
          <div className="dgraph">
            <h4>Employment (January of Year)</h4>
            <AreaChart
              containerId="emplomentgraph"
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
        <div className="s22">
          <div className="s22left">
            <div className="bar"></div>
            <h5>NET income</h5>
            <p className="y">YOY Key Performance Indicators</p>
            <div className="swrap">
              <div className="scard">
                <p>NET InCOME Growth (Year Over Year)</p>
                <span>N/A</span>
              </div>
              <div className="scard">
                <p>
                  NET INCOME Change<br></br>
                  <i style={{ color: "transparent" }}>fg</i>
                </p>
                <span>
                  {state?.hasOwnProperty("mr_bq_net_income_mr")
                    ? millify(state?.mr_bq_net_income_mr)
                    : "N/A"}
                </span>
              </div>
            </div>
            <div className="dgraph">
              <h4>NET income (fiscal Year)</h4>
              <AreaChart
                containerId="netincomegraph"
                data1={[
                  Number(
                    graphYear[0]?.ts_bq_year === 2019
                      ? graphYear[0]?.ts_bq_net_income
                      : 0
                  ),
                  Number(
                    graphYear[0]?.ts_bq_year === 2020
                      ? graphYear[0]?.ts_bq_net_income
                      : 0
                  ),
                  Number(
                    graphYear[0]?.ts_bq_year === 2021
                      ? graphYear[0]?.ts_bq_net_income
                      : 0
                  ),
                  Number(
                    graphYear[0]?.ts_bq_year === 2022
                      ? graphYear[0]?.ts_bq_net_income
                      : 0
                  ),
                  Number(
                    graphYear[0]?.ts_bq_year === 2023
                      ? graphYear[0]?.ts_bq_net_income
                      : 0
                  ),
                ]}
              />
            </div>
          </div>
          <div className="s22right">
            <h6>BQ Data Sources:</h6>
            <ul>
              <li>
                <b>Revenue</b> is sourced from SEC fillings if public, else if
                private is imputed from IRS tax fillings.
              </li>
              <li>
                <b>Net Income</b> is sourced from SEC fillings if public, else
                if private is imputed from IRS tax fillings.
              </li>
              <li>
                <b>Full time US employment</b> is sourced from DOL Fillings{" "}
              </li>
            </ul>
            <br></br>
            <h6>Report Notes</h6>
            <ul>
              <li>Growth measures a One Year Fiscal Year Cahnge.</li>
              <li>Revenue,Net Income & Employment is most recently reported</li>
            </ul>
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

export default CompanySummerySection;
