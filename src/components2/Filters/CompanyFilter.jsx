import React, { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import { terminalFilter } from "../../constants/DummyConstants";
import { SaveSearchQuery, checkSession, dbFilters } from "../../Aws/Aws-api";
import { useDispatch, useSelector } from "react-redux";
import img from "../../assets/images/spin.gif";
import { newState } from "../../constants/DynamiCFilters";
import { SaveSearch_Utillity } from "../../utils/utility";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import SaveSearchPopup from "../hits/SaveSearchPopup";

const CompanyFilter = ({
  ClearAll,
  multiFilter,
  handleMultiSelectChange,
  handleLabel,
  handleLabel2,
  handleSingleSelect,
  query, nameSearch, prefix, activeTab
}) => {
  const { filter } = useSelector((state) => state.search);
  const [loading1, setLoading1] = useState(false);
  const [useToggleMenu, setToggleMenu] = useState(window.innerWidth < 1199 ? false : true);
  const [flag, setFlag] = useState([]);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("aws-email");
  const Navigate = useNavigate()


  const LoadFilter = async () => {
    try {
      setLoading1(true);
      const result = await dbFilters(token);
      if (result?.data) {
        dispatch({ type: "addfilter", payload: result?.data });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading1(false);
    }
  };

  useEffect(() => {
    if (filter?.length === 0) {
      LoadFilter();
    }
  }, []);


  const handleFquery = () => {
    try {
      multiFilter?.bq_organization_address1_state_name?.map((d) => {


        if (flag?.find((q) => q?.value === d)) {
          let temp = [];
          if (multiFilter?.bq_organization_address1_state_name?.length === 0)
            return setFlag([]);

          temp.push(flag?.filter((f) => f?.value === d));
          return setFlag(...temp);
        } else {

          let temp = [];
          temp.push(newState?.find((f) => f?.value === d));
          return setFlag((prev) => [...flag, ...temp]);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (multiFilter?.bq_organization_address1_state_name?.length === 0) {

      setFlag([]);
      return;
    } else {
      handleFquery();
    }
  }, [multiFilter?.bq_organization_address1_state_name]);









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

        <span className={"saveSearchBtn"} onClick={() => setIsModalOpen1(true)}><i className='bx bx-save' ></i>Save Search</span>
      </div>
      <span className="c"><i className='bx bx-filter-alt'></i> Search Filters</span>

      <div className="filter-content">
        {terminalFilter?.map((item, i) => {
          if (item.type === "multi") {
            if (item?.name === "bq_organization_address1_state_name") {
              return loading1 ? (
                <div className="loadingwrap">
                  <label>Filter by States</label>
                  <div className="loading-select">
                    <img src={img} />
                  </div>
                </div>
              ) : (
                filter?.state_names_with_codes && (
                  <div className="single-select" key={i + "ki"}>
                    <label>{item?.text}</label>
                    <MultiSelect
                      options={filter?.state_names_with_codes
                        ?.slice(1)
                        ?.map((d) => ({
                          value: d?.state_name,
                          label: d?.state_name + ", " + d?.state_code,
                          name: item?.name,
                          code: d?.state_code,
                        }))}
                      overrideStrings={{ selectSomeItems: item?.label }}
                      onChange={(selectedOptions) => {
                        // handleFquery(selectedOptions)
                        handleMultiSelectChange(selectedOptions, item?.name);
                      }}
                      value={multiFilter[item?.name]?.map((d) => ({
                        value: d,
                        label: handleLabel2(item, d),
                        name: item?.name,
                      }))}
                      hasSelectAll={false}
                      className={
                        multiFilter?.[item?.name]?.length > 0
                          ? "activeselect multi-select"
                          : "multi-select"
                      }
                    // isOpen={true}

                    />
                  </div>
                )
              );
            } else if (item?.name === "bq_organization_address1_cbsa_name") {
              // filter((f) => fquery?.some((some) => f?.includes(some?.code))) ?
              return loading1 ? (
                <div className="loadingwrap">
                  <label>Filter by Metro</label>
                  <div className="loading-select">
                    <img src={img} />
                  </div>
                </div>
              ) : (
                filter?.bq_organization_address1_cbsa_name && (
                  <div className="single-select" key={i + "ki"}>
                    <label>{item?.text}</label>
                    <MultiSelect
                      options={
                        flag?.length === 0
                          ? filter?.bq_organization_address1_cbsa_name
                            ?.slice(1)
                            ?.map((d) => ({
                              value: d,
                              label: d,
                              name: item?.name,
                            }))
                          : filter?.bq_organization_address1_cbsa_name
                            ?.slice(1)
                            ?.filter((f) =>
                              flag?.some((some) => f?.includes(some?.code))
                            )
                            ?.map((d) => ({
                              value: d,
                              label: d,
                              name: item?.name,
                            }))
                      }
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
                      className={
                        multiFilter?.[item?.name]?.length > 0
                          ? "activeselect multi-select"
                          : "multi-select"
                      }
                    // isOpen={true}
                    />
                  </div>
                )
              );
            } else if (item?.name === "bq_organization_sector_name") {
              return loading1 ? (
                <div className="loadingwrap">
                  <label>Filter by IRS Sector</label>
                  <div className="loading-select">
                    <img src={img} />
                  </div>
                </div>
              ) : (
                filter?.bq_organization_sector_name && (
                  <div className="single-select" key={i + "ki"}>
                    <label>{item?.text}</label>
                    <MultiSelect
                      options={filter?.bq_organization_sector_name
                        ?.slice(1)
                        ?.map((d) => ({
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
                      className={
                        multiFilter?.[item?.name]?.length > 0
                          ? "activeselect multi-select"
                          : "multi-select"
                      }
                    // isOpen={true}
                    />
                  </div>
                )
              );
            } else if (item?.name === "bq_organization_subsector_name") {
              return loading1 ? (
                <div className="loadingwrap">
                  <label>Filter by IRS Sub Sector</label>
                  <div className="loading-select">
                    <img src={img} />
                  </div>
                </div>
              ) : (
                filter?.bq_organization_subsector_name && (
                  <div className="single-select" key={i + "ki"}>
                    <label>{item?.text}</label>
                    <MultiSelect
                      options={filter?.bq_organization_subsector_name
                        ?.slice(1)
                        ?.map((d) => ({
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
                      className={
                        multiFilter?.[item?.name]?.length > 0
                          ? "activeselect multi-select"
                          : "multi-select"
                      }
                    // isOpen={true}
                    />
                  </div>
                )
              );
            } else {
              return (
                <div className="single-select" key={i + "ki"}>
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
                    className={
                      multiFilter?.[item?.name]?.length > 0
                        ? "activeselect multi-select"
                        : "multi-select"
                    }
                  // isOpen={true}
                  />
                </div>
              );
            }
          } else {
            return (
              <div className="single-select1" key={i + "kiw"}>
                <label>{item?.text}</label>

                <select
                  className={
                    multiFilter?.[item?.name]?.length > 0 ? "activeselect" : ""
                  }
                  value={multiFilter?.[item?.name]}
                  onChange={(e) =>
                    handleSingleSelect(e.target.value, item?.name)
                  }
                  style={{ height: "32px", background: "#fff", appearance: "none" }}
                >
                  {item?.options?.map((o, i) => (
                    <option key={i + "j"} value={o?.value}>
                      {o?.title}
                    </option>
                  ))}
                </select>
                <div className="s"></div>
              </div>
            );
          }
        })}

        <button onClick={ClearAll} className="clear">
          Clear all filters
        </button>
      </div>
      {
        isModalOpen1 && <SaveSearchPopup query={query} nameSearch={nameSearch}
          activeTab={activeTab} prefix={"not"}
          multiFilter={multiFilter} isModalOpen={isModalOpen1} setIsModalOpen={setIsModalOpen1} token={token} />
      }
      <br></br>
    </div>
  );
};

export default CompanyFilter;
