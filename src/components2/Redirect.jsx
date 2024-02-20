import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Redirect = ({ isValid, flag }) => {
  const Navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isValid === false) {
      Navigate("/login", {
        state: {
          path: location?.pathname
        }
      })
    } else {
      if (flag === "Not") {
        Navigate("/public", {
          state: {
            path: location?.pathname
          }
        })
      }
    }
  }, [isValid]);
  return <></>;
};

export default Redirect;
