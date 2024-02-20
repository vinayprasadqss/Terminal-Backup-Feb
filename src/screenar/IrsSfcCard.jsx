import { Checkbox } from 'antd'
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const IrsSfcCard = ({ d, tempState, handleChange, floading, filters, clear }) => {
    const { depend } = useSelector(state => state.search)
    const [text, SetText] = useState();
    const [state, setState] = useState([]);




    useEffect(() => {

        if (text) {

            setState(d?.result?.filter((f) => f?.toLowerCase()?.includes(text?.toLocaleLowerCase())))
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

                        return <div className="sfc-strip" key={i + d?.name}>
                            <Checkbox onChange={() => handleChange(d1, d?.name)}
                                checked={filters[d?.name]?.find((f) => f === d1) ? true : false}
                            />
                            <p style={{ textTransform: "capitalize" }}>{
                                d1?.toLowerCase()
                            }</p>
                        </div>

                    })

                }



            </div>
        </div>
    )
}

export default IrsSfcCard