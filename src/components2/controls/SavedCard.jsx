import { Tooltip } from 'antd'
import React from 'react'

const SavedCard = ({ a, b, c }) => {


    const filterFinder = (c1) => {
        const temp = JSON.parse(c1[1])
        // console.log(temp)
        return temp[0]?.filters
    }


    return (
        <div className='save_search_card'>
            <div className="search_card_left">
                {a}{b}
            </div>
            <div className="search_card_right">
                {Object.keys(filterFinder(c))?.length > 0 ? <Tooltip placement='top' title="Filters exist in this saved search">
                    <i className='bx bx-filter-alt fi'></i>
                </Tooltip> : ""}
                {/* <span><i className='bx bx-x'></i></span> */}
            </div>

        </div>
    )
}

export default SavedCard