import React from "react";

const SearchTickerInput = ({
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
    setNameSearch("firmo_bq_ticker");
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
          <option value="firmo_bq_ticker">Search By Primary Ticker</option>
          <option value="firmo_bq_ticker_related">
            Search By Related Tickers
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

export default SearchTickerInput;
