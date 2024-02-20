import React, { useEffect, useState } from 'react'
import SfcCard3 from './SfcCard3'

const ScreenerCard3 = ({ title, data, name, filters, setFilters, floading, flag, setFlag, classname }) => {

    const [show, setShow] = useState(false);
    const [tempState, setTempState] = useState([])


    const handleChange = (d, names) => {

        let temp = filters;
        if (temp[names]?.find((f) => f === d)) {
            temp[names] = temp[names].filter((dz) => dz !== d);
        } else {
            temp[names].push(d);
        }

        setTempState([...temp[names]])
        setFilters(temp);
        setFlag(!flag)

    }


    const clear = (names) => {
        let temp = filters;
        temp[names] = [];
        setFlag(!flag)

    }

    return (
        <div className={`sfcl ${classname ? classname : ""}`}>
            <div className='h-bar'></div>
            <div className="sfc-content">
                <div className='sfc-top' onClick={() => setShow(!show)} style={{ cursor: "pointer" }}>
                    <h4>{title || "Company Structure Filters"}</h4>
                    <span >
                        {show ? <i className='bx bxs-chevron-down'></i>
                            : <i className='bx bx-chevron-up'></i>}</span>
                </div>
                {show && <div className="sfc-content-wrap">
                    <SfcCard3 d={data[0]} tempState={tempState}
                        handleChange={handleChange}
                        floading={floading}
                        filters={filters}
                        clear={clear}
                    />
                    <SfcCard3 d={data[1]} tempState={tempState}
                        handleChange={handleChange}
                        floading={floading}
                        filters={filters}
                        clear={clear}
                    />



                </div>}

            </div>


        </div>
    )
}

export default ScreenerCard3
