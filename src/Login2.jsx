import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import img from "./assets/images/logo_login.png";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { LoginByAWS } from "./Aws/Aws-Config";
import img3 from "./assets/images/linked.png";
import "./assets/scss/login.scss"
import { LoadingOutlined } from "@ant-design/icons";

const Login2 = ({ pageloading, aws }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { isValid } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const userAgent = navigator.userAgent;
  const location = useLocation();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (email === "" || password === "") {
        return sweetAlert("Oops...", "Email and Password Is Required", "error");
      }
      localStorage.clear();
      await LoginByAWS(aws, email, password)
        .then((result) => {
          if (result?.group?.find((f) => f === import.meta.env.VITE_APP_APP_NAME)) {
            dispatch({ type: "login", payload: result });
            swal("Success!", "Login Successfully ", "success");
            if (userAgent.includes("Chrome")) {
              Navigate("/");
            } else {
            }
          } else {


            dispatch({ type: "login", payload: result });
            swal("Success!", "Login Successfully ", "success");
            if (userAgent.includes("Chrome")) {
              Navigate("/public");
            } else {
            }
          }
        })

        .catch((error) => {
          console.log(error)
          if (error?.error?.message === "Incorrect username or password.") {
            sweetAlert(
              "Invalid Credentials!",
              "Incorrect username or password.",
              "error"
            );
          } else {
            sweetAlert(
              "Account Disabled!",
              "Your account has been disabled by admin. Please contact us at support@brightquery.com for further communication." +
              "!",
              "error"
            );
          }

          setLoading(false);
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isValid) {
      if (location.state === null && isValid) {
        Navigate("/");
      } else {
        Navigate(location.state?.path);
      }

    }
  }, [isValid]);









  return (
    <div>
      {pageloading ? (
        ""
      ) : (
        <section className="login">
          <div className="login-wrap">
            <div className="login-logo-wrap">
              <img src={img} alt="logo" className="login-logo" />
            </div>
            <div className="login-logo-content">
              <h4>Welcome To BrightQuery</h4>
              <h5 style={{ fontSize: "1rem" }}>Login</h5>
            </div>

            <div className="form-group2">
              <label>Email</label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
              />
            </div>
            <div className="form-group2">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="links">
              <Link className="link" to="/register">Don't have an Account? Create Account</Link>
              <Link className="link" to="/auth/forget-password">Forgot Password?</Link>

            </div>

            <button className="login-btn" onClick={handleSubmit}>
              {loading ? <LoadingOutlined /> : "Login"}
            </button>
            <div className="or">
              <span></span>OR<span></span>
            </div>

            <button
              className="linkedin-btn"
              onClick={() =>
                window.open(
                  import.meta.env.VITE_AWS_APP_LINKEDIN_LOGIN_URL,
                  "_blank"
                )
              }
            >
              <img className="btn-logo" src={img3} alt="linked" />
              Continue with LinkedIn
            </button>
          </div>
        </section>
      )}
    </div>

  );
};

export default Login2;
