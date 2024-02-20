import React, { useState } from 'react'
import img from "../../assets/images/logo_login.png"
import { Link, useNavigate } from "react-router-dom"
import { ForgetPasswords } from '../../Aws/Aws-Config'
import swal from 'sweetalert'
import { isValidEmail } from '../../utils/utility';
import { LoadingOutlined } from "@ant-design/icons";



const ForgetPassword = ({ aws }) => {
    const [email, setEmail] = useState("")
    const [resetSuccess, setResetSuccess] = useState(false);
    const [loading, setLoading] = useState(false)
    const Navigate = useNavigate()

    const handleClick = async () => {
        if (email === "") {
            return swal("Oops...", "Email is Required!", "error");
        }
        setLoading(true)
        try {

            const data = await ForgetPasswords(aws, email);
            if (data) {
                console.log(data)
                setResetSuccess(true);
                swal("Success!", "OTP sent to your register email addres", "success");
                Navigate("/auth/reset-password", { state: { email: email } })
            } else {
                setResetSuccess(false)
                return swal("Oops...", "Something went wrong", "error");
            }
        } catch (error) {
            console.log(error);
        }
        setLoading(false)
    }

    return (
        <section className='register'>
            <div className="register-wrap">
                <div className='login-logo-wrap'>
                    <img src={img} alt="logo" className='login-logo' />
                </div>
                <div className="login-logo-content">
                    <h4>Welcome To BrightQuery</h4>
                    <h5 style={{ marginTop: "1rem" }}>Forgot Password</h5>
                </div>
                <div className="form-group2">
                    <label>Registered Email</label>
                    <input type="text" placeholder='Enter your Registered Email Address'
                        onChange={(e) => setEmail(e.target.value)} value={email} />
                    {<span className={"error"}>{email?.length > 0 && !isValidEmail(email)
                        ? "Invalid Email Address" : ""}</span>}
                    <p className='forget-info-text'>We’ll send a verification code to this email
                        if it matches an existing Bright Query account.</p>
                </div>
                <div className="links">
                    <Link className='link' to="/login">Back to Login page?</Link>
                </div>
                <button className='login-btn' onClick={handleClick}
                    disabled={loading}>{loading ? <LoadingOutlined /> : "Submit"}</button>


            </div>
        </section>
    )
}

export default ForgetPassword