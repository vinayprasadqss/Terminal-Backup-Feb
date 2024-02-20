import React, { useState, useEffect, lazy, Suspense } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import img from "./assets/images/bql.png";
import img2 from "./assets/images/spin.gif"
import "./assets/scss/app.scss"

const Home = lazy(() => import("./components2/Home"));
const Wait = lazy(() => import("./Wait"));
const Auth = lazy(() => import("./components2/Auth"));
const Error = lazy(() => import("./components2/Error"));
const Report = lazy(() => import("./Report"));
const Login2 = lazy(() => import("./Login2"));
const Portfolio = lazy(() => import("./Portfolio"));
const PublicHome = lazy(() => import("./Public_Routes/PublicHome"));
const SaveSearchList = lazy(() => import("./SaveSearchList"));
const ForgetPassword = lazy(() => import("./components2/auth/ForgetPassword"));
const Register = lazy(() => import("./components2/auth/Register"));
const Otp = lazy(() => import("./components2/auth/Otp"));
const ResetPassword = lazy(() => import("./components2/auth/ResetPassword"));
const Screenar = lazy(() => import("./screenar/Screenar"));
const Bucket = lazy(() => import("./screenar/Bucket"));
const BucketListing = lazy(() => import("./screenar/BucketListing"));


const App = ({ aws }) => {
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const idToken = localStorage.getItem("idtoken");
  const awsemail = localStorage.getItem("aws-email");
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const checkUser = async () => {
    try {
      let flag = true;
      setLoading(true);

      const decoded = jwtDecode(idToken);
      const obj = {
        userName: decoded["cognito:username"],
        token: token,
        sub: decoded?.sub,
        valid: decoded?.token_use,
        email: decoded?.email,
        email_verified: decoded?.email_verified,
        group: decoded["cognito:groups"],
        expired: decoded?.exp,
        name: decoded?.getname,
      };
      let checkGroup = obj?.group?.find((f) => f === import.meta.env.VITE_APP_APP_NAME);
      const expirationTime = decoded.exp;
      const currentTime = Math.floor(Date.now() / 1000);
      const isTokenExpired = currentTime > expirationTime;
      if (isTokenExpired) {

      } else {
        dispatch({ type: "load", payload: obj });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const checkLinkedinUser = async () => {
    try {
      let flag = true;
      setLoading(true);
      const decoded = jwtDecode(idToken);
      const obj = {
        userName: decoded["cognito:username"],
        token: token,
        sub: decoded?.sub,
        valid: decoded?.token_use,
        email: decoded?.email,
        email_verified: decoded?.email_verified,
        group: decoded["cognito:groups"],
        expired: decoded?.exp,
        name: decoded?.getname,
      };

      let checkGroup = obj?.group?.find((f) => f === import.meta.env.VITE_APP_APP_NAME);

      const expirationTime = decoded.exp;
      const currentTime = Math.floor(Date.now() / 1000);
      const isTokenExpired = currentTime > expirationTime;
      if (isTokenExpired) {

      } else {
        dispatch({ type: "load", payload: obj });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (awsemail && idToken) checkUser();
  }, [awsemail, idToken]);

  useEffect(() => {
    if (awsemail && idToken) checkLinkedinUser();
  }, [awsemail, idToken]);

  return (
    <Suspense fallback={<div className="suspense-Loader">
      <div className="suspense-wrap">
        <img className="brand" src={img} alt="img" />
        <img className="brand2" src={img2} alt="img" />
      </div>
    </div>}>


      <Routes>
        <Route
          path="/"
          element={
            <Auth>
              <Home />
            </Auth>
          }
        />
        <Route path="/public" element={<PublicHome />} />
        <Route path="/Portfolio" element={<Portfolio aws={aws} />} />
        <Route path="/screener" element={
          <Screenar aws={aws} />
        } />
        <Route path="/screener/bucket" element={
          <Bucket aws={aws} />
        } />
        <Route path="/screener/bucket/listing" element={
          <BucketListing aws={aws} />
        } />
        <Route path="/Save_search" element={<SaveSearchList aws={aws} />} />
        <Route path="/login" element={<Login2 pageloading={loading} aws={aws} />} />
        <Route path="/register" element={<Register loading={loading} aws={aws} />} />
        <Route path="/auth/verify/account" element={<Otp loading={loading} aws={aws} />} />
        <Route path="/auth/forget-password" element={<ForgetPassword loading={loading} aws={aws} />} />
        <Route path="/auth/reset-password" element={<ResetPassword loading={loading} aws={aws} />} />
        <Route path="/linkedin" element={<Wait />} />
        <Route path="/report" element={<Report />} />
        <Route path="/*" element={<Error />} />
      </Routes>

    </Suspense>

  );
};

export default App;
