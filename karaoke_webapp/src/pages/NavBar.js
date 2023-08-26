import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import { access, id, removeAccess } from '../Title';
import logo from '../assets/logo.png';

export const NavBar = () => {
  const location = useLocation();

  const navigate = useNavigate();
  const redirect = () => {
    removeAccess();
    navigate('/');
  }

  return (
    <div className='navbar'>
      <img className='logo' src={logo}/>
        <h1 className='title'>Harmony Haven</h1>
        {!access ? null : 
        (<div className="side">
          <Link className='linktop' to="/home"> Home </Link>
          <Link className='linktop' to="/search"> Search </Link>
          <Link className='linktop' to="/about"> About </Link>
          <Link className='linktop' to="/replays"> Replay </Link>
          hello, {id}
          <button className='logout' onClick={redirect}>logout</button>
      </div>)
} 
    </div>
  )
}