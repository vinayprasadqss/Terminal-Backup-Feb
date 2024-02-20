import React, { useEffect, useState } from 'react'
import { MultiSelect } from 'react-multi-select-component'
import { terminalFilter } from '../../constants/DummyConstants'
import { dbFilters } from "../../Aws/Aws-free-api";
import { useDispatch, useSelector } from 'react-redux';
import img from "../../assets/images/spin.gif"
import { newState } from '../../constants/DynamiCFilters';

const CompanyFilter = ({ ClearAll, multiFilter, handleMultiSelectChange, handleLabel, handleLabel2,
    setHeadcount, setRevenue, headcount, revenue, handleSingleSelect, setFquery, fquery }) => {
    const { filter } = useSelector(state => state.search)
    const [loading1, setLoading1] = useState(false);
    const [useToggleMenu, setToggleMenu] = useState(window.innerWidth < 1199 ? false : true);
    const [flag, setFlag] = useState("")
    const token = localStorage.getItem("token")

    const dispatch = useDispatch();

    const LoadFilter = async () => {
        try {
            setLoading1(true)
            const result = await dbFilters(token);
            if (result?.data) {

                dispatch({ type: "addfilter", payload: result?.data })
            }

        } catch (error) {
            console.log(error)
        } finally {
            setLoading1(false)
        }
    }

    useEffect(() => {
        if (filter?.length === 0) {
            LoadFilter()
        }

    }, [])

    // console.log(fquery, "fquery")

    // const handleFQuery = (selectedOptions) => {

    //     // console.log(selectedOptions[selectedOptions?.length - 1]?.value, "r")
    //     // for (var i = 0; i < selectedOptions?.length; i++) {
    //     // if (selectedOptions[0]?.value === fquery[0]?.value) {
    //     //     return setFquery([])
    //     // }

    //     fquery?.map((f) => {
    //         if (selectedOptions?.find((r) => r?.value === f?.value)) {
    //             let temp = selectedOptions?.filter((f1) => f1?.value !== f?.value)
    //             setFquery(temp)
    //             console.log("fdellete")
    //             return
    //         }
    //     })

    //     // }
    //     setFquery((prev) => ([
    //         ...prev,
    //         newState?.find((f) =>
    //             f?.value?.includes(selectedOptions[selectedOptions?.length - 1]?.value))])
    //     )
    // }


    const onClickMenu = () => {
        setToggleMenu(!useToggleMenu);
    }

    return (
        <div className={`main-aside ${useToggleMenu ? "open" : "closed"}`}>
            <div className="top">
                <div className="head" onClick={onClickMenu}>
                    <h4><i className='bx bx-menu'></i>Menu</h4>
                    <h4><i className='bx bx-left-arrow-alt'></i></h4>
                </div>

                <span className={"saveSearchBtn"} onClick={saveSearch}><i className='bx bx-save' ></i>Save Search</span>
            </div>
            <span className="c"><i className='bx bx-filter-alt'></i> Search Filters</span>
            {/* {
                filter?.map((item, i) => {
                    if (item === "bq_organization_address1_state_name") {
                        return <div className="single-select" key={i + "ki"}>
                            <label>Filter by States</label>
                            <MultiSelect
                                options={item?.bq_organization_address1_state_name?.map((d) => ({
                                    value: d,
                                    label: d,
                                    name: "bq_organization_address1_state_name",
                                }))}
                                overrideStrings={{ selectSomeItems: d }}
                                onChange={(selectedOptions) =>
                                    handleMultiSelectChange(selectedOptions, "bq_organization_address1_state_name",)
                                }
                                value={multiFilter["bq_organization_address1_state_name"]?.map((d) => ({
                                    value: d,
                                    label: handleLabel(item, d),
                                    name: "bq_organization_address1_state_name",
                                }))}
                                hasSelectAll={false}
                                className={multiFilter?.["bq_organization_address1_state_name"]?.length > 0 ? "activeselect multi-select" : "multi-select"}
                            // isOpen={true}
                            />
                        </div>
                    }
                    else if (item === "bq_organization_address1_cbsa_name") {
                        return <div className="single-select" key={i + "ki"}>
                            <label>Filter by Metro</label>
                            <MultiSelect
                                options={item?.bq_organization_address1_cbsa_name?.map((d) => ({
                                    value: d,
                                    label: d,
                                    name: "bq_organization_address1_cbsa_name",
                                }))}
                                overrideStrings={{ selectSomeItems: d }}
                                onChange={(selectedOptions) =>
                                    handleMultiSelectChange(selectedOptions, "bq_organization_address1_cbsa_name",)
                                }
                                value={multiFilter["bq_organization_address1_cbsa_name"]?.map((d) => ({
                                    value: d,
                                    label: handleLabel(item, d),
                                    name: "bq_organization_address1_cbsa_name",
                                }))}
                                hasSelectAll={false}
                                className={multiFilter?.["bq_organization_address1_cbsa_name"]?.length > 0 ? "activeselect multi-select" : "multi-select"}
                            // isOpen={true}
                            />
                        </div>
                    }
                    else if (item === "bq_organization_sector_name") {
                        return <div className="single-select" key={i + "ki"}>
                            <label>Filter by IRS Sector</label>
                            <MultiSelect
                                options={item?.bq_organization_sector_name?.map((d) => ({
                                    value: d,
                                    label: d,
                                    name: "bq_organization_sector_name",
                                }))}
                                overrideStrings={{ selectSomeItems: d }}
                                onChange={(selectedOptions) =>
                                    handleMultiSelectChange(selectedOptions, "bq_organization_sector_name",)
                                }
                                value={multiFilter["bq_organization_sector_name"]?.map((d) => ({
                                    value: d,
                                    label: handleLabel(item, d),
                                    name: "bq_organization_sector_name",
                                }))}
                                hasSelectAll={false}
                                className={multiFilter?.["bq_organization_sector_name"]?.length > 0 ? "activeselect multi-select" : "multi-select"}
                            // isOpen={true}
                            />
                        </div>
                    }
                    else if (item === "bq_organization_subsector_name") {
                        return <div className="single-select" key={i + "ki"}>
                            <label>Filter by IRS Sector</label>
                            <MultiSelect
                                options={item?.bq_organization_subsector_name?.map((d) => ({
                                    value: d,
                                    label: d,
                                    name: "bq_organization_subsector_name",
                                }))}
                                overrideStrings={{ selectSomeItems: d }}
                                onChange={(selectedOptions) =>
                                    handleMultiSelectChange(selectedOptions, "bq_organization_subsector_name",)
                                }
                                value={multiFilter["bq_organization_subsector_name"]?.map((d) => ({
                                    value: d,
                                    label: handleLabel(item, d),
                                    name: "bq_organization_subsector_name",
                                }))}
                                hasSelectAll={false}
                                className={multiFilter?.["bq_organization_subsector_name"]?.length > 0 ? "activeselect multi-select" : "multi-select"}
                            // isOpen={true}
                            />
                        </div>
                    }

                })
            } */}
            {/* {terminalFilter?.map((item, i) => (
                item.type === "multi" ? (
                    item?.name === "bq_organization_address1_state_name" ?
                        (loading1 ? <div className="loadingwrap">
                            <label>Filter by States</label>
                            <div className="loading-select">

                                <img src={img} />
                            </div>
                        </div> :
                            filter?.bq_organization_address1_state_name && <div className="single-select" key={i + "ki"}>
                                <label>{item?.text}</label>
                                <MultiSelect
                                    options={filter?.bq_organization_address1_state_name?.map((d) => ({
                                        value: d + "gfdg",
                                        label: d + "f",
                                        name: item?.name,
                                    }))}
                                    overrideStrings={{ selectSomeItems: item?.label }}
                                    onChange={(selectedOptions) =>
                                        handleMultiSelectChange(selectedOptions, item?.name)
                                    }
                                    value={multiFilter[item?.name]?.map((d) => ({
                                        value: d,
                                        label: handleLabel(item, d),
                                        name: item?.name,
                                    }))}
                                    hasSelectAll={false}
                                    className={multiFilter?.[item?.name]?.length > 0 ? "activeselect multi-select" : "multi-select"}
                                // isOpen={true}
                                />
                            </div>
                        )
                        :
                        item?.name === "bq_organization_address1_cbsa_name" ?
                            loading1 ? <div className="loadingwrap">
                                <label>Filter by States</label>
                                <div className="loading-select">
                                    <img src={img} />
                                </div>
                            </div> :
                                filter?.bq_organization_address1_cbsa_name && <div className="single-select" key={i + "ki"}>
                                    <label>{item?.text}</label>
                                    <MultiSelect
                                        options={filter?.bq_organization_address1_cbsa_name?.slice(1)?.map((d) => ({
                                            value: d,
                                            label: d,
                                            name: item?.name,
                                        }))}
                                        overrideStrings={{ selectSomeItems: item?.label }}
                                        onChange={(selectedOptions) =>
                                            handleMultiSelectChange(selectedOptions, item?.name)
                                        }
                                        value={multiFilter[item?.name]?.map((d) => ({
                                            value: d,
                                            label: handleLabel(item, d),
                                            name: item?.name,
                                        }))}
                                        hasSelectAll={false}
                                        className={multiFilter?.[item?.name]?.length > 0 ? "activeselect multi-select" : "multi-select"}
                                    // isOpen={true}
                                    />
                                </div>

                            :
                            <div className="single-select" key={i + "ki"}>
                                <label>{item?.text}</label>
                                <MultiSelect
                                    options={item?.options?.map((d) => ({
                                        value: d?.value,
                                        label: d?.title,
                                        name: item?.name,
                                    }))}
                                    overrideStrings={{ selectSomeItems: item?.label }}
                                    onChange={(selectedOptions) =>
                                        handleMultiSelectChange(selectedOptions, item?.name)
                                    }
                                    value={multiFilter[item?.name]?.map((d) => ({
                                        value: d,
                                        label: handleLabel(item, d),
                                        name: item?.name,
                                    }))}
                                    hasSelectAll={false}
                                    className={multiFilter?.[item?.name]?.length > 0 ? "activeselect multi-select" : "multi-select"}
                                // isOpen={true}
                                />
                            </div>
                )
                    : (
                        <div className="single-select1" key={i + "kiw"}>
                            <label>{item?.text}</label>

                            <select className={multiFilter?.[item?.name]?.length > 0 ? "activeselect" : ""} value={multiFilter?.[item?.name]}
                                onChange={(e) => handleSingleSelect(e.target.value, item?.name)} >
                                {
                                    item?.options?.map((o, i) => (
                                        <option key={i + "j"} value={o?.value}>{o?.title}</option>
                                    ))
                                }

                            </select>
                            <div className='s'></div>
                        </div>
                    )


            ))} */}
            <div className="filter-content" >
                {
                    terminalFilter?.map((item, i) => {
                        if (item.type === "multi") {
                            if (item?.name === "bq_organization_address1_state_name") {
                                return loading1 ? <div className="loadingwrap">
                                    <label>Filter by States</label>
                                    <div className="loading-select">

                                        <img src={img} />
                                    </div>
                                </div> :
                                    filter?.bq_organization_address1_state_name && <div className="single-select" key={i + "ki"}>
                                        <label>{item?.text}</label>
                                        <MultiSelect
                                            options={newState?.slice(1)?.map((d) => ({
                                                value: d?.value,
                                                label: d?.title + ", " + d?.code,
                                                name: item?.name,
                                                code: d?.code,

                                            }))}
                                            overrideStrings={{ selectSomeItems: item?.label }}
                                            onChange={(selectedOptions) => {
                                                // setFlag(selectedOptions[selectedOptions[selectedOptions?.length - 1]])
                                                // handleFQuery(selectedOptions)
                                                // console.log(selectedOptions, "select")
                                                // setFquery(selectedOptions)
                                                handleMultiSelectChange(selectedOptions, item?.name)
                                            }
                                            }
                                            value={multiFilter[item?.name]?.map((d) => ({
                                                value: d,
                                                label: handleLabel2(item, d),
                                                name: item?.name,

                                            }))}
                                            hasSelectAll={false}
                                            className={multiFilter?.[item?.name]?.length > 0 ? "activeselect multi-select" : "multi-select"}
                                        // isOpen={true}

                                        />
                                    </div>

                            }
                            else if (item?.name === "bq_organization_address1_cbsa_name") {
                                // filter((f) => fquery?.some((some) => f?.includes(some?.code))) ?
                                return loading1 ? <div className="loadingwrap">
                                    <label>Filter by Metro</label>
                                    <div className="loading-select">
                                        <img src={img} />
                                    </div>
                                </div> :
                                    filter?.bq_organization_address1_cbsa_name && <div className="single-select" key={i + "ki"}>
                                        <label>{item?.text}</label>
                                        <MultiSelect
                                            options={filter?.bq_organization_address1_cbsa_name?.slice(1)?.map((d) => ({
                                                value: d,
                                                label: d,
                                                name: item?.name,
                                            }))}
                                            overrideStrings={{ selectSomeItems: item?.label }}
                                            onChange={(selectedOptions) =>
                                                handleMultiSelectChange(selectedOptions, item?.name)
                                            }
                                            value={multiFilter[item?.name]?.map((d) => ({
                                                value: d,
                                                label: handleLabel2(item, d),
                                                name: item?.name,
                                            }))}
                                            hasSelectAll={false}
                                            className={multiFilter?.[item?.name]?.length > 0 ? "activeselect multi-select" : "multi-select"}
                                        // isOpen={true}
                                        />
                                    </div>
                            }
                            else if (item?.name === "bq_organization_sector_name") {

                                return loading1 ? <div className="loadingwrap">
                                    <label>Filter by IRS Sector</label>
                                    <div className="loading-select">
                                        <img src={img} />
                                    </div>
                                </div> :
                                    filter?.bq_organization_sector_name && <div className="single-select" key={i + "ki"}>
                                        <label>{item?.text}</label>
                                        <MultiSelect
                                            options={filter?.bq_organization_sector_name?.slice(1)?.map((d) => ({
                                                value: d,
                                                label: d,
                                                name: item?.name,
                                            }))}
                                            overrideStrings={{ selectSomeItems: item?.label }}
                                            onChange={(selectedOptions) =>
                                                handleMultiSelectChange(selectedOptions, item?.name)
                                            }
                                            value={multiFilter[item?.name]?.map((d) => ({
                                                value: d,
                                                label: handleLabel2(item, d),
                                                name: item?.name,
                                            }))}
                                            hasSelectAll={false}
                                            className={multiFilter?.[item?.name]?.length > 0 ? "activeselect multi-select" : "multi-select"}
                                        // isOpen={true}
                                        />
                                    </div>
                            }
                            else if (item?.name === "bq_organization_subsector_name") {

                                return loading1 ? <div className="loadingwrap">
                                    <label>Filter by IRS Sub Sector</label>
                                    <div className="loading-select">
                                        <img src={img} />
                                    </div>
                                </div> :
                                    filter?.bq_organization_subsector_name && <div className="single-select" key={i + "ki"}>
                                        <label>{item?.text}</label>
                                        <MultiSelect
                                            options={filter?.bq_organization_subsector_name?.slice(1)?.map((d) => ({
                                                value: d,
                                                label: d,
                                                name: item?.name,
                                            }))}
                                            overrideStrings={{ selectSomeItems: item?.label }}
                                            onChange={(selectedOptions) =>
                                                handleMultiSelectChange(selectedOptions, item?.name)
                                            }
                                            value={multiFilter[item?.name]?.map((d) => ({
                                                value: d,
                                                label: handleLabel2(item, d),
                                                name: item?.name,
                                            }))}
                                            hasSelectAll={false}
                                            className={multiFilter?.[item?.name]?.length > 0 ? "activeselect multi-select" : "multi-select"}
                                        // isOpen={true}
                                        />
                                    </div>
                            }


                            else {
                                return <div className="single-select" key={i + "ki"}>
                                    <label>{item?.text}</label>
                                    <MultiSelect
                                        options={item?.options?.map((o) => ({
                                            value: o?.value,
                                            label: o?.title,
                                            name: item?.name,
                                        }))}
                                        overrideStrings={{ selectSomeItems: item?.label }}
                                        onChange={(selectedOptions) =>
                                            handleMultiSelectChange(selectedOptions, item?.name)
                                        }
                                        value={multiFilter[item?.name]?.map((d) => ({
                                            value: d,
                                            label: handleLabel(item, d),
                                            name: item?.name,
                                        }))}
                                        hasSelectAll={false}
                                        className={multiFilter?.[item?.name]?.length > 0 ? "activeselect multi-select" : "multi-select"}
                                    // isOpen={true}
                                    />
                                </div>
                            }



                        } else {
                            return <div className="single-select1" key={i + "kiw"}>
                                <label>{item?.text}</label>

                                <select style={{ height: "32px", background: "#fff", appearance: "none" }} className={multiFilter?.[item?.name]?.length > 0 ? "activeselect" : ""} value={multiFilter?.[item?.name]}
                                    onChange={(e) => handleSingleSelect(e.target.value, item?.name)} >
                                    {
                                        item?.options?.map((o, i) => (
                                            <option key={i + "j"} value={o?.value}>{o?.title}</option>
                                        ))
                                    }

                                </select>
                                <div className='s'></div>
                            </div>
                        }
                    })
                }


                <button onClick={ClearAll} className="clear">Clear all filters</button>
            </div>

            <br></br>
        </div>
    )
}

export default CompanyFilter