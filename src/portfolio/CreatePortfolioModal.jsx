import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { Radio } from "antd";
import {
  CreatePortfolio,
  Fetch_Portfolios,
  PortfolioUpdate,
  checkSession,
} from "../Aws/Aws-api";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import img from "../assets/images/spin.gif";
import ResponsivePagination from "react-responsive-pagination";
import img2 from "../assets/images/port.svg";

const CreatePortfolioModal = ({
  portfolioModal,
  setPortfolioModal,
  portfolioItem,
  token,
  email,
  setPortfolioItems,
  setChecked,
}) => {
  const { user } = useSelector((state) => state.user);
  const [radio1, setRadio1] = useState(true);
  const [portfolioName, setPortfolioName] = useState("");
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [state, setState] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const handleOk = () => {
    setPortfolioModal(false);
  };
  const handleCancel = () => {
    setPortfolioModal(false);
  };
  const showPaidFeatureMessage = () => {
    swal({
      title: "Upgrade to Premium",
      text: "This feature is available under our paid plan. Upgrade now to unlock premium features!",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Upgrade Now",
      cancelButtonText: "Not Now",
    }).then((result) => {
      if (result.isConfirmed) {

        console.log(
          "Redirecting to upgrade page or triggering upgrade action..."
        );
      }
    });
  };

  const HandleCreate = async () => {
    try {
      if (portfolioName === "") {
        return swal("Oops...", "Portfolio Name Is Required", "error");
      }
      if (portfolioName?.length > 99) {
        return swal("Oops...", "Portfolio Name is too large.", "error");
      }
      let checkGroup = user?.group?.find((f) => f === import.meta.env.VITE_APP_APP_NAME);
      if (!checkGroup) {
        setPortfolioItems([]);
        setChecked([]);
        setPortfolioName("");
        showPaidFeatureMessage();
        handleCancel();
        return;
      }

      setLoading(true);
      const res = await CreatePortfolio(
        token,
        email,
        portfolioName,
        portfolioItem
      );
      console.log(res?.data);
      if (res?.data) {
        setPortfolioItems([]);
        setChecked([]);
        setPortfolioName("");
        swal("Success!", "Portfolio Create Successfully ", "success");
        handleCancel();
      }
    } catch (error) {
      console.log(error);
      if (
        error?.response?.data?.message === "Same portfolio name already exists"
      ) {
        return swal("Oops...", "Same Portfolio Name Already Exists", "error");
      }
      checkSession(error, dispatch, Navigate);
    } finally {
      setLoading(false);
    }
  };

  const FetchPortfolios = async () => {
    try {
      setLoading2(true);
      const res = await Fetch_Portfolios(token, email, currentPage);
      if (res?.data) {
        setState(res?.data?.response);
        setTotalPage(res?.data?.total_counts);
      }

    } catch (error) {
      console.log(error);
      checkSession(error, dispatch, Navigate)
    } finally {
      setLoading2(false);
    }
  };

  const handleUpdate = async (d) => {
    try {
      setLoading3(true);
      let id = d?.data;
      if (portfolioItem?.length > 50 - id) {
        return swal({
          title: "Space Limit Exceeded",
          text: `You have tried to add ${portfolioItem?.length
            } companies, but there are only ${50 - id
            } spaces left Only. You can add more items by removing some existing ones.`,
          icon: "info",
          showCancelButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            console.log(
              "Redirecting to upgrade page or triggering upgrade action..."
            );
          }
        });
      }

      const result = await PortfolioUpdate(
        token,
        email,
        d?.portfolio_name,
        portfolioItem
      );
      if (result?.data) {
        // console.log(result?.data);
        if (result?.data?.response?.details?.companies_already_present > 0) {
          setPortfolioItems([]);
          setChecked([]);
          setPortfolioName("");
          swal(
            "Duplicate Companies Found",
            `Based on your selection ${result?.data?.response?.details?.companies_added
            } companies added successfully and ${result?.data?.response?.details?.companies_already_present
            } ${result?.data?.response?.details?.companies_added === 0
              ? "was"
              : "were"
            } rejected due to duplicacy, Now there are ${result?.data?.response?.details?.total_companies
            } companies in this portfolio.`,
            "success"
          );
          handleCancel();
          return;
        } else {
          setPortfolioItems([]);
          setChecked([]);
          setPortfolioName("");
          swal(
            "Success!",
            `Based on your selection ${result?.data?.response?.details?.companies_added} companies added successfully. `,
            "success"
          );
          handleCancel();
          return;
        }
      }
    } catch (error) {
      console.log(error);
      checkSession(error, dispatch, Navigate)
    } finally {
      setLoading3(false);
    }
  };

  useEffect(() => {
    if (portfolioModal) {
      FetchPortfolios();
    } else {
      setRadio1(true);
    }
  }, [currentPage, portfolioModal]);



  return (
    <Modal
      centered
      width={900}
      title="Portfolio"
      open={portfolioModal}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={false}
    >
      <hr />
      <div className="create-portfolio">
        <Radio onChange={(e) => setRadio1(true)} checked={radio1}>
          Create New Portfolio
        </Radio>
        <div className="contents">
          <div className="groups">
            <div className="child-group">
              <label>Porfolio Name</label>
              <input
                onChange={(e) => setPortfolioName(e.target.value)}
                value={portfolioName}
                type="text"
                placeholder="Enter Portfolio Name"
                disabled={radio1 === false}
                style={{ textTransform: "capitalize" }}
              />
            </div>
            <button
              className={radio1 === false && "disabled"}
              disabled={radio1 === false || loading}
              onClick={HandleCreate}
              style={{ cursor: "pointer" }}
            >
              {loading ? (
                <img className="btn-loader" src={img} alt="img" />
              ) : (
                "Submit"
              )}
            </button>
          </div>
          <p>you have selected {portfolioItem?.length} items</p>
        </div>

        <Radio onChange={(e) => setRadio1(false)} checked={!radio1}>
          Update in Existing Portfolio
        </Radio>
        <div className="contents2">
          <div className="top">
            {/* <input type='text' placeholder='Search Portfolio Name' /> */}
            <span>Portfolio's</span>
          </div>
          <div className="tabd">
            <table>
              <thead>
                <th>Portfolio Name</th>
              </thead>
              <tbody>
                {loading2 || loading3 ? (
                  <div className="loader">
                    <img src={img} />
                  </div>
                ) : state?.length === 0 ? (
                  <div className="no1">
                    <img src={img2} alt="img" />
                  </div>
                ) : (
                  state?.map((d) => (
                    <tr>
                      <td>
                        <div className="one">
                          <h3 style={{ textTransform: "capitalize" }}>
                            {d?.portfolio_name}
                          </h3>
                          <p>{d?.data} Company under this portfolio</p>
                        </div>
                        <div className="two">
                          <button
                            disabled={radio1 === true || d?.data === 50}
                            className={
                              radio1 === true || d?.data === 50
                                ? "btnz disabled"
                                : "btnz"
                            }
                            onClick={() => handleUpdate(d)}
                          >
                            {"Update"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <br></br>
            <center>
              {totalPage > 10 && loading2 === false && (
                <ResponsivePagination
                  current={currentPage}
                  total={Math.ceil(totalPage / 10)}
                  onPageChange={setCurrentPage}
                  maxWidth={"100px"}
                  nextLabel={"Next"}
                  previousLabel={"Previous"}
                />
              )}
            </center>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CreatePortfolioModal;
