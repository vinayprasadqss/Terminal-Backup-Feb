import { Checkbox } from 'antd';
import React, { useEffect, useState } from 'react'
import { Naics } from '../constants/naics';

const NAICSScreenCard = ({ title, data, name, filters, setFilters, floading, flag, setFlag }) => {
    const [show, setShow] = useState(false);
    const [naics, setNaics] = useState([]);
    const [text, SetText] = useState("");
    const [text2, SetText2] = useState("");
    const [on, setOn] = useState(false);
    const [on2, setOn2] = useState(false);

    const handleChange = (d, names) => {

        let temp = filters;
        if (temp[names]?.find((f) => f === d)) {
            temp[names] = temp[names].filter((dz) => dz !== d);
        } else {
            temp[names].push(d);
        }
        // setTempState([...temp[names]])
        setFilters(temp);
        setFlag(!flag)
        if (names === "bq_organization_naics_name") {
            setOn(!on)
        }
        if (names === "bq_organization_naics_sector_name") {
            setOn2(!on2)

        }
    }


    const clear = (names) => {
        let temp = filters;
        temp[names] = [];
        setFlag(!flag)
        setOn2(!on2)

    }

    function getNaics() {
        if (filters?.bq_organization_naics_sector_name?.length === 0) {
            // console.log(filters)
            if (text2 === "") {
                return setNaics(data[1]?.result?.slice(0, 10))
            }
            else {
                return setNaics(data[1]?.result?.filter((f) => f?.toLowerCase()?.includes(text2?.toLowerCase())));
            }

        }

        const allNaics = [];
        filters?.bq_organization_naics_sector_name?.forEach((sectorName) => {
            Naics.forEach((sectorObj) => {
                const sectorData = sectorObj[sectorName];

                if (sectorData) {
                    sectorData.forEach((subsectorObj) => {
                        // const subsectorName = Object.keys(subsectorObj)[0];
                        allNaics.push(subsectorObj);
                    });
                }
            });
        });

        setNaics(allNaics?.filter((f) => f?.toLowerCase()?.includes(text2?.toLocaleLowerCase())));
    }



















    useEffect(() => {
        getNaics()
    }, [on2, data[1]?.result, text2])


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
                        <div className="sfc-content-wrap-card-set">
                            <h5>{data[0]?.title}<i className='bx bx-eraser' onClick={() => clear(data[0]?.name)}></i></h5>
                            <div className="sfc-content-header">
                                <i className='bx bx-search'></i>
                                <input value={text} type='text' placeholder='Search' onChange={(e) => SetText(e.target.value)} />
                            </div>
                            <div className="sfc-content-body">
                                {floading ? (
                                    <div className='skeleton-item'></div>
                                ) : (
                                    Naics
                                        .filter((f) => Object.keys(f)[0].toLowerCase().includes(text?.toLowerCase()))
                                        .map((item, i) => (
                                            <div className="sfc-strip" key={i + data[0]?.name}>
                                                <Checkbox
                                                    onChange={() => handleChange(Object.keys(item)[0], data[0]?.name)}
                                                    checked={
                                                        filters[data[0]?.name]?.find((f) => f === Object.keys(item)[0])
                                                            ? true
                                                            : false
                                                    }
                                                />
                                                <p style={{ textTransform: "capitalize" }}>{Object.keys(item)[0]}</p>
                                            </div>
                                        ))
                                )}

                            </div>
                        </div>


                    }

                    {
                        <div className="sfc-content-wrap-card-set">
                            <h5>{data[1]?.title}<i className='bx bx-eraser' onClick={() => clear(data[1]?.name)}></i></h5>
                            <div className="sfc-content-header">
                                <i className='bx bx-search'></i>
                                <input value={text2} type='text' placeholder='Search' onChange={(e) => SetText2(e.target.value)} />
                            </div>
                            <div className="sfc-content-body">
                                {floading ? (
                                    <div className='skeleton-item'></div>
                                ) : (
                                    naics?.map((item, i) => (
                                        <div className="sfc-strip" key={i + data[1]?.name}>
                                            <Checkbox
                                                onChange={() => handleChange(item, data[1]?.name)}
                                                checked={
                                                    filters[data[1]?.name]?.find((f) => f === item)
                                                        ? true
                                                        : false
                                                }
                                            />
                                            <p style={{ textTransform: "capitalize" }}>{item}</p>
                                        </div>
                                    ))
                                )}

                            </div>
                        </div>
                    }
                </div>}

            </div>


        </div>
    )
}

export default NAICSScreenCard