import React from 'react'
import { Link } from 'react-router-dom';
import './App.css';

export const NavBar = () => {
  return (
    <div className='navbar'>
        <h1 className='title'>WEBSITE NAME</h1>
        <div className="side">
          <Link className='linktop' to="/home"> Home </Link>
          <Link className='linktop' to="/search"> Search </Link>
          <Link className='linktop' to="/about"> About </Link>
      </div>
    </div>
  )
}
