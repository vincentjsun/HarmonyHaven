import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import './App.css';

export const NavBar = () => {
  const location = useLocation();

  return (
    <div className='navbar'>
        <h1 className='title'>WEBSITE NAME</h1>
        {location.state === null ? null : 
        (<div className="side">
          <Link className='linktop' to="/home"> Home </Link>
          <Link className='linktop' to="/search"> Search </Link>
          <Link className='linktop' to="/about"> About </Link>
      </div>)
} 
    </div>
  )
}
