import { Checkbox, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react'
import SfcCard from './SfcCard';
import { useDispatch } from 'react-redux';

const ScreenarCard = ({ title, data, name, filters, setFilters, floading, flag, setFlag }) => {
    const [show, setShow] = useState(false);
    const [tempState, setTempState] = useState([])
    const dispatch = useDispatch();

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
        console.log(names)
        let temp = filters;
        temp[names] = [];
        setFlag(!flag)

    }




    return (
        <div className="sfcl">
            <div className='h-bar'></div>
            <div className="sfc-content">
                <div className='sfc-top' onClick={() => setShow(!show)} style={{ cursor: "pointer" }}>
                    <h4>{title || "Company Structure Filters"}</h4>
                    <span >
                        {show ? <i className='bx bxs-chevron-down'></i>
                            : <i className='bx bx-chevron-up'></i>}</span>
                </div>
                {show && <div className="sfc-content-wrap">

                    {
                        data?.length > 0 ? data?.map((d) => (
                            <SfcCard d={d} tempState={tempState}
                                handleChange={handleChange}
                                floading={floading}
                                filters={filters}
                                clear={clear}
                            />
                        )) : ""
                    }


                </div>}

            </div>


        </div>
    )
}

export default ScreenarCard