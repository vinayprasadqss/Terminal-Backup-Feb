import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Error = () => {
    const Navigate = useNavigate();

    useEffect(() => {
        Navigate("/")
    }, [Navigate])

    return (
        <div>Error</div>
    )
}

export default Error