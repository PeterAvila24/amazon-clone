import React from "react";
import './App.css';
import Header from './Header'
import Home from "./Home";
import {BrowserRouter as Router , Routes, Route, useLocation} from "react-router-dom";
import Checkout from "./Checkout"
import Login from "./Login";

function App() {
  return (
    //BEM
    <Router>
      <div className="app">
        <ConditionalHeader/>
        <Routes>
          <Route path="/login" element={<Login />}/>
          <Route path="/checkout" element={ <Checkout/> }/>

          <Route path="/" element={<Home />}/>

        </Routes>
      </div>
    </Router>
  );
}

function ConditionalHeader(){
  const location = useLocation();
  
  return location.pathname !== '/login' ? <Header/> : null;
}

export default App;
