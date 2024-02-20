import React, { useEffect, useState } from 'react'

const ScreenarCardInput = ({ d, tempState, handleChange, floading, filters }) => {

    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const regex = /^[0-9]+$/;





    const add = () => {

        if (start === "" || end === "") {
            return
            return sweetAlert(
                "Invalid Range",
                "Start Range and End Range both are required.",
                "error"
            );
        }
        handleChange([[`>${start}`, `<${end}`]], d?.name);
    }
    const clear = () => {
        setStart("");
        setEnd("");
        handleChange([], d?.name);
    }
    useEffect(() => {
        const filterArray = filters[d?.name][0];
        if (filterArray && filterArray.length >= 2) {
            const firstElement = filterArray[0]?.replace(/[><]/g, '');
            const secondElement = filterArray[1]?.replace(/[><]/g, '');
            if (firstElement && secondElement) {
                setStart(firstElement);
                setEnd(secondElement);
            }
        }
    }, [d?.name]);




    return (
        <div className="sfc-content-wrap-card-set" key={d?.id + "s"}>
            <h5>{d?.title} <i className='bx bx-eraser' onClick={clear}></i></h5>
            <div className="sfc-content-body3">
                {
                    floading ? <div className='skeleton-item' style={{ maxHeight: "30px", marginTop: "0.5rem" }}>
                    </div> :
                        <div className='input-box-set'>
                            <input className={start !== "" ? "active" : ""} onChange={(e) => regex.test(e.target.value) ? setStart(e.target.value) : setStart("")}
                                value={start} type='text' placeholder='Start Range' onBlur={add} />
                            <input className={end !== "" ? "active" : ""} onChange={(e) => regex.test(e.target.value) ? setEnd(e.target.value) : setEnd("")} value={end} type='text' placeholder='End Range' onBlur={add} />

                        </div>
                }
            </div>
        </div>

    )
}

export default ScreenarCardInput