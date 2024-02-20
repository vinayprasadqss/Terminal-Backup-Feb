import React from "react";
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SignOutByAWS } from '../../Aws/Aws-Config';
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} from "amazon-cognito-identity-js";
import { clearzAllCookies } from "../../utils/utility";

const userPool = new CognitoUserPool({
  UserPoolId: import.meta.env.VITE_APP_USERPOOL_ID,
  ClientId: import.meta.env.VITE_APP_APPCLIENT_ID,
});
const LogoutButton = () => {

  const Navigate = useNavigate()
  const dispatch = useDispatch()
  const handleLogout = () => {
    swal({
      title: "Are you sure you want to logout?",
      icon: "warning",
      buttons: ["Cancel", "OK"],
    }).then(function (isConfirm) {
      if (isConfirm) {
        SignOutByAWS(userPool);
        localStorage.clear();
        // clearAllCookies();
        clearzAllCookies()
        dispatch({ type: "logout" });
        Navigate("/login");
        swal({
          title: "Logout successfully",
          icon: "success",
        });


      } else {
      }
    });
  };

  return (
    <button onClick={handleLogout}>
      Log Out
    </button>
  );
};

export default LogoutButton; 
