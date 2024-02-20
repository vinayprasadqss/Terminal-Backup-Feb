import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import swal from "sweetalert";

///Load User Functionality
export const LoadUserByAWS = (aws, token) => {
  try {
    const cognitoUser = aws.getCurrentUser();
    let obj = {
      email: cognitoUser?.email,
      email: localStorage?.getItem("aws-email"),
      token: token,
    };
    if (cognitoUser !== null) return [cognitoUser, obj];
    else return [];
  } catch (error) {
    console.log(error);
  }
};

export const LoginByAWS = (aws, email, password) => {
  return new Promise((resolve, reject) => {
    try {
      const authenticationData = {
        Username: email,
        Password: password,
      };

      const authenticationDetails = new AuthenticationDetails(
        authenticationData
      );

      const userData = {
        Username: email,
        Pool: aws,
      };

      const cognitoUser = new CognitoUser(userData);

      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          if (result) {
            cognitoUser.getUserAttributes((err, attributes) => {
              if (err) {
                // console.log("err", err);
                reject(err);
                return;
              }

              // console.log(attributes, "attributes");
              // console.log(result, "res");
              localStorage.setItem("token", result?.accessToken?.jwtToken);
              localStorage.setItem("idtoken", result?.idToken?.jwtToken);
              localStorage.setItem("aws-email", email);
              const obj = {
                email: result?.idToken?.payload["cognito:email"],
                token: result?.accessToken?.jwtToken,
                sub: result?.idToken?.payload?.sub,
                valid: result?.idToken?.payload?.token_use,
                email: result?.idToken?.payload?.email,
                email_verified: result?.idToken?.payload?.email_verified,
                group: result?.idToken?.payload["cognito:groups"],
                expired: result?.idToken?.payload?.exp,
              };

              resolve(obj);
            });
          }
        },
        onFailure: (err) => {
          reject({ error: err });
        },
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

export const SignOutByAWS = (aws) => {
  try {
    const cognitoUser = aws.getCurrentUser();

    localStorage.clear();
    cognitoUser.signOut();
  } catch (error) {
    console.log(error);
  }
};

export const ForgetPasswords = async (aws, email) => {
  try {
    const userData = {
      Username: email,
      Pool: aws,
    };
    const cognitoUser = new CognitoUser(userData);
    const resetPromise = new Promise((resolve, reject) => {
      cognitoUser.forgotPassword({
        onSuccess: (result) => {
          console.log(result);
          resolve({ data: result, status: 200 });
        },
        onFailure: (err) => {
          swal("Oops...", err?.message, "error");
          reject(false);
        },
      });
    });
    return resetPromise;
  } catch (error) {
    console.log(error);
  }
};

export const ResetPasswords = async (aws, email, code, password) => {
  try {
    const userData = {
      Username: email,
      Pool: aws,
    };
    const cognitoUser = new CognitoUser(userData);
    const resetPromise = new Promise((resolve, reject) => {
      cognitoUser.confirmPassword(code, password, {
        onSuccess: () => {
          console.log("Password reset successful.");
          resolve({ data: "Password Reset Successfull" });
        },
        onFailure: (err) => {
          console.error("Password reset failed:", err);
          swal("Oops...", err?.message, "error");
          reject({ data: "Password reset failed" });
        },
      });
    });
    return resetPromise;
  } catch (error) {
    console.log(error);
  }
};
