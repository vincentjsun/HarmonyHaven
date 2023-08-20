import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import { access, id, removeAccess } from '../Title';

export const NavBar = () => {
  const location = useLocation();

  const navigate = useNavigate();
  const redirect = () => {
    removeAccess();
    navigate('/');
  }

  return (
    <div className='navbar'>
        <h1 className='title'>WEBSITE NAME</h1>
        {!access ? null : 
        (<div className="side">
          <Link className='linktop' to="/home"> Home </Link>
          <Link className='linktop' to="/search"> Search </Link>
          <Link className='linktop' to="/about"> About </Link>
          hello, {id}
          <button className='logout' onClick={redirect}>logout</button>
      </div>)
} 
    </div>
  )
}
