import './pages/App.css';
import React, { useState } from 'react';
import { callMeMaybe, perc } from './components/SongPitches'; 
import Graph from './components/Graph';
import Pitch from './components/Pitch';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
// import FilePitch from './FilePitch';
// import SpeechToTextComponent from './SpeechToText';
function App() {
  return (
    <div className="App">
        <Pitch />
      {/* <SpeechToTextComponent></SpeechToTextComponent> */}
      {/* <FilePitch/> */}
      {/* <div style={ 
        {
          width: '600px',
          height: '300px'
        }
      }>
      <Graph message={[callMeMaybe,song]}/>
      </div> */}
      <Router>
        <Routes>
          <Route path = "/login" element={<Login />} />
          <Route path = "/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;