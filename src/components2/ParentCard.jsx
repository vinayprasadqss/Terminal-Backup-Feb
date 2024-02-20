import React, { useEffect, useState } from "react";
import EstablishmentsView from "./EstablishmentsView";
import PrincipalsView from "./PrincipalsView";
import { NumericFormat } from "react-number-format";
import HistoricalView from "./Tree/HistoricalView";
import { Tooltip } from "antd";
import SoleHistoryView from "./Tree/SoleHistoryView";
import { useSelector } from "react-redux";
import SummeryModal from "./FinancialSummery/Index";
import LocationModal from "./LocationModal";
import FeedbackPop from "./Tree/FeedbackPop";

const ParentCard = ({ singleState }) => {
  const { filter } = useSelector((state) => state.search);

  const [web, setWeb] = useState();
  const [linkedin, setLinkedIn] = useState();
  const [open, setOpen] = useState(false);
  const [fsmQuery, setFsmQuery] = useState("");
  const [locationOpen, setLocationOpen] = useState(false);
  const [locationQuery, setLocationQuery] = useState("");
  const [locationName, setLocationName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false)

  /// Update For December Text
  const [updateText, setUpdateText] = useState(" January 2024");

  const handleJrName = (a) => {
    const temp = filter?.bq_legal_entity_jurisdiction_code?.find(
      (f) => f?.jurisdiction_code === a
    );
    return temp?.jurisdiction_name + " " + "(" + temp?.jurisdiction_code + ")";
  };

  const webcheck = () => {
    if (singleState?.bq_organization_website?.startsWith("http://www.")) {
      return singleState?.bq_organization_website;
    } else if (
      singleState?.bq_organization_website?.startsWith("https://www.")
    ) {
      return singleState?.bq_organization_website;
    } else if (singleState?.bq_organization_website?.startsWith("http://")) {
      return singleState?.bq_organization_website?.replace(
        "http://",
        "http://www."
      );
    } else if (singleState?.bq_organization_website?.startsWith("https://")) {
      return singleState?.bq_organization_website?.replace(
        "https://",
        "https://www."
      );
    } else if (singleState?.bq_organization_website?.startsWith("www.")) {
      return singleState?.bq_organization_website?.replace(
        "www.",
        "https://www."
      );
    } else if (singleState?.bq_organization_website?.startsWith("www-")) {
      return singleState?.bq_organization_website?.replace(
        "www-",
        "https://www-"
      );
    } else if (
      !singleState?.bq_organization_website?.startsWith("http://www.") ||
      !singleState?.bq_organization_website?.startsWith("https://www.") ||
      !singleState?.bq_organization_website?.startsWith("http://") ||
      !singleState?.bq_organization_website?.startsWith("https://") ||
      !singleState?.bq_organization_website?.startsWith("www.") ||
      !singleState?.bq_organization_website?.startsWith("www") ||
      !singleState?.bq_organization_website?.startsWith("www-")
    ) {
      return `http://www.${singleState?.bq_organization_website}`;
    } else {
      return singleState?.bq_organization_website;
    }
  };

  const webcheck2 = () => {
    if (singleState?.bq_organization_linkedin_url?.startsWith("http://www.")) {
      return singleState?.bq_organization_linkedin_url;
    } else if (
      singleState?.bq_organization_linkedin_url?.startsWith("https://www.")
    ) {
      return singleState?.bq_organization_linkedin_url;
    } else if (
      singleState?.bq_organization_linkedin_url?.startsWith("http://")
    ) {
      return singleState?.bq_organization_linkedin_url?.replace(
        "http://",
        "http://www."
      );
    } else if (
      singleState?.bq_organization_linkedin_url?.startsWith("https://")
    ) {
      return singleState?.bq_organization_linkedin_url?.replace(
        "https://",
        "https://www."
      );
    } else if (singleState?.bq_organization_linkedin_url?.startsWith("www.")) {
      return singleState?.bq_organization_linkedin_url?.replace(
        "www.",
        "https://www."
      );
    } else if (
      !singleState?.bq_organization_linkedin_url?.startsWith("http://www.") ||
      !singleState?.bq_organization_linkedin_url?.startsWith("https://www.") ||
      !singleState?.bq_organization_linkedin_url?.startsWith("http://") ||
      !singleState?.bq_organization_linkedin_url?.startsWith("https://") ||
      !singleState?.bq_organization_linkedin_url?.startsWith("www.") ||
      !singleState?.bq_organization_linkedin_url?.startsWith("www")
    ) {
      return `https://www.${singleState?.bq_organization_linkedin_url}`;
    } else {
      return singleState?.bq_organization_linkedin_url;
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
  }, [singleState?.bq_organization_website]);

  useEffect(() => {
    const modifiedUrl = webcheck2();
    setLinkedIn(modifiedUrl);
  }, [singleState?.bq_organization_linkedin_url]);

  return (
    <>
      <div className="viewBox" style={{ userSelect: "none" }}>
        <div className="parent-card-head">
          <h2
            className="indent1"
          // style={{ padding: "1rem", paddingTop: "2rem", paddingBottom: "0" }}
          >

            {singleState?.bq_organization_name}
          </h2>
          <Tooltip title="If you have any suggestion/issue regarding the product then please let us know via feedback so we can improve your experience." placement="top">
            <button style={{ bottom: "8px" }} onClick={() => setIsModalOpen(true)}><span>
              Feedback<i className='bx bxs-info-circle'></i>
            </span></button>
          </Tooltip>
        </div>

        <br></br>
        <div className="viewBoxRow">
          <div className="viewBoxCol">
            <h3>Organization Identity</h3>
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <th className="center">
                    <strong>Org Name</strong>
                  </th>
                  <td>{singleState?.bq_organization_name || "N/A"}</td>
                </tr>
                <tr>
                  <th className="center">
                    <strong>Structure</strong>
                  </th>
                  <td>{singleState?.bq_organization_structure || "N/A"}</td>
                </tr>
                <tr>
                  <th className="center">
                    <strong>Type</strong>
                  </th>
                  <td>{singleState?.bq_organization_company_type || "N/A"}</td>
                </tr>
                <tr>
                  <th className="center">
                    <strong>Org Status</strong>
                  </th>
                  <td>
                    {singleState?.hasOwnProperty("bq_organization_current_status")
                      ? singleState?.bq_organization_current_status === "active"
                        ? <span>Active</span> : singleState?.bq_organization_current_status === "Inactive" ? <span style={{}}>Inactive</span> :
                          singleState?.bq_organization_current_status

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
                    {singleState?.hasOwnProperty("bq_organization_isactive")
                      ? singleState.bq_organization_isactive === true
                        ? <span>Active</span>
                        : <span style={{}}>Inactive</span>
                      : "N/A"}
                    <br></br>
                    <span>Updated:{updateText}</span>
                  </td>
                </tr>
                <tr>
                  <th className="center">
                    <strong>BQ Org ID</strong>
                  </th>
                  <td>{singleState?.bq_organization_id || "N/A"}</td>
                </tr>
                <tr>
                  <th className="center">
                    <strong>EIN</strong>
                  </th>
                  <td>
                    {singleState?.hasOwnProperty("bq_organization_ein")
                      ? singleState?.bq_organization_ein === "None"
                        ? "NO VERIFIED EIN (YET)"
                        : singleState?.bq_organization_ein
                      : "NO VERIFIED EIN (YET)"}
                  </td>
                </tr>
                <tr>
                  <th className="center">
                    <strong>Related EIN</strong>
                  </th>
                  <td>
                    {singleState?.hasOwnProperty("bq_organization_eins_related")
                      ? singleState?.bq_organization_eins_related === "None"
                        ? "NO VERIFIED Related EIN (YET)"
                        : singleState?.bq_organization_eins_related
                      : "NO VERIFIED Related EIN (YET)"}
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
                    {singleState?.hasOwnProperty("bq_organization_website") ? (
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
                    {singleState?.hasOwnProperty(
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
                  <td>{singleState?.bq_organization_date_founded || "N/A"}</td>
                </tr>
                <tr>
                  <th className="center">
                    <strong>Primary Ticker</strong>
                  </th>
                  <td>
                    {singleState?.hasOwnProperty("bq_organization_ticker")
                      ? singleState?.bq_organization_ticker === "None" &&
                        singleState?.bq_organization_is_public === false
                        ? "PRIVATE COMPANY (NO TICKER)"
                        : singleState?.bq_organization_ticker
                      : singleState?.bq_organization_is_public === false
                        ? "PRIVATE COMPANY (NO TICKER)"
                        : "N/A"}
                  </td>
                </tr>
                <tr>
                  <th className="center">
                    <strong>Related Tickers</strong>
                  </th>
                  <td>
                    {singleState?.hasOwnProperty("bq_tickers_related")
                      ? singleState?.bq_tickers_related === "None" &&
                        singleState?.bq_organization_is_public === false
                        ? "PRIVATE COMPANY (NO TICKER)"
                        : typeof singleState?.bq_tickers_related === 'string' ?
                          singleState?.bq_tickers_related :
                          relatedFinder(singleState?.bq_tickers_related)
                      : singleState?.bq_organization_is_public === false
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
                  </th>
                  <td>
                    {singleState?.hasOwnProperty("bq_organization_lei")
                      ? singleState?.bq_organization_lei
                      : "N/A"}
                  </td>
                </tr>
                <tr>
                  <th className="center">
                    <strong>CIK</strong>
                  </th>
                  <td>
                    {singleState?.hasOwnProperty("bq_organization_cik")
                      ? singleState?.bq_organization_cik
                      : "N/A"}
                  </td>
                </tr>
                <tr>
                  <th className="center">
                    <strong>HQ Address</strong>
                  </th>
                  <td>
                    {singleState?.hasOwnProperty(
                      "bq_organization_address1_line_1"
                    ) ||
                      singleState?.hasOwnProperty(
                        "bq_organization_address1_line_2"
                      ) ||
                      singleState?.hasOwnProperty(
                        "bq_organization_address1_city"
                      ) ||
                      singleState?.hasOwnProperty(
                        "bq_organization_address1_state"
                      ) ||
                      singleState?.hasOwnProperty(
                        "bq_organization_address1_zip5"
                      ) ? (
                      <>
                        {singleState?.hasOwnProperty(
                          "bq_organization_address1_line_1"
                        )
                          ? singleState?.bq_organization_address1_line_1 ===
                            "None"
                            ? ""
                            : singleState?.bq_organization_address1_line_1
                          : ""}{" "}
                        {singleState?.hasOwnProperty(
                          "bq_organization_address1_line_2"
                        )
                          ? singleState?.bq_organization_address1_line_2 ===
                            "None"
                            ? ""
                            : singleState?.bq_organization_address1_line_2
                          : ""}
                        <br />
                        {singleState?.hasOwnProperty(
                          "bq_organization_address1_city"
                        )
                          ? singleState?.bq_organization_address1_city ===
                            "None"
                            ? ""
                            : singleState?.bq_organization_address1_city + ","
                          : ""}{" "}
                        {singleState?.hasOwnProperty(
                          "bq_organization_address1_state"
                        )
                          ? singleState?.bq_organization_address1_state ===
                            "None"
                            ? ""
                            : singleState?.bq_organization_address1_state
                          : ""}{" "}
                        {singleState?.hasOwnProperty(
                          "bq_organization_address1_zip5"
                        )
                          ? singleState?.bq_organization_address1_zip5 ===
                            "None"
                            ? ""
                            : singleState?.bq_organization_address1_zip5
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
                    {singleState?.hasOwnProperty(
                      "bq_organization_address1_cbsa_name"
                    )
                      ? singleState?.bq_organization_address1_cbsa_name
                      : "N/A"}
                  </td>
                </tr>
              </tbody>
            </table>{" "}
            <p id="vertical-spacer"></p>
            <h3>Ultimate Legal Parent Identity</h3>
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <th className="center">
                    <strong>Legal Name</strong>
                  </th>
                  <td>{singleState?.bq_organization_legal_name || "N/A"}</td>
                </tr>
                <tr>
                  <th className="center">
                    <strong>BQ Legal Entity ID</strong>
                  </th>
                  <td>
                    {singleState?.bq_legal_entity_id ||
                      "No matching Legal entity"}
                  </td>
                </tr>

                <tr>
                  <th className="center">
                    <strong>HQ Legal Address</strong>
                  </th>
                  <td>
                    {singleState?.hasOwnProperty(
                      "bq_organization_legal_address1_line_1"
                    ) ||
                      singleState?.hasOwnProperty(
                        "bq_organization_legal_address1_line_2"
                      ) ||
                      singleState?.hasOwnProperty(
                        "bq_organization_legal_address1_city"
                      ) ||
                      singleState?.hasOwnProperty(
                        "bq_organization_legal_address1_state"
                      ) ||
                      singleState?.hasOwnProperty(
                        "bq_organization_legal_address1_zip5"
                      ) ? (
                      <>
                        {singleState?.hasOwnProperty(
                          "bq_organization_legal_address1_line_1"
                        )
                          ? singleState?.bq_organization_legal_address1_line_1 ===
                            "None"
                            ? ""
                            : singleState?.bq_organization_legal_address1_line_1
                          : ""}{" "}
                        {singleState?.hasOwnProperty(
                          "bq_organization_legal_address1_line_2"
                        )
                          ? singleState?.bq_organization_legal_address1_line_2 ===
                            "None"
                            ? ""
                            : singleState?.bq_organization_legal_address1_line_2
                          : ""}{" "}
                        <br />
                        {singleState?.hasOwnProperty(
                          "bq_organization_legal_address1_city"
                        )
                          ? singleState?.bq_organization_legal_address1_city ===
                            "None"
                            ? ""
                            : singleState?.bq_organization_legal_address1_city +
                            ","
                          : ""}{" "}
                        {singleState?.hasOwnProperty(
                          "bq_organization_legal_address1_state"
                        )
                          ? singleState?.bq_organization_legal_address1_state ===
                            "None"
                            ? ""
                            : singleState?.bq_organization_legal_address1_state
                          : ""}{" "}
                        {singleState?.hasOwnProperty(
                          "bq_organization_legal_address1_zip5"
                        )
                          ? singleState?.bq_organization_legal_address1_zip5 ===
                            "None"
                            ? ""
                            : singleState?.bq_organization_legal_address1_zip5
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
                    <strong>Address Type</strong>
                  </th>
                  <td>
                    {singleState?.hasOwnProperty("bq_organization_address1_rdi")
                      ? singleState?.bq_organization_address1_rdi === "Unknown"
                        ? "Unknown"
                        : singleState?.bq_organization_address1_rdi
                      : "Unknown"}
                  </td>
                </tr>
                <tr>
                  <th className="center">
                    <strong>Legal Entity Address</strong>
                  </th>
                  <td>
                    {singleState?.hasOwnProperty(
                      "bq_legal_entity_address1_line_1"
                    ) ||
                      singleState?.hasOwnProperty(
                        "bq_legal_entity_address1_line_2"
                      ) ||
                      singleState?.hasOwnProperty(
                        "bq_legal_entity_address1_city"
                      ) ||
                      singleState?.hasOwnProperty(
                        "bq_legal_entity_address1_state"
                      ) ||
                      singleState?.hasOwnProperty(
                        "bq_legal_entity_address1_zip5"
                      ) ? (
                      <>
                        {singleState?.hasOwnProperty(
                          "bq_legal_entity_address1_line_1"
                        )
                          ? singleState?.bq_legal_entity_address1_line_1 ===
                            "None"
                            ? ""
                            : singleState?.bq_legal_entity_address1_line_1
                          : ""}{" "}
                        {singleState?.hasOwnProperty(
                          "bq_legal_entity_address1_line_2"
                        )
                          ? singleState?.bq_legal_entity_address1_line_2 ===
                            "None"
                            ? ""
                            : singleState?.bq_legal_entity_address1_line_2
                          : ""}{" "}
                        <br />
                        {singleState?.hasOwnProperty(
                          "bq_legal_entity_address1_city"
                        )
                          ? singleState?.bq_legal_entity_address1_city ===
                            "None"
                            ? ""
                            : singleState?.bq_legal_entity_address1_city +
                            ","
                          : ""}{" "}
                        {singleState?.hasOwnProperty(
                          "bq_legal_entity_address1_state"
                        )
                          ? singleState?.bq_legal_entity_address1_state ===
                            "None"
                            ? ""
                            : singleState?.bq_legal_entity_address1_state
                          : ""}{" "}
                        {singleState?.hasOwnProperty(
                          "bq_legal_entity_address1_zip5"
                        )
                          ? singleState?.bq_legal_entity_address1_zip5 ===
                            "None"
                            ? ""
                            : singleState?.bq_legal_entity_address1_zip5
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
                    {singleState?.hasOwnProperty(
                      "bq_legal_entity_jurisdiction_code"
                    )
                      ? handleJrName(
                        singleState?.bq_legal_entity_jurisdiction_code
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
                    {singleState?.bq_legal_entity_ultimate_parent_id || "N/A"}
                    <br />
                    PID: {singleState?.bq_legal_entity_parent_id || "N/A"}
                    <br />
                    Type: {singleState?.bq_legal_entity_parent_status || "N/A"}
                  </td>
                </tr>
              </tbody>
            </table>
            <br></br>
          </div>
          <div className="viewBoxCol">
            <h3>Org: Legal Framework</h3>
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <th className="center">
                    <strong>Legal Status</strong>
                  </th>
                  <td style={{ textTransform: "capitalize" }}>
                    {singleState?.hasOwnProperty(
                      "bq_legal_entity_current_status"
                    )
                      ? singleState?.bq_legal_entity_current_status ===
                        "Inactive"
                        ? <span style={{}}>Inactive</span>
                        : singleState?.bq_legal_entity_current_status
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
                    {singleState?.hasOwnProperty("bq_legal_entity_isactive") ? singleState?.bq_legal_entity_isactive === false
                      ? <span style={{}}>Inactive</span>
                      : <span>Active</span> : "N/A"}
                    <br></br>
                    <span>Updated:{updateText}</span>
                  </td>
                </tr>
                {/* <tr>
                  <th className="center">
                    <strong>Address Type</strong>
                  </th>
                  <td>
                    {singleState?.hasOwnProperty("bq_organization_address1_rdi")
                      ? singleState?.bq_organization_address1_rdi === "Unknown"
                        ? "Unknown"
                        : singleState?.bq_organization_address1_rdi
                      : "Unknown"}
                  </td>
                </tr> */}

                <tr>
                  <th className="center">
                    <strong>Non-Profit</strong>
                  </th>
                  <td>
                    {singleState?.bq_organization_is_nonprofit === false
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
              <h3
                style={{
                  display: "inline-block",
                }}
              >
                Org: Executives & Officers{" "}
                <i
                  style={{
                    color: "#696969",
                    fontSize: "0.7rem",
                  }}
                  className="bx bxs-info-circle"
                ></i>
              </h3>
            </Tooltip>
            <PrincipalsView
              data={singleState?.bq_officer_details}
              id={singleState?.bq_legal_entity_id}
              bqid={singleState?.bq_organization_id}
            ></PrincipalsView>
            <p id="vertical-spacer"></p>
            <Tooltip
              placement="top"
              title="These are the officers (companies and people) of all active and
             inactive legal entities associated with the organization"
            >
              <h3
                style={{
                  display: "inline-block",
                }}
              >
                Officers of Ultimate Legal Parent Entity{" "}
                <i
                  style={{
                    color: "#696969",
                    fontSize: "0.7rem",
                  }}
                  className="bx bxs-info-circle"
                ></i>
              </h3>
            </Tooltip>

            <EstablishmentsView
              id={singleState?.bq_legal_entity_id}
              bqid={singleState?.bq_organization_id}
              status={singleState?.bq_legal_entity_parent_status}
            />
            <br></br>
          </div>
          {/* {hiview === 1 && (<div className="viewBoxCol"> */}
          <div className="viewBoxCol">
            <h3>Org Firmographics</h3>
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <th className="center">
                    <strong>Company Type</strong>
                  </th>
                  <td>{singleState?.bq_organization_company_type || "N/A"}</td>
                </tr>
                <tr>
                  <th className="center">
                    <strong>IRS Sector</strong>
                  </th>
                  <td>
                    {singleState?.hasOwnProperty("bq_organization_sector_name")
                      ? singleState?.bq_organization_sector_name || "N/A"
                      : "N/A"}
                    {singleState?.hasOwnProperty("bq_organization_sector_name")
                      ? "(" + singleState?.bq_organization_sector_code + ")"
                      : ""}{" "}
                  </td>
                </tr>
                <tr>
                  <th className="center">
                    <strong>NAICS Sector</strong>
                  </th>
                  <td>
                    {singleState?.hasOwnProperty(
                      "bq_organization_naics_sector_name"
                    )
                      ? singleState?.bq_organization_naics_sector_name
                      : "N/A"}
                    {singleState?.hasOwnProperty(
                      "bq_organization_naics_sector_name"
                    )
                      ? "(" +
                      singleState?.bq_organization_naics_sector_code +
                      ")"
                      : ""}
                  </td>
                </tr>
                <tr>
                  <th className="center">
                    <strong>NAICS Industry</strong>
                  </th>
                  <td>
                    {singleState?.hasOwnProperty("bq_organization_naics_name")
                      ? singleState?.bq_organization_naics_name
                      : "N/A"}
                    {singleState?.hasOwnProperty("bq_organization_naics_name")
                      ? "(" + singleState?.bq_organization_naics_code + ")"
                      : ""}
                  </td>
                </tr>
                <tr>
                  <th className="center">
                    <Tooltip
                      placement="top"
                      title="   The BQ Credit Score assesses the financial health of
                                     a company based on its financial performance, size, age, and industry."
                    >
                      <strong
                        style={{
                          display: "inline-block",
                        }}
                      >
                        BQ Credit Score
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
                    {singleState?.hasOwnProperty("bq_score") ? (
                      singleState?.bq_score === "None" ||
                        singleState?.bq_score === "N/A" ? (
                        "N/A"
                      ) : (
                        <NumericFormat
                          value={singleState?.bq_score}
                          displayType={"text"}
                          decimalScale={0}
                        />
                      )
                    ) : (
                      "N/A"
                    )}
                  </td>
                </tr>
                {/* <tr>
                                <th>
                                    <strong>Establishments3</strong>
                                </th>
                                <td>
                                    {singleState?.bq_legal_entity_immediate_establishment_count}
                                </td>
                            </tr> */}
                <tr>
                  <th className="center">
                    <strong>Children Entity Count</strong>
                  </th>
                  <td>
                    {singleState?.hasOwnProperty(
                      "bq_legal_entity_children_count"
                    ) || singleState?.bq_legal_entity_children_count ? (
                      singleState?.bq_legal_entity_children_count === "None" ? (
                        singleState?.bq_legal_entity_children_count
                      ) : (
                        <NumericFormat
                          value={singleState?.bq_legal_entity_children_count}
                          displayType={"text"}
                          decimalScale={0}
                        />
                      )
                    ) : (
                      "N/A"
                    )}
                  </td>
                </tr>
                <tr>
                  <th className="center">
                    <Tooltip placement="top" title="This means the Organization does not have an ultimate parent or children legal entities outside the U.S.">
                      <strong>U.S. Only<i
                        style={{
                          color: "#696969",
                          fontSize: "0.7rem",
                          marginLeft: "1px",
                        }}
                        className="bx bxs-info-circle"
                      ></i></strong>
                    </Tooltip>
                  </th>
                  <td>

                    {singleState?.hasOwnProperty("bq_company_is_us_only")
                      ? singleState?.bq_company_is_us_only
                      : "Yes"}


                  </td>
                </tr>
              </tbody>
            </table>

            <div className="viewBoxCol">
              <h3>Org: Compliance Checks</h3>
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <th className="center">
                      <strong>Legal Status</strong>
                    </th>
                    <td style={{ textTransform: "capitalize" }}>
                      {singleState?.hasOwnProperty(
                        "bq_legal_entity_current_status"
                      )
                        ? singleState?.bq_legal_entity_current_status ===
                          "Inactive"
                          ? <span style={{}}>Inactive</span>
                          : singleState?.bq_legal_entity_current_status
                        : "N/A"}
                      <br></br>
                      <span>Updated:{updateText}</span>
                    </td>
                  </tr>
                  <tr>
                    <th className="center">
                      <strong>EIN</strong>
                    </th>
                    <td>
                      {singleState?.hasOwnProperty("bq_organization_ein")
                        ? singleState?.bq_organization_ein === "None"
                          ? "NO VERIFIED EIN (YET)"
                          : singleState?.bq_organization_ein
                        : "NO VERIFIED EIN (YET)"}
                    </td>
                  </tr>
                  <tr>
                    <th className="center">
                      <strong>Tax Liens</strong>
                    </th>
                    <td>
                      {singleState?.hasOwnProperty(
                        "bq_company_irs_taxlien_indicator"
                      )
                        ? singleState?.bq_company_irs_taxlien_indicator === 0
                          ? "False"
                          : "True"
                        : "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <th className="center">
                      <strong>OFAC Check</strong>
                    </th>
                    <td>
                      {singleState?.hasOwnProperty("bq_company_ofac_indicator")
                        ? singleState?.bq_company_ofac_indicator === 0
                          ? "False"
                          : "True"
                        : "N/A"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="viewBoxCol">
            <h3>Org Revenue and Employment</h3>
            {singleState?.bq_organization_company_type === "Sole Proprietor" ? (
              // <SoleHistoryView singleState={singleState} />
              <HistoricalView data={singleState?.bq_organization_id} usOnly={singleState?.bq_company_is_us_only} />
            ) : (
              <HistoricalView data={singleState?.bq_organization_id} usOnly={singleState?.bq_company_is_us_only} />
            )}

            <br />
            <h6
              className="dm-link"
              onClick={() => {
                setOpen(true);
                setFsmQuery(singleState?.bq_organization_id);
                // swal({
                //   title: "Financials Update in Progress",
                //   text: "We are working on Financials. We will be back soon",
                //   icon: "info",
                // });
              }}
            >
              <i className="bx bx-link-external"></i>View Financial Report{" "}
            </h6>
            <h6
              className="dm-link"
              onClick={() => {
                setLocationOpen(true);
                setLocationQuery(singleState?.bq_organization_id);
                setLocationName(singleState?.bq_organization_name);
              }}
            >
              <i className="bx bx-link-external"></i> View Locations{" "}
            </h6>
          </div>

          <br></br>
        </div>
      </div>
      {
        isModalOpen && <FeedbackPop id={singleState?.bq_organization_id} name={singleState?.bq_organization_name} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} source={"Detail_Page"} />
      }
      <SummeryModal open={open} setOpen={setOpen} fsmQuery={fsmQuery} financialName={singleState?.bq_organization_name} />
      <LocationModal
        locationOpen={locationOpen}
        setLocationOpen={setLocationOpen}
        locationName={locationName}
        locationQuery={locationQuery}
      />
    </>
  );
};

export default ParentCard;
