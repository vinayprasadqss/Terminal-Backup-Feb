import React from 'react'
import { useSelector } from 'react-redux';

const Tags = ({ multiFilter, handleDelete, ClearAll }) => {
    const { filter } = useSelector(state => state.search);
    const handleJrName = (a) => {
        const temp = filter?.bq_legal_entity_jurisdiction_code?.find((f) => f?.jurisdiction_code === a)
        return temp?.jurisdiction_name + " " + "(" + temp?.jurisdiction_code + ")"
    }


    return (
        <div className='tsgs'>
            <p>Filter Tags:<span onClick={ClearAll}><i className='bx bx-reset'></i>Clear</span></p>
            <div className='tag'>
                {
                    Object.keys(multiFilter)?.map((d) => (
                        multiFilter[d]?.map((a) => {

                            if (d === "bq_organization_isactive") {
                                if (a === "false") {
                                    return <div className="tag-btn">Inactive<span onClick={() => handleDelete(a, d)}><i className='bx bx-x'></i></span></div>
                                } else if (a === "true") {
                                    return <div className="tag-btn">Active<span onClick={() => handleDelete(a, d)}><i className='bx bx-x'></i></span></div>
                                }

                            }
                            if (d === "bq_organization_is_public") {
                                if (a === "false") {
                                    return <div className="tag-btn">Private<span onClick={() => handleDelete(a, d)}><i className='bx bx-x'></i></span></div>
                                } else if (a === "true") {
                                    return <div className="tag-btn">Public<span onClick={() => handleDelete(a, d)}><i className='bx bx-x'></i></span></div>
                                }
                            }
                            if (d === "bq_revenue_mr") {
                                for (var i = 0; i < a?.length; i++) {
                                    // console.log(a[i])
                                    if (a[i] === ">0" && a[i + 1] === "<1000001") {
                                        return <div className="tag-btn">$0 - $1M<span onClick={() => handleDelete(a, d)}><i className='bx bx-x'></i></span></div>
                                    }
                                    else if (a[i] === ">1000001" && a[i + 1] === "<5000001") {
                                        return <div className="tag-btn">$1M - $5M<span onClick={() => handleDelete(a, d)}><i className='bx bx-x'></i></span></div>
                                    }
                                    else if (a[i] === '>5000001' && a[i + 1] === '<10000001') {
                                        return <div className="tag-btn">$5M - $10M<span onClick={() => handleDelete(a, d)}><i className='bx bx-x'></i></span></div>
                                    }
                                    else if (a[i] === '>10000001' && a[i + 1] === '<25000001') {
                                        return <div className="tag-btn">$10M - $25M<span onClick={() =>
                                            handleDelete(a, d)}><i className='bx bx-x'></i></span></div>

                                    }
                                    else if (a[i] === '>25000001' && a[i + 1] === '<50000001') {
                                        return <div className="tag-btn">$25M - $50M<span onClick={() =>
                                            handleDelete(a, d)}><i className='bx bx-x'></i></span></div>
                                    }
                                    else if (a[i] === '>50000001' && a[i + 1] === '<100000001') {
                                        return <div className="tag-btn">$50M - $100M<span onClick={() => handleDelete(a, d)}><i className='bx bx-x'></i></span></div>
                                    }
                                    else if (a[i] === '>100000001' && a[i + 1] === '<250000001') {
                                        return <div className="tag-btn">$100M - $250M<span onClick={() => handleDelete(a, d)}><i className='bx bx-x'></i></span></div>
                                    }
                                    else if (a[i] === '>250000001' && a[i + 1] === '<500000001') {
                                        return <div className="tag-btn">$250M - $500M<span onClick={() => handleDelete(a, d)}><i className='bx bx-x'></i></span></div>
                                    }
                                    else if (a[i] === '>500000001' && a[i + 1] === '<1000000001') {
                                        return <div className="tag-btn">$500M - $1B<span onClick={() => handleDelete(a, d)}><i className='bx bx-x'></i></span></div>
                                    }
                                    else if (a[i] === '>1000000001') {
                                        return <div className="tag-btn">$1B+<span onClick={() => handleDelete(a, d)}><i className='bx bx-x'></i></span></div>
                                    }
                                }
                            }
                            if (d === "bq_current_employees_plan_mr") {
                                for (var i = 0; i < a?.length; i++) {
                                    if (a[i] === '>0' && a[i + 1] === '<5') {
                                        return <div className="tag-btn">1-4<span onClick={() => handleDelete(a, d)}><i className='bx bx-x'></i></span></div>
                                    }
                                    else if (a[i] === '>4' && a[i + 1] === '<10') {
                                        return <div className="tag-btn">5-9<span onClick={() => handleDelete(a, d)}><i className='bx bx-x'></i></span></div>
                                    }
                                    else if (a[i] === '>9' && a[i + 1] === '<20') {
                                        return <div className="tag-btn">10-19<span onClick={() => handleDelete(a, d)}><i className='bx bx-x'></i></span></div>
                                    }
                                    else if (a[i] === '>19' && a[i + 1] === '<50') {
                                        return <div className="tag-btn">20-49<span onClick={() => handleDelete(a, d)}><i className='bx bx-x'></i></span></div>
                                    }
                                    else if (a[i] === '>49' && a[i + 1] === '<100') {
                                        return <div className="tag-btn">50-99<span onClick={() => handleDelete(a, d)}><i className='bx bx-x'></i></span></div>
                                    }
                                    else if (a[i] === '>99' && a[i + 1] === '<250') {
                                        return <div className="tag-btn">100-249<span onClick={() => handleDelete(a, d)}><i className='bx bx-x'></i></span></div>
                                    }
                                    else if (a[i] === '>249' && a[i + 1] === '<500') {
                                        return <div className="tag-btn">250-499<span onClick={() => handleDelete(a, d)}><i className='bx bx-x'></i></span></div>
                                    }
                                    else if (a[i] === '>500') {
                                        return <div className="tag-btn">500+<span onClick={() => handleDelete(a, d)}><i className='bx bx-x'></i></span></div>
                                    }


                                }
                            }
                            if (d === "bq_organization_jurisdiction_code") {
                                return <div className="tag-btn">{handleJrName(a)}<span onClick={() => handleDelete(a, d)}><i className='bx bx-x'></i></span></div>
                            }

                            else {
                                return <div className="tag-btn">{a}<span onClick={() => handleDelete(a, d)}><i className='bx bx-x'></i></span></div>
                            }

                        })
                    ))
                }
            </div>
        </div>


    )
}

export default Tags