import { Button, Checkbox, Modal, Pagination } from 'antd'
import React, { useEffect, useState } from 'react'
import ResponsivePagination from "react-responsive-pagination";
import { ClearBucketC, deleteBucketC, getBucket } from '../Aws/Aws-api';
import millify from 'millify';
import img from "../assets/images/spin.gif"
import { generateUniqueFileName } from '../utils/utility';
import csvDownload from 'json-to-csv-export';
import CompanyDetail from '../portfolio/CompanyDetail';
import img2 from "../assets/images/port.svg"

const BucketPop = ({ token, email, bucketOpen, setBucketOpen }) => {

    const [state, setState] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState();
    const [modalOverlay, setModalOverlay] = useState(false);
    const [query, setQuery] = useState("");
    const [id, setId] = useState("");
    const [DelFlag, setDelFlag] = useState(false)





    const fetchData = async () => {
        try {
            setLoading(true);
            const result = await getBucket(email, token, currentPage);

            if (result?.data) {

                setTotalPage(result?.data[result?.data?.length - 1]?.total_items);
                setState(result?.data?.slice(0, result?.data?.length - 1))

            } else {
                setState([])
                setTotalPage(0);
            }
            console.log(totalPage)
            // console.log(result)
        } catch (error) {
            console.log(error);
            setState([])
            setTotalPage(0);
        } finally {
            setLoading(false)
        }
    }




    useEffect(() => {
        if (bucketOpen) {
            fetchData()
        }
        else {
            setState([])
            setCurrentPage(1)
        }
    }, [bucketOpen, DelFlag, currentPage])

    // console.log(state)



    const deletCompany2 = async (d) => {
        try {
            setLoading(true);
            const result = await ClearBucketC(email, token);
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
            const result = await deleteBucketC(email, token, d);
            if (result?.data) {
                swal({
                    title: "Company Delete Successfully",
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





    const titleWithButton = (
        <div className='folio-title2'>
            <div className="left">
                <span style={{ textTransform: "capitalize" }}>Bucket</span>
                <button type="primary" style={{ marginLeft: 8 }} disabled={state[0]?.data?.length === 0} onClick={ExportPortfolio}>
                    Export
                </button>
            </div>
            <div className="right">
                <button type="primary" disabled={state[0]?.data?.length === 0} onClick={handleClearPop}>
                    Clear Bucket
                </button>
            </div>

        </div>
    );


    return (
        <Modal centered width="90%" title={titleWithButton} open={bucketOpen}
            onOk={() => setBucketOpen(false)}
            onCancel={() => setBucketOpen(false)} footer={false}>
            <div className="folio">
                <div className="table-wrap">
                    {
                        loading ? <div className="loader">
                            <img src={img} alt='loader' />
                        </div> :
                            state?.length === 0 ? <div className="not">
                                <img src={img2} alt='img' />
                                <p>Empty Bucket</p>
                            </div> :
                                <table>
                                    <thead>
                                        {/* <th>Sr. No</th> */}
                                        <th>Company ID</th>
                                        {/* <th>Revenue</th>
                                        <th>Full-Time Headcount</th> */}
                                        <th style={{ maxWidth: "100px" }}>Action</th>
                                    </thead>

                                    <tbody>
                                        {

                                            state?.map((d, i) => (
                                                <tr key={i + "sdsad"}>
                                                    <td className='detailx' >
                                                        <h4 onClick={() => {
                                                            setQuery(d?.name);
                                                            setModalOverlay(true);
                                                            setId(d?.id)
                                                        }}>
                                                            {d?.name}</h4>
                                                        <p>{d?.id}</p>

                                                    </td>
                                                    <td className='bt'><center>
                                                        <button className="delete" onClick={() => handleDeletePort(d?.id)}>
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
                {/* <br></br> */}

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
            {
                modalOverlay && <CompanyDetail
                    modalOverlay={modalOverlay}
                    onHide={() => { setModalOverlay(false); setId("") }}
                    data={query}
                    token={token}
                    email={email}
                    id={id}
                />
            }

        </Modal>
    )
}

export default BucketPop