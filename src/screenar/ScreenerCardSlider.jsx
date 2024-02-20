import React, { useEffect, useState } from 'react'
import { Checkbox, Slider } from 'antd'


const ScreenerCardSlider = ({ d, tempState, handleChange, floading, filters }) => {


    const [start, setStart] = useState([]);


    const add = () => {
        handleChange([[`>${start[0]}`, `<${start[1]}`]], d?.name);
    }
    const clear = () => {
        setStart("");
        handleChange([], d?.name);
    }
    useEffect(() => {
        const filterArray = filters[d?.name][0];
        console.log(filterArray)
        if (filterArray && filterArray.length >= 2) {
            const firstElement = filterArray[0].replace(/[><]/g, '');
            const secondElement = filterArray[1].replace(/[><]/g, '');

            setStart([firstElement, secondElement]);
        }
    }, [d?.name])



    return (
        <div className="sfc-content-wrap-card-set" key={d?.id + "s"}>
            <h5>{d?.title}</h5>
            <div className="sfc-content-body2">
                {
                    floading ? <div className='skeleton-item' style={{ maxHeight: "50px", marginTop: "0.5rem" }}>
                    </div> :
                        <div className="slider-box">
                            <Slider
                                className="ml-4 mr-4"
                                tooltip={(v) => Number(v) === '500' ? "500+" : v}
                                min={1}
                                range
                                marks={{ 1: '1', 500: '500+' }}
                                value={start}
                                onChange={(e) => setStart(e)}
                                max={500}

                            />
                            <div className="sets">
                                <span className='submit' onClick={add}  ><i className='bx bx-check' ></i></span>
                                <span className='submit' onClick={clear}  ><i className='bx bx-x'></i></span>
                            </div>

                        </div>

                }
            </div>
        </div>
    )
}

export default ScreenerCardSlider