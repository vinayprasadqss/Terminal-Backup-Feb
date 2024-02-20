
import React, { useState } from 'react'
import ScreenarCardInput from './ScreenarCardInput';


const ScreenarCard4 = ({ title, data, name, filters, setFilters, floading, flag, setFlag, classname }) => {
    const [show, setShow] = useState(false);
    const [tempState, setTempState] = useState([])


    const handleChange = (d, names) => {
        let temp = filters;
        setFilters((prev) => ({ ...prev, [names]: d }))

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

                    {
                        data?.length > 0 ? data?.map((d) => {
                            return <ScreenarCardInput d={d} tempState={tempState}
                                handleChange={handleChange}
                                floading={floading}
                                filters={filters}
                                clear={clear} />


                        }) : ""
                    }


                </div>}

            </div>


        </div>
    )
}

export default ScreenarCard4
