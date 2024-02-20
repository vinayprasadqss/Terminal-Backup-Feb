import React from "react";
import { useState, useEffect } from "react";
import "./assets/scss/report.scss";
import img from "./assets/images/bql.png";
import {
  reporttabledata,
  reporttabledata2,
  reporttabledata3,
  reporttabledata4,
} from "./constants/Report";
import BarChart from "./components2/graphs/BarChart";
import MultiLineChart from "./components2/graphs/MultiLineChart";
import img1 from "./assets/images/BQ-logo.png";
import SingleLineChart from "./components2/graphs/SingleLineChart";
import AreaChart from "./components2/graphs/AreaChart";
import VSGraph from "./components2/graphs/VSGraph";
import axios from "axios";
import MultiAreaGraph from "./components2/graphs/MultiAreaGraph";
import milify from "millify";
import CompanySummerySection from "./components2/ReportSections/CompanySummerySection";
import AnnualFinancialSummery from "./components2/ReportSections/AnnualFinancialSummery";
import AnnualFinancialSummery2 from "./components2/ReportSections/AnnualFinancialSummery2";
import PayrollSection from "./components2/ReportSections/PayrollSection";
import PeerReportSection from "./components2/ReportSections/PeerReportSection";
import ToolGraphSection from "./components2/ReportSections/ToolGraphSection";
import img2 from "./assets/images/spin.gif";

const Report = ({ id, componentRef }) => {
  const [state, setState] = useState([]);
  const [ts, setTs] = useState([]);
  const [tsq, setTsq] = useState([]);
  const [tsm, setTsm] = useState([]);
  const [noData, setNoData] = useState(false);
  const [loading, setLoading] = useState(false);
  // 100000002731
  //id
  const fetchRecord = async () => {
    try {
      setState([]);
      setTs([]);
      setLoading(true);
      const data = await axios.get(
        `https://search2-api.brightquery.com/search_financial?query=100056254931`
      );
      if (data?.data?.root?.fields?.totalCount !== 0) {
        setLoading(false);
        setState(data?.data?.root?.children[0]?.fields);
        setTs(
          data?.data?.root?.children[0]?.fields
            ?.bq_organization_company_variables_ts
        );
        setTsq(
          data?.data?.root?.children[0]?.fields
            ?.bq_organization_company_variables_tsq
        );
        setTsm(
          data?.data?.root?.children[0]?.fields
            ?.bq_organization_company_variables_tsm
        );
      } else {
        setLoading(false);
        setNoData(true);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecord();
  }, []);

  return (
    <div ref={componentRef}>
      {loading ? (
        <div className="loader">
          <img src={img2} alt="loader" />
        </div>
      ) : (
        <div>
          {!noData ? (
            <div>
              <ToolGraphSection ts={ts} state={state} img1={img1} img={img} />
              <div className="html2pdf__page-break"></div>
              <CompanySummerySection
                ts={ts}
                state={state}
                img1={img1}
                img={img}
              />
              <div className="html2pdf__page-break"></div>
              <AnnualFinancialSummery
                ts={ts}
                state={state}
                img1={img1}
                img={img}
                tsm={tsm}
              />
              <div className="html2pdf__page-break"></div>
              <AnnualFinancialSummery2
                tsq={tsq}
                state={state}
                img1={img1}
                img={img}
              />
              <div className="html2pdf__page-break"></div>
              <PayrollSection
                ts={ts}
                state={state}
                img1={img1}
                img={img}
                tsq={tsq}
              />
              <div className="html2pdf__page-break"></div>
              <PeerReportSection
                tsq={tsq}
                ts={ts}
                state={state}
                img1={img1}
                img={img}
              />
            </div>
          ) : (
            <div className="loader">Company Report Not Found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Report;
