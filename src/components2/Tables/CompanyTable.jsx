import { Checkbox, Tooltip } from "antd";
import millify from "millify";
import React, { useState } from "react";
import { NumericFormat } from "react-number-format";
import Report2 from "../../Report2";

const CompanyTable = ({ result, setData, setDid, setDisplay,
  setTHeadcount, setTrevenue, setLocationName, setLocationQuery,
  setFsmQuery, setLocationOpen, setOpen, handleCheckboxChange, portfolioItem }) => {
  const handleDetail = (id) => {
    // console.log(id);
    const id2 = id.split("::")[1];
    setDid(id);
    setDisplay(1);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");

  const handlePrint = (ids, name1) => {
    setIsModalOpen(true);
    setId(ids);
    setName(name1);
  };

  return (
    <>
      <div
        className="tableView"
        style={{
          border: "1px solid #ccc",
          margin: "1rem 0",
          borderRadius: "5px",
        }}
      >
        <div className="listCol list-check rx">
          <Checkbox onChange={(e) => handleCheckboxChange(e.target.checked, result)}
            checked={portfolioItem?.find((f) => f?.id === result?.bq_organization_id) ? true : false} /></div>
        <div className="listCol listCol-1" style={{ background: "#fafafa" }}>
          {result.bq_legal_entity_id === "" &&
            result?.bq_organization_structure ===
            "Single-entity organization" && (
              <span>No legal entity match</span>
            )}
          {result?.bq_legal_entity_id !== "" &&
            result?.bq_organization_structure ===
            "Single-entity organization" && (
              <span
                className="familylink"
                onClick={() => {
                  handleDetail(result?.bq_organization_id)
                  setTrevenue(result?.bq_revenue_mr || 0);
                  setTHeadcount(result?.bq_current_employees_plan_mr)
                }}
              >
                {/* <u>View legal entity</u> */}
                <u>See Company Details</u>
              </span>
            )}

          {result?.bq_organization_structure ===
            "Multi-entity U.S. organization" && (
              <span
                className="familylink"
                onClick={() => {
                  handleDetail(result?.bq_organization_id)
                  setTrevenue(result?.bq_revenue_mr || 0);
                  setTHeadcount(result?.bq_current_employees_plan_mr)
                }}
              >
                {/* <u>View Family Tree</u> */}
                <u>See Company Details</u>
              </span>
            )}
          <span
            className="printReport"
            onClick={() =>
              handlePrint(
                result?.bq_organization_id,
                result?.bq_organization_name
              )
            }
          >
            View Company Report
          </span>
          <span className="" style={{ cursor: "pointer" }} onClick={() => {
            setOpen(true)
            setFsmQuery(result?.bq_organization_id);
          }}
          ><u>
              View Financial Report
            </u>
          </span>
          <span style={{ cursor: "pointer" }} onClick={() => {
            setLocationOpen(true)
            setLocationQuery(result?.bq_organization_id);
            setLocationName(result?.bq_organization_name);
          }}

          ><u>
              View Locations
            </u></span>
        </div>
        <div className="listCol listCol-2" style={{ background: "#fafafa" }}>
          Structure:{" "}
          {result?.hasOwnProperty("bq_organization_structure")
            ? result?.bq_organization_structure
            : "N/A"}{" "}
          <br />
          Type:{" "}
          {result?.hasOwnProperty("bq_organization_company_type")
            ? result?.bq_organization_company_type
            : "N/A"}
          {/* game:{result?.bq_organization_company_number} */}
        </div>
        <div className="listCol" style={{ background: "#fafafa" }}>
          <strong>{result?.bq_organization_name}</strong>
          <br />
          EIN:{" "}
          {result?.hasOwnProperty("bq_organization_ein")
            ? result?.bq_organization_ein === "None"
              ? "NO VERIFIED EIN (YET)"
              : result?.bq_organization_ein
            : "NO VERIFIED EIN (YET)"}
          <br />
          Ticker:{" "}
          {result?.hasOwnProperty("bq_organization_ticker")
            ? result?.bq_organization_ticker === "None" &&
              result?.bq_organization_is_public === false
              ? "Private Company (No Ticker)"
              : result?.bq_organization_ticker
            : result?.bq_organization_is_public === false
              ? "Private Company"
              : "N/A"}
          <br />
          {/* Legal Name:{" "}
          {result?.hasOwnProperty("bq_organization_legal_name")
            ? result?.bq_organization_legal_name
            : "N/A"}
          <br /> */}
          BQ Org ID:{" "}
          {result?.hasOwnProperty("bq_organization_id")
            ? result?.bq_organization_id
            : "N/A"}
          <br />
          BQ Legal Entity ID:{" "}
          {result?.hasOwnProperty("bq_legal_entity_id")
            ? result?.bq_legal_entity_id
            : "N/A"}
          <br />
        </div>
        <div className="listCol" style={{ background: "#fafafa" }}>
          Address Type:{" "}
          {result?.hasOwnProperty("bq_organization_address1_type")
            ? result?.bq_organization_address1_type === "Unknown"
              ? "Residential / Commercial"
              : result?.bq_organization_address1_type
            : "Residential / Commercial"}
          <br />
          {result?.hasOwnProperty("bq_organization_address1_line_1") ||
            result?.hasOwnProperty("bq_organization_address1_line_2") ||
            result?.hasOwnProperty("bq_organization_address1_city") ||
            result?.hasOwnProperty("bq_organization_address1_state") ||
            result?.hasOwnProperty("bq_organization_address1_zip5") ? (
            <>
              {result?.hasOwnProperty("bq_organization_address1_line_1")
                ? result?.bq_organization_address1_line_1 === "None"
                  ? ""
                  : result?.bq_organization_address1_line_1
                : ""}{" "}
              {result?.hasOwnProperty("bq_organization_address1_line_2")
                ? result?.bq_organization_address1_line_2 === "None"
                  ? ""
                  : result?.bq_organization_address1_line_2
                : ""}
              <br />
              {result?.hasOwnProperty("bq_organization_address1_city")
                ? result?.bq_organization_address1_city === "None"
                  ? ""
                  : result?.bq_organization_address1_city
                : ""}
              ,{" "}
              {result?.hasOwnProperty("bq_organization_address1_state")
                ? result?.bq_organization_address1_state === "None"
                  ? ""
                  : result?.bq_organization_address1_state
                : ""}{" "}
              {result?.hasOwnProperty("bq_organization_address1_zip5")
                ? result?.bq_organization_address1_zip5 === "None"
                  ? ""
                  : result?.bq_organization_address1_zip5
                : ""}
            </>
          ) : (
            "N/A"
          )}
        </div>
        <div className="listCol" style={{ background: "#fafafa" }}>
          Jur. State:{" "}
          {result?.hasOwnProperty("bq_legal_entity_jurisdiction_code")
            ? result?.bq_legal_entity_jurisdiction_code
            : "N/A"}
          <br />
          Founded:{" "}
          {result?.hasOwnProperty("bq_organization_date_founded")
            ? result?.bq_organization_date_founded
            : "N/A"}
          <br />
          Legal Status:{" "}
          <span style={{ textTransform: "capitalize" }}>
            {result?.hasOwnProperty("bq_organization_current_status")
              ? result?.bq_organization_current_status === "Inactive"
                ? "Inactive"
                : result?.bq_organization_current_status
              : "N/A"}
          </span>{" "}
          <br />
          Status:{" "}
          {result?.hasOwnProperty("bq_organization_isactive") ? (
            result?.bq_organization_isactive === true ? (
              <span>Active</span>
            ) : (
              <span>Inactive</span>
            )
          ) : (
            "N/A"
          )}
          <br />
        </div>
        <div className="listCol" style={{ background: "#fafafa" }}>
          <Tooltip
            placement="top"
            title="Full-Time Headcount includes all W-2 full-time employees in the U.S. and is derived from Dept. of Labor filings."
          >
            Full-Time Headcount{" "}
            <i
              style={{ color: "#696969", fontSize: "0.7rem" }}
              className="bx bxs-info-circle"
            ></i>
            :
          </Tooltip>{" "}
          <span>
            {" "}
            {result?.hasOwnProperty("bq_current_employees_plan_mr")
              ? result?.bq_current_employees_plan_mr === "None"
                ? result?.bq_current_employees_plan_mr
                : millify(Math.floor(result?.bq_current_employees_plan_mr))
              : "N/A"}
            {/* <NumericFormat
            value={result?.bq_current_employees_plan_mr}
            displayType={"text"}
            thousandSeparator=","
          /> */}
          </span>
          <br />
          <Tooltip
            placement="top"
            title="The BQ Credit Score assesses the financial health of
         a company based on its financial performance, size, age, and industry."
          >
            BQ Credit Score{" "}
            <i
              style={{ color: "#696969", fontSize: "0.7rem" }}
              className="bx bxs-info-circle"
            ></i>
            :
          </Tooltip>
          <span>
            {" "}
            {result?.hasOwnProperty("bq_score") ? (
              result?.bq_score ? (
                result?.bq_score === "None" ? (
                  result?.bq_score
                ) : (
                  <NumericFormat
                    value={result?.bq_score}
                    displayType={"text"}
                    decimalScale={0}
                  />
                )
              ) : (
                "N/A"
              )
            ) : (
              "N/A"
            )}
          </span>{" "}
          <br />
          IRS Sector: {result?.bq_organization_sector_name}
          <br />
        </div>
        <div className="listCol" style={{ background: "#fafafa" }}>
          {result?.bq_revenue_mr === "0" ||
            result?.bq_revenue_mr === "None" ||
            result?.bq_revenue_mr === "NA" ||
            !result?.hasOwnProperty("bq_revenue_mr") ? (
            <span>N/A</span>
          ) : (
            <span>
              {"$" + millify(result?.bq_revenue_mr)}
              {/* <NumericFormat
              value={result?.bq_revenue_mr}
              prefix={"$"}
              displayType={"text"}
              allowLeadingZeros
              thousandSeparator=","
            /> */}
            </span>
          )}
          <br />
        </div>
      </div>
      {isModalOpen && (
        <Report2
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          id={id}
          name={name}
        />
      )}
    </>
  );
};

export default CompanyTable;
