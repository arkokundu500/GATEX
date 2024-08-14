import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useEffect, useState } from 'react'
import useAxiosSecure from '../../../../hooks/useAxiosSecure'
import useUser from '../../../../hooks/useUser'
import { Navigate } from 'react-router-dom'

const Checkout = ({price,cartItem}) => {
    const URL = `http://localhost:5000/payment-info?${cartItem && `classId=${cartItem}`}`
    const stripe = useStripe()
    const elements = useElements();
    const axiosSecure = useAxiosSecure()
    const { currentUser,isLoading} = useUser();
    const {clientSecret,setClientSecret} = useState('');
    const {succeeded,setSucceeded} = useState('');
    const {message,setMessage} = useState('');
    const {cart,setCart} = useState([]);

    if(price < 0 || !price){
        return <Navigate to="/dashboard/my-selected" replace />
    }
    useEffect(() =>  {
        axiosSecure.get(`/cart/${currentUser?.email}`).then(
            (res) => {
                const classesId = res.data.map(item => item._id);
                setCart(classesId);
            }
        ).catch((err) => console.log(err))
    },[])

    console.log(cart)

  return (
    <>
    <div className='text-center'>
        <h1 className='text-2xl font-bold'>
            Payment Amount : <span className='text-secondary'>{price}</span>
        </h1>
    </div>
    <form>
        <CardElement options={
            {
                base:{
                  fontSize:"16px",
                  theme: "flat",
                  color:"#424770",
                  "placeholder":{
                    color: "#aab7c4",
                  },
                },
                invalid : {
                    color: "9e2146",
                },
            }
        }/>

        <button type="submit" disabled={isLoading || !stripe || !clientSecret }> PAY </button>
        {message && <p className="text-red-500">{message}</p>}
        {succeeded && <p className='text-green-500'>{succeeded}</p>}
    </form>
     <hr/>
    <div className='text-center font-extrabold text-red-600 text-3xl pt-3 pb-2'>
     <p>THIS PAGE IS NOT WORKING</p>
    </div>
    </>
    
  )
}

export default Checkout