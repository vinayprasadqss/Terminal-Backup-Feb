import React, { useEffect, useState } from 'react'


import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { GetSearchQuery, checkSession } from './Aws/Aws-api';
import img2 from "./assets/images/spin.gif"
import ViewAll from './components2/ViewAll';
import Footer from './components2/Footer';
import SavedCard from './components2/controls/SavedCard';
import Header from './components2/controls/Header';


const SaveSearchList = () => {

    const [hide1, setHide1] = useState(false);
    const [hide2, setHide2] = useState(false);
    const [state, setState] = useState([]);
    const [state2, setState2] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isModalOpen2, setIsModalOpen2] = useState(false)
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("aws-email");





    const FetchSaveSearchRecords = async () => {
        try {
            setLoading(true)
            const result = await GetSearchQuery(email, token)
            if (result?.data) {

                let temp = [];
                result?.data?.records?.map((d) => {
                    if (d[2] > 1) {
                        temp.push(d)
                    }
                })
                setState(result?.data?.records)
                setState2(temp)
            }
        } catch (error) {
            console.log(error);
            checkSession(error, dispatch, Navigate)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        FetchSaveSearchRecords()
    }, [])


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










    return (
        <>
            <div className="home">
                <Header />
                <div className='recentQuesWrap'>
                    <div className="recentQuestion">
                        <div className="recentHead">
                            <h3>Recent saved searches</h3>
                            <div className="btnGroup">
                                <button style={{ width: "75px" }} onClick={() => setHide1(!hide1)}>
                                    {!hide1 ? "Hide" : "Show"}
                                </button>
                            </div>
                        </div>
                        <div className={`bodyWrap ${hide1 ? "hide" : "show"}`}>
                            <em className="last">Last 7 days</em>
                            <div className="recentBody favorite heading">
                                {
                                    loading ? <div className='loader' style={{ height: "70vh" }}>
                                        <img src={img2} alt='loader' />
                                    </div> : <div className="wrap-list">
                                        <ul>
                                            {state?.map((d, index) => {
                                                if (categoryFinder(d) === "bq_organization_website") {
                                                    return <li key={index + "e"} onClick={() => saveToRedirect(d)}>
                                                        <SavedCard a={<i className='bx bx-globe'></i>}
                                                            b={d[2]} c={d}
                                                        />
                                                    </li>
                                                }
                                                else if (categoryFinder(d) === "bq_organization_officer") {
                                                    return <li key={index + "e"} onClick={() => saveToRedirect(d)}>
                                                        <SavedCard a={<i className='bx bx-user'></i>}
                                                            b={d[2]} c={d}
                                                        />

                                                    </li>
                                                }
                                                else {
                                                    return <li key={index + "e"} onClick={() => saveToRedirect(d)}>
                                                        <SavedCard a={<i className='bx bx-search'></i>}
                                                            b={d[2]} c={d}
                                                        />

                                                    </li>
                                                }

                                            })}
                                        </ul>
                                        <div className="viewAll">
                                            <a
                                                style={{ cursor: "pointer" }}
                                                onClick={() => setIsModalOpen(true)}
                                            >
                                                {" "}
                                                View All{" "}
                                                <i className='bx bx-chevron-right'></i>
                                            </a>
                                        </div>
                                    </div>
                                }
                                <ViewAll isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} data={{ title: "" }} />
                            </div>
                        </div>
                    </div>
                </div>
                {state2?.length > 0 && <div className='recentQuesWrap'>
                    <div className="recentQuestion">
                        <div className="recentHead">
                            <h3>Recent favorite</h3>
                            <div className="btnGroup">
                                <button style={{ width: "75px" }} onClick={() => setHide2(!hide2)}>
                                    {!hide2 ? "Hide" : "Show"}
                                </button>
                            </div>
                        </div>
                        <div className={`bodyWrap ${hide2 ? "hide" : "show"}`}>
                            <em className="last">Last 7 days</em>
                            <div className="recentBody favorite heading">
                                {
                                    loading ? <div className='loader'>
                                        <img src={img2} alt='loader' />
                                    </div> : <div className="wrap-list">
                                        <ul>
                                            {state2?.map((d, index) => {
                                                if (categoryFinder(d) === "bq_organization_website") {
                                                    return <li key={index + "e"} onClick={() => saveToRedirect(d)}>
                                                        <i className='bx bx-globe'></i>{d[0]}
                                                    </li>
                                                }
                                                else if (categoryFinder(d) === "bq_organization_officer") {
                                                    return <li key={index + "e"} onClick={() => saveToRedirect(d)}>
                                                        <i className='bx bx-user'></i>{d[0]}
                                                    </li>
                                                }
                                                else {
                                                    return <li key={index + "e"} onClick={() => saveToRedirect(d)}>
                                                        <i className='bx bx-search'></i>{d[0]}
                                                    </li>
                                                }

                                            })}
                                        </ul>
                                        <div className="viewAll">
                                            <a
                                                style={{ cursor: "pointer" }}
                                                onClick={() => setIsModalOpen2(true)}
                                            >
                                                {" "}
                                                View All{" "}
                                                <i className='bx bx-chevron-right'></i>
                                            </a>
                                        </div>
                                    </div>
                                }
                                <ViewAll isModalOpen={isModalOpen2} setIsModalOpen={setIsModalOpen2} data={{ title: "Recent favorite" }} />
                            </div>
                        </div>
                    </div>
                </div>}



            </div>
            <br></br>
            <br></br>
            <br></br>
            <Footer />



        </>

    )

}

export default SaveSearchList
