import { Tooltip } from 'antd'
import React from 'react'

const ListHeader = ({ handleServerSort, orderBy, isAsc }) => {
    return (
        <>
            <div className="listCol  listCol-1 x">View</div>
            <div className="listCol  listCol-2 sort x">
                <span>
                    {/* <span onClick={() => handleServerSort("bq_organization_structure")}> */}
                    {/* {orderBy === "bq_organization_structure" ? isAsc === "True" ?
                                                <i className='bx bx-sort-up' style={{ fontSize: "15px" }}></i>
                                                :
                                                <i className='bx bx-sort-down' style={{ fontSize: "15px" }}></i>

                                                : ""} */}
                    {/* <i className='bx bxs-sort-alt'></i> */}
                    Structure/Org Type
                </span>
            </div>
            <div className="listCol sort x">
                <span>
                    {/* <span onClick={() => handleServerSort("bq_organization_name")}> */}
                    {/* {orderBy === "bq_organization_name" ? isAsc === "True" ?
                                                <i className='bx bx-sort-up' style={{ fontSize: "15px" }}></i>
                                                :
                                                <i className='bx bx-sort-down' style={{ fontSize: "15px" }}></i>

                                                : ""} */}
                    {/* <i className='bx bxs-sort-alt'></i> */}
                    Org Identity
                </span>
            </div>
            <div className="listCol sort x">
                <span>
                    {/* <span onClick={() => handleServerSort("bq_organization_address1_line_1")}> */}
                    {/* {orderBy === "bq_organization_address1_line_1" ? isAsc === "True" ?
                                                <i className='bx bx-sort-up' style={{ fontSize: "15px" }}></i>
                                                :
                                                <i className='bx bx-sort-down' style={{ fontSize: "15px" }}></i>

                                                : ""} */}
                    {/* <i className='bx bxs-sort-alt'></i> */}
                    Address
                </span>
            </div>
            <div className="listCol sort x">
                <span>
                    {/* <span onClick={() => handleServerSort("bq_legal_entity_jurisdiction_code")}> */}
                    {/* {orderBy === "bq_legal_entity_jurisdiction_code" ? isAsc === "True" ?
                                                <i className='bx bx-sort-up' style={{ fontSize: "15px" }}></i>
                                                :
                                                <i className='bx bx-sort-down' style={{ fontSize: "15px" }}></i>

                                                : ""} */}
                    {/* <i className='bx bxs-sort-alt'></i> */}
                    ID/Status
                </span>
            </div>
            <div className="listCol sort x">
                <span>
                    {/* <span onClick={() => handleServerSort("bq_current_employees_plan_mr")}> */}
                    {/* {orderBy === "bq_current_employees_plan_mr" ? isAsc === "True" ?
                                                <i className='bx bx-sort-up' style={{ fontSize: "15px" }}></i>
                                                :
                                                <i className='bx bx-sort-down' style={{ fontSize: "15px" }}></i>

                                                : ""} */}
                    {/* <i className='bx bxs-sort-alt'></i> */}
                    Org Firmographics
                </span>
            </div>
            <div className="listCol sort x">
                <span onClick={() => handleServerSort("bq_revenue_mr")}>
                    {orderBy === "bq_revenue_mr" ? (
                        isAsc === "True" ? (
                            <i
                                className="bx bx-sort-up"
                                style={{ fontSize: "15px" }}
                            ></i>
                        ) : (
                            <i
                                className="bx bx-sort-down"
                                style={{ fontSize: "15px" }}
                            ></i>
                        )
                    ) : (
                        ""
                    )}
                    <i className="bx bxs-sort-alt"></i>
                    <Tooltip
                        placement="top"
                        title="Revenue pertains to the U.S. only and is derived from local, state, and federal tax filings."
                    >
                        Org Revenue (2023)<i className="bx bxs-info-circle"></i>
                    </Tooltip>
                </span>
            </div>
        </>
    )
}

export default ListHeader