import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import img from "../assets/images/logo_login.png";
import img3 from "../assets/images/linked.png";
import "../assets/scss/login.scss"

import { useDispatch, useSelector } from "react-redux";
import { linkedinLogin, EmailLogin } from "../redux/action";

import { useFormik } from "formik";
import * as Yup from "yup";
import swal from "sweetalert";

const validateSchema = Yup.object().shape({
    email: Yup.string()
        .email("Please enter a valid email")
        .required("This field is required"),
    password: Yup.string()
        .required("This field is required")
        .min(8, "Password must be 8 or more characters"),
    /*        .matches(/(?=.*[a-z])(?=.*[A-Z])\w+/, "Password should contain at least one uppercase and lowercase character")
              .matches(/\d/, "Password should contain at least one number")
              .matches(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, "Password should contain at least one special character"),*/
});

const Login = ({ loading }) => {
    const [statePassword, setStatePassword] = useState(true);
    const { isValid } = useSelector((state) => state.user);
    const Navigate = useNavigate();
    const dispatch = useDispatch();

    // const [loading, setLoading] = useState(false);

    const emailLogin = async (values) => {
        try {
            localStorage.clear()
            const result = await EmailLogin(values);
            // console.log("res", result?.data?.access_token?.length > 0);
            if (result?.data?.access_token?.length > 0) {
                localStorage.setItem("tokenEmail", result?.data?.access_token);
                localStorage.setItem("email", values?.email);
                swal("Success!", "Login Successfully ", "success");
                // Navigate("/");
                dispatch({ type: "login", payload: { name: "user1" } });
            } else {
                // swal("Invalid Email or Password", "error");
                sweetAlert("Oops...", "Invalid Email or Password!", "error");
            }
        } catch (error) {
            console.log(error);
            sweetAlert("Oops...", "Invalid Email or Password!", "error");
        } finally {
        }
    };

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: validateSchema,
        onSubmit: (values, { resetForm }) => {
            // console.log(values);

            setTimeout(() => {
                emailLogin(values);
                resetForm();
            }, 10);
        },
    });
    const onEmailChange = (e) => {
        formik.handleChange(e);
    };

    const handleLogin = async () => {
        try {
            const result = await linkedinLogin();
            if (result?.data) {
                setTimeout(() => {
                    window.open(result?.data?.auth_url, "_blank");
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (isValid) {
            Navigate("/");
        }
    }, [isValid]);

    return (
        <div>
            {loading ? (
                ""
            ) : (
                <section className="login">
                    <div className="login-wrap">
                        <div className="login-logo-wrap">
                            <img src={img} alt="logo" className="login-logo" />
                        </div>
                        <div className="login-logo-content">
                            <h4>Welcome To BrightQuery</h4>
                            <h5>Please Log In</h5>
                        </div>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="form-group2">
                                <label>Email</label>
                                <input
                                    type="text"
                                    name={"email"}
                                    id={"EmailID"}
                                    placeholder="Enter your Email"
                                    onChange={onEmailChange}
                                    value={formik.values.email}
                                    autoComplete={"username"}
                                />
                                <span className={"error"}>
                                    {formik.errors.email ? formik.errors.email : ""}
                                </span>
                            </div>
                            <div className="form-group2">
                                <label>Password</label>
                                <div className="input-group2">
                                    <input
                                        type={statePassword ? "password" : "text"}
                                        name={"password"}
                                        id={"PasswordID"}
                                        placeholder="Enter your Password"
                                        onChange={formik.handleChange}
                                        value={formik.values.password}
                                        autoComplete={"current-password"}
                                    />
                                    <span onClick={() => setStatePassword(!statePassword)}>
                                        {statePassword ? (
                                            <i className="fa fa-eye-slash" aria-hidden="true"></i>
                                        ) : (
                                            <i className="fa fa-eye" aria-hidden="true"></i>
                                        )}
                                    </span>
                                </div>
                                <span className={"error"}>
                                    {formik.errors.password ? formik.errors.password : ""}
                                </span>
                            </div>
                            {/*<Link to="/forget" className="forget-link">Forget password?</Link>*/}
                            <button
                                className="login-btn"
                                disabled={loading}
                                type={"submit"}
                                onSubmit={formik.onSubmit}
                            >
                                {loading ? "Loading..." : "Log In"}
                            </button>
                        </form>
                        <div className="or">
                            <span></span>OR<span></span>
                        </div>
                        <br></br>
                        <button className="linkedin-btn" onClick={handleLogin}>
                            <img className="btn-logo" src={img3} alt="linked" />
                            Continue with LinkedIn
                        </button>
                        {/* <button className='google-btn'><img className='btn-logo' src={img2} alt='google' />
                        Continue with Google</button> */}
                    </div>
                </section>
            )}
        </div>
    );
};

export default Login;
