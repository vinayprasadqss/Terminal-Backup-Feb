import React, { useEffect, useState } from "react";

import CompanySearchView from "../components2/CompanySearchView";
import SearchByDomain from "../components2/SearchByDomain";
import SearchByTicker from "../components2/SearchByTicker";
import SearchByEIN from "../components2/SearchByEIN";
import SearchByOfficer from "../components2/SearchByOfficer";
import SearchByName from "./SearchByName";
import SearchByCIK from "./SearchByCIK";
import SearchByLEI from "./SearchByLEI";
import SearchByAddress from "./SearchByAddress";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Tab = ({ tabs, activeTab, setActiveTab, setActiveTab1 }) => {
  const Navigate = useNavigate();
  // console.log(activeTab)

  return (
    <div className="tabs">
      <div className="tobNav">
        <div className="main-aside"></div>
        <div className="main-content1">
          {tabs.map((tab, index) => (
            <button
              type="button"
              key={index}
              className={`tab ${index === activeTab ? "active" : ""}`}
              onClick={() => {
                setActiveTab(index);
                console.log("---")
                if (index === 1) {
                  setActiveTab1("");
                } else {
                  setActiveTab1("cn");
                }
                Navigate(`/`, {
                  state: null,
                });
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div className="tab-content">{tabs[activeTab].content}</div>
    </div>
  );
};

const TabView = ({ setCountLoading, setActiveTab1 }) => {
  const { tab } = useSelector(state => state.search)
  const [activeTab, setActiveTab] = useState(0);
  const [query, setQuery] = useState("Flower");



  useEffect(() => {
    if (tab) {
      setActiveTab(tab)

    }
  }, [tab])








  const tabs = [
    {
      label: "Search By Company Name / ID",
      content: (
        <div>
          <SearchByName
            query={query}
            setQuery={setQuery}
            setCountLoading={setCountLoading}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
          {/* <CompanySearchView /> */}
        </div>
      ),
    },
    {
      label: "Search By Officer",
      content: (
        <div>
          {/* <OwnerSearchView /> */}
          <SearchByOfficer activeTab={activeTab} setCountLoading={setCountLoading} setActiveTab1={setActiveTab1} />
        </div>
      ),
    },
    {
      label: "Search By Ticker",
      content: (
        <div>
          {/* <TickerSearchView /> */}
          <SearchByTicker
            setCountLoading={setCountLoading}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
        </div>
      ),
    },
    {
      label: "Search By EIN",
      content: (
        <div>
          {/* <EinSearchView /> */}
          <SearchByEIN activeTab={activeTab} setCountLoading={setCountLoading} />
        </div>
      ),
    },
    {
      label: "Search By CIK",
      content: (
        <div>
          {/* <DomainSearchView /> */}
          <SearchByCIK activeTab={activeTab} setCountLoading={setCountLoading} />
        </div>
      ),
    },
    {
      label: "Search By LEI",
      content: (
        <div>
          {/* <DomainSearchView /> */}
          <SearchByLEI activeTab={activeTab} setCountLoading={setCountLoading} />
        </div>
      ),
    },
    {
      label: "Search By Domain",
      content: (
        <div>
          {/* <DomainSearchView /> */}
          <SearchByDomain activeTab={activeTab} setCountLoading={setCountLoading} />
        </div>
      ),
    },
    {
      label: "Search By Address",
      content: (
        <div>
          {/* <DomainSearchView /> */}
          <SearchByAddress activeTab={activeTab} setCountLoading={setCountLoading} />
        </div>
      ),
    },
    {
      label: "Universal Company Search",
      content: (
        <div>
          <CompanySearchView
            activeTab={activeTab}
            query={query}
            setQuery={setQuery}
            setCountLoading={setCountLoading}
          />
          {/* <CompanySearchView /> */}
        </div>
      ),
    },
  ];
  return (
    // <div className="container">
    <Tab
      tabs={tabs}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      setActiveTab1={setActiveTab1}
    />
    // </div>
  );
};
export default TabView;
