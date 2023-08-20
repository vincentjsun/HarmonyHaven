import Main from './App';
import Search from './Search';
import Song from './Song';
import Home from './Home';
import Login from './Login';
import Test from './Test';
import { NavBar } from './NavBar';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import About from './About';
import Signup from './Signup';

function Routing() {
  return (
    <div className='App'>
      <Router>
        <NavBar/>
        <Routes>
          <Route path="/home" exact element={<Home/>}/>
          <Route path="/search" exact element={<Search/>}/>
          <Route path="/song" exact element={<Song/>}/>
          <Route path="/pitch" exact element={<Main/>}/>
          <Route path="/about" exact element={<About/>}/>
          <Route path="/" exact element={<Login/>}/>
          <Route path="/signup" exact element={<Signup/>}/>
          <Route path="/test" exact element={<Test/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default Routing; 