import React, { useEffect, useState } from 'react';
import img from "../../assets/images/logo_login.png"
import { Link, useNavigate } from 'react-router-dom';

import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import { isNameIsValid, isPasswordValid, isValidEmail } from '../../utils/utility';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { useSelector } from 'react-redux';
import { LoadingOutlined } from "@ant-design/icons"




const Register = ({ aws }) => {
    const { isValid } = useSelector((state) => state.user)
    const [name, setName] = useState("");
    const [companyName, setCompanyName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [statePassword, setStatePassword] = useState(true);
    const [captcha, setCaptcha] = useState("")

    const Navigate = useNavigate();

    useEffect(() => {
        loadCaptchaEnginge(6, '#fafafa', '#000', 'numbers');
    }, [])




    const signUpAsync = (name, password, attributeList) => {
        return new Promise((resolve, reject) => {
            aws.signUp(name, password, attributeList, null, (err, result) => {
                if (err) {
                    console.error(err);
                    reject(err?.message);
                } else {
                    resolve(result);
                }
            });
        });
    }

    const handleSubmit = async () => {
        try {
            setLoading(true);
            if (name === "") {
                return sweetAlert("Oops...", "Name is Required!", "error");
            } else if (email === "") {
                return sweetAlert("Oops...", "Email is Required!", "error");
            }
            else if (companyName === "") {
                return sweetAlert("Oops...", "Company Name is Required!", "error");
            }
            else if (password === "") {
                return sweetAlert("Oops...", "Password is Required!", "error");
            }
            else if (confirmPassword === "") {
                return sweetAlert("Oops...", "Confirm Password is Required!", "error");
            }
            if (confirmPassword === "" || password !== confirmPassword) {
                return swal("Oops...", "The password and confirm password fields must match. Please ensure that both fields contain the same password for confirmation.", "error");
            }
            if (validateCaptcha(captcha) === false) {
                return sweetAlert("Oops...", "Invalid Captcha!", "error");
            }

            const attributeList = [
                new CognitoUserAttribute({
                    Name: "name",
                    Value: name,
                }),
                new CognitoUserAttribute({
                    Name: "custom:company",
                    Value: companyName
                })
            ];




            const result = await signUpAsync(email, password, attributeList);
            if (result) {
                swal("Success!", "OTP Send to Your Register Email Addres", "success");
                Navigate("/auth/verify/account", {
                    state: {
                        username: name,
                        email: email,
                        password: password
                    }
                });
            }


        } catch (error) {
            console.error(error);
            sweetAlert("Oops...", error, "error");
        } finally {
            setLoading(false);
        }


    }




    useEffect(() => {
        if (isValid) {
            Navigate("/")
        }
    }, [isValid])


    return (
        <div>
            <section className='register'>
                <div className="register-wrap">
                    <div className='login-logo-wrap'>
                        <img src={img} alt="logo" className='login-logo' />
                    </div>
                    <div className="login-logo-content">
                        <h4>Welcome To BrightQuery</h4>
                        <h5 style={{ fontSize: "1rem" }}>Register</h5>
                    </div>

                    <div className="form-group2">
                        <label>Name</label>
                        <input autoComplete="Nameset" type="text" name={'name'} placeholder='Enter Name' onChange={(e) => setName(e.target.value)} value={name} />
                        {name?.length > 0 && <span className={"error"}>{
                            name?.length < 4
                                ? "Name must be greater then 3 character" : ""}</span>}
                    </div>
                    <div className="form-group2">
                        <label>Company Name</label>
                        <input autoComplete="Nameset" type="text" name={'name'} placeholder='Enter Company Name' onChange={(e) => setCompanyName(e.target.value)} value={companyName} />
                        {companyName?.length > 0 && <span className={"error"}>{
                            companyName?.length < 2
                                ? "Company Name must be greater then 2 character" : ""}</span>}
                    </div>
                    <div className="form-group2">
                        <label>Email</label>
                        <input autoComplete="nope" type="text" name={'email'} placeholder='Enter Work Email' onChange={(e) => setEmail(e.target.value)} value={email} />
                        {email?.length > 0 && <span className={"error"}>{!isValidEmail(email)
                            ? "Invalid Email Address" : ""}</span>}
                    </div>


                    <div className="form-group2">
                        <label>Password</label>
                        <div className="input-group2">
                            <input autoComplete="nope" type={statePassword ? "password" : "text"} name={'password'} id={"PasswordID"} placeholder='Create Password'
                                onChange={(e) => setPassword(e.target.value)} value={password} />
                            <span onClick={() => setStatePassword(!statePassword)}>{statePassword ?
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                    aria-hidden="true"
                                    role="img"
                                    className="component-iconify MuiBox-root css-1t9pz9x iconify iconify--solar"
                                    width="1em"
                                    height="1em"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fill="currentColor"
                                        fillRule="evenodd"
                                        d="M1.606 6.08a1 1 0 0 1 1.313.526L2 7l.92-.394v-.001c0-.001 0 0 0 0l.003.009l.021.045c.02.042.051.108.094.194c.086.172.219.424.4.729a13.37 13.37 0 0 0 1.67 2.237a11.966 11.966 0 0 0 .59.592C7.18 11.8 9.251 13 12 13a8.706 8.706 0 0 0 3.22-.602c1.227-.483 2.254-1.21 3.096-1.998a13.053 13.053 0 0 0 2.733-3.725l.027-.058l.005-.011a1 1 0 0 1 1.838.788L22 7l.92.394l-.003.005l-.004.008l-.011.026l-.04.087a14.045 14.045 0 0 1-.741 1.348a15.368 15.368 0 0 1-1.711 2.256l.797.797a1 1 0 0 1-1.414 1.415l-.84-.84a11.81 11.81 0 0 1-1.897 1.256l.782 1.202a1 1 0 1 1-1.676 1.091l-.986-1.514c-.679.208-1.404.355-2.176.424V16.5a1 1 0 0 1-2 0v-1.544c-.775-.07-1.5-.217-2.177-.425l-.985 1.514a1 1 0 0 1-1.676-1.09l.782-1.203c-.7-.37-1.332-.8-1.897-1.257l-.84.84a1 1 0 0 1-1.414-1.414l.797-.797a15.406 15.406 0 0 1-1.87-2.519a13.457 13.457 0 0 1-.591-1.107a5.418 5.418 0 0 1-.033-.072l-.01-.021l-.002-.007l-.001-.002v-.001C1.08 7.395 1.08 7.394 2 7l-.919.395a1 1 0 0 1 .525-1.314"
                                        clipRule="evenodd"
                                    ></path>
                                </svg> :
                                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="component-iconify MuiBox-root css-1t9pz9x iconify iconify--solar" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M9.75 12a2.25 2.25 0 1 1 4.5 0a2.25 2.25 0 0 1-4.5 0"></path><path fill="currentColor" fillRule="evenodd" d="M2 12c0 1.64.425 2.191 1.275 3.296C4.972 17.5 7.818 20 12 20c4.182 0 7.028-2.5 8.725-4.704C21.575 14.192 22 13.639 22 12c0-1.64-.425-2.191-1.275-3.296C19.028 6.5 16.182 4 12 4C7.818 4 4.972 6.5 3.275 8.704C2.425 9.81 2 10.361 2 12m10-3.75a3.75 3.75 0 1 0 0 7.5a3.75 3.75 0 0 0 0-7.5" clipRule="evenodd"></path></svg>}</span>
                        </div>
                        {password?.length > 0 && <span className={"error"}>{
                            !isPasswordValid(password) ? "Invalid password format. Password must contain at least one uppercase letter, one lowercase letter, one special character, and one number." : password?.length < 6 ? "Password must be greater then 6 character" : ""}</span>}
                    </div>
                    <div className="form-group2">
                        <label>Confirm Password</label>
                        <input id='cp' autoComplete="nope" type="password" name={'confirmPassword'} placeholder='Confirm Password' onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} />
                        {confirmPassword?.length > 0 && <span className={"error"}> {(password !== confirmPassword) ? "Password is not match" : ""}</span>}
                    </div>
                    <div className="captcha">
                        <label>Captcha</label>
                        <div className="input-captcha">
                            <LoadCanvasTemplate reloadText="Reload Captcha" />
                            <input onChange={(e) => setCaptcha(e.target.value)}
                                value={captcha} type='text'
                                placeholder='Captcha Text' />
                        </div>

                    </div>

                    <div className="links">
                        <Link to="/login" className="link"
                            style={{ marginTop: "1rem" }}>Already have an Account? Login</Link>

                    </div>
                    <button className='login-btn' onClick={handleSubmit}
                        disabled={loading}>{loading ? <LoadingOutlined />
                            : "Create Account"}</button>
                </div>
            </section>

        </div>
    )
}

export default Register