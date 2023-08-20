import Main from './App';
import Test from './Search';
import Test2 from './Song';
import Home from './Home';
import Login from './Login';
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
          <Route path="/search" exact element={<Test/>}/>
          <Route path="/song" exact element={<Test2/>}/>
          <Route path="/pitch" exact element={<Main/>}/>
          <Route path="/about" exact element={<About/>}/>
          <Route path="/" exact element={<Login/>}/>
          <Route path="/signup" exact element={<Signup/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default Routing; 