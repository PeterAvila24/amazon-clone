import React from 'react'
import "./Checkout.css"
import Subtotal from "./Subtotal"

function Checkout() {
  return (
    <div className='checkout'>
      <div className='checkout_left'>
        <img className='checkout_ad' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRwOotfWJ3_8KQTjJ7erRqJpVJz55Bd0bzdA&s' 
        alt='' />

        <div>
            <h2 className='checkout_title'>
            Your shopping basket
            </h2>
        </div>
      </div>

      <div className='checkout_right'>
        <Subtotal/>

      </div>
    </div>
  )
}
 
export default Checkout
