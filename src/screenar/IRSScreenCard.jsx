import { Checkbox, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react'
import SfcCard from './SfcCard';
import { useDispatch } from 'react-redux';
import IrsSfcCard from './IrsSfcCard';
import { obj } from '../constants/irs';
import { irsSubSector } from '../constants/screenConstants';

const IRSScreenarCard = ({ title, data, name, filters, setFilters, floading, flag, setFlag }) => {
    const [show, setShow] = useState(false);
    const [tempState, setTempState] = useState([])
    const dispatch = useDispatch();
    const [industry, setIndustry] = useState([]);
    const [tempIndustry, setTempIndustry] = useState([]);
    const [subSector, setSubsector] = useState([]);
    const [text, SetText] = useState("");
    const [text2, SetText2] = useState("");
    const [text3, SetText3] = useState("");
    const [on, setOn] = useState(false);
    const [on2, setOn2] = useState(false);

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
        if (names === "bq_organization_sector_name") {
            setOn(!on)
        }
        if (names === "bq_organization_subsector_name") {
            setOn2(!on2)

        }
    }


    const clear = (names) => {
        let temp = filters;
        temp[names] = [];
        setFlag(!flag)

    }

    function getSubsectors() {
        if (filters?.bq_organization_sector_name?.length === 0) {
            if (text2 === "") {
                return setSubsector(data[1]?.result?.slice(0, 10))
            }
            else {
                return setSubsector(data[1]?.result?.filter((f) => f?.toLowerCase()?.includes(text2?.toLowerCase())));
            }


        }

        const allSubsectors = [];
        const allIndustry = [];
        filters?.bq_organization_sector_name?.forEach((sectorName) => {
            obj.forEach((sectorObj) => {
                const sectorData = sectorObj[sectorName];

                if (sectorData) {
                    sectorData.forEach((subsectorObj) => {

                        const subsectorName = Object.keys(subsectorObj)[0];
                        allSubsectors.push(subsectorName);

                        subsectorObj[subsectorName].forEach((industry) => {
                            allIndustry.push(industry);
                        });

                    });
                }
            });
        });

        console.log(allIndustry)
        setSubsector(allSubsectors?.filter((f) => f?.toLowerCase()?.includes(text2?.toLocaleLowerCase())));
        setTempIndustry(allIndustry)

    }

    const getIndustryNames = () => {
        if (filters?.bq_organization_subsector_name?.length === 0 && filters?.bq_organization_sector_name?.length === 0) {
            if (text3 === "") {
                setIndustry(data[2]?.result?.slice(0, 10));
            } else {
                setIndustry(data?.result?.filter((f) => f?.toLowerCase()?.includes(text3?.toLowerCase())));
            }
        }
        else if (filters?.bq_organization_subsector_name?.length === 0) {
            setIndustry(tempIndustry?.filter((f) => f?.toLowerCase()?.includes(text3?.toLowerCase())));
        }
        else {
            const filteredIndustries = [];
            console.log("heree");
            obj.forEach((sectorObj) => {
                // Iterate over each sector object
                Object.values(sectorObj).forEach((subsectorArray) => {
                    // Iterate over each subsector array in the sector object
                    subsectorArray.forEach((subsectorObj) => {
                        const subsectorName = Object.keys(subsectorObj)[0];

                        // Check if the subsector matches the selected subsector
                        if (
                            subsectorName === filters?.bq_organization_subsector_name ||
                            filters?.bq_organization_subsector_name.includes(subsectorName)
                        ) {
                            // Add industries from the matching subsector to the filteredIndustries array
                            filteredIndustries.push(...Object.values(subsectorObj[subsectorName]));
                        }
                    });
                });
            });

            setIndustry(filteredIndustries?.filter((f) => f?.toLocaleLowerCase()?.includes(text3?.toLocaleLowerCase())));
        }
    };





    useEffect(() => {
        getIndustryNames()
    }, [data[2]?.result, text3, filters?.bq_organization_subsector_name, on2])











    useEffect(() => {
        getSubsectors()
    }, [on, data[1]?.result, text2])

    // console.log(filters)


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
                                    obj
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
                                    subSector?.map((item, i) => (
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
                    {
                        <div className="sfc-content-wrap-card-set">
                            <h5>{data[2]?.title}<i className='bx bx-eraser' onClick={() => clear(data[2]?.name)}></i></h5>
                            <div className="sfc-content-header">
                                <i className='bx bx-search'></i>
                                <input value={text3} type='text' placeholder='Search' onChange={(e) => SetText3(e.target.value)} />
                            </div>
                            <div className="sfc-content-body">
                                {floading ? (
                                    <div className='skeleton-item'></div>
                                ) : (
                                    industry?.map((item, i) => (
                                        <div className="sfc-strip" key={i + data[2]?.name}>
                                            <Checkbox
                                                onChange={() => handleChange(item, data[2]?.name)}
                                                checked={
                                                    filters[data[2]?.name]?.find((f) => f === item)
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

export default IRSScreenarCard