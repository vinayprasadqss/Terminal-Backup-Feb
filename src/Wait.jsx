import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import swal from "sweetalert";
import img from "./assets/images/spin.gif";
import { jwtDecode } from "jwt-decode";

const Wait = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  console.log(location);

  const handleLogin = async () => {
    try {
      setLoading(true);

      if (
        location.hash ===
        "#error_description=User+is+not+enabled&error=invalid_request"
      ) {
        return swal({
          title: "Account Disabled!",
          text: "Your account has been disabled by admin. Please contact us at support@brightquery.com for further communication.",
          icon: "error",
          buttons: {
            confirm: {
              text: "OK",
              value: true,
              visible: true,
              className: "swal-button--confirm",
            },
          },
        }).then(() => {
          window.open(import.meta.env.VITE_APP_LOGIN_CALL_URL);
        });
      }
      let validToken = location?.hash?.replace("#access_token=", "");
      validToken = validToken?.replace(
        "&token_type=Bearer&expires_in=3600",
        ""
      );
      let a = validToken.split("&id_token");

      let accesstoken = a[0];
      let idToken = a[1].replace("=", "");
      const decoded = jwtDecode(idToken);

      const obj = {
        userName: decoded["cognito:username"],
        token: accesstoken,
        sub: decoded?.sub,
        valid: decoded?.token_use,
        email: decoded?.email,
        email_verified: decoded?.email_verified,
        group: decoded["cognito:groups"],
        expired: decoded?.exp,
        name: decoded?.getname,
      };
      if (obj?.group?.find((f) => f === import.meta.env.VITE_APP_APP_NAME)) {
        dispatch({ type: "login", payload: obj });
        localStorage.setItem("token", accesstoken);
        localStorage.setItem("idtoken", idToken);
        localStorage.setItem("aws-linkedin-id", obj?.userName);
        localStorage.setItem("aws-email", obj?.email);
        swal("Success!", "Login Successfully ", "success");
        Navigate("/");
      } else {
        // return swal({
        //     title: 'Unauthorized Access',
        //     text: 'You are not authorized for this app. Please contact our admin for assistance.',
        //     icon: "warning",
        //     buttons: {
        //         confirm: {
        //             text: "OK",
        //             value: true,
        //             visible: true,
        //             className: "swal-button--confirm",
        //         },
        //     },
        // }).then(function (isConfirm) {
        //     if (isConfirm) {
        //         dispatch({ type: "logout", payload: {} });
        //         Navigate("/login");
        //         localStorage.clear()
        //         setLoading(false)

        //     } else {
        //         dispatch({ type: "logout", payload: {} });
        //         Navigate("/login");
        //         localStorage.clear()
        //         setLoading(false);
        //     }
        // });
        // }
        dispatch({ type: "login", payload: obj });
        localStorage.setItem("token", accesstoken);
        localStorage.setItem("idtoken", idToken);
        localStorage.setItem("aws-linkedin-id", obj?.userName);
        localStorage.setItem("aws-email", obj?.email);
        swal("Success!", "Login Successfully ", "success");
        Navigate("/public");
      }
    } catch (error) {
      console.log(error);
      sweetAlert("Oops...", "Invalid Login!", "error");
      Navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleLogin();
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img src={img} alt="loader" style={{ width: "8rem", height: "8rem" }} />
    </div>
  );
};

export default Wait;
