import { Button, Checkbox, Modal, Pagination } from 'antd'
import React, { useEffect, useState } from 'react'
import ResponsivePagination from "react-responsive-pagination";
import { Fetch_Portfolios_Detail, SpeceficCompanyPortfolioDelete } from '../Aws/Aws-api';
import millify from 'millify';
import img from "../assets/images/spin.gif"
import { generateUniqueFileName } from '../utils/utility';
import csvDownload from 'json-to-csv-export';
import CompanyDetail from './CompanyDetail';
import img2 from "../assets/images/port.svg"

const PortfolioDisplay = ({ portfolioOpen, setPortfolioOpen, portfoliName, saveTagRedirect, token, email, setDelFlag }) => {

    const [state, setState] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState();
    const [pre, setPre] = useState(0);
    const [next, setNext] = useState(0);
    const [modalOverlay, setModalOverlay] = useState(false);
    const [query, setQuery] = useState("");
    const [id, setId] = useState("");


    const handleOk = () => {
        setPortfolioOpen(false);
    };
    const handleCancel = () => {
        setPortfolioOpen(false);
    };
    let org = portfoliName?.portfolio_name;

    const fetchData = async () => {
        try {
            setLoading(true);
            const result = await Fetch_Portfolios_Detail(token, email, org, currentPage);
            if (result?.data) {
                setTotalPage(result?.data?.response[0]?.data?.length);
                setState(result?.data?.response)
            }

            // console.log(result)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }




    useEffect(() => {
        if (portfolioOpen) {
            fetchData()
        }
        else {
            setState([])
            setCurrentPage(1)
        }
    }, [portfolioOpen])

    // console.log(state)

    function cal() {
        setPre(Number((currentPage - 1) * 10));
        setNext(Number(((currentPage - 1) * 10) + 10));
    }
    useEffect(() => {
        cal()

    }, [currentPage])

    // console.log(state)



    const ExportPortfolio = async () => {
        try {

            if (state[0]?.data) {
                let temp = state[0]?.data;
                let arr = [];
                temp?.forEach((d, i) => {
                    arr.push({
                        "Sr. No": i + 1,
                        "Company Name": d?.name,
                        "BQ ID": String(d?.id) + "'",
                        "Revenue": d?.revenue,
                        "Headcount": d?.headcount,
                        "Valuation": d?.valuation,
                        "Credit Score": d?.credit_score
                    })
                });
                const uniqueFileName = generateUniqueFileName();
                const dataToConvert = {
                    data: arr,
                    filename: 'Portfolio_Export_' + uniqueFileName,
                    delimiter: ',',
                    headers: ['Sr.No', "Company Name", "BQ ID",
                        "Revenue", "Headcount", "Valuation", "Credit Score"

                    ]
                }
                csvDownload(dataToConvert)
            }


        } catch (error) {
            console.log(error);
        }
    }


    const deletCompany = async (d) => {
        try {
            setLoading(true);
            const result = await SpeceficCompanyPortfolioDelete(token, email, org, d);
            if (result?.data) {
                swal({
                    title: "Company Delete Successfully",
                    icon: "success",
                });
                setDelFlag(true)
                await fetchData();


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
                title: "Are you sure you want to Delete this Company?",
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



    const titleWithButton = (
        <div className='folio-title'>
            <span style={{ textTransform: "capitalize" }}>{portfoliName?.portfolio_name}</span>
            <button type="primary" style={{ marginLeft: 8 }} disabled={state[0]?.data?.length === 0} onClick={ExportPortfolio}>
                Export
            </button>
        </div>
    );


    return (
        <Modal centered width="90%" title={titleWithButton} open={portfolioOpen} onOk={handleOk} onCancel={handleCancel} footer={false}>
            <div className="folio">
                <div className="table-wrap">
                    {
                        loading ? <div className="loader">
                            <img src={img} alt='loader' />
                        </div> :
                            state[0]?.data?.length === 0 ? <div className="not">
                                <img src={img2} alt='img' />
                                <p>Empty Portfolio</p>
                            </div> :
                                <table>
                                    <thead>
                                        <th>Sr. No</th>
                                        <th>Company Details</th>
                                        <th>Revenue</th>
                                        <th>Full-Time Headcount</th>
                                        {/* <th>BQ Valuation</th> */}
                                        <th>BQ Credit Score</th>
                                        <th>Action</th>
                                    </thead>

                                    <tbody>
                                        {

                                            state[0]?.data?.slice(pre, next)?.map((d, i) => (
                                                <tr key={i + "sdsad"}>
                                                    <td><center>{i + 1 + Number(pre)}</center></td>
                                                    <td className='detailx' >
                                                        <h4 onClick={() => {
                                                            setQuery(d?.name);
                                                            setModalOverlay(true);
                                                            setId(d?.trimLocation || d?.id)
                                                        }}>
                                                            {d?.hasOwnProperty("name") ?
                                                                d?.name : "N/A"}</h4>
                                                        <h6>{d?.trimLocation !== d?.id ? "Location ID:" : "BQ ID:"} {d?.hasOwnProperty("id") ? d?.id : "N/A"}</h6>
                                                    </td>
                                                    <td>{d?.hasOwnProperty("revenue") ? d?.revenue === "N/A" ? "N/A" : "$" + millify(d?.revenue) : "N/A"}</td>
                                                    <td>{d?.hasOwnProperty("headcount") ? millify(d?.headcount) : "N/A"}</td>
                                                    {/* <td>{d?.hasOwnProperty("valuation") ? d?.valuation === "N/A" ? "N/A" : "$" + millify(d?.valuation) : "N/A"}</td> */}
                                                    <td>{d?.hasOwnProperty("credit_score") ? d?.credit_score : "N/A"}</td>
                                                    <td className='bt'><center>
                                                        <button className="delete" onClick={() => handleDeletePort(d)}>
                                                            <i className='bx bx-x' ></i>

                                                        </button>
                                                    </center></td>
                                                </tr>
                                            ))
                                        }

                                    </tbody>
                                </table>
                    }

                </div>

                <br></br>
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
            <CompanyDetail
                modalOverlay={modalOverlay}
                onHide={() => { setModalOverlay(false); setId("") }}
                data={query}
                token={token}
                email={email}
                id={id}
            />
        </Modal>
    )
}

export default PortfolioDisplay