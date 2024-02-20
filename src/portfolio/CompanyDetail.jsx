import React, { useEffect, useState } from "react";
import TreeView from "../components2/TreeView"
import { Modal } from "antd";


const CompanyDetail = (props) => {
    const { data, modalOverlay, token, email, onHide, id } = props;
    const [countLoading, setCountLoading] = useState(false)


    return (
        <Modal centered width="90%" title={data} open={modalOverlay} onCancel={onHide} footer={false}>
            <div className="companyDetail">
                {id && <TreeView id={id} setCountLoading={setCountLoading} />}
            </div>

        </Modal>
    );
};

export default CompanyDetail;
