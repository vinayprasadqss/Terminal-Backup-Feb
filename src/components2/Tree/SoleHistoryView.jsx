import { Tooltip } from "antd";
import millify from "millify";
import React from "react";

const SoleHistoryView = ({ singleState }) => {

  return (
    <>
      <p>
        {" "}
        <Tooltip
          placement="top"
          title="Revenue pertains to the U.S. only and 
is derived from local, state, and federal tax filings."
        >
          <b style={{ fontSize: "0.8rem" }}>
            Revenue{" "}
            <i
              style={{ color: "#696969", fontSize: "0.7rem" }}
              className="bx bxs-info-circle"
            ></i>
          </b>
        </Tooltip>
      </p>
      <table className="htable">
        <thead>
          <tr>
            <th>PERIOD</th>
            <th className="r">REVENUE</th>
          </tr>
        </thead>
        <tbody>
          {singleState?.hasOwnProperty("bq_revenue_ts_2019") && (
            <tr>
              <td>2019</td>
              <td className="r">
                {"$" + millify(singleState?.bq_revenue_ts_2019)}
              </td>
            </tr>
          )}
          {singleState?.hasOwnProperty("bq_revenue_ts_2020") && (
            <tr>
              <td>2020</td>
              <td className="r">
                {"$" + millify(singleState?.bq_revenue_ts_2020)}
              </td>
            </tr>
          )}
          {singleState?.hasOwnProperty("bq_revenue_ts_2021") && (
            <tr>
              <td>2021</td>
              <td className="r">
                {"$" + millify(singleState?.bq_revenue_ts_2021)}
              </td>
            </tr>
          )}
          {singleState?.hasOwnProperty("bq_revenue_ts_2022") && (
            <tr>
              <td>2022</td>
              <td className="r">
                {"$" + millify(singleState?.bq_revenue_ts_2022)}
              </td>
            </tr>
          )}

          <tr className="total" key={"gdfgsd"}>
            <td>
              <b>Total</b>
            </td>
            <td className="r">
              <b>
                {"$" +
                  millify(
                    Number(
                      (singleState?.bq_revenue_ts_2019 || 0) +
                      (singleState?.bq_revenue_ts_2020 || 0) +
                      (singleState?.bq_revenue_ts_2021 || 0) +
                      (singleState?.bq_revenue_ts_2022 || 0)
                    )
                  )}
              </b>
            </td>
          </tr>
        </tbody>
      </table>
      <br></br>
      <p>
        <Tooltip
          placement="top"
          title=" Full-Time Headcount includes all W-2 full-time employees in the U.S. and is derived from Dept. of Labor filings."
        >
          <b style={{ fontSize: "0.8rem" }}>
            Employment{" "}
            <i
              style={{ color: "#696969", fontSize: "0.7rem" }}
              className="bx bxs-info-circle"
            ></i>
          </b>
        </Tooltip>{" "}
      </p>
      <table className="htable">
        <thead>
          <tr>
            <th>PERIOD</th>
            <th className="r"> FULL-TIME HEADCOUNT</th>
          </tr>
        </thead>
        <tbody>
          {singleState?.hasOwnProperty("bq_current_employees_plan_ts_2019") && (
            <tr>
              <td>2019</td>
              <td className="r">
                {millify(singleState?.bq_current_employees_plan_ts_2019)}
              </td>
            </tr>
          )}
          {singleState?.hasOwnProperty("bq_current_employees_plan_ts_2020") && (
            <tr>
              <td>2020</td>
              <td className="r">
                {millify(singleState?.bq_current_employees_plan_ts_2020)}
              </td>
            </tr>
          )}
          {singleState?.hasOwnProperty("bq_current_employees_plan_ts_2021") && (
            <tr>
              <td>2021</td>
              <td className="r">
                {millify(singleState?.bq_current_employees_plan_ts_2021)}
              </td>
            </tr>
          )}
          {singleState?.hasOwnProperty("bq_current_employees_plan_ts_2022") && (
            <tr>
              <td>2022</td>
              <td className="r">
                {millify(singleState?.bq_current_employees_plan_ts_2022)}
              </td>
            </tr>
          )}

          {/* <tr className="total" key={"gdfgsd"}>
            <td>
              <b>Total</b>
            </td>
            <td className="r">
              <b>
                {"$" +
                  millify(
                    Number(
                      (singleState?.bq_current_employees_plan_ts_2019 || 0) +
                        (singleState?.bq_current_employees_plan_ts_2020 || 0) +
                        (singleState?.bq_current_employees_plan_ts_2021 || 0) +
                        (singleState?.bq_current_employees_plan_ts_2022 || 0)
                    )
                  )}
              </b>
            </td>
          </tr> */}
        </tbody>
      </table>
    </>
  );
};

export default SoleHistoryView;
