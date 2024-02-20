import { Checkbox } from 'antd'
import React, { useEffect, useState } from 'react';

const SfcCard3 = ({ d, tempState, handleChange, floading, filters, clear }) => {
    const [text, SetText] = useState("")







    return (

        <div className="sfc-content-wrap-card-set" key={d?.id + "s"}>
            <h5>{d?.title}<i className='bx bx-eraser' onClick={() => clear(d?.name)}></i></h5>
            {/* <div className="sfc-content-header">
                <i className='bx bx-search'></i>
                <input value={text} type='text' placeholder='Search' onChange={(e) => SetText(e.target.value)} />
            </div> */}
            <div className="sfc-content-body">
                {
                    floading ? <div className='skeleton-item'>

                    </div> : d?.result?.map((d1, i) => (
                        <div className="sfc-strip" key={i + "iii"}>
                            <Checkbox onChange={() => handleChange(d1, d?.name)}
                                checked={filters[d?.name]?.find((f) => f === d1) ? true : false}
                            />
                            <p>{
                                d?.name === "bq_organization_isactive" ? d1 === 'true' ? "Active" : "Inactive" :
                                    d?.name === "bq_organization_is_public" ? d1 === 'true' ? "Public" : "Private" : d1
                            }</p>
                        </div>

                    ))
                }

            </div>
        </div>
    )
}

export default SfcCard3