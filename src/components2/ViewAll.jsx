import React, { useEffect, useState } from 'react'
import { Modal, Tooltip } from 'antd';
import img from "../assets/images/spin.gif"
import { GetAllSearchQuery, checkSession } from '../Aws/Aws-api';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ResponsivePagination from "react-responsive-pagination";
import { FilterFinder } from '../utils/utility';

const ViewAll = ({ isModalOpen, setIsModalOpen, data }) => {
    const { user } = useSelector(state => state.user)
    const [state, setState] = useState([])
    const [loading, setLoading] = useState(false)

    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0)
    const Navigate = useNavigate();
    const token = localStorage.getItem("token");
    const dispatch = useDispatch()


    const saveToRedirect = (d) => {
        try {
            console.log(d)
            let cat = JSON.parse(d[1]);
            dispatch({ type: "tab", payload: cat[0]?.tab })
            Navigate(`/`, {
                state: { q: d[0], category: cat },
            });


        } catch (error) {
            console.log(error);
        }
    }


    const categoryFinder = (d) => {
        const temp = JSON.parse(d[1])

        return temp[0]?.nameSearch
    }

    const fetchRecords = async () => {
        try {
            setLoading(true);
            const email = user?.email || localStorage.getItem("email");
            const res = await GetAllSearchQuery(
                email,
                token,
                (currentPage)
            );
            let temp = [];
            if (data?.title === "Recent favorite") {
                if (res?.data?.records) {
                    res?.data?.records?.map((d) => {
                        console.log(d)
                        d[2] > 1 && temp.push(d)
                    })

                    setState(temp);
                    setTotal(res?.data?.total_records2)
                }
            } else {
                if (res?.data?.records) {

                    setState(res?.data?.records);
                    setTotal(res?.data?.total_records)
                }
            }
        } catch (error) {
            console.log(error);
            checkSession(error, dispatch, Navigate)
        } finally {
            setLoading(false);
        }
    };



    useEffect(() => {
        if (isModalOpen) {
            fetchRecords();
        } else {
            setTotal(0)
            setCurrentPage(1)
        }
    }, [isModalOpen, currentPage]);



    return (
        <Modal footer={false} centered width={1200} title={<div className='save_search_modal'>
            <h1>Recent saved searches</h1>
        </div>} open={isModalOpen} onOk={() => setIsModalOpen(false)} onCancel={() => setIsModalOpen(false)}>
            <div className="save_search_modal-body">
                {loading ? (
                    <div className="loaderw">
                        <img src={img} />
                    </div>
                ) : (
                    <table className="view">
                        <thead>
                            <tr>
                                <td>Sr. No</td>
                                <td>Search Query</td>
                                <td>Search Name</td>
                                <td>Category Name</td>
                            </tr>
                        </thead>
                        <tbody>
                            {state?.map((d, i) => (
                                <tr onClick={() => saveToRedirect(d)} key={i}>
                                    <td>{i + (currentPage - 1) * 10 + 1}</td>
                                    <td>{d[0]}</td>
                                    <td>{d[2] === null ? "-" : d[2]}{d[2] === null ? "" : Object.keys(FilterFinder(d[1]))?.length > 0 ?
                                        <Tooltip placement="top" title="Filters exist in this saved search">
                                            <i className='bx bx-filter-alt'></i>
                                        </Tooltip> : ""}</td>
                                    <td>
                                        {categoryFinder(d) === "bq_organization_name"
                                            ? "Organization Name"
                                            : categoryFinder(d) === "bq_organization_website"
                                                ? "Website"
                                                : categoryFinder(d) === "bq_organization_irs_industry_name"
                                                    ? "Industry Name"
                                                    : categoryFinder(d) === "bq_organization_ein"
                                                        ? "EIN"
                                                        : categoryFinder(d) === "bq_organization_cik"
                                                            ? "CIK"
                                                            : categoryFinder(d) === "firmo_bq_ticker_related"
                                                                ? "Related Ticker"
                                                                : categoryFinder(d) === "firmo_bq_ticker"
                                                                    ? "Primary Ticker"
                                                                    : categoryFinder(d) === "bq_organization_lei"
                                                                        ? "LEI"
                                                                        : categoryFinder(d) === "bq_organization_year_founded"
                                                                            ? "Year Founded"
                                                                            : categoryFinder(d) === "bq_organization_cong_district_name"
                                                                                ? "Congressional District Name"
                                                                                : categoryFinder(d) === "bq_organization_officer"
                                                                                    ? "Officer Name"
                                                                                    : categoryFinder(d) === "legalAddress"
                                                                                        ? "Legal Address"
                                                                                        : categoryFinder(d) === "orgAddress"
                                                                                            ? "Organization Address"
                                                                                            : categoryFinder(d) ===
                                                                                                "all"
                                                                                                ? "All"
                                                                                                : "All"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {!loading &&
                    (total > 10 && (
                        <>
                            <br></br>
                            <center>
                                <ResponsivePagination
                                    current={currentPage}
                                    total={Math.ceil(total / 10)}
                                    onPageChange={(page) => setCurrentPage(page)}
                                    nextLabel="Next"
                                    previousLabel="Previous"
                                    maxWidth={"100px"}
                                />
                            </center>

                        </>
                    ))}

                <br></br>
            </div>

        </Modal>
    )
}

export default ViewAll