import React, { useEffect, useState } from 'react'
import millify from 'millify'


const ToolGraphSection = ({ state, ts, img1, img }) => {

    const [web, setWeb] = useState()
    useEffect(() => {

        if ((state?.firmo_bq_website?.includes("http://"))
            || (state?.firmo_bq_website?.includes("https://"))) {
            return setWeb(state?.firmo_bq_website);

        } else {
            setWeb(`http://www.${state?.firmo_bq_website}`);

            return
        }

    }, [state])




    return (
        <section className='dreport'>
            <div className="top">
                <div className="left">
                    <img src={img} />
                    <div className="ybar"></div>
                </div>
                <div className="right">
                    <h4>Bq company search & selection tool</h4>
                </div>
            </div>
            <div className="wrap">
                {/* <div className="left">
                    <h5>How to run a full bq company report</h5>
                    <ul>
                        <li>1) Search and or filter for a company or an Organization ID
                            and Select a Company Name to review and verify</li>
                        <li>2) Once the company is selected SELECT the ORG ID Button to query the companies data</li>
                        <li>3) Select the "Clear company selection" Button to search for a new company</li>
                    </ul>
                    <p><b>Options:</b> Choose "Active" Companies filter only live companies vs
                        inactive or dead companies have not filed payroll in over two years</p>
                    <h5>Key Company search tips</h5>
                    <ul>
                        <li>{">"} search is exact match including "Proper Sentense Case". Capitilize Each world in a company name.
                            Leave out "Inc" other punctuation or other non core verbiage</li>
                        <li>{">"} Use "\", the upright slash before or after keyword to reduce the number of possible company choices. </li>
                        <li>{">"} If the company location is known, filter by state to narrow the possible company choices.</li>
                        <li>{">"} Company may be searched by Legal Name, BQ ID number or Ticker if public</li>
                    </ul>
                </div> */}
                {/* <div className="mid">
                    <div className='silver'></div>
                    <div className="top">
                        <p>Use "Proper Sentense Case" <span>To Search Companies</span></p>
                    </div>
                    <div className="mcard">
                        <div className="mctop">
                            <p>1) Select Company Name, Bq id or Ein, ticker</p>
                        </div>
                        <div className="top2">
                            <i className='bx bx-search'></i>
                            <input type='text' placeholder='Search' />
                        </div>
                        <div className="mcontent">
                            <input type='checkbox' /><span>| {state?.hasOwnProperty("firmo_bq_company_name")
                                ? state?.firmo_bq_company_name : "N/A"} |
                                {state?.hasOwnProperty("bq_organization_id") ? state?.bq_organization_id : "N/A"}|</span>
                        </div>
                    </div>
                    <div className="mcard2">
                        <div className="mtop2">
                            <p>2) Select Org id to query cpmpany data</p>
                        </div>
                        <div className="wrapm">
                            <div className="leftm">
                                <div className="l1">
                                    <input type='checkbox' />
                                    <p>{state?.hasOwnProperty("bq_organization_id") ? state?.bq_organization_id : "N/A"}</p>
                                </div>
                                <div className="l2">
                                    <p>Select Filtered org id</p>
                                </div>

                            </div>
                            <div className="rightm">
                                <p>clear company/ org selection</p>
                            </div>

                        </div>
                    </div>
                    <div className="mcard3">
                        <div className="m31">
                            <p>Status: All</p>
                            <div className="data">
                                <div className='pan'>
                                    <input type='checkbox' checked={state?.firmo_bq_company_isactive === 0 ? true : false} />
                                    <span>In Active</span>
                                </div>
                                <div className='pan'>
                                    <input type='checkbox' checked={state?.firmo_bq_company_isactive === 1 ? true : false} />
                                    <span>Active</span>
                                </div>
                            </div>
                        </div>
                        <div className="m31">
                            <p>Public or private</p>
                            <div className="data">
                                <div className='pan'>
                                    <input type='checkbox' checked={state?.firmo_bq_public_indicator === 0 ? true : false} />
                                    <span>Private</span>
                                </div>
                                <div className='pan'>
                                    <input type='checkbox' checked={state?.firmo_bq_public_indicator === 1 ? true : false} />
                                    <span>Public</span>
                                </div>
                            </div>
                        </div>
                        <div className="m31">
                            <p>Profit or Non-Profit</p>
                            <div className="data">
                                <div className='pan'>
                                    <input type='checkbox' checked={state?.firmo_bq_non_profit_indicator === 1 ? true : false} />
                                    <span>Profit</span>
                                </div>
                                <div className='pan'>
                                    <input type='checkbox' checked={state?.firmo_bq_non_profit_indicator === 0 ? true : false} />
                                    <span>Non-Profit</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mcard4">
                        <div className="onem">
                            <p>Street Address</p>
                            <select>
                                <option value={"All"}>All</option>
                            </select>
                        </div>
                        <div className="twom">
                            <p>State</p>
                            <select>
                                <option value={"All"}>All</option>
                            </select>
                        </div>
                    </div>
                    <div className="mcard5">
                        <div className="onem">
                            <p>Street Address</p>
                            <select>
                                <option value={"All"}>All</option>
                            </select>
                        </div>
                    </div>
                </div> */}
                <div className="last">
                    <div className="ltop">
                        <span>|</span>
                        <p>verify selected company / BQ ID or select a different bussiness entity.</p>
                    </div>
                    <h5>Selected Bussiness Entity</h5>
                    <table className='ltable'>
                        <tbody>
                            <tr>
                                <td>Company name</td>
                                <td>{state?.hasOwnProperty("firmo_bq_company_name") ? state?.firmo_bq_company_name : "N/A"}</td>
                            </tr>
                            <tr>
                                <td>Company Status</td>
                                <td>{state?.hasOwnProperty("firmo_bq_company_isactive") ? state?.firmo_bq_company_isactive === 1 ? "Active" : "In Active" : "N/A"}</td>
                            </tr>
                            <tr>
                                <td>BQ organization id</td>
                                <td>{state?.hasOwnProperty("bq_organization_id") ? state?.bq_organization_id
                                    : "N/A"}</td>
                            </tr>
                            <tr>
                                <td>Website</td>
                                <td style={{ textTransform: "none", color: "#4d8eff" }}>{state?.hasOwnProperty("firmo_bq_website")
                                    ? <a href={web} style={{ textDecoration: "none" }}>{web}</a> : "N/A"}</td>
                            </tr>
                            <tr>
                                <td>Year Founded</td>
                                <td>{state?.hasOwnProperty("firmo_bq_year_founded") ? state?.firmo_bq_year_founded : "N/A"}</td>
                            </tr>
                            <tr>
                                <td>Holding Company</td>
                                <td>No</td>
                            </tr>
                            <tr>
                                <td>IRS Industry</td>
                                <td>{state?.hasOwnProperty("firmo_bq_irs_industry_name") ? state?.firmo_bq_irs_industry_name : "N/A"}</td>
                            </tr>

                            <tr>
                                <td>IRS Sector</td>
                                <td>{state?.hasOwnProperty("firmo_bq_irs_sector_name") ? state?.firmo_bq_irs_sector_name : "N/A"}</td>
                            </tr>

                            <tr>
                                <td>NAICS Industries</td>
                                <td>{state?.hasOwnProperty("firmo_bq_naics_name") ? state?.firmo_bq_naics_name : "N/A"}</td>
                            </tr>
                            <tr>
                                <td>Naics Code</td>
                                <td>{state?.hasOwnProperty("firmo_bq_naics_sector_code") ? state?.firmo_bq_naics_sector_code : "N/A"}</td>
                            </tr>
                            <tr>
                                <td>Street Address</td>
                                <td>{state?.hasOwnProperty("firmo_bq_company_address1_line_1") ? state?.firmo_bq_company_address1_line_1 : "N/A"}</td>
                            </tr>
                            <tr>
                                <td>City</td>
                                <td>{state?.hasOwnProperty("firmo_bq_company_address1_city") ? state?.firmo_bq_company_address1_city : "N/A"}</td>
                            </tr>

                            <tr>
                                <td>Country</td>
                                <td>United States</td>
                            </tr>
                            <tr>
                                <td>State</td>
                                <td>{state?.hasOwnProperty("firmo_bq_company_address1_state") ? state?.firmo_bq_company_address1_state : "N/A"}</td>
                            </tr>
                            <tr>
                                <td>Zip Code</td>
                                <td>{state?.hasOwnProperty("firmo_bq_company_address1_zip5") ? state?.firmo_bq_company_address1_zip5 : "N/A"}</td>
                            </tr>
                            <tr>
                                <td>Non profit</td>
                                <td>{state?.hasOwnProperty("firmo_bq_non_profit_indicator") ? state?.firmo_bq_non_profit_indicator === 0 ? "No" : "Yes" : "N/A"}</td>
                            </tr>
                            <tr>
                                <td>Government or Labour org.</td>
                                <td>No</td>
                            </tr>
                            <tr>
                                <td>Ticker</td>
                                <td>{state?.hasOwnProperty("firmo_bq_ticker") ? state?.firmo_bq_ticker : "N/A"}</td>
                            </tr>
                            <tr>
                                <td>Parent Ticker</td>
                                <td>N/A</td>
                            </tr>
                            <tr>
                                <td>CIK</td>
                                <td>{state?.hasOwnProperty("firmo_bq_cik") ? state?.firmo_bq_cik : "N/A"}</td>
                            </tr>
                        </tbody>
                    </table>
                    <h6>Company Size Mr (most recently reported)</h6>
                    <div className='count-card'>
                        <div className="cc">
                            <span>1</span>
                            <p>#Companies</p>
                        </div>
                        <div className="cc">
                            <span>{state?.hasOwnProperty("mr_bq_current_employees_plan_mr")
                                ? millify(Number(state?.mr_bq_current_employees_plan_mr)) : "N/A"}</span>
                            <p>Employement</p>
                        </div>
                        <div className="cc">
                            <span>{state?.hasOwnProperty("mr_bq_revenue_mr")
                                ? millify(Number(state?.mr_bq_revenue_mr)) : "N/A"}</span>
                            <p>Revenue</p>
                        </div>
                    </div>
                    <p className='note'><b>Note:</b> All 9.4 million active and inactive companies listed
                        have full time employment, are US based and are operating companies</p>
                </div>
            </div>
            {/* <div className='last-foot'>
                <p>© 2023 BrightQuery, Inc. All rights reserved. U.S. patent pending. Contact: <span>sales@brightquery.com</span> or 1-888-BQDATA1.</p>
                <img className='minlogo' src={img1} />
            </div> */}
        </section>
    )
}

export default ToolGraphSection