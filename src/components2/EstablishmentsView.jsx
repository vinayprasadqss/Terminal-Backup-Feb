import React, { useEffect, useState } from "react";
import { fetchChildrenPrincipals } from "../Aws/Aws-api";

const EstablishmentsView = ({ id, bqid, status }) => {
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const fetchPrincipals = async () => {
    try {
      setLoading(true);
      const result = await fetchChildrenPrincipals(bqid, id, status, token);
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
      fetchPrincipals();
    }
  }, [bqid]);

  return (
    <>
      {loading ? (
        <button>Load Data</button>
      ) : (
        <ul className="officerInfo">
          {state?.length === 0 ? (
            <span style={{ fontSize: "0.8rem" }}>No Officers Listed</span>
          ) : (
            state?.map((d, i) =>
              d?.fields?.hasOwnProperty("bq_officer_full_name") &&
                d?.fields?.hasOwnProperty("bq_officer_position") ? (
                <li key={i + "esta"}>
                  {d?.fields?.bq_officer_full_name} |{" "}
                  <span style={{ textTransform: "uppercase" }}>
                    {d?.fields?.bq_officer_position}
                  </span>
                </li>
              ) : (
                ""
              )
            )
          )}
        </ul>
      )}
    </>
  );
};

export default EstablishmentsView;
