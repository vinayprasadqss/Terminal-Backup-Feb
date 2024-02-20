import React, { useState } from "react";
import "../assets/scss/app.scss";
import LogoutButton from "../components2/controls/LogoutButton";
import img from "../assets/images/logo4.png";
import Footer from "../components2/Footer";
import { useSelector } from "react-redux";
import millify from "millify";
import img1 from "../assets/images/spin.gif";
import ProfileButton from "../components2/profile/ProfileButton";
import TabView from "./TabView";

const PublicHome = () => {
  const [countLoading, setCountLoading] = useState(false);
  const { counts } = useSelector((state) => state.search);
  const [activeTab1, setActiveTab1] = useState("cn");

  return (
    <div className="App">
      <header className="main-header">
        <div className="container">
          <div className="logo">
            <img src={img} width="150px" alt=""></img>
            <span><span className={"logoText"}>BQ Terminal </span> {import.meta.env.VITE_APP_VERSION}</span>
          </div>
          <div className="nav">
            {/* <ProfileButton /> */}
            <LogoutButton />
          </div>
        </div>
      </header>
      <TabView
        setCountLoading={setCountLoading}
        setActiveTab1={setActiveTab1}
      />
      {activeTab1 === "cn" ? (
        <div className="sidebar">
          <h4>
            Searched
            <br />
            Company
            <br />
            Summary{" "}
          </h4>
          <div className="token">
            <p>
              {countLoading || counts?.length === 0 ? (
                <img className="minLogo" src={img1} />
              ) : counts?.length === 1 ? (
                "N/A"
              ) : counts?.total_companies === "N/A" ? (
                "N/A"
              ) : (
                millify(Number(counts?.total_companies))
              )}
            </p>
            <span>#Companies</span>
          </div>
          <div className="token">
            <p>
              {countLoading || counts?.length === 0 ? (
                <img className="minLogo" src={img1} />
              ) : counts?.length === 1 ? (
                "N/A"
              ) : counts?.bq_revenue_mr_total === "N/A" ? (
                "N/A"
              ) : (
                "$" + millify(Number(counts?.bq_revenue_mr_total))
              )}
            </p>
            <span>Revenue</span>
          </div>
          <div className="token">
            <p>
              {countLoading || counts?.length === 0 ? (
                <img className="minLogo" src={img1} />
              ) : counts?.length === 1 ? (
                "N/A"
              ) : counts?.bq_revenue_mr_avg === "N/A" ? (
                "N/A"
              ) : (
                "$" + millify(Number(counts?.bq_revenue_mr_avg))
              )}
            </p>
            <span>Revenue Avg</span>
          </div>
          <div className="token">
            <p>
              {countLoading || counts?.length === 0 ? (
                <img className="minLogo" src={img1} />
              ) : counts?.length === 1 ? (
                "N/A"
              ) : counts?.bq_current_employees_plan_mr_total === "N/A" ? (
                "N/A"
              ) : (
                millify(Number(counts?.bq_current_employees_plan_mr_total))
              )}
            </p>
            <span>Headcount</span>
          </div>
          <div className="token">
            <p>
              {countLoading || counts?.length === 0 ? (
                <img className="minLogo" src={img1} />
              ) : counts?.length === 1 ? (
                "N/A"
              ) : counts?.bq_current_employees_plan_mr_avg === "N/A" ? (
                "N/A"
              ) : (
                millify(Number(counts?.bq_current_employees_plan_mr_avg))
              )}
            </p>
            <span>Headcount AVG</span>
          </div>
        </div>
      ) : (
        ""
      )}

      <Footer />
    </div>
  );
};

export default PublicHome;
