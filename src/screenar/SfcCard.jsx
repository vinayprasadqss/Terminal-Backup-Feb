import { Checkbox } from 'antd'
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const SfcCard = ({ d, tempState, handleChange, floading, filters, clear }) => {
    const { depend } = useSelector(state => state.search)
    const [text, SetText] = useState();
    const [state, setState] = useState([]);




    useEffect(() => {

        if (text) {
            if (d?.name === "bq_organization_address1_state_name") {
                return setState(d?.result?.filter((f) => f?.value?.toLowerCase()?.includes(text?.toLocaleLowerCase())))
            } else if (d?.name === "bq_organization_jurisdiction_code") {
                return setState(d?.result?.filter((f) => f?.value?.toLowerCase()?.includes(text?.toLocaleLowerCase())))
            }

            const filteredResults = d?.result?.filter((f) =>
                f?.toLowerCase()?.includes(text?.toLowerCase())
            );
            if (filteredResults.length > 20) {
                return setState(filteredResults.slice(0, 20));
            } else {
                return setState(filteredResults);
            }

        } else {
            setState(d?.result?.slice(0, 10))
        }
    }, [text, d?.result,])




    return (

        <div className="sfc-content-wrap-card-set" key={d?.id + "s"}>
            <h5>{d?.title}<i className='bx bx-eraser' onClick={() => clear(d?.name)}></i></h5>
            <div className="sfc-content-header">
                <i className='bx bx-search'></i>
                <input value={text} type='text' placeholder='Search' onChange={(e) => SetText(e.target.value)} />
            </div>
            <div className="sfc-content-body">
                {
                    floading ? <div className='skeleton-item'>

                    </div> : state?.map((d1, i) => {
                        if (d?.name === "bq_organization_address1_state_name") {
                            return <div className="sfc-strip" key={i + d?.name}>
                                <Checkbox onChange={() => handleChange(d1?.value, d?.name, d1?.code)}
                                    checked={filters[d?.name]?.find((f) => f === d1?.value) ? true : false}
                                />
                                <p style={{ textTransform: "capitalize" }}>{
                                    d1?.title?.toLowerCase() + ", " + d1?.code
                                }</p>
                            </div>
                        } else if (d?.name === "bq_organization_jurisdiction_code") {
                            return <div className="sfc-strip" key={i + d?.name}>
                                <Checkbox onChange={() => handleChange("US_" + d1?.code, d?.name)}
                                    checked={filters[d?.name]?.find((f) => f === "US_" + d1?.code) ? true : false}
                                />
                                <p style={{ textTransform: "capitalize" }}>{
                                    d1?.title?.toLowerCase() + "(" + "US_" + d1?.code + ")"
                                }</p>
                            </div>
                        } else {
                            return <div className="sfc-strip" key={i + d?.name}>
                                <Checkbox onChange={() => handleChange(d1, d?.name)}
                                    checked={filters[d?.name]?.find((f) => f === d1) ? true : false}
                                />
                                <p style={{ textTransform: "capitalize" }}>{
                                    d?.name === "bq_organization_isactive" ? d1 === 'true' ? "Active" : "Inactive" :
                                        d?.name === "bq_organization_is_public" ? d1 === 'true' ? "Public" : "Private" : d1?.toLowerCase()
                                }</p>
                            </div>
                        }
                    })

                }



            </div>
        </div>
    )
}

export default SfcCard