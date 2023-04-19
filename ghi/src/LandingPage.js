import React from "react";
import { NavLink } from 'react-router-dom'

const LandingPage = () => {

return (
    <nav className="nav">
        <div>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">Signup</NavLink>
        </div>
    </nav>
)
}

export default LandingPage
