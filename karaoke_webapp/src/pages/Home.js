import React from 'react'
import './App.css';
import screenshot from '../assets/screenshot.png';
import { useLocation, useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const checkout = () => {
    navigate('/search');
  }

  return (
    <div className='apphome'>
      <h1 className='tagline'>Unleash your inner star.</h1>
      <h3 className='text'>Get started now or learn more:</h3>
      <button className='navbutton' onClick={checkout}>Try Karaoke</button>
      <h3 className='text3'>Preview:</h3>
      <img className='screen' src={screenshot}/>
    </div>
    )
  }
  
  export default Home;