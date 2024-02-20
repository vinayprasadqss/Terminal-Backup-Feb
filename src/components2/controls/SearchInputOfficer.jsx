import React from 'react'

const SearchInputOfficer = ({ query, setQuery, fetchRecords, setCurrentPage, setOrderBy, setIsAsc, handleEnter }) => {

    const handleChange = (e) => {
        if (e.target.value.startsWith(' ')) {
            return
        }

        setQuery(e.target.value);
        setCurrentPage(1);
        setIsAsc();
        setOrderBy("");
    }
    const handleReset = () => {
        setQuery(""); setCurrentPage(1);
        setIsAsc();
        setOrderBy("");
    }

    const handlsubmit = () => {

        setCurrentPage(1);
        setIsAsc();
        setOrderBy("");

        fetchRecords()
    }

    return (
        <div className='search-input' onKeyDown={handleEnter}>
            <input
                type="text"
                value={query}
                placeholder="search"
                onChange={(e) => handleChange(e)}
            />
            <button className='a' onClick={handlsubmit}><i className='bx bx-search'></i></button>
            <button onClick={() => { handleReset() }}><span><i className='bx bx-x'></i></span></button>
        </div>
    )
}

export default SearchInputOfficer