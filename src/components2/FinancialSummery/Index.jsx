import React, { useEffect, useState } from 'react';
import { Modal, Tooltip } from "antd";

import AllTabs from "./Tabs";
import { GetFSM, checkSession } from '../../Aws/Aws-api';
import img from "../../assets/images/spin.gif"
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FeedbackPop from '../Tree/FeedbackPop';
import "../../assets/scss/report.scss";

const SummeryModal = ({ open, setOpen, fsmQuery, financialName }) => {
    const [state, setState] = useState([]);
    const [toggle, setToggle] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false)

    const Navigate = useNavigate()

    //false means Q
    const token = localStorage.getItem("token")
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    const onSubmit = () => {
        // console.log("on Submit")
        setOpen(false)
    }

    const onCancel = () => {
        // console.log("on Cancel")
        setOpen(false)
    }

    const fetchRecords = async () => {
        try {
            setLoading(true)
            const result = await GetFSM(fsmQuery, token);
            if (result?.data?.root?.children[0]) {
                setState(result?.data?.root?.children[0]?.fields)
            }

        } catch (error) {
            console.log(error);
            checkSession(error, dispatch, Navigate)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (fsmQuery) {
            fetchRecords()
        }
    }, [fsmQuery])
    // console.log(state, "query")

    return (
        <div>
            <Modal
                title={
                    <div className='modal-head-flex'>
                        <h4 style={{ textTransform: "uppercase" }}>Financial Statement Analysis</h4>
                        <Tooltip title="If you have any suggestion/issue regarding the product then please let us know via feedback so we can improve your experience." placement="top">
                            <button style={{ bottom: "8px" }} onClick={() => setIsModalOpen(true)}><span>
                                Feedback<i className='bx bxs-info-circle'></i>
                            </span></button>
                        </Tooltip>
                    </div>
                }
                centered
                open={open}
                onOk={onSubmit}
                onCancel={onCancel}
                width={1000}
                footer={false}
                className='fsmw'
            >
                <h5>SEC financials are being shown for public companies, and imputed IRS financials are being shown for private companies.</h5>
                <AllTabs toggle={toggle} setToggle={setToggle} open state={state} loading={loading} img={img} />
                {isModalOpen && <FeedbackPop isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} id={fsmQuery} source={"Financial_Popup"} name={financialName} />}
            </Modal>
        </div>
    )
}


export default SummeryModal;
