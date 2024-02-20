import React, { useState } from "react";

import CompanySearchView from "./components/CompanySearchView";
import SearchByDomain from "./components/SearchByDomain";
import SearchByTicker from "./components/SearchByTicker";
import SearchByEIN from "./components/SearchByEIN";
import SearchByOfficer from "./components/SearchByOfficer";
import SearchByName from "./components/SearchByName";
import SearchByCIK from "./components/SearchByCIK";
import SearchByLEI from "./components/SearchByLEI";
import SearchByAddress from "./components/SearchByAddress";

const Tab = ({ tabs, activeTab, setActiveTab, setActiveTab1 }) => {
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
                if (index === 1) {
                  setActiveTab1("");
                } else {
                  setActiveTab1("cn");
                }
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
  const [activeTab, setActiveTab] = useState(0);
  const [query, setQuery] = useState("Flower");

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
          <SearchByOfficer setCountLoading={setCountLoading} />
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
          />
        </div>
      ),
    },
    {
      label: "Search By EIN",
      content: (
        <div>
          {/* <EinSearchView /> */}
          <SearchByEIN setCountLoading={setCountLoading} />
        </div>
      ),
    },
    {
      label: "Search By CIK",
      content: (
        <div>
          {/* <DomainSearchView /> */}
          <SearchByCIK setCountLoading={setCountLoading} />
        </div>
      ),
    },
    {
      label: "Search By LEI",
      content: (
        <div>
          {/* <DomainSearchView /> */}
          <SearchByLEI setCountLoading={setCountLoading} />
        </div>
      ),
    },
    {
      label: "Search By Domain",
      content: (
        <div>
          {/* <DomainSearchView /> */}
          <SearchByDomain setCountLoading={setCountLoading} />
        </div>
      ),
    },
    {
      label: "Search By Address",
      content: (
        <div>
          {/* <DomainSearchView /> */}
          <SearchByAddress setCountLoading={setCountLoading} />
        </div>
      ),
    },
    {
      label: "Universal Company Search",
      content: (
        <div>
          <CompanySearchView
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
