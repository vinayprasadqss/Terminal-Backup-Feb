import React from "react";

const SearchAddressInput = ({
    query,
    setQuery,
    nameSearch,
    setNameSearch,
    setCurrentPage,
    setOrderBy,
    setIsAsc,
}) => {
    const handleDelete = () => {
        setQuery("");
        setNameSearch(true);
        setCurrentPage(1);
        setOrderBy("");
        setIsAsc();
    };
    const handleChange = (e) => {
        if (e.target.value.startsWith(" ")) {
            return;
        }

        setQuery(e.target.value);
        setCurrentPage(1);
        setOrderBy("");
        setIsAsc();
    };

    const handlesubmit = () => {
        setNameSearch(nameSearch);
        setCurrentPage(1);
        setOrderBy("");
        setIsAsc();
    };

    return (
        <div className="search2">
            <div className="left">
                <input
                    style={{ textTransform: "uppercase" }}
                    value={query}
                    onChange={(e) => {
                        handleChange(e);
                    }}
                />
                <select
                    style={{ height: "38.5px" }}
                    onChange={(e) => {
                        setNameSearch(e.target.value);
                        setCurrentPage(1);
                    }}
                    value={nameSearch}
                >
                    <option value={"orgAddress"}>Search By Organization Address</option>
                    <option value={"legalAddress"}>
                        Search By Legal Entity Address
                    </option>
                    <option value={"locationAddress"}>
                        Search By Location Address
                    </option>
                </select>
            </div>
            <div className="right">
                <button className="a" onClick={handlesubmit}>
                    <i className="bx bx-search"></i>
                </button>
                <button onClick={handleDelete}>
                    <span>
                        <i className="bx bx-x z"></i>
                    </span>
                </button>
            </div>
        </div>
    );
};

export default SearchAddressInput;
