import React, { useEffect, useState } from 'react'
import img from "../../assets/images/logo_login.png"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { ResetPasswords } from '../../Aws/Aws-Config'
import swal from 'sweetalert'
import { isPasswordValid, isValidEmail } from '../../utils/utility'
import OTPInput from 'react-otp-input'
import { LoadingOutlined } from "@ant-design/icons";
import { RESETMSG } from '../../constants/Tooltip'

const ResetPassword = ({ aws }) => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [statePassword, setStatePassword] = useState(true);
    const location = useLocation();
    const Navigate = useNavigate();

    const handleClick = async () => {
        setLoading(true)
        try {
            if (password === "") {
                return swal("Oops...", "Password is Required!", "error");
            }
            if (otp === "") {
                return swal("Oops...", "OTP is Required!", "error");
            }
            if (confirmPassword === "" || password !== confirmPassword) {
                return swal("Oops...", "The password and confirm password fields must match. Please ensure that both fields contain the same password for confirmation.", "error");
            }
            const result = await ResetPasswords(aws, location?.state?.email, otp, password);
            console.log(result);
            if (result?.data === "Password Reset Successfull") {
                swal("Success!", "Your Password Reset Successfully", "success");
                Navigate("/login")
            } else {
                return swal("Oops...", "Password Reset Fail", "error");

            }
        } catch (error) {
            console.log(error);


        } finally {
            setLoading(false)
        }
        setLoading(false)
    }




    useEffect(() => {
        if (location?.state === null) {
            Navigate("/auth/forget-password")
        }
    }, [location?.state])


    return (
        <section className='register'>
            <div className="register-wrap">
                <div className='login-logo-wrap'>
                    <img src={img} alt="logo" className='login-logo' />
                </div>
                <div className="login-logo-content">
                    <h4>Welcome To BrightQuery</h4>
                    <h5 style={{ marginTop: "1rem", }}>Reset Password</h5>
                </div>
                <div className="otp-msg-header">
                    <p>{RESETMSG}</p>
                    {/* <p>For Reset Password we send the OTP to your Register Email Address <span>{location?.state?.email}</span></p> */}
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
                <div className="otp">
                    <label>OTP</label>

                    <OTPInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        renderSeparator={<span>-</span>}
                        renderInput={(props) => <input {...props} />}
                        containerStyle={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}
                        inputStyle={{
                            width: "2.5rem", height: "2.5rem", border: "1px solid #e1e1e1",
                            borderRadius: "5px", outline: "none", color: "#0c3aad"
                        }}

                    />
                </div>


                <div className="links">
                    <Link className='link' to="/login">Back to Forgot Password page?</Link>
                </div>
                <button className='login-btn' onClick={handleClick} >{loading ? <LoadingOutlined /> : "Submit"}</button>


            </div>
        </section >
    )
}

export default ResetPassword