
import React, { useEffect, useState } from 'react'
import Header from '../components2/controls/Header'
import millify from 'millify'
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import { getBucketListing } from '../Aws/Aws-api';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import img from "../assets/images/spin.gif"
import { handleNextPage, handlePrevPage } from '../utils/page_utill';
import CompanyDetail from '../portfolio/CompanyDetail';
import "../assets/scss/bucket.scss"

const BucketListing = () => {
    const { user } = useSelector(state => state.user);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState();
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState([]);
    const [modalOverlay, setModalOverlay] = useState(false);
    const [id, setId] = useState("");
    const [query, setQuery] = useState("")
    const token = localStorage.getItem("token");
    const Navigate = useNavigate();
    const dispatch = useDispatch();




    const fetchRecords = async () => {
        try {
            setLoading(true)
            const result = await getBucketListing(user?.email, token, currentPage);
            if (result?.data?.root) {
                setState(result?.data?.root?.children);
                setTotalPage(result?.data?.item_in_bucket)
            } else {
                setState([]);
                setTotalPage(0)
            }

        } catch (error) {
            console.lofg(error);
            checkSession(error, dispatch, Navigate)
            setState([]);
            setTotalPage(0)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (user?.email) {
            fetchRecords()
        }

    }, [user?.email, currentPage])

    const webcheck = (d) => {
        if (d?.fields?.bq_organization_website?.startsWith("http://www.")) {
            return d?.fields?.bq_organization_website;
        } else if (
            d?.fields?.bq_organization_website?.startsWith("https://www.")
        ) {
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


    return (
        <div className='home'>
            <Header />
            <div className="bucket-wrap">
                <div className="bread">
                    <span onClick={() => Navigate("/screener")}>Screener</span>
                    <i className='bx bxs-chevron-right'></i>
                    <span onClick={() => Navigate("/screener/bucket")}>My Bucket</span>
                    <i className='bx bxs-chevron-right'></i>
                    <span>Company Details</span>
                </div>

                <div className="bucket-table">
                    <div className="top">
                        <p>Displaying {state?.length} of {totalPage} results on page
                        </p>
                        <div className="nex">
                            <button className={currentPage === 1 ? "disable" : ""} onClick={() => handlePrevPage(currentPage, setCurrentPage)} disabled={currentPage === 1}>Previous</button>
                            <button className={currentPage === (Math.ceil(totalPage / 10)) ? "disable" : ""} onClick={() => handleNextPage(currentPage, (Math.ceil(totalPage / 10)), setCurrentPage)}
                                disabled={currentPage === (Math.ceil(totalPage / 10))}>Next</button>
                        </div>
                    </div>
                    {
                        loading ? <div className="loader">
                            <img src={img} alt='loader' />
                        </div> :
                            <div className="b-table-wrap">
                                <table>
                                    <thead>
                                        <th>
                                            <span>Company Detail</span>
                                        </th>
                                        <th>
                                            <span>Address</span>
                                        </th>
                                        <th>
                                            <span>U.S Revenue</span>
                                        </th>
                                        <th>
                                            <span>U.S Fulltime Headcount</span>
                                        </th>
                                    </thead>
                                    <tbody>
                                        {
                                            state?.map((d) => (
                                                <tr key={d?.fields?.documentid}>
                                                    <td className='detail'>
                                                        <h4 onClick={() => {
                                                            setId(d?.fields?.bq_organization_id);
                                                            setQuery(d?.fields?.bq_organization_name);
                                                            setModalOverlay(true)
                                                        }}>{d?.fields?.hasOwnProperty("bq_organization_name")
                                                            ? d?.fields?.bq_organization_name : "N/A"}</h4>
                                                        <p><span>BQ ID:</span> {d?.fields?.hasOwnProperty("bq_organization_id")
                                                            ? d?.fields?.bq_organization_id : "N/A"}</p>
                                                        <p><span>Year Founded: </span> {d?.fields?.hasOwnProperty("bq_organization_year_founded")
                                                            ? d?.fields?.bq_organization_year_founded : "N/A"}</p>
                                                        <p><span>Unverified Website:</span> {d?.fields?.hasOwnProperty("bq_organization_website") ?
                                                            <a className='link' target='blank' href={webcheck(d)}>{webcheck(d)}</a> : "N/A"}</p>
                                                        <p><span>Capital Market Status:</span> {d?.fields?.hasOwnProperty("bq_company_capital_markets_universe") ?
                                                            d?.fields?.bq_company_capital_markets_universe === 1 ||
                                                                d?.fields?.bq_company_capital_markets_universe === true ? "Active" : "Inactive" : "N/A"}</p>
                                                    </td>
                                                    <td className='detail'>
                                                        <p><span>HQ Address: </span>
                                                            {d?.fields?.hasOwnProperty("bq_organization_address1_line_1") ||
                                                                d?.fields?.hasOwnProperty("bq_organization_address1_line_2") ||
                                                                d?.fields?.hasOwnProperty("bq_organization_address1_city") ||
                                                                d?.fields?.hasOwnProperty("bq_organization_address1_state") ||
                                                                d?.fields?.hasOwnProperty("bq_organization_address1_zip5") ? (
                                                                <>
                                                                    {d?.fields?.hasOwnProperty("bq_organization_address1_line_1")
                                                                        ? d?.fields?.bq_organization_address1_line_1 === "None"
                                                                            ? ""
                                                                            : d?.fields?.bq_organization_address1_line_1
                                                                        : ""}{" "}
                                                                    {d?.fields?.hasOwnProperty("bq_organization_address1_line_2")
                                                                        ? d?.fields?.bq_organization_address1_line_2 === "None"
                                                                            ? ""
                                                                            : d?.fields?.bq_organization_address1_line_2
                                                                        : ""}
                                                                    {/* <br /> */}
                                                                    {d?.fields?.hasOwnProperty("bq_organization_address1_city")
                                                                        ? d?.fields?.bq_organization_address1_city === "None"
                                                                            ? ""
                                                                            : d?.fields?.bq_organization_address1_city + ","
                                                                        : ""}{" "}
                                                                    {d?.fields?.hasOwnProperty("bq_organization_address1_state")
                                                                        ? d?.fields?.bq_organization_address1_state === "None"
                                                                            ? ""
                                                                            : d?.fields?.bq_organization_address1_state
                                                                        : ""}{" "}
                                                                    {d?.fields?.hasOwnProperty("bq_organization_address1_zip5")
                                                                        ? d?.fields?.bq_organization_address1_zip5 === "None"
                                                                            ? ""
                                                                            : d?.fields?.bq_organization_address1_zip5
                                                                        : ""}
                                                                </>
                                                            ) : (
                                                                "N/A"
                                                            )}





                                                        </p>
                                                        <p><span>HQ Legal Address: </span>
                                                            {d?.fields?.hasOwnProperty(
                                                                "bq_organization_legal_address1_line_1"
                                                            ) ||
                                                                d?.fields?.hasOwnProperty(
                                                                    "bq_organization_legal_address1_line_2"
                                                                ) ||
                                                                d?.fields?.hasOwnProperty(
                                                                    "bq_organization_legal_address1_city"
                                                                ) ||
                                                                d?.fields?.hasOwnProperty(
                                                                    "bq_organization_legal_address1_state"
                                                                ) ||
                                                                d?.fields?.hasOwnProperty(
                                                                    "bq_organization_legal_address1_zip5"
                                                                ) ? (
                                                                <>
                                                                    {d?.fields?.hasOwnProperty(
                                                                        "bq_organization_legal_address1_line_1"
                                                                    )
                                                                        ? d?.fields?.bq_organization_legal_address1_line_1 ===
                                                                            "None"
                                                                            ? ""
                                                                            : d?.fields?.bq_organization_legal_address1_line_1
                                                                        : ""}{" "}
                                                                    {d?.fields?.hasOwnProperty(
                                                                        "bq_organization_legal_address1_line_2"
                                                                    )
                                                                        ? d?.fields?.bq_organization_legal_address1_line_2 ===
                                                                            "None"
                                                                            ? ""
                                                                            : d?.fields?.bq_organization_legal_address1_line_2
                                                                        : ""}{" "}
                                                                    {/* <br /> */}
                                                                    {d?.fields?.hasOwnProperty(
                                                                        "bq_organization_legal_address1_city"
                                                                    )
                                                                        ? d?.fields?.bq_organization_legal_address1_city ===
                                                                            "None"
                                                                            ? ""
                                                                            : d?.fields?.bq_organization_legal_address1_city +
                                                                            ","
                                                                        : ""}{" "}
                                                                    {d?.fields?.hasOwnProperty(
                                                                        "bq_organization_legal_address1_state"
                                                                    )
                                                                        ? d?.fields?.bq_organization_legal_address1_state ===
                                                                            "None"
                                                                            ? ""
                                                                            : d?.fields?.bq_organization_legal_address1_state
                                                                        : ""}{" "}
                                                                    {d?.fields?.hasOwnProperty(
                                                                        "bq_organization_legal_address1_zip5"
                                                                    )
                                                                        ? d?.fields?.bq_organization_legal_address1_zip5 ===
                                                                            "None"
                                                                            ? ""
                                                                            : d?.fields?.bq_organization_legal_address1_zip5
                                                                        : ""}
                                                                </>
                                                            ) : (
                                                                "N/A"
                                                            )}


                                                        </p>


                                                    </td>
                                                    <td><p>{
                                                        d?.fields?.hasOwnProperty("bq_revenue_mr") ?
                                                            "$" + millify(Number(d?.fields?.bq_revenue_mr)) : "N/A"}</p></td>
                                                    <td><p>{d?.fields?.hasOwnProperty("bq_current_employees_plan_mr") ?
                                                        millify(d?.fields?.bq_current_employees_plan_mr) : "N/A"}</p></td>
                                                </tr>
                                            ))
                                        }

                                    </tbody>
                                </table>
                                <br></br>
                                <center>

                                    {
                                        (totalPage > 10 && loading === false) && <ResponsivePagination
                                            current={currentPage}
                                            total={Math.ceil(totalPage / 10)}
                                            onPageChange={setCurrentPage}
                                            maxWidth={"100px"}
                                            nextLabel={"Next"}
                                            previousLabel={"Previous"}
                                        />
                                    }

                                </center>
                            </div>
                    }
                </div>

                {
                    modalOverlay && <CompanyDetail
                        modalOverlay={modalOverlay}
                        onHide={() => { setModalOverlay(false); setId("") }}
                        data={query}
                        token={token}
                        email={user?.email}
                        id={id}
                    />
                }



            </div>
        </div>
    )
}

export default BucketListing