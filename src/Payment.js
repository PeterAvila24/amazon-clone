import React, { useEffect, useState } from 'react'
import './Payment.css'
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import { Link, useNavigate } from 'react-router-dom';
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './reducer';
import axiosInstance from './axios';
import { db } from "./firebase";
import { doc, setDoc, collection } from 'firebase/firestore';


function Payment() {
  const [{basket, user}, dispatch] = useStateValue();

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {

    const getClientSecret = async () => {
      try {
        const basketTotal = getBasketTotal(basket) * 100; // Ensure the amount is in cents

        if (basketTotal >= 50) { // Minimum amount check (50 cents in USD)
          const response = await axiosInstance.post(`/payments/create?total=${basketTotal}`);
          setClientSecret(response.data.clientSecret);
        } else {
          throw new Error('Total amount must be at least $0.50');
        }
      } catch (err) {
        console.error('Error fetching client secret:', err);
        setError(err.message);
      }
    };

    getClientSecret();
  }, [basket]);

  console.log('The scecret is >>>', clientSecret);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
  
      if (error) {
        setError(`Payment failed: ${error.message}`);
        setProcessing(false);
      } else {
        
        const ordersRef = collection(db, 'users', user?.uid, 'orders');
        const orderDoc = doc(ordersRef, paymentIntent.id);
        await setDoc(orderDoc, {
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });

        setSucceeded(true);
        setError(null);
        setProcessing(false);
  
        dispatch({
          type: 'EMPTY_BASKET',
        });
        navigate('/orders');
      }
    } catch (err) {
      setError(`Payment failed: ${err.message}`);
      setProcessing(false);
    }
  };

  const handleChange = event => {

    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  }

  return (
    <div className='payment'>
      <div className='payment_container'>
        <h1>
          Checkout (<Link to="/checkout"> {basket?.length} items</Link>)
        </h1>

        <div className='payment_section'>
            <div className='payment_title'>
                <h3>Delivery Address</h3>
            </div>
            <div className='payment_address'>
              <p>{user?.email}</p>
            </div>
        </div>
        <div className='payment_section'>
          <div className='payment_title'>
            <h3>Review items in delivery</h3>
          </div>
          <div className='payment_items'>
            {basket.map(item => 
              <CheckoutProduct
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  price={item.price}
                  rating={item.rating}
              />
            )}
          </div>

        </div>
        <div className='payment_section'>
          <div className='payment_title'>
            <h3>Payment Method</h3>
          </div>
          <div className='payment_details'>

            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange}/>

              <div className='payment_priceContainer'>
                <CurrencyFormat
                    renderText={(value) => (
                      <h3>Order Total: {value}</h3>
                    )}
                    decimalScale={2}
                    value={getBasketTotal(basket)}
                    displayType='text'
                    thousandSeparator={true}
                    prefix='$'
                
                
                />
                <button disabled={processing || disabled || succeeded}>
                  <span> {processing ? <p>Processing</p> : "Buy Now" }
                  </span>
                </button>
              </div>
                {error && <div>{error}</div>}

            </form>

          </div>

        </div>

      </div>
    </div>
  )
}

export default Payment
