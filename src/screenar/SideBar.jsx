import millify from 'millify'
import React from 'react'

const SideBar = ({ loading2, sidebar, img3 }) => {
    return (
        <div className="sidebar">
            <h4>
                Searched
                <br />
                Company
                <br />
                Summary{" "}
            </h4>
            <div className="token">
                <p>
                    {loading2 ? <img className="minLogo" src={img3} /> : sidebar?.hasOwnProperty("total_companies") ? millify(Number(sidebar?.total_companies))
                        : sidebar === null ? "N/A" : "N/A"}
                </p>
                <span>Companies</span>
            </div>
            <div className="token">
                <p>
                    {loading2 ? <img className="minLogo" src={img3} /> : sidebar?.hasOwnProperty("bq_revenue_mr_total") ? "$" + millify(Number(sidebar?.bq_revenue_mr_total))
                        : sidebar === null ? "N/A" : "N/A"}
                </p>
                <span>Revenue</span>
            </div>
            <div className="token">
                <p>
                    {loading2 ? <img className="minLogo" src={img3} /> : sidebar?.hasOwnProperty("bq_revenue_mr_avg") ? "$" + millify(Number(sidebar?.bq_revenue_mr_avg))
                        : sidebar === null ? "N/A" : "N/A"}
                </p>
                <span>Revenue Avg</span>
            </div>
            <div className="token">
                <p>
                    {loading2 ? <img className="minLogo" src={img3} /> : sidebar?.hasOwnProperty("bq_current_employees_plan_mr_total") ? millify(Number(sidebar?.bq_current_employees_plan_mr_total))
                        : sidebar === null ? "N/A" : "N/A"}
                </p>
                <span>Headcount</span>
            </div>
            <div className="token">
                <p>
                    {loading2 ? <img className="minLogo" src={img3} /> : sidebar?.hasOwnProperty("bq_current_employees_plan_mr_avg") ? millify(Number(sidebar?.bq_current_employees_plan_mr_avg))
                        : sidebar === null ? "N/A" : "N/A"}
                </p>
                <span>Headcount AVG</span>
            </div>
        </div>
    )
}

export default SideBar