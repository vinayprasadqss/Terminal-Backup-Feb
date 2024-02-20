import { Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { createFeedback } from '../../Aws/Aws-api';

const FeedbackPop = ({ isModalOpen, setIsModalOpen, id, source, name }) => {
    const { user } = useSelector(state => state.user)
    const [bqId, setBqId] = useState("");
    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token");


    const handleSubmit = async () => {
        try {
            if (bqId === "") {
                return sweetAlert(
                    "Empty Title",
                    "Feedback message can not be empty",
                    "error"
                );
            }

            setLoading(true);
            const result = await createFeedback(bqId, name, msg, id, user?.email, token, source);
            if (result?.data) {
                swal("Success!", "Feedback sent successfully ", "success");
                setMsg("");
                setIsModalOpen(false)
            }

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }






    return (
        <Modal width={600} title={<div className="feedback-title">Feedback</div>} open={isModalOpen}
            centered
            footer={false}
            onOk={() => (setIsModalOpen(false))}
            onCancel={() => setIsModalOpen(false)}>
            <div className="feedback">
                <div className="feedback-input-group">
                    <label>BQ ID:</label>
                    <input className='d' value={id} placeholder='Enter title' type='text' disabled />
                </div>
                <div className="feedback-input-group">
                    <label>Company Name:</label>
                    <input className='d' value={name} disabled />
                </div>
                <div className="feedback-input-group">
                    <label>Title:</label>
                    <input value={bqId} placeholder='Enter Title' type='text' onChange={(e) => setBqId(e.target.value)} />
                </div>
                <div className="feedback-input-group">
                    <label>Feedback Message:</label>
                    <textarea value={msg} onChange={(e) => setMsg(e.target.value)} placeholder='Enter Message' />
                    {msg?.length > 0 &&
                        <span>{msg === "" ? "Feedback message can not be empty" :
                            msg?.length < 20 ? "Feedback message is too short" : ""}</span>}
                </div>
                <button onClick={handleSubmit} disabled={loading}>Submit</button>
            </div>
        </Modal>
    )
}

export default FeedbackPop