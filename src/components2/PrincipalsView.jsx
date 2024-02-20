import React, { useEffect, useState } from "react";
import { fetchParentPrincipals } from "../Aws/Aws-api";

const PrincipalsView = ({ id, bqid, data }) => {
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const fetchLegalEntity = async () => {
    try {
      setLoading(true);
      const result = await fetchParentPrincipals(
        bqid,
        "Ultimate Parent",
        token
      );
      if (result?.data?.root?.children) {
        let temp = result?.data?.root?.children;
        let arr = [];
        for (var i = 0; i < temp?.length; i++) {
          if (
            arr?.find(
              (f) =>
                f?.fields?.bq_officer_full_name ===
                temp[i]?.fields?.bq_officer_full_name &&
                f?.fields?.bq_officer_position ===
                temp[i]?.fields?.bq_officer_position
            )
          ) {
            continue;
          } else {
            arr.push(temp[i]);
          }
        }

        setState(arr);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (bqid) {
      fetchLegalEntity();
    }
  }, [bqid]);

  // console.log(state)
  return (
    <>
      <div className="principal">
        {loading ? (
          <button>Load Data</button>
        ) : state?.length > 0 ? (
          <ul className="officerInfo">
            {state?.map((d, i) =>
              d?.fields?.hasOwnProperty("bq_officer_full_name") &&
                d?.fields?.hasOwnProperty("bq_officer_position") ? (
                <li key={i + "p"}>
                  {d?.fields?.bq_officer_full_name} |{" "}
                  <span style={{ textTransform: "uppercase" }}>
                    {d?.fields?.bq_officer_position}
                  </span>
                </li>
              ) : (
                ""
              )
            )}
          </ul>
        ) : (
          <p style={{ fontSize: "0.8rem" }}>No Officers Listed</p>
        )}
      </div>
    </>
  );
};

export default PrincipalsView;
