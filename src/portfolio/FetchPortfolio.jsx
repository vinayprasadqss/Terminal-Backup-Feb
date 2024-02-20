import React, { useEffect, useState } from 'react'
import { Fetch_Portfolios, PortfolioDelete, checkSession } from '../Aws/Aws-api'
import ResponsivePagination from "react-responsive-pagination";
import img from "../assets/images/spin.gif"
import img2 from "../assets/images/port.svg"
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const FetchPortfolio = ({ setPortfolioOpen, setPortfolioName, token, email, portfolioOpen, delFlag, setDelFlag }) => {

    const [loading, setLoading] = useState(false)
    const [state, setState] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(1)
    const dispatch = useDispatch();
    const Navigate = useNavigate()

    const FetchPortfolios = async () => {
        try {
            setLoading(true)
            // console.log(token)
            const res = await Fetch_Portfolios(token, email, currentPage);
            if (res?.data) {
                setState(res?.data?.response)
                setTotalPage(res?.data?.total_counts)
                setDelFlag(false)
            }
            // console.log(res)
        } catch (error) {
            console.log(error)
            checkSession(error, dispatch, Navigate)

        } finally {
            setLoading(false)
        }
    }


    const deletePortfolio = async (d) => {
        try {
            const result = await PortfolioDelete(token, email, d);
            if (result?.data) {
                setCurrentPage(1);
                FetchPortfolios()
                swal({
                    title: "Portfolio Deleted Successfully",
                    icon: "success",
                });
            }
        } catch (error) {
            console.log(error)
        }
    }


    const handleDelete = async (d) => {
        try {
            swal({
                title: "Are you sure you want to Delete this Portfolio?",
                icon: "warning",
                buttons: ["Cancel", "OK"],
            }).then(function (isConfirm) {
                if (isConfirm) {
                    deletePortfolio(d);

                } else {
                }
            });
        } catch (error) {

        }
    }







    useEffect(() => {
        FetchPortfolios()
    }, [currentPage, delFlag])






    return (
        <>
            {
                loading ? <div className="loader">
                    <img src={img} alt='loader' />
                </div> :
                    state?.length === 0 ?
                        <div className="no">
                            <img src={img2} alt='img' />
                            <p>Empty Portfolio</p>
                        </div> :
                        <div className={"itemsPortfolio"}>
                            {
                                state?.map((d, i) => (
                                    <div className={"item"} key={i + 'portdolio'}>
                                        <div className="name">
                                            <p>Portfolio Name</p>
                                            <h3 style={{ textTransform: "capitalize" }} onClick={() => { setPortfolioOpen(true); setPortfolioName(d) }}>
                                                {d?.portfolio_name}
                                            </h3>
                                        </div>
                                        <div className="one">
                                            <div className="circle" style={{ background: `conic-gradient(#323865 0% ${((d?.data) / 50) * 100}%, #cccccc 20% 100%)`, }}></div>
                                            <p><strong>{d?.data}</strong>Company under this portfolio</p>
                                        </div>
                                        <div className="buttonGroup">
                                            <button style={{ cursor: "pointer" }} className="view" onClick={() => { setPortfolioOpen(true); setPortfolioName(d) }}>View</button>
                                            <button style={{ cursor: "pointer" }} className="delete" onClick={() => handleDelete(d?.portfolio_name)}>Delete</button>
                                        </div>

                                    </div>
                                ))

                            }
                        </div>
            }

            <br></br>
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
        </>

    )
}

export default FetchPortfolio
