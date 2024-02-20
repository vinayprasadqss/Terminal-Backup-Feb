
import React, { useEffect, useState } from 'react'
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import { ClearBucketC, DownloadBucket, checkSession, deleteBucketC, getBucket } from '../Aws/Aws-api';
import img from "../assets/images/spin.gif"
import img2 from "../assets/images/port.svg"
import "../assets/scss/bucket.scss"
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components2/controls/Header';
import { useNavigate } from 'react-router-dom';
import { saveAs } from 'file-saver';
import { LoadingOutlined } from "@ant-design/icons";
import millify from 'millify';


const Bucket = () => {
    const { user } = useSelector(state => state.user)
    const [state, setState] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState();
    const [DelFlag, setDelFlag] = useState(false)
    const token = localStorage.getItem("token");
    const [dloading, setDloading] = useState(false)

    const Navigate = useNavigate();
    const dispatch = useDispatch()



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

    const fetchData = async () => {
        try {
            setLoading(true);
            const result = await getBucket(user?.email, token, currentPage);
            if (result?.data?.response) {
                setTotalPage(result?.data?.response?.item_in_bucket);
                setState(result?.data?.response?.root?.children)
            } else {
                setState([])
                setTotalPage(0);
            }
        } catch (error) {
            console.log(error);
            checkSession(error, dispatch, Navigate)
            setState([])
            setTotalPage(0);
        } finally {
            setLoading(false)
        }
    }




    useEffect(() => {
        if (user?.email) {
            fetchData()
        }

    }, [user, DelFlag, currentPage])





    const deletCompany2 = async (d) => {
        try {
            setLoading(true);
            const result = await ClearBucketC(user?.email, token);
            if (result?.data) {
                swal({
                    title: "Bucket Clear Successfully",
                    icon: "success",
                });
                setDelFlag(!DelFlag)
            }

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }






    const deletCompany = async (d) => {
        try {
            setLoading(true);
            const result = await deleteBucketC(user?.email, token, d);
            if (result?.data) {
                swal({
                    title: "Company deleted successfully",
                    icon: "success",
                });
                setDelFlag(!DelFlag)
            }

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }


    const handleDeletePort = async (d) => {
        try {
            swal({
                title: "Are you sure you want to delete this company?",
                icon: "warning",
                buttons: ["Cancel", "OK"],
            }).then(function (isConfirm) {
                if (isConfirm) {
                    deletCompany(d)
                } else {
                }
            });


        } catch (error) {
            console.log(error);
        }
    }


    const handleClearPop = async () => {
        try {
            swal({
                title: "Are you sure you want to Clear the Bucket?",
                icon: "warning",
                buttons: ["Cancel", "OK"],
            }).then(function (isConfirm) {
                if (isConfirm) {
                    deletCompany2()
                } else {
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    const handleDownload = async () => {
        try {
            setDloading(true)
            const result = await DownloadBucket(user?.email, token);
            const blob = new Blob([result?.data], { type: 'text/csv' });
            saveAs(blob, 'Bucket.csv');

        } catch (error) {
            console.log(error)
        } finally {
            setDloading(false)
        }
    }












    return (
        <div className='home'>
            <Header />
            <div className="bucket-wrap">

                <div className="bread">
                    <span onClick={() => Navigate("/screener")}>Screener</span>
                    <i className='bx bxs-chevron-right'></i>
                    <span>My Bucket</span>
                </div>
                {
                    state?.length === 0 && loading === false ? <div className="nodata">
                        <img src={img2} alt='loader' />
                        <h4>Empty Bucket!</h4>
                    </div> :

                        <div className="bucket-item-header">
                            <h2>My Bucket </h2>
                            <div className="hb">
                                <h5>Total Items in Bucket: <span>{totalPage}</span></h5>
                                <button onClick={handleClearPop}>Clear Bucket</button>
                            </div>

                            <div className="bucket-item-container">

                                <div className="body-box">
                                    {
                                        loading ? <div className="loader">
                                            <img src={img} alt='loader' />
                                        </div> :
                                            <table>
                                                <thead>
                                                    <th>Company Info</th>
                                                    <th>U.S. Revenue</th>
                                                    <th>U.S. Full-Time Headcount</th>
                                                    <th>Action</th>
                                                </thead>
                                                <tbody>
                                                    {state?.map((d) => (
                                                        <tr>
                                                            <td className='detail'>
                                                                <h4>{d?.fields?.bq_organization_name}</h4>
                                                                <p><span>BQ ID:</span> {d?.fields?.bq_organization_id}</p>
                                                                <p><span>Year Founded:</span> {d?.fields?.hasOwnProperty("bq_organization_year_founded") ?
                                                                    d?.fields?.bq_organization_year_founded : "N/A"}</p>
                                                                <p><span>Unverified Website:</span> {d?.fields?.hasOwnProperty("bq_organization_website") ?
                                                                    <a className='link' target='blank' href={webcheck(d)}>{webcheck(d)}</a> : "N/A"}</p>

                                                                <p><span>Capital Market Status:</span> {d?.fields?.hasOwnProperty("bq_company_capital_markets_universe") ?
                                                                    d?.fields?.bq_company_capital_markets_universe === 1 ||
                                                                        d?.fields?.bq_company_capital_markets_universe === true ? "Active" : "Inactive" : "N/A"}</p>
                                                            </td>
                                                            <td><p>{d?.fields?.hasOwnProperty("bq_revenue_mr") ?
                                                                d?.fields?.bq_revenue_mr : "N/A"}</p></td>

                                                            <td><p>{d?.fields?.hasOwnProperty("bq_current_employees_plan_mr") ?
                                                                d?.fields?.bq_current_employees_plan_mr : "N/A"}</p></td>
                                                            <td>
                                                                <button className="delete" onClick={() => handleDeletePort(d?.fields?.bq_organization_id)} >
                                                                    <i className='bx bx-x' ></i>
                                                                </button>
                                                            </td>
                                                        </tr>)
                                                    )}
                                                </tbody>
                                            </table>}
                                    <br />
                                    <br />
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
                                    <br />
                                </div>

                            </div>
                            <div className="set">
                                <button className='pay' onClick={() => Navigate("/screener/bucket/listing")}>Pay & View</button>
                                <button disabled={dloading} onClick={handleDownload}>{dloading ? <LoadingOutlined /> : "Pay & Download"}</button>
                            </div>
                        </div>
                }
            </div>

        </div>
    )
}

export default Bucket