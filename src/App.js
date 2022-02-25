import logo from './logo.svg';
import './App.css';
import Welcome from './components/Welcome';
import { BrowserRouter as Router, Routes, Route, Link ,Navigate} from "react-router-dom";
import Home from './components/Home';
function App() {
  
  return (
    <div className="App">
     <Router>
      <Routes>
      <Route path="/" element={<Navigate replace to={"/welcome"} />} />          
        <Route path="/welcome" element={<Welcome/>}/>
        <Route path="/home" element={<Home/>}/>
      </Routes>
      </Router>
      
     
    </div>
  );
}

export default App;
