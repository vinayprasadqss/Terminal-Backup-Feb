import React from "react";
import { useSelector } from "react-redux";
import Redirect from "./Redirect";

const Auth = ({ children }) => {
  const { isValid, user } = useSelector((state) => state.user);
  const token =
    localStorage.getItem("token") || localStorage.getItem("tokenEmail");

  let checkGroup = user?.group?.find((f) => f === import.meta.env.VITE_APP_APP_NAME);
  let flag = checkGroup ? "Allow" : "Not";
  return isValid && token && flag === "Allow" ? (
    children
  ) : (
    <Redirect isValid={isValid} flag={flag} />
  );
  // cognitoUser !== null && token ? children : <Redirect isValid={cognitoUser === null ? false : true} />
};

export default Auth;
