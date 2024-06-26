import React from 'react'
import "./Checkout.css"
import Subtotal from "./Subtotal"
import CheckoutProduct from './CheckoutProduct';
import { useStateValue } from './StateProvider';

function Checkout() {

  const [{ basket, user }, dispatch] = useStateValue();

  return (
    <div className='checkout'>
      <div className='checkout_left'>
        <img className='checkout_ad' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRwOotfWJ3_8KQTjJ7erRqJpVJz55Bd0bzdA&s' 
        alt='' />

        <div>
          <h3>Hello, {user ? user.email : 'Guest'}</h3>
          <h2 className='checkout_title'>
          Your shopping basket
          </h2>

          {basket.map(item => (
            <CheckoutProduct
            id = {item.id}
            title = {item.title}
            image = {item.image}
            price = {item.price}
            rating = {item.rating}
            />
          ))}


        </div>
      </div>

      <div className='checkout_right'>
        <Subtotal/>
      </div>
    </div>
  )
}
 
export default Checkout
