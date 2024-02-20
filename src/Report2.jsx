import React, { useRef } from 'react';
import { Button, Modal } from 'antd';
import Report from './Report';
import { useReactToPrint } from 'react-to-print';
import html2pdf from 'html2pdf.js';

const Report2 = ({ isModalOpen, setIsModalOpen, id, name }) => {
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    // const handlePrint = () => {
    //     const printContents = document.getElementById('modal-contentz').innerHTML;
    //     document.body.innerHTML = printContents;
    //     window.print();
    //     document.body.innerHTML = originalContents;
    //     setIsModalOpen(false);
    // };
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const handlePDF  = async () => {
       // const content = document.getElementById('modal-contentz');
        const content = document.getElementById('modal-contentz');
        const opt = {
            margin:       .5,
            filename:     'myfile.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 1, },
            jsPDF:        { unit: 'in', format: 'a3', orientation: 'landscape' }
        };

        if (content) {
            html2pdf().from(content).set(opt).save('company-report.pdf');
        }
    }



    return (
        <Modal
            width="98%"
            title={`Overview: ${name}`}
            footer={[
                <Button key="close" onClick={handleCancel}>
                    Close
                </Button>,
                <Button key="print" type="primary" onClick={handlePDF}>
                    PDF
                </Button>,
            ]}
            centered
            visible={true}
            onOk={handleOk}
            onCancel={handleCancel}
            style={{}}
            bodyStyle={{ overflow: 'auto', height: 'calc(100vh - 150px)', maxHeight: '800px' }}
        >
            <div id="modal-contentz">
                <Report id={id} componentRef={componentRef} />
            </div>
        </Modal>
    );
};

export default Report2;
