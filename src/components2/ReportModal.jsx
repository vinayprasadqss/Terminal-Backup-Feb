import React, { useState } from 'react'
import { Button, Modal } from 'antd';
import Report from "../Report"
const ReportModal = ({ isModalOpen, setIsModalOpen }) => {

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        // <Modal width={"100vw"} height={"800px"} title="Overview: BQ Methodology"
        //     footer={false} centered open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        //     <div className='bigmodal'>
        <Report />
        //     </div>

        // </Modal>
    )
}

export default ReportModal