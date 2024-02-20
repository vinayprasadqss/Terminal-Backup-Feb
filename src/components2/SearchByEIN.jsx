import React, { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import SearchInput from "../components2/controls/SearchInput";
import { SearchByEin, Sidebar, checkSession } from "../Aws/Aws-api.js";
import { EinFilters } from "../constants/DummyConstants";
import TreeView from "./TreeView.jsx";
import img from "../assets/images/no.svg";
import img2 from "../assets/images/spin.gif";
import CompanyFilter from "./Filters/CompanyFilter";
import Tags from "./Tags";
import millify from "millify";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import { Tooltip, Checkbox } from "antd";
import { useDispatch } from "react-redux";
import SearchInputCik from "./controls/SearchInputCik";
import Report2 from "../Report2";
import axios from "axios";
import LocationModal from "./LocationModal.jsx";
import SummeryModal from "./FinancialSummery/Index.jsx";
import SelectAll from "./controls/SelectAll";
import { useLocation, useNavigate } from "react-router-dom"
import CreatePortfolioModal from "../portfolio/CreatePortfolioModal"
import Hit from "./hits/Hit.jsx";
import { replaceKeysWithNonEmptyArrays } from "../utils/utility.js";

const SearchByEIN = ({ setCountLoading, activeTab }) => {
  const [display, setDisplay] = useState(0);
  const [did, setDid] = useState("");
  const [query, setQuery] = useState("570384104");
  const [stateResult, setStateResult] = useState([]);
  const [financialName, setFinancialName] = useState("")
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
  });
  const [tRevenue, setTrevenue] = useState(0);
  const [tHeadcount, setTHeadcount] = useState(0)
  const [orderBy, setOrderBy] = useState("");
  const [isAsc, setIsAsc] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalResult, setTotalResult] = useState(0);
  const token = localStorage.getItem("token")
  const email = localStorage.getItem("aws-email")
  const [loading, setLoading] = useState(false);

  const [fsmQuery, setFsmQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [locationName, setLocationName] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const dispatch = useDispatch();


  const [portfolioItem, setPortfolioItems] = useState([]);
  const [portfolioModal, setPortfolioModal] = useState(false);
  const [portfolioLoading, setPortfolioLoading] = useState(false);
  const [checked, setChecked] = useState([])
  const Navigate = useNavigate()
  const location = useLocation()













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
    setOrderBy("");
    setIsAsc();
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
    setOrderBy("");
    setIsAsc();
  };
  //<----------------------------------------------------------------------------------------->

  const handleDetail = (id) => {
    // console.log(id);
    const id2 = id.split("::")[1];
    setDid(id);
    setDisplay(1);
  };




  ///Portfolio Functions

  const portfolioSelect = (item) => {
    let temp = [];
    temp.push(
      item
    )
    setPortfolioItems((prev) => [...prev, ...temp])
  }

  const portfoliodeselect = (item) => {
    let filteritem = portfolioItem?.filter((f) => f?.id !== item)
    setPortfolioItems([...filteritem])
  }


  const handleCheckboxChange = (checked, item) => {

    if (checked) {
      if (portfolioItem?.length > 49) {
        return swal({
          title: "Portfolio!",
          text: "You can not select more then 50 companies",
          icon: "warning",
          buttons: {
            confirm: {
              text: "OK",
              value: true,
              visible: true,
              className: "swal-button--confirm",
            },
          },
        }).then(function (isConfirm) {
          if (isConfirm) {
          } else {
          }
        });
      }
      let obj = {
        id: item?.bq_organization_id || "N/A",
        name: item?.bq_organization_name || "N/A",
        revenue: item?.bq_revenue_mr || "N/A",
        headcount: item?.bq_current_employees_plan_mr || "N/A",
        valuation: item?.bq_organization_valuation || "N/A",
        credit_score: item?.bq_score || "N/A"
      }

      portfolioSelect(obj)
    } else {
      portfoliodeselect(item?.bq_organization_id)
    }
  };

  const createPortfolioModalfun = () => {
    try {
      if (portfolioItem?.length === 0) {
        return swal({
          title: "Portfolio!",
          text: "Please Select at least one item in listing to create Portfolio",
          icon: "warning",
          buttons: {
            confirm: {
              text: "OK",
              value: true,
              visible: true,
              className: "swal-button--confirm",
            },
          },
        }).then(function (isConfirm) {
          if (isConfirm) {
          } else {
          }
        });
      }
      setPortfolioModal(true)


    } catch (error) {
      console.log(error);
      checkSession(error, dispatch, Navigate)
    }
  }



  useEffect(() => {
    setPortfolioItems([])
    setChecked([])
  }, [multiFilter, isAsc, query])

  // console.log(portfolioItem, "portfolio")







  const fetchRecords = async (isMounted, CancelToken) => {
    try {
      if (query.startsWith(" ")) {
        // setQuery(query.substring(1));
        return;
      }
      if (query === "") {
        setTotal(0);
        setTotalResult(0);
        setStateResult([])
        return;
      }
      setLoading(true);
      const filteredStates = Object.fromEntries(
        Object.entries(multiFilter).filter(([key, value]) => value.length > 0)
      );
      const result = await SearchByEin(
        query,
        filteredStates,
        orderBy,
        isAsc,
        currentPage,
        CancelToken,
        token
      );
      if (result?.data) {
        dispatch({ type: "count", payload: query });
        if (currentPage === 1 && orderBy === "") {
          const temp = result?.data?.root?.children?.sort(
            (a, b) =>
              Number(b?.fields?.bq_revenue_mr || 0) -
              Number(a?.fields?.bq_revenue_mr || 0)
          );
          setStateResult([]);
          setStateResult(temp);
          // temp?.map((d, i) => console.log(d?.fields?.bq_revenue_mr, i))
          // console.log("Sorting is running");
        } else {
          setStateResult([]);
          setStateResult(result?.data?.root?.children);
        }
        // setStateResult(result?.data?.root?.children);
        setTotalResult(Number(result?.data?.root?.fields?.totalCount));
        if (Number(result?.data?.root?.fields?.totalCount) > 50000) {
          setTotal(Math.ceil(Number(50000) / 20));
        } else {
          setTotal(
            Math.ceil(Number(result?.data?.root?.fields?.totalCount) / 20)
          );
        }
        // setTotal(result?.data?.root?.fields?.totalCount)
        // setTotal(Math.floor(Number(result?.data?.root?.fields?.totalCount) / 20))
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        // console.log("Request canceled", error.message);
      } else {
        // console.log(error, "jjj");
        checkSession(error, dispatch, Navigate)
      }
    } finally {
      // if (isMounted) {
      //   setLoading(false);
      // }
    }
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    let isMounted = true;
    let debounceTimer;

    const debounceFetch = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        fetchRecords(isMounted, source.token)
          .finally(() => {
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

  const handleServerSort = (column) => {
    // console.log(column, "hhh");
    setOrderBy(column.toString());
    setIsAsc(isAsc === "False" ? "True" : "False");
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

  const fetchcounts = async (isMounted, CancelToken) => {
    try {
      setCountLoading(true);
      let field = "bq_organization_ein";
      const filteredStates = Object.fromEntries(
        Object.entries(multiFilter).filter(([key, value]) => value.length > 0)
      );
      const result = await Sidebar(
        query,
        filteredStates,
        field,
        "sidebar_ein",
        CancelToken,
        token
      );
      // console.log(result, "fetchCounts");
      dispatch({ type: "sidebar", payload: result?.data });
    } catch (error) {
      if (axios.isCancel(error)) {
        // console.log("Request canceled", error.message);
        dispatch({ type: "sidebar", payload: [] });
      } else {
        // console.log(error);
        if (error?.name === "AxiosError") {
          dispatch({ type: "sidebar", payload: ["error"] });
        }
      }
    } finally {
      // if (isMounted) {
      //   setCountLoading(false);
      // }
    }
  };

  useEffect(() => {
    if (query !== "" && display === 0) {
      const source = axios.CancelToken.source();
      let isMounted = true;
      let debounceTimer;
      const debounceFetch = () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          fetchcounts(isMounted, source.token)
            .finally(() => {
              if (isMounted) {
                setCountLoading(false);
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
    } else {
      // dispatch({ type: "sidebar", payload: [{}] });
    }

  }, [query, multiFilter, display]);


  useEffect(() => {
    if (location?.state?.q) {
      let temp = replaceKeysWithNonEmptyArrays(multiFilter, location?.state?.category[0]?.filters)
      setQuery(location?.state?.q);
      setMultiFilter(temp)

    } else {
      setQuery("570384104");
    }
  }, [location?.state])






  return (
    <div className="container">
      <CompanyFilter
        handleLabel={handleLabel}
        handleLabel2={handleLabel2}
        handleMultiSelectChange={handleMultiSelectChange}
        handleSingleSelect={handleSingleSelect}
        multiFilter={multiFilter}
        ClearAll={ClearAll}
        query={query}
        activeTab={activeTab}
        nameSearch={"bq_organization_ein"}
      />
      <div className="main-content">
        <div className="search-box">
          <SearchInputCik
            query={query}
            setQuery={setQuery}
            fetchRecords={fetchRecords}
            setCurrentPage={setCurrentPage}
            setIsAsc={setIsAsc}
            setOrderBy={setOrderBy}
          />
        </div>
        <div className="search-box search-box-note">Search by: EIN</div>
        <Tags
          multiFilter={multiFilter}
          handleDelete={handleDelete}
          ClearAll={ClearAll}
        />
        {totalResult > 20 && loading === false && display === 0 ? (
          <div className="topbar">
            <div className="left">
              <span className="portfolio"
                onClick={createPortfolioModalfun}
                style={{ border: portfolioItem?.length > 0 ? "2px solid #3d49a1" : "2px solid transparent" }}
              >Create Portfolio </span>
            </div>
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
            <div className="left">
              <span className="portfolio"
                onClick={createPortfolioModalfun}
                style={{ border: portfolioItem?.length > 0 ? "2px solid #3d49a1" : "2px solid transparent" }}
              >Create Portfolio </span>
            </div>
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
              <TreeView id={did} setCountLoading={setCountLoading} tRevenue={tRevenue} tHeadcount={tHeadcount} />
            </>
          ) : (
            <>
              <div className="searchResults">
                <div className="tableView tableView-top">
                  <div className="  list-check">
                    <SelectAll result={stateResult}
                      setPortfolioLoading={setPortfolioLoading}
                      setPortfolioItems={setPortfolioItems}
                      portfolioItem={portfolioItem}
                      currentPage={currentPage}
                      checked={checked}
                      setChecked={setChecked}
                      dispatch={dispatch}
                      Navigate={Navigate}
                    /></div>
                  <div className="listCol  listCol-1 x">View</div>
                  <div className="listCol  listCol-2 sort x">
                    <span>
                      {/* <span onClick={() => handleServerSort("bq_organization_structure")}>
                    {orderBy === "bq_organization_structure" ? isAsc === "True" ?
                      <i className='bx bx-sort-up' style={{ fontSize: "15px" }}></i>
                      :
                      <i className='bx bx-sort-down' style={{ fontSize: "15px" }}></i>

                      : ""}
                        <i className='bx bxs-sort-alt'></i> */}
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
                      {/* <span onClick={() => handleServerSort("bq_organization_address1_line_1")}>
                    {orderBy === "bq_organization_address1_line_1" ? isAsc === "True" ?
                      <i className='bx bx-sort-up' style={{ fontSize: "15px" }}></i>
                      :
                      <i className='bx bx-sort-down' style={{ fontSize: "15px" }}></i>

                      : ""}
                      <i className='bx bxs-sort-alt'></i> */}
                      Address
                    </span>
                  </div>
                  <div className="listCol sort x">
                    <span>
                      {/* <span onClick={() => handleServerSort("bq_legal_entity_jurisdiction_code")}>
                    {orderBy === "bq_legal_entity_jurisdiction_code" ? isAsc === "True" ?
                      <i className='bx bx-sort-up' style={{ fontSize: "15px" }}></i>
                      :
                      <i className='bx bx-sort-down' style={{ fontSize: "15px" }}></i>

                      : ""}
                        <i className='bx bxs-sort-alt'></i> */}
                      ID/Status
                    </span>
                  </div>
                  <div className="listCol sort x">
                    <span>
                      {/* <span onClick={() => handleServerSort("bq_current_employees_plan_mr")}>
                    {orderBy === "bq_current_employees_plan_mr" ? isAsc === "True" ?
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
                      <i className="bx bxs-sort-alt"></i>{" "}
                      <Tooltip
                        placement="top"
                        title="Revenue pertains to the U.S. only and is derived from local, state, and federal tax filings."
                      >
                        Org Revenue (2023)<i className="bx bxs-info-circle"></i>
                      </Tooltip>
                    </span>
                  </div>
                </div>
                <div className="silent">
                  {loading ? (
                    <div className="loader">
                      <img src={img2} alt="loader" />
                    </div>
                  ) : stateResult?.length > 0 ? (
                    stateResult?.map((d, i) => (
                      <Hit setTrevenue={setTrevenue} setTHeadcount={setTHeadcount}
                        handleDetail={handleDetail} d={d?.fields} key={i + "iutrt"}
                        portfolioItem={portfolioItem}
                        setFsmQuery={setFsmQuery}
                        setOpen={setOpen} setLocationName={setLocationName}
                        setLocationOpen={setLocationOpen}
                        setLocationQuery={setLocationQuery}
                        handleCheckboxChange={handleCheckboxChange}
                        setFinancialName={setFinancialName}
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
        {totalResult > 20 && loading === false && display === 0 ? (
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
        <SummeryModal open={open} setOpen={setOpen} fsmQuery={fsmQuery} financialName={financialName} />
        <LocationModal locationOpen={locationOpen} setLocationOpen={setLocationOpen}
          locationName={locationName} locationQuery={locationQuery}
        />
        <CreatePortfolioModal setPortfolioItems={setPortfolioItems} email={email} token={token}
          portfolioModal={portfolioModal}
          setPortfolioModal={setPortfolioModal} portfolioItem={portfolioItem} setChecked={setChecked} />
        <br></br>
        <br></br>
      </div>
    </div>
  );
};


export default SearchByEIN;
