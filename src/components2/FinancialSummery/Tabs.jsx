import React from 'react';
import { Tabs } from 'antd';

import IncomeStatement from "./IncomeStatement";
import BalanceSheet from './BalanceSheet';
import MarginRations from "./MarginsRatios";




const AllTabs = ({ state, loading, img, toggle, setToggle }) => {
    const onChange = (key) => {
        // console.log(key);
    };


    const items = [
        {
            key: '1',
            label: 'Income Statement',
            children: <IncomeStatement toggle={toggle} setToggle={setToggle} state={state} loading={loading} img={img} />,
        },
        {
            key: '2',
            label: 'Balance Sheet',
            children: <BalanceSheet toggle={toggle} setToggle={setToggle} state={state} loading={loading} img={img} />,
        },
        {
            key: '3',
            label: 'Financial Margins and Ratios',
            children: <MarginRations toggle={toggle} setToggle={setToggle} state={state} loading={loading} img={img} />,
        },
    ];
    return (
        <>
            <div className="watermark">
                BrightQuery
            </div>
            <Tabs defaultActiveKey="1" items={items} type="card" onChange={onChange} />
            <div className="modalFooter">
                <p>® 2024 BrightQuery, Inc. All rights reserved. Visit us at:  <a className="link" href="http://www.brightquery.com/" target="_blank">http://www.brightquery.com</a>
                    <br /> Contact us at: sales@brightquery.com, support@brightquery.com or 1-888-BQDATA1</p>
                <a className="link" href="https://docs.brightquery.com/" target="_blank">https://docs.brightquery.com</a>

            </div>
        </>
    )
}

export default AllTabs;
