import React, { useState } from "react";
import FetchPortfolio from "./portfolio/FetchPortfolio";
import { Fetch_Portfolios } from "./Aws/Aws-api";
import Footer from "./components2/Footer";
import ProfileButton from "./components2/profile/ProfileButton";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import img from "./assets/images/logo4.png";
import LogoutButton from "./components2/controls/LogoutButton";
import { generateUniqueFileName } from "./utils/utility";
import csvDownload from "json-to-csv-export";

import PortfolioDisplay from "./portfolio/PortfolioDisplay";
import Header from "./components2/controls/Header";

const Portfolio = () => {
  const { user, isValid } = useSelector((state) => state.user);
  const [portfolioOpen, setPortfolioOpen] = useState(false);
  const [portfoliName, setPortfolioName] = useState("");
  const token = localStorage.getItem("token");
  const tokenEmail = localStorage.getItem("tokenEmail");
  const email = localStorage.getItem("aws-email");

  const [delFlag, setDelFlag] = useState(false);
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const ExportPortfolio = async () => {
    try {
      const result = await Fetch_Portfolios(token, email, 1, 50);
      if (result?.data?.response) {
        let temp = result?.data?.response;
        let arr = [];
        if (temp?.length === 0) {
          return sweetAlert(
            "Oops...",
            "You do not have any portfolios to export",
            "error"
          );
        }
        temp?.forEach((d, i) => {
          arr.push({
            "Portfolio Name": d?.portfolio_name,
            "Number Of Company": d?.data,
            "Created At": d?.created_at,
            "Last Updated": d?.last_used_at,
          });
        });
        const uniqueFileName = generateUniqueFileName();
        const dataToConvert = {
          data: arr,
          filename: "Portfolio_Export_" + uniqueFileName,
          delimiter: ",",
          headers: [
            "Portfolio Name",
            "Number of Company",
            "Created At",
            "Last Updated",
          ],
        };
        csvDownload(dataToConvert);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(delFlag);
  return (
    <>
      <div className="home">
        <Header />
        <section className="portfolio">
          <div className="recentPortfolio">
            <div className="recentHead">
              <h3>Portfolios</h3>
              <div className="btnGroup">
                <button
                  style={{ width: "75px", cursor: "pointer" }}
                  onClick={ExportPortfolio}
                >
                  Export
                </button>
              </div>
            </div>
            <FetchPortfolio
              setPortfolioName={setPortfolioName}
              setPortfolioOpen={setPortfolioOpen}
              token={token}
              email={email}
              delFlag={delFlag}
              setDelFlag={setDelFlag}
            />
          </div>
        </section>
        <br></br>
        <div className="fo">
          <Footer />
        </div>
      </div>
      <PortfolioDisplay
        setDelFlag={setDelFlag}
        token={token}
        email={email}
        portfolioOpen={portfolioOpen}
        setPortfolioOpen={setPortfolioOpen}
        portfoliName={portfoliName}
      />
    </>
  );
};

export default Portfolio;
