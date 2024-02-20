import swal from "sweetalert";
import { checkSession } from "../Aws/Aws-api";

export const createPortfolioModalfun = (
  portfolioItem,
  setPortfolioModal,
  dispatch,
  Navigate
) => {
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
    setPortfolioModal(true);
  } catch (error) {
    console.log(error);
    checkSession(error, dispatch, Navigate);
  }
};
