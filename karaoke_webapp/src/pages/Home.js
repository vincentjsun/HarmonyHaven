import React from 'react'
import './App.css';
import Pitch from '../components/Pitch';
import screenshot from '../assets/screenshot.png';
import { useLocation, useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const checkout = () => {
    navigate('/search');
  }

  return (
    <div className='apphome'>
      <h1 className='tagline'>website tagline</h1>
      <h3 className='text'>Get started now or learn more:</h3>
      <Pitch />
      <button className='navbutton' onClick={checkout}>Try Karaoke</button>
      <h3 className='text3'>Example:</h3>
      <img className='screen' src={screenshot}/>
    </div>
    )
  }
  
  export default Home;