import { Checkbox, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import millify from "millify";
import swal from "sweetalert";

const LocationAddressHit = ({ d, portfolioItem, handleDetail, setTrevenue,
    setTHeadcount, setFsmQuery, setOpen, setLocationName, setLocationOpen, setLocationQuery,
    handleCheckboxChange, nameSearch, existTab, setFinancialName }) => {
    const [web, setWeb] = useState();


    const hanlePopMessage = () => {
        sweetAlert(
            "No record available",
            "Currently in-depth details are not available for the selected organization",
            "error"
        );
    }



    const webcheck = () => {
        if (d?.bq_organization_website?.startsWith("http://www.")) {
            return d?.bq_organization_website;
        } else if (
            d?.bq_organization_website?.startsWith("https://www.")
        ) {
            return d?.bq_organization_website;
        } else if (d?.bq_organization_website?.startsWith("http://")) {
            return d?.bq_organization_website?.replace(
                "http://",
                "http://www."
            );
        } else if (d?.bq_organization_website?.startsWith("https://")) {
            return d?.bq_organization_website?.replace(
                "https://",
                "https://www."
            );
        } else if (d?.bq_organization_website?.startsWith("www.")) {
            return d?.bq_organization_website?.replace(
                "www.",
                "https://www."
            );
        } else if (d?.bq_organization_website?.startsWith("www-")) {
            return d?.bq_organization_website?.replace(
                "www-",
                "https://www-"
            );
        } else if (
            !d?.bq_organization_website?.startsWith("http://www.") ||
            !d?.bq_organization_website?.startsWith("https://www.") ||
            !d?.bq_organization_website?.startsWith("http://") ||
            !d?.bq_organization_website?.startsWith("https://") ||
            !d?.bq_organization_website?.startsWith("www.") ||
            !d?.bq_organization_website?.startsWith("www") ||
            !d?.bq_organization_website?.startsWith("www-")
        ) {
            return `http://www.${d?.bq_organization_website}`;
        } else {
            return d?.bq_organization_website;
        }
    };


    useEffect(() => {
        const modifiedUrl = webcheck();
        setWeb(modifiedUrl);
    }, [d?.bq_organization_website]);

    const relatedFinder = (dz) => {
        let temp = [];
        const tickerStrings = dz?.map(obj => obj.bq_ticker_related_individual);

        const result = tickerStrings.join(", ");
        return result
    }



    return (
        <>

            <div className="tableView card" style={{ userSelect: "none" }}>
                <div className="listCol list-check rx">
                    <Checkbox onChange={(e) => handleCheckboxChange(e.target.checked, d)}
                        checked={portfolioItem?.find((f) => f?.id === d?.bq_location_id) ? true : false} /></div>
                <div className="listCol listCol-1 rx">
                    {d?.bq_legal_entity_id === "" &&
                        d?.bq_organization_structure === "Single-entity organization" && (
                            <span>No legal entity match</span>
                        )}
                    {/* {d?.bq_legal_entity_id !== "" &&
                        d?.bq_organization_structure === "Single-entity organization" && ( */}
                    <span
                        className="familylink"
                        onClick={() => {
                            if (!d?.hasOwnProperty("bq_organization_id") || d?.bq_organization_id === "0") {
                                return hanlePopMessage()
                            }
                            handleDetail(d?.bq_organization_id);
                            setTrevenue(d?.bq_revenue_mr || 0);
                            setTHeadcount(d?.bq_current_employees_plan_mr || 0);
                        }}
                    >
                        See Company Details
                    </span>
                    {/* )} */}

                    {/* {d?.bq_organization_structure ===
                        "Multi-entity U.S. organization" && (
                            <span
                                className="familylink"
                                onClick={() => {
                                    if (!d?.hasOwnProperty("bq_organization_id") || d?.bq_organization_id === "0") {
                                        return hanlePopMessage()
                                    }
                                    handleDetail(d?.bq_organization_id);
                                    setTrevenue(d?.bq_revenue_mr);
                                    setTHeadcount(d?.bq_current_employees_plan_mr);
                                }}
                            >
                                See Company Details
                            </span>
                        )} */}

                    <span className="familylink" style={{ cursor: "pointer" }} onClick={() => {
                        if (!d?.hasOwnProperty("bq_organization_id") || d?.bq_organization_id === "0") {
                            return hanlePopMessage()
                        }
                        setOpen(true)
                        setFsmQuery(d?.bq_organization_id);
                        setFinancialName(d?.bq_location_name)
                        // swal({
                        //     title: "Financials Update in Progress",
                        //     text: "We are working on Financials. We will be back soon",
                        //     icon: "info",
                        // });
                    }}
                    ><u>
                            View Financial Report
                        </u>
                    </span>

                    <span className="familylink" style={{ cursor: "pointer" }} onClick={() => {
                        setLocationOpen(true)
                        setLocationQuery(d?.bq_organization_id);
                        setLocationName(d?.bq_location_name);
                    }}

                    >
                        <u>
                            View Locations
                        </u></span>
                </div>
                <div className="listCol listCol-2">
                    <b>Structure:</b>{" "}
                    {d?.hasOwnProperty("bq_organization_structure")
                        ? d?.bq_organization_structure
                        : "N/A"}{" "}
                    <br />
                    <b>Company Type:</b>{" "}
                    {d?.hasOwnProperty("bq_organization_company_type")
                        ? d?.bq_organization_company_type
                        : "N/A"}

                </div>
                <div className="listCol">
                    <b>Location Name:</b> {d?.hasOwnProperty("bq_location_name") ? d?.bq_location_name : "N/A"}<br />
                    <b>Location Class:{" "}</b>
                    {d?.hasOwnProperty("bq_location_type")
                        ? d?.bq_location_type
                        : "N/A"}<br />
                    <b>Org Name:</b> {d?.hasOwnProperty("bq_organization_name") ? d?.bq_organization_name : "N/A"}
                    <br />
                    <b>Legal Name:</b> {d?.hasOwnProperty("bq_organization_legal_name") ? d?.bq_organization_legal_name : "N/A"}
                    <br />
                    <b>EIN:</b>{" "}
                    {d?.hasOwnProperty("bq_organization_ein")
                        ? d?.bq_organization_ein === "None"
                            ? "NO VERIFIED EIN (YET)"
                            : d?.bq_organization_ein
                        : "NO VERIFIED EIN (YET)"}
                    <br />
                    <b>Primary Ticker:</b>{" "}
                    {d?.hasOwnProperty("bq_organization_ticker")
                        ? d?.bq_organization_ticker === "None" &&
                            d?.bq_organization_is_public === false
                            ? "Private Company (No Ticker)"
                            : d?.bq_organization_ticker
                        : d?.bq_organization_is_public === false
                            ? "Private Company"
                            : "N/A"}
                    <br />
                    <b>Related Tickers:</b>{" "}
                    {d?.hasOwnProperty("bq_tickers_related")
                        ? d?.bq_tickers_related === "None" &&
                            d?.bq_organization_is_public === false
                            ? "PRIVATE COMPANY (NO TICKER)"
                            : typeof d?.bq_tickers_related === 'string' ?
                                d?.bq_tickers_related :
                                relatedFinder(d?.bq_tickers_related)
                        : d?.bq_organization_is_public === false
                            ? "PRIVATE COMPANY (NO TICKER)"
                            : "N/A"}
                    <br />
                    <Tooltip placement="top" title="An LEI is issued by the GLEIF organization to assist with tracking financial transactions. BQ also has available ISINs, which are mapped to LEIs.">
                        <span className="webtooltip" style={{ display: "inline-flex" }}><b>LEI
                            <i style={{ color: "#696969", fontSize: "0.7rem", marginLeft: "1px", }} className="bx bxs-info-circle"></i>:</b></span>
                    </Tooltip>{" "}
                    {d?.hasOwnProperty("bq_organization_lei")
                        ? d?.bq_organization_lei === "None"
                            ? "N/A"
                            : d?.bq_organization_lei
                        : "N/A"}
                    <br />
                    <b>CIK:</b>{" "}
                    {d?.hasOwnProperty("bq_organization_cik")
                        ? d?.bq_organization_cik === "None"
                            ? "N/A"
                            : d?.bq_organization_cik
                        : "N/A"}
                    <br />

                </div>
                <div className="listCol">
                    <b>Location Address:</b>{" "}
                    {d?.hasOwnProperty("bq_location_address_line_1") ||
                        d?.hasOwnProperty("bq_location_address1_line_2") ||
                        d?.hasOwnProperty("bq_location_address_city") ||
                        d?.hasOwnProperty("bq_location_address_state_name") ||
                        d?.hasOwnProperty("bq_location_address_zip5") ? (
                        <>
                            {d?.hasOwnProperty("bq_location_address_line_1")
                                ? d?.bq_location_address_line_1 === "None"
                                    ? ""
                                    : d?.bq_location_address_line_1
                                : ""}{" "}
                            {d?.hasOwnProperty("bq_location_address1_line_2")
                                ? d?.bq_location_address1_line_2 === "None"
                                    ? ""
                                    : d?.bq_location_address1_line_2
                                : ""}
                            {/* <br /> */}
                            {d?.hasOwnProperty("bq_location_address_city")
                                ? d?.bq_location_address_city === "None"
                                    ? ""
                                    : d?.bq_location_address_city + ","
                                : ""}{" "}
                            {d?.hasOwnProperty("bq_location_address_state_name")
                                ? d?.bq_location_address_state_name === "None"
                                    ? ""
                                    : d?.bq_location_address_state_name
                                : ""}{" "}
                            {d?.hasOwnProperty("bq_location_address_zip5")
                                ? d?.bq_location_address_zip5 === "None"
                                    ? ""
                                    : d?.bq_location_address_zip5
                                : ""}
                        </>
                    ) : (
                        "N/A"
                    )}
                    <br></br>
                    <Tooltip
                        placement="top"
                        title="Residential Delivery Indicator"
                    >
                        <b>Location Address RDI
                            <i
                                style={{
                                    color: "#696969",
                                    fontSize: "0.7rem",
                                    marginLeft: "1px",
                                }}
                                className="bx bxs-info-circle"
                            ></i>:{" "}
                        </b>
                    </Tooltip>

                    {d?.hasOwnProperty("bq_location_address_rdi")
                        ? d?.bq_location_address_rdi === "Unknown"
                            ? "Unknown"
                            : d?.bq_location_address_rdi
                        : "Unknown"}
                    <br />
                    <b>Location County:</b>
                    {d?.hasOwnProperty("bq_location_address_county_name") ? " " + d?.bq_location_address_county_name : "N/A"}
                    <br />
                    <b>Location CBSA:</b>
                    {d?.hasOwnProperty("bq_location_address_cbsa_name") ? " " + d?.bq_location_address_cbsa_name : "N/A"}
                    <br />
                    <b>HQ Address:</b>{" "}
                    {d?.hasOwnProperty("bq_organization_address1_line_1") ||
                        d?.hasOwnProperty("bq_organization_address1_line_2") ||
                        d?.hasOwnProperty("bq_organization_address1_city") ||
                        d?.hasOwnProperty("bq_organization_address1_state") ||
                        d?.hasOwnProperty("bq_organization_address1_zip5") ? (
                        <>
                            {d?.hasOwnProperty("bq_organization_address1_line_1")
                                ? d?.bq_organization_address1_line_1 === "None"
                                    ? ""
                                    : d?.bq_organization_address1_line_1
                                : ""}{" "}
                            {d?.hasOwnProperty("bq_organization_address1_line_2")
                                ? d?.bq_organization_address1_line_2 === "None"
                                    ? ""
                                    : d?.bq_organization_address1_line_2
                                : ""}
                            {/* <br /> */}
                            {d?.hasOwnProperty("bq_organization_address1_city")
                                ? d?.bq_organization_address1_city === "None"
                                    ? ""
                                    : d?.bq_organization_address1_city + ","
                                : ""}{" "}
                            {d?.hasOwnProperty("bq_organization_address1_state")
                                ? d?.bq_organization_address1_state === "None"
                                    ? ""
                                    : d?.bq_organization_address1_state
                                : ""}{" "}
                            {d?.hasOwnProperty("bq_organization_address1_zip5")
                                ? d?.bq_organization_address1_zip5 === "None"
                                    ? ""
                                    : d?.bq_organization_address1_zip5
                                : ""}
                        </>
                    ) : (
                        "N/A"
                    )}
                    <br />
                    <b>HQ Legal Address:</b>{" "}
                    {d?.hasOwnProperty(
                        "bq_organization_legal_address1_line_1"
                    ) ||
                        d?.hasOwnProperty(
                            "bq_organization_legal_address1_line_2"
                        ) ||
                        d?.hasOwnProperty(
                            "bq_organization_legal_address1_city"
                        ) ||
                        d?.hasOwnProperty(
                            "bq_organization_legal_address1_state"
                        ) ||
                        d?.hasOwnProperty(
                            "bq_organization_legal_address1_zip5"
                        ) ? (
                        <>
                            {d?.hasOwnProperty(
                                "bq_organization_legal_address1_line_1"
                            )
                                ? d?.bq_organization_legal_address1_line_1 ===
                                    "None"
                                    ? ""
                                    : d?.bq_organization_legal_address1_line_1
                                : ""}{" "}
                            {d?.hasOwnProperty(
                                "bq_organization_legal_address1_line_2"
                            )
                                ? d?.bq_organization_legal_address1_line_2 ===
                                    "None"
                                    ? ""
                                    : d?.bq_organization_legal_address1_line_2
                                : ""}{" "}
                            {/* <br /> */}
                            {d?.hasOwnProperty(
                                "bq_organization_legal_address1_city"
                            )
                                ? d?.bq_organization_legal_address1_city ===
                                    "None"
                                    ? ""
                                    : d?.bq_organization_legal_address1_city +
                                    ","
                                : ""}{" "}
                            {d?.hasOwnProperty(
                                "bq_organization_legal_address1_state"
                            )
                                ? d?.bq_organization_legal_address1_state ===
                                    "None"
                                    ? ""
                                    : d?.bq_organization_legal_address1_state
                                : ""}{" "}
                            {d?.hasOwnProperty(
                                "bq_organization_legal_address1_zip5"
                            )
                                ? d?.bq_organization_legal_address1_zip5 ===
                                    "None"
                                    ? ""
                                    : d?.bq_organization_legal_address1_zip5
                                : ""}
                        </>
                    ) : (
                        "N/A"
                    )}
                    <br />
                    <b>HQ Address Type:{" "}</b>
                    {d?.hasOwnProperty("bq_organization_address1_rdi")
                        ? d?.bq_organization_address1_rdi === "Unknown"
                            ? "Unknown"
                            : d?.bq_organization_address1_rdi
                        : "Unknown"}



                    <br></br>
                    {
                        (existTab === "address" || existTab === "NameTab") &&
                            (nameSearch === "legalAddress" || nameSearch === "bq_organization_legal_name") ?
                            <>
                                <b>Legal Entity Address:{" "}</b>
                                {d?.hasOwnProperty(
                                    "bq_legal_entity_address1_line_1"
                                ) ||
                                    d?.hasOwnProperty(
                                        "bq_legal_entity_address1_line_2"
                                    ) ||
                                    d?.hasOwnProperty(
                                        "bq_legal_entity_address1_city"
                                    ) ||
                                    d?.hasOwnProperty(
                                        "bq_legal_entity_address1_state"
                                    ) ||
                                    d?.hasOwnProperty(
                                        "bq_legal_entity_address1_zip5"
                                    ) ? (
                                    <>
                                        {d?.hasOwnProperty(
                                            "bq_legal_entity_address1_line_1"
                                        )
                                            ? d?.bq_legal_entity_address1_line_1 ===
                                                "None"
                                                ? ""
                                                : d?.bq_legal_entity_address1_line_1
                                            : ""}{" "}
                                        {d?.hasOwnProperty(
                                            "bq_legal_entity_address1_line_2"
                                        )
                                            ? d?.bq_legal_entity_address1_line_2 ===
                                                "None"
                                                ? ""
                                                : d?.bq_legal_entity_address1_line_2
                                            : ""}{" "}
                                        <br />
                                        {d?.hasOwnProperty(
                                            "bq_legal_entity_address1_city"
                                        )
                                            ? d?.bq_legal_entity_address1_city ===
                                                "None"
                                                ? ""
                                                : d?.bq_legal_entity_address1_city +
                                                ","
                                            : ""}{" "}
                                        {d?.hasOwnProperty(
                                            "bq_legal_entity_address1_state"
                                        )
                                            ? d?.bq_legal_entity_address1_state ===
                                                "None"
                                                ? ""
                                                : d?.bq_legal_entity_address1_state
                                            : ""}{" "}
                                        {d?.hasOwnProperty(
                                            "bq_legal_entity_address1_zip5"
                                        )
                                            ? d?.bq_legal_entity_address1_zip5 ===
                                                "None"
                                                ? ""
                                                : d?.bq_legal_entity_address1_zip5
                                            : ""}

                                    </>
                                ) : (
                                    "N/A"
                                )}
                            </>
                            : ""
                    }

                    {existTab === "address" || existTab === "NameTab" &&
                        nameSearch === "legalAddress" || nameSearch === "bq_organization_legal_name" && <br />}
                    <Tooltip
                        placement="top"
                        title="Corporate websites are generally not provided in regulatory and government filings.
                    Therefore, BQ has to scrape the web to find them, leading to some degree of error and uncertainty about their validity."
                    >
                        <b>Unverified Website
                            <i
                                style={{
                                    color: "#696969",
                                    fontSize: "0.7rem",
                                    marginLeft: "1px",
                                }}
                                className="bx bxs-info-circle"
                            ></i>:
                        </b>
                    </Tooltip>
                    {" "}
                    {d?.hasOwnProperty("bq_organization_website") ? (
                        <a
                            className="weblink"
                            href={web}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {web || "N/A"}
                        </a>
                    ) : (
                        "N/A"
                    )}

                </div>
                <div className="listCol">

                    <b>Org Status:</b> {" "}
                    {d?.hasOwnProperty("bq_organization_current_status")
                        ? d?.bq_organization_current_status === "active"
                            ? <span>Active</span> : d?.bq_organization_current_status === "Inactive" ? <span style={{}}>Inactive</span> :
                                d?.bq_organization_current_status

                        : "N/A"}
                    <br />
                    <b>Org Active:</b> {" "}
                    {d?.hasOwnProperty("bq_organization_isactive") ? (
                        d?.bq_organization_isactive === true ? (
                            <span>Active</span>
                        ) : (
                            <span style={{}}>Inactive</span>
                        )
                    ) : (
                        "N/A"
                    )}
                    <br />
                </div>
                <div className="listCol">
                    <b>BQ Org ID:</b>{" "}
                    {
                        d?.hasOwnProperty("bq_organization_id") ? d?.bq_organization_id : "N/A"
                    }
                    <br />
                    <b>Founded:</b> {" "}
                    {d?.hasOwnProperty("bq_organization_date_founded")
                        ? d?.bq_organization_date_founded
                        : "N/A"}
                    <br />


                    <b>IRS Sector:</b>{" "}
                    {d?.hasOwnProperty("bq_organization_sector_name")
                        ? d?.bq_organization_sector_name
                        : "N/A"}{" "}
                    {d?.hasOwnProperty("bq_organization_sector_name")
                        ? "(" + d?.bq_organization_sector_code + ")"
                        : ""}
                    <br />
                    <b>NAICS Sector:</b>{" "}
                    {d?.hasOwnProperty(
                        "bq_organization_naics_sector_name"
                    )
                        ? d?.bq_organization_naics_sector_name
                        : "N/A"}{" "}
                    {d?.hasOwnProperty(
                        "bq_organization_naics_sector_name"
                    )
                        ? "(" +
                        d?.bq_organization_naics_sector_code +
                        ")"
                        : ""}
                    <br />
                    <b>NAICS Industry:</b>{" "}
                    {d?.hasOwnProperty("bq_organization_naics_name")
                        ? d?.bq_organization_naics_name
                        : "N/A"}{" "}
                    {d?.hasOwnProperty("bq_organization_naics_name")
                        ? "(" + d?.bq_organization_naics_code + ")"
                        : ""}
                    {/* <br />
                    <b>Children Entity Count:</b>{" "}
                    {d?.hasOwnProperty(
                        "bq_legal_entity_children_count"
                    ) || d?.bq_legal_entity_children_count ? (
                        d?.bq_legal_entity_children_count === "None" ? (
                            d?.bq_legal_entity_children_count
                        ) : (
                            <NumericFormat
                                value={d?.bq_legal_entity_children_count}
                                displayType={"text"}
                                decimalScale={0}
                            />
                        )
                    ) : (
                        "N/A"
                    )} */}
                </div>
                <div className="listCol">
                    <Tooltip
                        placement="top"
                        title="U.S. Revenue pertains to the U.S. only and is derived from local, state, and federal tax filings."
                    >
                        <b style={{ display: "inline-block" }}>U.S. Revenue<i
                            style={{
                                color: "#696969",
                                fontSize: "0.7rem",
                                marginLeft: "1px",

                            }}
                            className="bx bxs-info-circle"
                        ></i>:</b>
                    </Tooltip>
                    {" "}
                    {d?.bq_revenue_mr ? "$" + millify(d?.bq_revenue_mr) : "N/A"}
                    <br />
                    <Tooltip
                        placement="top"
                        title="U.S. Full-Time Headcount includes all W-2 full-time employees in the U.S. and is derived from Dept. of Labor filings."
                    >
                        <b> U.S. Full-Time Headcount{" "}
                            <i
                                style={{ color: "#696969", fontSize: "0.7rem" }}
                                className="bx bxs-info-circle"
                            ></i>
                            :</b>
                    </Tooltip>{" "}

                    {d?.hasOwnProperty("bq_current_employees_plan_mr")
                        ? d?.bq_current_employees_plan_mr === "None"
                            ? d?.bq_current_employees_plan_mr
                            : millify(Math.floor(d?.bq_current_employees_plan_mr))
                        : "N/A"}{" "}
                    <br />
                </div>
            </div>

        </>
    );
};

export default LocationAddressHit