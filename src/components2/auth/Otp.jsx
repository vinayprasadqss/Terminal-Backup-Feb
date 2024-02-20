import React, { useEffect, useState } from 'react';
import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import img from "../../assets/images/logo_login.png";
import OtpInput from 'react-otp-input';
import { useSelector } from 'react-redux';
import { LoadingOutlined } from "@ant-design/icons"


const Otp = ({ aws }) => {
    const { isValid } = useSelector(state => state.user)
    const [otp, setOtp] = useState('');
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const Navigate = useNavigate()


    const confirmRegistrationAsync = (cognitoUser, otp) => {
        return new Promise((resolve, reject) => {
            cognitoUser.confirmRegistration(otp, true, (err, result) => {
                if (err) {
                    console.error('Error verifying OTP', err);
                    reject(err?.message);
                } else {
                    resolve(result);
                }
            });
        });
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const userData = {
                Username: location?.state?.email,
                Pool: aws,
            };
            const cognitoUser = new CognitoUser(userData);
            await confirmRegistrationAsync(cognitoUser, otp);
            swal("Success!", "Account Verified Successfully ", "success");
            Navigate("/login");

        } catch (error) {
            console.error('Unexpected error:', error);
            sweetAlert("Oops...", error, "error");
        }
        finally {
            setLoading(false)
        }

    };


    useEffect(() => {
        if (isValid) {
            Navigate("/")
        } else {
            if (location?.state === null) {
                Navigate("/login")
            }
        }

    }, [location?.state, isValid])
    return (
        <section className='login'>
            <div className="login-wrap">
                <div className='login-logo-wrap'>
                    <img src={img} alt="logo" className='login-logo' />
                </div>
                <div className="login-logo-content">
                    <h4>Welcome To BrightQuery</h4>
                    {/* <h5 style={{ fontSize: "0.8rem", color: "#b4b4b4", fontWeight: "500" }}>OTP Verification</h5> */}
                </div>
                <div className="otp-msg-header">
                    <p>For account verification we have sent the One Time Password to your register email address <span>{location?.state?.email}</span></p>
                </div>
                <div className="otp">
                    <label>Enter OTP</label>

                    <OtpInput
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


                    {/* <span className={"error"}>{formik.errors.email ? formik.errors.email : ""}</span> */}
                </div>
                <div className="links">
                    <Link className='link' to="/register">Back to Register page?</Link>
                </div>

                <button onClick={handleSubmit} disabled={otp === ""} className='login-btn'>{loading ? <LoadingOutlined /> : "Verify Your Account"}</button>
            </div>
        </section>


    );
};

export default Otp;
