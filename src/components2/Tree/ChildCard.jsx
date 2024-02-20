import React, { useEffect, useState } from "react";
import PrincipalsView from "../PrincipalsView";
import EstablishmentsView from "../EstablishmentsView";
import { Tooltip } from "antd";
import { useSelector } from "react-redux";
import { fetchChildrenPrincipals } from "../../redux/action";
import PrincipalViewChildren from "./PrincipalViewChildren";
const ChildCard = ({ expandedItems, d, i, handleActive, singleState }) => {
  const [web, setWeb] = useState();
  const [linkedin, setLinkedIn] = useState();
  const { filter } = useSelector((state) => state.search);

  ///Update Text
  const [updateText, setUpdateText] = useState(" January 2024");

  const handleJrName = (a) => {
    const temp = filter?.bq_legal_entity_jurisdiction_code?.find(
      (f) => f?.jurisdiction_code === a
    );
    return temp?.jurisdiction_name + " " + "(" + temp?.jurisdiction_code + ")";
  };

  const webcheck = () => {
    if (d?.fields?.bq_organization_website?.startsWith("http://www.")) {
      return d?.fields?.bq_organization_website;
    } else if (d?.fields?.bq_organization_website?.startsWith("https://www.")) {
      return d?.fields?.bq_organization_website;
    } else if (d?.fields?.bq_organization_website?.startsWith("http://")) {
      return d?.fields?.bq_organization_website?.replace(
        "http://",
        "http://www."
      );
    } else if (d?.fields?.bq_organization_website?.startsWith("https://")) {
      return d?.fields?.bq_organization_website?.replace(
        "https://",
        "https://www."
      );
    } else if (d?.fields?.bq_organization_website?.startsWith("www.")) {
      return d?.fields?.bq_organization_website?.replace(
        "www.",
        "https://www."
      );
    } else if (d?.fields?.bq_organization_website?.startsWith("www-")) {
      return d?.fields?.bq_organization_website?.replace(
        "www-",
        "https://www-"
      );
    } else if (
      !d?.fields?.bq_organization_website?.startsWith("http://www.") ||
      !d?.fields?.bq_organization_website?.startsWith("https://www.") ||
      !d?.fields?.bq_organization_website?.startsWith("http://") ||
      !d?.fields?.bq_organization_website?.startsWith("https://") ||
      !d?.fields?.bq_organization_website?.startsWith("www.") ||
      !d?.fields?.bq_organization_website?.startsWith("www") ||
      !d?.fields?.bq_organization_website?.startsWith("www-")
    ) {
      return `http://www.${d?.fields?.bq_organization_website}`;
    } else {
      return d?.fields?.bq_organization_website;
    }
  };

  const webcheck2 = () => {
    if (d?.fields?.bq_organization_linkedin_url?.startsWith("http://www.")) {
      return d?.fields?.bq_organization_linkedin_url;
    } else if (
      d?.fields?.bq_organization_linkedin_url?.startsWith("https://www.")
    ) {
      return d?.fields?.bq_organization_linkedin_url;
    } else if (d?.fields?.bq_organization_linkedin_url?.startsWith("http://")) {
      return d?.fields?.bq_organization_linkedin_url?.replace(
        "http://",
        "http://www."
      );
    } else if (
      d?.fields?.bq_organization_linkedin_url?.startsWith("https://")
    ) {
      return d?.fields?.bq_organization_linkedin_url?.replace(
        "https://",
        "https://www."
      );
    } else if (d?.fields?.bq_organization_linkedin_url?.startsWith("www.")) {
      return d?.fields?.bq_organization_linkedin_url?.replace(
        "www.",
        "https://www."
      );
    } else if (
      !d?.fields?.bq_organization_linkedin_url?.startsWith("http://www.") ||
      !d?.fields?.bq_organization_linkedin_url?.startsWith("https://www.") ||
      !d?.fields?.bq_organization_linkedin_url?.startsWith("http://") ||
      !d?.fields?.bq_organization_linkedin_url?.startsWith("https://") ||
      !d?.fields?.bq_organization_linkedin_url?.startsWith("www.") ||
      !d?.fields?.bq_organization_linkedin_url?.startsWith("www")
    ) {
      return `https://www.${d?.fields?.bq_organization_linkedin_url}`;
    } else {
      return d?.fields?.bq_organization_linkedin_url;
    }
  };


  const relatedFinder = (dz) => {
    let temp = [];
    const tickerStrings = dz?.map(obj => obj.bq_ticker_related_individual);

    const result = tickerStrings.join(", ");
    return result
  }







  useEffect(() => {
    const modifiedUrl = webcheck();
    setWeb(modifiedUrl);
  }, [d?.fields?.bq_organization_website]);

  useEffect(() => {
    const modifiedUrl = webcheck2();
    setLinkedIn(modifiedUrl);
  }, [d?.fields?.bq_organization_linkedin_url]);

  return (
    <div className="viewBox" style={{ userSelect: "none" }}>
      <div className="strip">
        <div className="left">
          <h2 className={expandedItems.includes(i) ? "indent1" : "indent1 fw"}>
            {d?.fields?.bq_organization_legal_name}
          </h2>
          <h5>
            Jurisdiction:{" "}
            {d?.fields?.hasOwnProperty("bq_legal_entity_jurisdiction_code")
              ? handleJrName(d?.fields?.bq_legal_entity_jurisdiction_code)
              : "N/A"}
          </h5>
        </div>
        <span className="cbtn" onClick={() => handleActive(i)}>
          {expandedItems.includes(i) ? <i className="bx bx-minus"></i> : "+"}
        </span>
      </div>
      {expandedItems.includes(i) && (
        <div className="viewBoxRow">
          <div className="viewBoxCol">
            <h3>Organization Identity</h3>
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <th className="center">
                    <strong>Org Name</strong>
                  </th>
                  <td>{d?.fields?.bq_organization_name || "N/A"}</td>
                </tr>
                <tr>
                  <th className="center">
                    <strong>Structure</strong>
                  </th>
                  <td>{d?.fields?.bq_organization_structure || "N/A"}</td>
                </tr>
                <tr>
                  <th className="center">
                    <strong>Type</strong>
                  </th>
                  <td>{d?.fields?.bq_organization_company_type || "N/A"}</td>
                </tr>
                <tr>
                  <th className="center">
                    <strong>Org Status</strong>
                  </th>
                  <td>
                    {d?.fields?.hasOwnProperty("bq_organization_current_status")
                      ? d?.fields?.bq_organization_current_status === "active"
                        ? <span>Yes</span> : d?.fields?.bq_organization_current_status === "Inactive" ? <span style={{ color: "red" }}></span> :
                          d?.fields?.bq_organization_current_status

                      : "N/A"}
                    <br></br>
                    <span>Updated:{updateText}</span>
                  </td>
                </tr>
                <tr>
                  <th className="center">
                    <strong>Org Active</strong>
                  </th>
                  <td>
                    {d?.fields?.hasOwnProperty("bq_organization_isactive")
                      ? d?.fields?.bq_organization_isactive === false
                        ? <span style={{ color: "red" }}>No</span>
                        : <span>Yes</span>
                      : "N/A"}
                    <br></br>
                    <span>Updated:{updateText}</span>
                  </td>
                </tr>
                <tr>
                  <th className="center">
                    <strong>BQ Org ID</strong>
                  </th>
                  <td>{d?.fields?.bq_organization_id || "N/A"}</td>
                </tr>
                <tr>
                  <th className="center">
                    <strong>EIN</strong>
                  </th>
                  <td>
                    {d?.fields?.hasOwnProperty("bq_organization_ein")
                      ? d?.fields?.bq_organization_ein === "None"
                        ? "NO VERIFIED EIN (YET)"
                        : d?.fields?.bq_organization_ein
                      : "NO VERIFIED EIN (YET)"}
                  </td>
                </tr>
                <tr>
                  <th className="center">
                    <Tooltip
                      placement="top"
                      title="Corporate websites are generally not provided in regulatory and government filings.
                    Therefore, BQ has to scrape the web to find them, leading to some degree of error and uncertainty about their validity."
                    >
                      <strong className="webtooltip">
                        Unverified Website
                        <i
                          style={{
                            color: "#696969",
                            fontSize: "0.7rem",
                            marginLeft: "1px",
                          }}
                          className="bx bxs-info-circle"
                        ></i>
                      </strong>
                    </Tooltip>
                  </th>
                  <td>
                    {d?.fields?.hasOwnProperty("bq_organization_website") ? (
                      <a
                        style={{
                          textDecoration: "none",
                          color: " #3d49a1",
                          fontWeight: "400",
                        }}
                        href={web}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {web || "N/A"}
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </td>
                </tr>
                <tr>
                  <th className="center">
                    <strong> LinkedIn URL</strong>
                  </th>
                  <td>
                    {d?.fields?.hasOwnProperty(
                      "bq_organization_linkedin_url"
                    ) ? (
                      <a
                        style={{
                          textDecoration: "none",
                          color: " #3d49a1",
                          fontWeight: "400",
                        }}
                        href={linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {linkedin || "N/A"}
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </td>
                </tr>
                <tr>
                  <th className="center">
                    <strong>Founded</strong>
                  </th>
                  <td>{d?.fields?.bq_organization_date_founded || "N/A"}</td>
                </tr>
                <tr>
                  <th className="center">
                    <strong>Primary Ticker</strong>
                  </th>
                  <td>
                    {d?.fields?.hasOwnProperty("bq_organization_ticker")
                      ? d?.fields?.bq_organization_ticker === "None" &&
                        d?.fields?.bq_organization_is_public === false
                        ? "PRIVATE COMPANY (NO TICKER)"
                        : d?.fields?.bq_organization_ticker
                      : d?.fields?.bq_organization_is_public === false
                        ? "PRIVATE COMPANY (NO TICKER)"
                        : "N/A"}
                  </td>
                </tr>
                <tr>
                  <th className="center">
                    <strong>Related Tickers</strong>
                  </th>
                  <td>
                    {d?.fields?.hasOwnProperty("bq_tickers_related")
                      ? d?.fields?.bq_tickers_related === "None" &&
                        d?.fields?.bq_organization_is_public === false
                        ? "PRIVATE COMPANY (NO TICKER)"
                        : typeof d?.fields?.bq_tickers_related === 'string' ?
                          d?.fields?.bq_tickers_related :
                          relatedFinder(d?.fields?.bq_tickers_related)
                      : d?.fields?.bq_organization_is_public === false
                        ? "PRIVATE COMPANY (NO TICKER)"
                        : "N/A"}
                  </td>
                </tr>
                <tr>
                  <th className="center">
                    <Tooltip
                      placement="top"
                      title="An LEI is issued by the GLEIF organization to assist with tracking financial transactions. BQ also has available ISINs, which are mapped to LEIs."
                    >
                      <strong className="webtooltip">
                        LEI
                        <i
                          style={{
                            color: "#696969",
                            fontSize: "0.7rem",
                            marginLeft: "1px",
                          }}
                          className="bx bxs-info-circle"
                        ></i>
                      </strong>
                    </Tooltip>
                    {/* <strong>LEI</strong>*/}
                  </th>
                  <td>
                    {d?.fields?.hasOwnProperty("bq_organization_lei")
                      ? d?.fields?.bq_organization_lei
                      : "N/A"}
                  </td>
                </tr>
                <tr>
                  <th className="center">
                    <strong>CIK</strong>
                  </th>
                  <td>
                    {d?.fields?.hasOwnProperty("bq_organization_cik")
                      ? d?.fields?.bq_organization_cik
                      : "N/A"}
                  </td>
                </tr>
                <tr>
                  <th className="center">
                    <strong>HQ Address</strong>
                  </th>
                  <td>
                    {d?.fields?.hasOwnProperty(
                      "bq_organization_address1_line_1"
                    ) ||
                      d?.fields?.hasOwnProperty(
                        "bq_organization_address1_line_2"
                      ) ||
                      d?.fields?.hasOwnProperty(
                        "bq_organization_address1_city"
                      ) ||
                      d?.fields?.hasOwnProperty(
                        "bq_organization_address1_state"
                      ) ||
                      d?.fields?.hasOwnProperty(
                        "bq_organization_address1_zip5"
                      ) ? (
                      <>
                        {d?.fields?.hasOwnProperty(
                          "bq_organization_address1_line_1"
                        )
                          ? d?.fields?.bq_organization_address1_line_1 ===
                            "None"
                            ? ""
                            : d?.fields?.bq_organization_address1_line_1
                          : ""}{" "}
                        {d?.fields?.hasOwnProperty(
                          "bq_organization_address1_line_2"
                        )
                          ? d?.fields?.bq_organization_address1_line_2 ===
                            "None"
                            ? ""
                            : d?.fields?.bq_organization_address1_line_2
                          : ""}
                        <br />
                        {d?.fields?.hasOwnProperty(
                          "bq_organization_address1_city"
                        )
                          ? d?.fields?.bq_organization_address1_city === "None"
                            ? ""
                            : d?.fields?.bq_organization_address1_city + ","
                          : ""}{" "}
                        {d?.fields?.hasOwnProperty(
                          "bq_organization_address1_state"
                        )
                          ? d?.fields?.bq_organization_address1_state === "None"
                            ? ""
                            : d?.fields?.bq_organization_address1_state
                          : ""}{" "}
                        {d?.fields?.hasOwnProperty(
                          "bq_organization_address1_zip5"
                        )
                          ? d?.fields?.bq_organization_address1_zip5 === "None"
                            ? ""
                            : d?.fields?.bq_organization_address1_zip5
                          : ""}
                      </>
                    ) : (
                      "N/A"
                    )}
                  </td>
                </tr>
                <tr>
                  <th className="center">
                    <strong>Location Metro</strong>
                  </th>
                  <td>
                    {d?.fields?.hasOwnProperty(
                      "bq_organization_address1_cbsa_name"
                    )
                      ? d?.fields?.bq_organization_address1_cbsa_name
                      : "N/A"}
                  </td>
                </tr>
              </tbody>
            </table>{" "}
            <p id="vertical-spacer"></p>
            <h3>Legal Identity</h3>
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <th className="center">
                    <strong>Legal Name</strong>
                  </th>
                  <td>{d?.fields?.bq_organization_legal_name || "N/A"}</td>
                </tr>
                <tr>
                  <th className="center">
                    <strong>BQ Legal Entity ID</strong>
                  </th>
                  <td>
                    {d?.fields?.bq_legal_entity_id ||
                      "No matching Legal entity"}
                  </td>
                </tr>

                {/* <tr>
                  <th className="center">
                    <strong>Legal Address</strong>
                  </th>
                  <td>
                    {d?.fields?.hasOwnProperty(
                      "bq_legal_entity_address1_line_1"
                    ) ||
                      d?.fields?.hasOwnProperty(
                        "bq_legal_entity_address1_line_2"
                      ) ||
                      d?.fields?.hasOwnProperty(
                        "bq_legal_entity_address1_city"
                      ) ||
                      d?.fields?.hasOwnProperty(
                        "bq_legal_entity_address1_state"
                      ) ||
                      d?.fields?.hasOwnProperty(
                        "bq_legal_entity_address1_zip5"
                      ) ? (
                      <>
                        {d?.fields?.hasOwnProperty(
                          "bq_legal_entity_address1_line_1"
                        )
                          ? d?.fields?.bq_legal_entity_address1_line_1 ===
                            "None"
                            ? ""
                            : d?.fields?.bq_legal_entity_address1_line_1
                          : ""}{" "}
                        {d?.fields?.hasOwnProperty(
                          "bq_legal_entity_address1_line_2"
                        )
                          ? d?.fields?.bq_legal_entity_address1_line_2 ===
                            "None"
                            ? ""
                            : d?.fields?.bq_legal_entity_address1_line_2
                          : ""}{" "}
                        <br />
                        {d?.fields?.hasOwnProperty(
                          "bq_legal_entity_address1_city"
                        )
                          ? d?.fields?.bq_legal_entity_address1_city === "None"
                            ? ""
                            : d?.fields?.bq_legal_entity_address1_city + ","
                          : ""}{" "}
                        {d?.fields?.hasOwnProperty(
                          "bq_legal_entity_address1_state"
                        )
                          ? d?.fields?.bq_legal_entity_address1_state === "None"
                            ? ""
                            : d?.fields?.bq_legal_entity_address1_state
                          : ""}{" "}
                        {d?.fields?.hasOwnProperty(
                          "bq_legal_entity_address1_zip5"
                        )
                          ? d?.fields?.bq_legal_entity_address1_zip5 === "None"
                            ? ""
                            : d?.fields?.bq_legal_entity_address1_zip5
                          : ""}
                      </>
                    ) : (
                      "N/A"
                    )}
                    <br />
                  </td>
                </tr> */}
                <tr>
                  <th className="center">
                    <strong>Address Type</strong>
                  </th>
                  <td>
                    {d?.fields?.hasOwnProperty("bq_organization_address1_rdi")
                      ? d?.fields?.bq_organization_address1_rdi === "Unknown"
                        ? "Unknown"
                        : d?.fields?.bq_organization_address1_rdi
                      : "Unknown"}
                  </td>
                </tr>
                <tr>
                  <th className="center">
                    <strong>Legal Entity Address</strong>
                  </th>
                  <td>
                    {d?.fields?.hasOwnProperty(
                      "bq_legal_entity_address1_line_1"
                    ) ||
                      d?.fields?.hasOwnProperty(
                        "bq_legal_entity_address1_line_2"
                      ) ||
                      d?.fields?.hasOwnProperty(
                        "bq_legal_entity_address1_city"
                      ) ||
                      d?.fields?.hasOwnProperty(
                        "bq_legal_entity_address1_state"
                      ) ||
                      d?.fields?.hasOwnProperty(
                        "bq_legal_entity_address1_zip5"
                      ) ? (
                      <>
                        {d?.fields?.hasOwnProperty(
                          "bq_legal_entity_address1_line_1"
                        )
                          ? d?.fields?.bq_legal_entity_address1_line_1 ===
                            "None"
                            ? ""
                            : d?.fields?.bq_legal_entity_address1_line_1
                          : ""}{" "}
                        {d?.fields?.hasOwnProperty(
                          "bq_legal_entity_address1_line_2"
                        )
                          ? d?.fields?.bq_legal_entity_address1_line_2 ===
                            "None"
                            ? ""
                            : d?.fields?.bq_legal_entity_address1_line_2
                          : ""}{" "}
                        <br />
                        {d?.fields?.hasOwnProperty(
                          "bq_legal_entity_address1_city"
                        )
                          ? d?.fields?.bq_legal_entity_address1_city ===
                            "None"
                            ? ""
                            : d?.fields?.bq_legal_entity_address1_city +
                            ","
                          : ""}{" "}
                        {d?.fields?.hasOwnProperty(
                          "bq_legal_entity_address1_state"
                        )
                          ? d?.fields?.bq_legal_entity_address1_state ===
                            "None"
                            ? ""
                            : d?.fields?.bq_legal_entity_address1_state
                          : ""}{" "}
                        {d?.fields?.hasOwnProperty(
                          "bq_legal_entity_address1_zip5"
                        )
                          ? d?.fields?.bq_legal_entity_address1_zip5 ===
                            "None"
                            ? ""
                            : d?.fields?.bq_legal_entity_address1_zip5
                          : ""}
                      </>
                    ) : (
                      "N/A"
                    )}

                    <br />
                  </td>
                </tr>


                <tr>
                  <th className="center">
                    <strong>Jurisdiction</strong>
                  </th>
                  <td>
                    {d?.fields?.hasOwnProperty(
                      "bq_legal_entity_jurisdiction_code"
                    )
                      ? handleJrName(
                        d?.fields?.bq_legal_entity_jurisdiction_code
                      )
                      : "N/A"}
                  </td>
                </tr>
                <tr>
                  <th className="center">
                    <strong>Tracking</strong>
                  </th>
                  <td>
                    UID:{" "}
                    {d?.fields?.bq_legal_entity_ultimate_parent_id || "N/A"}
                    <br />
                    PID: {d?.fields?.bq_legal_entity_parent_id || "N/A"}
                    <br />
                    Type: {d?.fields?.bq_legal_entity_parent_status || "N/A"}
                  </td>
                </tr>
              </tbody>
            </table>
            <br></br>
          </div>
          <div className="viewBoxCol">
            <h3>Org: Legal Framework</h3>
            <table
              className="table table-bordered"
              style={{ tableLayout: "fixed" }}
            >
              <tbody style={{ textAlign: "left" }}>
                <tr>
                  <th className="center">
                    <strong>Legal Status</strong>
                  </th>
                  <td>
                    {/* {d?.fields?.bq_organization_current_status === 0
                      ? "Inactive"
                      : "Active" || "N/A"} */}
                    {d?.fields?.hasOwnProperty("bq_legal_entity_current_status")
                      ? d?.fields?.bq_legal_entity_current_status?.includes("Inactive") ?
                        <span style={{ color: "red" }}>No</span> :
                        d?.fields?.bq_legal_entity_current_status
                      : "N/A"}
                    <br></br>
                    <span>Updated:{updateText}</span>
                  </td>
                </tr>
                <tr>
                  <th className="center">
                    <strong>Entity Status</strong>
                  </th>
                  <td>
                    {/* {d?.fields?.bq_organization_isactive === 0
                      ? "Inactive"
                      : "Active" || "N/A"} */}

                    {d?.fields?.hasOwnProperty("bq_legal_entity_isactive")
                      ? Boolean(d?.fields?.bq_legal_entity_isactive) === true
                        ? <span>Yes</span>
                        : <span style={{ color: "red" }}>No</span>
                      : "N/A"}
                    <br></br>
                    <span>Updated:{updateText}</span>
                  </td>
                </tr>
                {/* <tr>
                  <th className="center">
                    <strong>Address Type</strong>
                  </th>
                  <td>
                    {d?.fields?.hasOwnProperty("bq_legal_entity_address1_rdi")
                      ? d?.fields?.bq_legal_entity_address1_rdi === "Unknown"
                        ? "Unknown"
                        : d?.fields?.bq_legal_entity_address1_rdi
                      : "Unknown"}
                    "Residential / Commercial"
                  </td>
                </tr> */}

                <tr>
                  <th className="center">
                    <strong>Non-Profit</strong>
                  </th>
                  <td>
                    {d?.fields?.bq_organization_is_nonprofit === 0
                      ? "No"
                      : "Yes" || "N/A"}
                  </td>
                </tr>
              </tbody>
            </table>
            <p id="vertical-spacer"></p>
            <Tooltip
              placement="top"
              title="These are the officers (companies and people) of all active and
             inactive legal entities associated with the organization"
            >
              <h3 style={{ display: "inline-block" }}>
                Legal Entity: Principals{" "}
                <i
                  style={{
                    color: "#696969",
                    fontSize: "0.7rem",
                  }}
                  className="bx bxs-info-circle"
                ></i>
              </h3>
            </Tooltip>
            {expandedItems.includes(i) && (
              <PrincipalViewChildren
                id={d?.fields?.bq_legal_entity_id}
                bqid={d?.fields?.bq_organization_id}
                status={d?.fields?.bq_legal_entity_parent_status}
                d={d}
              ></PrincipalViewChildren>
            )}
            <p id="vertical-spacer"></p>
            {/* <h3>Legal Entity: Establishments</h3>
            <EstablishmentsView data={d?.fields} /> */}
            <br />
          </div>

          <br></br>
        </div>
      )}

      <div className="leftbar"></div>
    </div>
  );
};

export default ChildCard;
