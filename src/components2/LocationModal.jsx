import { Modal, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import img from "../assets/images/nograph.svg";
import img2 from "../assets/images/spin.gif";
import { GetLocations, checkSession } from "../Aws/Aws-api";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import FeedbackPop from "./Tree/FeedbackPop";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";

const LocationModal = ({
  locationOpen,
  setLocationOpen,
  locationQuery,
  locationName,
}) => {
  const [check, setCheck] = useState("All");
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const Navigate = useNavigate()

  const fetchSubsidy = async () => {
    try {
      setLoading(true);
      const result = await GetLocations(locationQuery, currentPage, check, token);
      if (result?.data?.root?.children) {
        setState(result?.data?.root?.children);
        setTotal(result?.data?.root?.fields?.totalCount);

      } else {
        setState([]);
        sweetAlert("Oops...", "No Results", "error");
      }
      // console.log(result)
    } catch (error) {
      console.log(error);
      checkSession(error, dispatch, Navigate);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (locationQuery) {

      fetchSubsidy();
    }
    else {

      setState([]);
    }
  }, [open, locationQuery, currentPage, check]);


  useEffect(() => {
    setCheck("All")
  }, [locationOpen])


  return (
    <Modal
      title={
        <div className="modal-head-flex">
          <h4>{locationName}</h4>
          <Tooltip title="If you have any suggestion/issue regarding the product then please let us know via feedback so we can improve your experience." placement="top">
            <button onClick={() => setIsModalOpen(true)}><span>
              Feedback<i className='bx bxs-info-circle'></i>
            </span></button>

          </Tooltip>
        </div>

      }
      centered
      open={locationOpen}
      onOk={() => locationOpen(false)}
      onCancel={() => setLocationOpen(false)}
      width={1200}
      footer={false}
      className="location"
    >
      {loading ? (
        <div className="nodata">
          <img src={img2} />
          {/* <h5>No Records Found</h5> */}
        </div>
      ) : state?.length === 0 ? (
        <>
          <div className="locationwrap">
            <p>Click on Location Type to filter</p>
            <table>
              <thead>
                <th>Location Name</th>
                <th>
                  <select onChange={(e) => setCheck(e.target.value)} value={check}>
                    <option value="All">Location Type</option>
                    <option value="Business">Business</option>
                    <option value="Legal">Legal</option>
                    <option value="Officer Company">Officer Company</option>
                    <option value="Officer Person">Officer Person</option>
                  </select>
                </th>
                <th>Address</th>
                {/* <th>Metro Name</th> */}
                <th>State Name</th>
                {/* <th>Rating</th>
                                <th>Number of Reviews</th> */}
              </thead>
            </table>
            <div className="nodata">
              <img src={img} />
              <h5>No Records Found</h5>
            </div>
          </div>
        </>
      ) : (
        <div className="locationwrap">
          <p><b>Note:-</b> Click on Location Class to filter</p>
          <table>
            <thead>
              <th>Location Name</th>
              <th>
                <select onChange={(e) => { setCheck(e.target.value); setCurrentPage(0) }} value={check}>
                  <option value="All">Location Class</option>
                  <option value="Business">Business</option>
                  <option value="Legal">Legal</option>
                  <option value="Officer Company">Officer Company</option>
                  <option value="Officer Person">Officer Person</option>

                </select>
              </th>
              <th>Address</th>
              {/* <th>Metro Name</th> */}
              <th>State Name</th>
              {/* <th>Rating</th>
                                <th>Number of Reviews</th> */}
            </thead>
            <tbody style={{ userSelect: "none" }}>
              {state

                ?.map((d, i) => (
                  <tr>
                    <td>
                      {d?.fields?.hasOwnProperty("bq_location_name")
                        ? d?.fields?.bq_location_name
                        : "N/A"}
                    </td>
                    <td>
                      {d?.fields?.hasOwnProperty("bq_location_type")
                        ? d?.fields?.bq_location_type
                        : "N/A"}
                    </td>
                    <td>
                      {d?.fields?.hasOwnProperty("bq_location_address_line_1")
                        ? d?.fields?.bq_location_address_line_1 + ","
                        : ""}{" "}
                      {d?.fields?.hasOwnProperty("bq_location_address_city")
                        ? d?.fields?.bq_location_address_city + ","
                        : ""}{" "}
                      {d?.fields?.hasOwnProperty(
                        "bq_location_address_state_name"
                      )
                        ? d?.fields?.bq_location_address_state_name + ","
                        : ""}{" "}
                      {d?.fields?.hasOwnProperty("bq_location_address_zip5")
                        ? d?.fields?.bq_location_address_zip5 + ","
                        : ""}{" "}
                      {d?.fields?.hasOwnProperty(
                        "bq_location_address_country_name"
                      )
                        ? d?.fields?.bq_location_address_country_name ===
                          "United States"
                          ? "US"
                          : d?.fields?.bq_location_address_country_name
                        : ""}
                    </td>

                    {/* <td>{d?.fields?.hasOwnProperty("bq_location_address_cbsa_name") ? d?.fields?.bq_location_address_cbsa_name : "N/A"
                                                }</td> */}
                    {/* <td>{d?.fields?.hasOwnProperty("bq_location_address_county_name") ? d?.fields?.bq_location_address_county_name : "N/A"
                                                }</td> */}
                    <td>
                      {" "}
                      {d?.fields?.hasOwnProperty(
                        "bq_location_address_state_name"
                      )
                        ? d?.fields?.bq_location_address_state_name
                        : "N/A"}
                    </td>

                    {/* <td>{d?.fields?.hasOwnProperty("bq_location_avg_online_score") ? d?.fields?.bq_location_avg_online_score : "N/A"}</td>
                                                <td>{d?.fields?.hasOwnProperty("bq_location_online_reviews_count") ? d?.fields?.bq_location_online_reviews_count : "N/A"}</td> */}
                  </tr>
                ))}
              <td></td>
            </tbody>
          </table>
          <br />
          <br />
          {total > 20 && loading === false ? (
            <ResponsivePagination
              current={currentPage}
              total={Math.ceil(total / 20)}
              onPageChange={setCurrentPage}
              maxWidth={"200px"}
              nextLabel="Next"
              previousLabel="Prev"
            />
          ) : (
            ""
          )}
          <br />

        </div>
      )}

      <div className="modalFooter">
        <p>® 2024 BrightQuery, Inc. All rights reserved. Visit us at:  <a className="link" href="http://www.brightquery.com/" target="_blank">http://www.brightquery.com</a>
          <br /> Contact us at: sales@brightquery.com, support@brightquery.com or 1-888-BQDATA1</p>
        <a className="link" href="https://docs.brightquery.com/" target="_blank">https://docs.brightquery.com</a>
      </div>


      {isModalOpen && <FeedbackPop isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} id={locationQuery} source="Location" name={locationName} />}
    </Modal>
  );
};

export default LocationModal;
