import React, { useEffect, useState } from 'react'

const SfcCard4 = ({ d, tempState, handleChange, floading, filters, clear }) => {

    const [start, setStart] = useState("");
    const regex = /^[0-9]+$/;





    const add = () => {

        if (start === "") {
            return

        }
        handleChange(start, d?.name);
    }


    const clear2 = (name) => {
        setStart("");
        clear(name)
        // handleChange([], d?.name);
    }



    return (
        <div className="sfc-content-wrap-card-set" key={d?.id + "s"}>
            <h5>{d?.title} <i className='bx bx-eraser' onClick={() => clear2(d?.name)}></i></h5>
            <div className="sfc-content-body3">
                {
                    floading ? <div className='skeleton-item' style={{ maxHeight: "30px", marginTop: "0.5rem" }}>
                    </div> :
                        <div className='input-box-set'>
                            <input className={start !== "" ? "active" : ""} onChange={(e) => regex.test(e.target.value) ? setStart(e.target.value) : setStart("")}
                                value={start} type='text' placeholder='Enter Text' onBlur={add} />
                        </div>
                }
            </div>
        </div>

    )
}

export default SfcCard4