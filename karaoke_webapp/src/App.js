import './App.css';
import './pitch.js'
import Graph from './components/Graph';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div style={
        {
          width: '600px',
          height: '300px'
        }
      }>
      <Graph message={[[3,9,6],[4,2,6]]}/>
      </div>
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
