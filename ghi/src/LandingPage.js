import React from "react";
import { NavLink } from 'react-router-dom'
import landing2 from './images/landing2.jpg'

const LandingPage = () => {
    const backgroundImage = `url(${landing2})`
    const h1Style = {
        fontFamily: 'fantasy',
        marginBottom: '10rem'
    }


return (
    // <nav className="nav">
    //     <div>
    //         <NavLink to="/login">Login</NavLink>
    //         <NavLink to="/signup">Signup</NavLink>
    //     </div>
    // </nav>

<div className="hero min-h-screen" style={{ backgroundImage }}>
  <div className="hero-overlay bg-opacity-50"></div>
  <div className="hero-content text-center text-neutral-content">
    <div className="max-w-md">
      <h1  style={h1Style} className="mb-6 text-6xl font-bold">Meal-ting Pot</h1>
       <div className="mt-10 flex flex-col items-center justify-center gap-y-6">
        <a href="/login" className="w-full rounded-md bg-yellow-600 px-4 py-2 text-bg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" style={{ textDecoration: 'none' }}>Login</a>
        <a href="/signup" className="w-full rounded-md bg-gray-400 px-4 py-2 text-bg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" style={{ textDecoration: 'none' }}>Sign Up</a>
      </div>
    </div>
  </div>
</div>
)
}

export default LandingPage
