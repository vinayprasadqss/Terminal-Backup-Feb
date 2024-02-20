import React from 'react'

const SearchInput2 = ({ query, setQuery, nameSearch, setNameSearch, setCurrentPage, setOrderBy, setIsAsc }) => {
    const handleDelete = () => {
        setQuery("");
        setNameSearch("bq_organization_name");
        setCurrentPage(1);
        setOrderBy("");
        setIsAsc()
    }
    const handleChange = (e) => {
        if (e.target.value.startsWith(' ')) {
            return
        }

        setQuery(e.target.value);
        setCurrentPage(1);
        setOrderBy("");
        setIsAsc();
    }

    const handlesubmit = () => {
        // setNameSearch("bq_organization_name");
        setCurrentPage(1);
        setOrderBy("");
        setIsAsc()
    }



    return (
        <div className="search2">
            <div className="left">
                <input value={query} onChange={(e) => { handleChange(e) }} />
                <select style={{ height: "38.5px" }} onChange={(e) => { setNameSearch(e.target.value); setCurrentPage(1) }} value={nameSearch}>
                    <option value="bq_organization_name">Search By Organization Name / ID</option>
                    <option value="bq_organization_legal_name">Search By Legal Entity Name / ID</option>
                    <option value="bq_location_name">Search By Location Name / ID</option>
                </select>
            </div>
            <div className="right">

                <button className='a' onClick={handlesubmit}><i className='bx bx-search'></i></button>
                <button onClick={handleDelete}><span><i className='bx bx-x z'></i></span></button>
            </div>

        </div>
    )
}

export default SearchInput2