import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ProfileButton from '../profile/ProfileButton'
import LogoutButton from './LogoutButton'
import img from "../../assets/images/logo4.png";
const Header = () => {
    const Navigate = useNavigate()
    return (
        <header className="main-header">
            <div className="container">
                <div
                    className="logo"
                    onClick={() => Navigate("/")}
                    style={{ cursor: "pointer" }}
                >
                    <img src={img} width="150px" alt=""></img>
                    <span><span className={"logoText"}>BQ Terminal </span> {import.meta.env.VITE_APP_VERSION}</span>
                </div>
                <div className="nav">
                    <Link className="h-link" to="/screener"> Screener</Link>
                    <Link className="h-link" to="/Save_search"> Saved Searches</Link>
                    <Link className="h-link" to="/portfolio"> Portfolio</Link>
                    <ProfileButton />
                    <LogoutButton />
                </div>
            </div>
        </header>
    )
}

export default Header