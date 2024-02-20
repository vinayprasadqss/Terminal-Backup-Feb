import React, { useState, useEffect } from "react";
import { orgRevenueAndEmployment } from "../../Aws/Aws-api";
import { NumericFormat } from "react-number-format";
import millify from "millify";
import { Tooltip } from "antd";

const obj = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];



const RevenueTable = ({ state, totalRevenue }) => {
  return (
    <>
      <table className="htable">
        <thead>
          <tr>
            <th>PERIOD</th>
            <th className="r">U.S. REVENUE</th>
          </tr>
        </thead>
        <tbody>
          {state
            ?.sort((a, b) => b?.year - a?.year)
            ?.slice(0, 4)
            ?.map((d, i) => (
              <tr key={i + "h"}>
                <td>
                  {d?.hasOwnProperty("quarter") ? "Q" : ""}
                  {d?.quarter} {obj[d?.month]} {d?.year}
                </td>
                <td className="r">
                  {d?.hasOwnProperty("revenue")
                    ? "$" + millify(d?.revenue)
                    : "N/A"}
                </td>
              </tr>
            ))}
          <tr className="total" key={"gdfgsd"}>
            <td>
              {" "}
              <b>Total</b>
            </td>
            <td className="r">
              <b>
                {totalRevenue === "N/A" ? "N/A" : "$" + millify(totalRevenue)}
              </b>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};



const HeadCountTable = ({ state, totalHeadcount }) => {

  return (
    <table className="htable">
      <thead>
        <tr>
          <th>PERIOD</th>
          <th className="r">U.S. FULL-TIME HEADCOUNT</th>
        </tr>
      </thead>
      <tbody>
        {state
          ?.sort((a, b) => b?.year - a?.year)
          ?.slice(0, 4)
          ?.map((d, i) => (
            <tr key={i + "h"}>
              <td>
                {
                  d?.hasOwnProperty("quarter") ? "Q" : ""
                }
                {d?.quarter} {obj[d?.month - 1]} {d?.year}{" "}
              </td>
              <td className="r">

                {d?.hasOwnProperty("bq_current_employees_plan") ? millify(Number(d?.bq_current_employees_plan)) : millify(d?.headcount)}
              </td>
            </tr>
          ))}


      </tbody>
    </table>
  );
};

const HistoricalView = ({ data, usOnly }) => {
  const [state, setState] = useState([]);
  const [head, setHead] = useState([]);
  const [rev, setRev] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalHeadcount, setTotalHeadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await orgRevenueAndEmployment(data, token);
      // console.log(result)
      if (result?.data?.root?.children) {

        if (result?.data?.root?.children[0]?.fields?.quarterly_revenue?.length > 0 &&
          result?.data?.root?.children[0]?.fields?.quarterly_revenue[0]?.hasOwnProperty("revenue")
        ) {
          console.log("q")
          setRev(
            result?.data?.root?.children[0]?.fields?.quarterly_revenue
              ?.sort((a, b) => b?.year - a?.year)
              ?.slice(0, 4)
          );
        }
        else if (result?.data?.root?.children[0]?.fields?.yearly_revenue?.length > 0 &&
          result?.data?.root?.children[0]?.fields?.yearly_revenue[0]?.hasOwnProperty("revenue")) {
          console.log("y")
          setRev(
            result?.data?.root?.children[0]?.fields?.yearly_revenue
              ?.sort((a, b) => b?.year - a?.year)
              ?.slice(0, 4)
          );
        }
        else {
          setRev([])
        }
        //headcount
        if (result?.data?.root?.children[0]?.fields?.monthly_bq_current_employees_plan?.length > 0 &&
          result?.data?.root?.children[0]?.fields?.monthly_bq_current_employees_plan[0]?.hasOwnProperty("bq_current_employees_plan")
        ) {

          setHead(
            result?.data?.root?.children[0]?.fields?.monthly_bq_current_employees_plan
              ?.sort((a, b) => b?.year - a?.year)
              ?.slice(0, 4)
          );
        }
        else if (result?.data?.root?.children[0]?.fields?.quarterly_headcount?.length > 0 &&
          result?.data?.root?.children[0]?.fields?.quarterly_headcount[0]?.hasOwnProperty("headcount")) {

          setHead(
            result?.data?.root?.children[0]?.fields?.quarterly_headcount
              ?.sort((a, b) => b?.year - a?.year)
              ?.slice(0, 4)
          );
        }
        else if (result?.data?.root?.children[0]?.fields?.yearly_headcount?.length > 0 &&
          result?.data?.root?.children[0]?.fields?.yearly_headcount[0]?.hasOwnProperty("headcount")) {

          setHead(
            result?.data?.root?.children[0]?.fields?.yearly_headcount
              ?.sort((a, b) => b?.year - a?.year)
              ?.slice(0, 4)
          );
        }
        else {
          setHead([])
        }


        setState(result?.data?.root?.children[0]?.fields);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (data) {
      fetchData();
    }
  }, [data]);

  useEffect(() => {
    let t = 0;
    for (var i = 0; i < rev?.length; i++) {
      t = t + Number(rev[i]?.revenue || 0);
    }
    setTotalRevenue(t || "N/A");
  }, [rev]);

  useEffect(() => {
    let t = 0;
    for (var i = 0; i < head; i++) {
      t = t + Number(head[i]?.headcount || 0);
    }
    setTotalHeadCount(t);
  }, [head]);

  return (
    <>
      {loading ? (
        <button>Load Data</button>
      ) : (
        <>
          {state?.length === 0 ? (
            <p style={{ fontSize: "0.9rem" }}>No Historical Data</p>
          ) : (
            <>
              <p>
                {" "}
                <Tooltip
                  placement="top"
                  title="Revenue pertains to the U.S. only and 
                        is derived from local, state, and federal tax filings."
                >

                  <b style={{ fontSize: "0.8rem" }}>
                    U.S. Revenue {" "}
                    <i
                      style={{ color: "#696969", fontSize: "0.7rem" }}
                      className="bx bxs-info-circle"
                    ></i>
                  </b>
                </Tooltip>
              </p>
              <RevenueTable state={rev} totalRevenue={totalRevenue} />
              <br></br>
              <p>
                <Tooltip
                  placement="top"
                  title="Full-Time Headcount includes all W-2 full-time employees in the U.S. and is derived from Dept. of Labor filings."
                >
                  <b style={{ fontSize: "0.8rem" }}>
                    U.S. Employment{" "}
                    <i
                      style={{ color: "#696969", fontSize: "0.7rem" }}
                      className="bx bxs-info-circle"
                    ></i>
                  </b>
                </Tooltip>{" "}
              </p>
              <HeadCountTable state={head} totalHeadcount={totalHeadcount} />
            </>
          )}
        </>
      )}
    </>
  );
};

export default HistoricalView;
