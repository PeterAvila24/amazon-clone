import React, { useEffect } from "react";
import './App.css';
import Header from './Header'
import Home from "./Home";
import {BrowserRouter as Router , Routes, Route, useLocation} from "react-router-dom";
import Checkout from "./Checkout"
import Login from "./Login";
import Orders from "./Orders";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import Payment from "./Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe ("pk_test_51PLEcqCVMPhZhCCHRGvSl6j6UTkpSOjTnNpm7G2ilP9INdU3JJ43DZyxYNRZghQOJuRfyTI0B6Hj90N57I1eGxK400gHN6yLrx");

function App() {

  const [{}, dispatch] = useStateValue();

  useEffect (() => {
    auth.onAuthStateChanged(authUser => {
      console.log('THE USER IS >>> ', authUser );
      if(authUser){
        dispatch({
          type: 'SET_USER',
          user: authUser
        })

      }else{
          dispatch({
            type: 'SET_USER',
            user: null
          })
      }
    })
  }, []) 

  return (
    //BEM
    <Router>
      <div className="app">
        <ConditionalHeader/>
        <Routes>
          <Route path="/orders" element={<Orders/>}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/checkout" element={ <Checkout/> }/>
          <Route path="/payment" element={ 
            <Elements stripe={promise}>
              <Payment/> 
            </Elements> 
          }/>
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
