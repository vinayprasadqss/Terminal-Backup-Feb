import React, { useState, useEffect } from "react";
import SearchInput from "../components2/controls/SearchInput";
import { OfficerFilter } from "../constants/DummyConstants.js";
import { SearchByOfficers, Sidebar, checkSession } from "../Aws/Aws-api.js";
import TreeView from "./TreeView.jsx";
import img from "../assets/images/no.svg";
import img2 from "../assets/images/spin.gif";
import Tags from "./Tags";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import { useDispatch } from "react-redux";

import axios from "axios";
import OfficeFilter from "./Filters/OfficerFilter.jsx";
import SearchInputOfficer from "./controls/SearchInputOfficer.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { replaceKeysWithNonEmptyArrays } from "../utils/utility.js";

const SearchByOfficer = ({ setCountLoading, activeTab, setActiveTab1 }) => {
  const [display, setDisplay] = useState(0);

  const [query, setQuery] = useState("Elon Musk");
  const [fquery, setFquery] = useState("")
  const [stateResult, setStateResult] = useState([]);
  const [did, setDid] = useState("");
  const [multiFilter, setMultiFilter] = useState({
    bq_organization_structure: [],
    bq_organization_company_type: [],
    bq_legal_entity_parent_status: [],
    bq_organization_address1_state_name: [],
    bq_organization_isactive: [],
    bq_organization_naics_sector_name: [],
    bq_organization_is_public: [],
    bq_current_employees_plan_mr: [],
    bq_revenue_mr: [],
    bq_organization_sector_name: [],
    bq_organization_irs_industry_name: [],
    bq_organization_subsector_name: [],
    bq_organization_address1_cbsa_name: [],
    bq_organization_naics_name: [],
    bq_organization_jurisdiction_code: []
  });

  const [orderBy, setOrderBy] = useState("");
  const [isAsc, setIsAsc] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalResult, setTotalResult] = useState(0);

  const Navigate = useNavigate()
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const token = localStorage.getItem("token")
  const location = useLocation()

  const handleDetail = (id) => {
    console.log(id);
    const id2 = id.split("::")[1];
    setDid(id);
    setDisplay(1);
  };

  const HitOwner = ({ res }) => {
    // const uniqueArray = Array.from(
    //   new Set(res[0]?.bq_officer_position?.map(JSON.stringify))
    // ).map(JSON.parse);
    // console.log(res)
    return (
      <>
        <div
          className="tableView card"
        // onClick={() => handleDetail(res?.documentid)}
        >
          {" "}
          <div className="listCol listCol-1">
            <u>
              <span
                className="familylink"
                onClick={() => handleDetail(res?.bq_organization_id)}
              >
                <u>See Company Details</u>
              </span>
            </u>
          </div>
          <div className="listCol">
            <b>
              {res?.hasOwnProperty("bq_officer_full_name")
                ? res?.bq_officer_full_name
                : "N/A"}

            </b>
            <br />{" "}
            {res?.hasOwnProperty("bq_officer_position") ?
              <span style={{ textTransform: "uppercase" }}>{res?.bq_officer_position}</span>
              : "N/A"
            }

          </div>
          <div className="listCol">
            <b>
              {res.hasOwnProperty("bq_organization_name")
                ? res?.bq_organization_name
                : "N/A"}
            </b>
            <br />
            BQ Org ID:{" "}
            {res?.hasOwnProperty("bq_organization_id")
              ? res?.bq_organization_id
              : "N/A"}
            <br />
            BQ Legal Entity ID:{" "}
            {res?.hasOwnProperty("bq_legal_entity_id")
              ? res?.bq_legal_entity_id
              : "N/A"}
          </div>
          <div className="listCol">
            {res?.hasOwnProperty("bq_legal_entity_address1_line_1") ||
              res?.hasOwnProperty("bq_legal_entity_address1_city") ||
              res?.hasOwnProperty("bq_legal_entity_address1_state") ||
              res?.hasOwnProperty("bq_legal_entity_address1_zip5") ? (
              <>
                {res?.hasOwnProperty("bq_legal_entity_address1_line_1")
                  ? res?.bq_legal_entity_address1_line_1 != "undefined" &&
                    res?.bq_legal_entity_address1_line_1 != ""
                    ? res?.bq_legal_entity_address1_line_1 + ", "
                    : ""
                  : " "}
                {res?.hasOwnProperty("bq_legal_entity_address1_city")
                  ? res?.bq_legal_entity_address1_city != "undefined" &&
                    res?.bq_legal_entity_address1_city != ""
                    ? res?.bq_legal_entity_address1_city + ", "
                    : ""
                  : "N/A"}
                {res?.hasOwnProperty("bq_legal_entity_address1_state")
                  ? res?.bq_legal_entity_address1_state != "undefined" &&
                    res?.bq_legal_entity_address1_state != ""
                    ? res?.bq_legal_entity_address1_state + ", "
                    : ""
                  : ""}
                {res?.hasOwnProperty("bq_legal_entity_address1_zip5")
                  ? res?.bq_legal_entity_address1_zip5 != "undefined" &&
                    res?.bq_legal_entity_address1_zip5 != ""
                    ? res?.bq_legal_entity_address1_zip5 + ""
                    : ""
                  : ""}
              </>
            ) : (
              "N/A"
            )}
          </div>
        </div>
      </>
    );
  };

  //<--------------------------------------------------------------------------------------->
  //show multiSelect input value name change
  const handleLabel = (item, d) => {
    let z = item?.options.find((f) => f.value === d);
    return z?.title;
  };
  const handleLabel2 = (item, d) => {
    let z = item?.options?.find((f) => f.value === d);
    return d;
  };
  //<---------------------------------------------------------------------------------->

  // Handle MultiSelect Onchange Function
  const handleMultiSelectChange = (selectedOptions, name, title) => {
    selectedOptions?.map((d) => {
      if (!multiFilter[name].includes(d?.value)) {
        const uniqueArray = [...multiFilter[name], d?.value];
        setMultiFilter((prev) => ({
          ...prev,
          [name]: uniqueArray,
        }));
      }
    });
    const updatedFilter = { ...multiFilter };
    updatedFilter[name] = selectedOptions.map((option) => option.value);
    setMultiFilter(updatedFilter);

    setCurrentPage(1);
    setIsAsc();
    setOrderBy("");
  };
  const handleSingleSelect = (selectedOptions, name) => {
    if (selectedOptions === "") {
      return setMultiFilter({ ...multiFilter, [name]: [] });
    }
    if (multiFilter[name]?.includes(selectedOptions)) {
      let temp = multiFilter[name]?.filter((f) => f !== selectedOptions);
      setMultiFilter((prev) => ({ ...prev, temp }));
    } else {
      setMultiFilter({ ...multiFilter, [name]: [selectedOptions] });
    }

    setCurrentPage(1);
    setIsAsc();
    setOrderBy("");
  };
  //<----------------------------------------------------------------------------------------->

  const handleServerSort = (column) => {
    console.log(column, "hhh");
    setOrderBy(column.toString());
    setIsAsc(isAsc === "False" ? "True" : "False");
    setCurrentPage(1);
  };

  const fetchRecords = async (isMounted, CancelToken) => {
    try {
      if (query.startsWith(" ")) {
        return;
      }
      if (query === "") {
        setTotal(0)
        return setStateResult([]);
      }
      setLoading(true);
      const filteredStates = Object.fromEntries(
        Object.entries(multiFilter).filter(([key, value]) => value.length > 0)
      );
      const result = await SearchByOfficers(
        query,
        filteredStates,
        orderBy,
        isAsc,
        currentPage,
        token,
        CancelToken

      );
      if (result?.data) {
        dispatch({ type: "count", payload: query });
        setStateResult([]);
        setStateResult(result?.data?.root?.children);


        setTotalResult(Number(result?.data?.root?.fields?.totalCount));
        if (Number(result?.data?.root?.fields?.totalCount) > 50000) {
          setTotal(Math.ceil(Number(50000) / 100));
        } else {
          setTotal(
            Math.ceil(Number(result?.data?.root?.fields?.totalCount) / 100)
          );
        }
        // setTotal(Math.floor(Number(result?.data?.root?.fields?.totalCount) / 20))
        // setTotal(Math.floor(result?.data?.root?.fields?.totalCount))
        // console.log(result?.data?.root?.children);
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        // console.log("Request canceled", error.message);
      } else {
        console.log(error);
        checkSession(error, dispatch, Navigate)
      }
    } finally {
      // if (isMounted) {

      // }
      // setLoading(false);
    }
  };



  useEffect(() => {
    // setLoading(true);
    const source = axios.CancelToken.source();
    let isMounted = true;
    let debounceTimer;

    const debounceFetch = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        fetchRecords(isMounted, source.token).finally(() => {
          if (isMounted) {
            setLoading(false);
          }
        });
      }, 100);
    };

    debounceFetch();

    return () => {
      isMounted = false;
      source.cancel("Operation canceled by the user.");
      clearTimeout(debounceTimer);
    };
  }, [query, multiFilter, orderBy, isAsc, currentPage]);



  // const fetchRecords = async () => {
  //   try {
  //     if (query.startsWith(" ")) {
  //       return;
  //     }
  //     if (query === "") {
  //       setTotal(0)
  //       return setStateResult([]);
  //     }
  //     setLoading(true);
  //     const result = await SearchByOfficers(
  //       query,
  //       multiFilter,
  //       orderBy,
  //       isAsc,
  //       currentPage,
  //       token
  //     );
  //     if (result?.data) {
  //       dispatch({ type: "count", payload: query });
  //       setStateResult([]);
  //       setStateResult(result?.data?.root?.children);
  //       setFquery(query);

  //       setTotalResult(Number(result?.data?.root?.fields?.totalCount));
  //       if (Number(result?.data?.root?.fields?.totalCount) > 50000) {
  //         setTotal(Math.ceil(Number(50000) / 100));
  //       } else {
  //         setTotal(
  //           Math.ceil(Number(result?.data?.root?.fields?.totalCount) / 100)
  //         );
  //       }

  //     }
  //   } catch (error) {

  //     checkSession(error, dispatch, Navigate)

  //   } finally {
  //     setLoading(false);

  //   }
  // };
  // useEffect(() => {
  //   console.log("ggg")
  //   fetchRecords()


  // }, [multiFilter, orderBy, isAsc, currentPage])


  //<------------------------------------------------------------------------------------------------->

  // Clear Button Functon
  const ClearAll = () => {
    setMultiFilter({
      bq_organization_structure: [],
      bq_organization_company_type: [],
      bq_legal_entity_parent_status: [],
      bq_organization_address1_state_name: [],
      bq_organization_isactive: [],
      bq_organization_naics_sector_name: [],
      bq_organization_is_public: [],
      bq_current_employees_plan_mr: [],
      bq_revenue_mr: [],
      bq_organization_sector_name: [],
      bq_organization_irs_industry_name: [],
      bq_organization_subsector_name: [],
      bq_organization_address1_cbsa_name: [],
      bq_organization_naics_name: [],
      bq_organization_jurisdiction_code: [],
    });
    setCurrentPage(1);
    setOrderBy("");
    setIsAsc();
    setQuery("")
  };

  const handleDelete = (a, d) => {
    let t = multiFilter[d]?.filter((f) => f !== a);
    setMultiFilter({ ...multiFilter, [d]: t });
    setCurrentPage(1);
  };

  const handleNextPage = () => {
    if (currentPage === total) {
      return;
    } else {
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePrevPage = () => {
    if (currentPage === 1) {
      return;
    } else {
      setCurrentPage(currentPage - 1);
    }
  };

  // const fetchcounts = async () => {
  //   try {
  //     setCountLoading(true);
  //     let field = "search_officer";
  //     const result = await Sidebar(query, multiFilter, field);
  //     console.log(result, "fetchCounts");
  //     dispatch({ type: "sidebar", payload: result?.data });
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setCountLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   let debounceTimer;
  //   const debounceFetch = () => {
  //     clearTimeout(debounceTimer);
  //     debounceTimer = setTimeout(fetchcounts, 500);
  //   };
  //   debounceFetch();

  //   return () => {
  //     clearTimeout(debounceTimer);
  //   };

  // }, [query, multiFilter])

  // console.log(loading, "loading")



  const handleEnterKey = (e) => {
    if (query === "") {
      return
    } else {
      if (e.keyCode === 13) {
        fetchRecords();
      }
    }

  };



  useEffect(() => {
    if (location?.state?.q) {
      let temp = replaceKeysWithNonEmptyArrays(multiFilter, location?.state?.category[0]?.filters)
      setQuery(location?.state?.q)
      setMultiFilter(temp)
      setActiveTab1("")

    } else {
      setQuery("Elon Musk");
    }
  }, [location?.state?.q])




  return (
    <div className="container">

      <OfficeFilter
        handleLabel={handleLabel}
        handleLabel2={handleLabel2}
        handleMultiSelectChange={handleMultiSelectChange}
        handleSingleSelect={handleSingleSelect}
        multiFilter={multiFilter}
        ClearAll={ClearAll}
        query={query}
        activeTab={activeTab}
        nameSearch="bq_organization_officer"
      />

      <div className="main-content">
        <div className="search-box">
          <SearchInputOfficer
            setIsAsc={setIsAsc}
            setOrderBy={setOrderBy}
            setCurrentPage={setCurrentPage}
            query={query}
            setQuery={setQuery}
            handleEnter={handleEnterKey}
            fetchRecords={fetchRecords}

          />
        </div>
        <Tags
          multiFilter={multiFilter}
          handleDelete={handleDelete}
          ClearAll={ClearAll}
        />
        {totalResult > 100 && loading === false && display === 0 ? (
          <div className="topbar">
            <div className="left"></div>
            <div className="right">
              <p>
                Displaying {stateResult?.length} of {totalResult > 50000 ? 50000 : totalResult}{" "}
                results on page
              </p>
              <div className="set">
                <button onClick={handlePrevPage} disabled={currentPage === 1}>
                  Previous
                </button>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === total}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        ) : (
          display === 0 &&
          <div className="topbar">
            <div className="left"></div>
            <div className="right">
              {
                stateResult?.length > 0 ?
                  <p>
                    Displaying {loading ? "..." : stateResult?.length} of {totalResult > 50000 ? 50000 : totalResult}{" "}
                    results on page
                  </p> : <p></p>
              }
              <div className="set">
                <button onClick={handlePrevPage} disabled={true}>
                  Previous
                </button>
                <button
                  onClick={handleNextPage}
                  disabled={true}
                >
                  Next
                </button>

              </div>
            </div>
          </div>
        )}
        <div className="results">
          {display === 1 ? (
            <>
              <div className="topBar">
                <button className="btnNew" onClick={() => setDisplay(0)}>
                  Go Back
                </button>
              </div>
              <TreeView id={did} setCountLoading={setCountLoading} />
            </>
          ) : (
            <>
              <div className="searchResults">
                <div className="tableView tableView-top">
                  <div className="listCol  listCol-1">View</div>
                  <div className="listCol sort">
                    <span
                      onClick={() => handleServerSort("bq_officer_full_name")}
                    >
                      {orderBy === "bq_officer_full_name" ? (
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
                      <i className="bx bxs-sort-alt"></i> Name
                    </span>
                  </div>
                  <div className="listCol sort ">
                    <span
                      onClick={() => handleServerSort("bq_organization_name")}
                    >
                      {orderBy === "bq_organization_name" ? (
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
                      <i className="bx bxs-sort-alt"></i> Entity
                    </span>
                  </div>
                  <div className="listCol sort">
                    <span>
                      {/* <span onClick={() => handleServerSort("bq_officer_address1_line_1")}>
                    {orderBy === "bq_officer_address1_line_1" ? isAsc === "True" ?
                      <i className='bx bx-sort-up' style={{ fontSize: "15px" }}></i>
                      :
                      <i className='bx bx-sort-down' style={{ fontSize: "15px" }}></i>

                      : ""}
                      <i className='bx bxs-sort-alt'></i> */}
                      Legal Entity Address
                    </span>
                  </div>
                </div>
                <div className="silent">
                  {loading ? (
                    <div className="loader">
                      <img src={img2} alt="loader" />
                      {/* <p>Loading....</p> */}
                    </div>
                  ) : stateResult?.length > 0 ? (
                    stateResult.map((d, i) => (
                      <HitOwner
                        key={i + "io"}
                        // res={d?.fields?.bq_officer_details?.filter((f) =>
                        //   f?.bq_officer_full_name?.includes(query?.toUpperCase())
                        // )}
                        res={d?.fields}
                        res2={d?.fields}
                      />
                    ))
                  ) : (
                    <div className="no">
                      <img src={img} alt="img" />
                      <h5>No Data Available</h5>
                    </div>
                  )}
                </div>

              </div>
            </>
          )}
        </div>
        <br></br>
        <br></br>
        {totalResult > 100 && loading === false && display === 0 ? (
          <ResponsivePagination
            current={currentPage}
            total={total}
            onPageChange={setCurrentPage}
            maxWidth={"200px"}
            nextLabel="Next"
            previousLabel="Prev"
          />
        ) : (
          ""
        )}

        <br></br>
        <br></br>
      </div>
    </div>
  );
};

export default SearchByOfficer;
