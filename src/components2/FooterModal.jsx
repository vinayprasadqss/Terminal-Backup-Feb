import React from 'react'
import { Button, Modal } from 'antd';

const FooterModal = ({ isModalOpen, setIsModalOpen }) => {
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
        <Modal width={800} title="Overview: BQ Methodology"
            footer={false} centered open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <ul className='method'>
                <li>BQ extracts tax, employment, and legal information
                    from over 80k jurisdictions in the U.S., including local,
                    state, and federal agencies and departments.        </li>
                <li>
                    A corporate family tree is built to understand an organization's
                    legal and geographic footprint, which serves as the foundation for
                    the organization.
                </li>
                <li>A legal entity may have multiple establishments (business locations)
                    and multiple officers (some of which in turn are companies).</li>
                <li>
                    An organization may consist of multiple legal entities, and may have a parent and children entities.
                </li>
                <li>
                    Tax and employment information is aggregated from the establishment level, to the legal entity,
                    and finally up to the organization.
                </li>
                <li>
                    Accounting and tax formulas are utilized to derive organization-level employment, payroll, and financials.
                </li>
                <li>
                    Corporate family tree information is derived, in part, from Labor
                    filings, IRS filings, and Secretary of State filings.
                </li>

            </ul>
        </Modal>
    )
}

export default FooterModal