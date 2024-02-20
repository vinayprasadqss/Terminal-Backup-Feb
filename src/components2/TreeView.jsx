import React, { useEffect, useState } from "react";

import { DetailRecord, checkSession } from "../Aws/Aws-api";
import img from "../assets/images/spin.gif";

import ParentCard from "./ParentCard";
import ChildCard from "./Tree/ChildCard";
import { Pagination } from "antd";

import ResponsivePagination from "react-responsive-pagination";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";





const TreeView = ({ id, setCountLoading, tRevenue, tHeadcount }) => {
  const [state, setState] = useState();
  const [singleState, setSingleState] = useState();
  const [active, setActive] = useState(false);
  const [expandedItems, setExpandedItems] = useState([]);
  const token = localStorage.getItem("token")
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchRecords = async (id) => {
    try {
      setLoading(true);
      const result = await DetailRecord(id, token);

      if (result?.data) {
        // setState(result?.data?.root?.children?.filter((f) => f?.fields?.bq_organization_name
        //   !== result?.data?.root?.children[0]?.fields?.bq_organization_name));
        setState(result?.data?.root?.children?.slice(1));
        setSingleState(result?.data?.root?.children[0]?.fields);
      }
    } catch (error) {
      console.log(error);
      checkSession(error, dispatch, Navigate)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords(id);
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const handleActive = (index) => {
    if (expandedItems.includes(index)) {
      setExpandedItems(expandedItems.filter((item) => item !== index));
    } else {
      setExpandedItems([...expandedItems, index]);
    }
  };

  const itemsPerPage = 10; // You can adjust the number of items per page as needed
  const sortedArray = state?.sort((a, b) => {
    const codeA = a?.fields?.bq_legal_entity_jurisdiction_code.toUpperCase();
    const codeB = b?.fields?.bq_legal_entity_jurisdiction_code.toUpperCase();

    if (codeA < codeB) {
      return -1;
    }
    if (codeA > codeB) {
      return 1;
    }
    return 0;
  });

  // console.log(sortedArray?.length, "newstate");
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedArray?.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  ////Implement SideBar Logic is here

  const dispatch = useDispatch()

  const fetchcounts = async () => {
    try {
      setCountLoading(true);
      // let field = "TreeView";
      // const result = await Sidebar2(
      //   id,
      //   field,
      // );
      // console.log(result, "fetchCounts");
      let obj = {
        total_companies: 1,
        bq_revenue_mr_total: tRevenue || "N/A",
        bq_revenue_mr_avg: tRevenue || "N/A",
        bq_current_employees_plan_mr_total: tHeadcount || "N/A",
        bq_current_employees_plan_mr_avg: tHeadcount || "N/A"
      }



      dispatch({ type: "sidebar", payload: obj });
    } catch (error) {
      console.log(error)
      checkSession(error, dispatch, Navigate)
    }
    finally {
      setCountLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchcounts()
    }
  }, [id]);





















  return (
    <>
      {loading ? (
        <div className="loader1" style={{ minHeight: "60vh" }}>
          <img src={img} />
        </div>
      ) : (
        <div>
          <ParentCard singleState={singleState} />
          <div className="tb">
            {currentItems?.map((d, i) => (
              <ChildCard
                d={d}
                i={i}
                expandedItems={expandedItems}
                handleActive={handleActive}
                singleState={singleState}
              />
            ))}
          </div>
          <br></br>
          <br></br>
          {state?.length > 10 ? (
            <center>
              <ResponsivePagination
                current={currentPage}
                total={Math.ceil(state?.length / 10)}
                onPageChange={setCurrentPage}
                maxWidth={"200px"}
                nextLabel="Next"
                previousLabel="Prev"
              />
            </center>
          ) : (
            ""
          )}
        </div>
      )}
      <br></br>
    </>
  );
};

export default TreeView;
