import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";

import Nav from "./views/navigate/Nav";
import Landing from "./views/landing/Landing";
import Home from "./views/home/Home";
import Details from "./views/details/Details";
import Form from "./views/Form/Form";
import axios from "axios";
// axios.defaults.baseURL = 'http://localhost:3001'
axios.defaults.baseURL = 'https://deploy-food-production-6c89.up.railway.app/'

function App() {
  const location = useLocation();
  const LandLocation = location.pathname === "/home";

  return (
    <div className="App">
      {LandLocation && <Nav />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Details />} />
        <Route path="/created" element={<Form />} />
      </Routes>
    </div>
  );
}

export default App;
