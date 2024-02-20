import { Popover } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const ProfileButton = () => {
    const { user } = useSelector(state => state.user);
    const [name, setName] = useState("")

    function printFirstAndLastLetters(name) {
        // Split the name into words
        const words = name.split(' ');
        // If there's only one word in the name
        if (words.length === 1) {
            return setName(`${name.charAt(0)}`);
        }
        // If there are multiple words in the name
        const firstWord = words[0];
        const lastWord = words[words.length - 1];
        return setName(`${firstWord.charAt(0)}${lastWord.charAt(0)}`);
    }

    useEffect(() => {
        printFirstAndLastLetters(user?.name || "")
    }, [user?.name])





    const content = (
        <div className='pcontent'>
            <h5>Hi, {user?.name || ""}</h5>
            {/* <Link className='link' to="/profile"><i className='bx bx-user'></i> Profile</Link> */}
            <Link className='link' to="/portfolio"><i className='bx bx-file'></i>Portfolio</Link>
            <Link className='link' to="/Save_search"><i className='bx bx-file-find' ></i>Save Search</Link>
        </div>
    );

    return (
        <div className='profile-btn'>
            <Popover placement="bottom"
                content={content} trigger="click" style={{ width: "200px" }}>
                <p>{name || ""}</p>
                {/* <p><i className='bx bx-user'></i></p> */}
            </Popover>

        </div>
    )
}

export default ProfileButton