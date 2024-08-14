import React from 'react'
import { loadStripe } from "@stripe/stripe-js";
import { Navigate, useLocation } from 'react-router-dom';
import { Elements } from "@stripe/react-stripe-js";
/* import './Payment.css' */
import Checkout from './Checkout';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE)

const Payment = () => {
    const location = useLocation();
    console.log(location)
    const price = location?.state?.price;
    const cartItem = location.state?.itemId;
    if(!price) {
        return <Navigate to="/dashboard/my-selected" />
    }
  return (
    <div className='my-40 stripe-cutom-class'>
      <Elements stripe={stripePromise}>
        <Checkout price={price} cartItem = {cartItem}/>
      </Elements>
    </div>
  )
}

export default Payment