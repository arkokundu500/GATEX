import React, { useContext, useState, useRef } from 'react'
import { useForm } from "react-hook-form";
import { AiOutlineHeatMap, AiOutlineLock, AiOutlineMail, AiOutlinePhone, AiOutlinePicture, AiOutlineUser } from "react-icons/ai";
import { FiMapPin } from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom';
import GoogleLogin from '../../components/Social/GoogleLogin';
import { AuthContext } from '../../utilities/providers/AuthProvider';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const {signUP, updateUser, setError } = useContext(AuthContext)
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    setError('')
    signUP(data.email , data.password) .then((result) =>
    {
      const user = result.user;
      if(user) {
          return updateUser(data.name , data.photoUrl ) .then (() =>
          {
            const userImp = {
              name : user?.displayName,
              email: user?.email,
              photoURL : user?.photoURL,
              role: 'user' ,
              gender : data.gender,
              phone: data.phone,
              address: data.address,
            };
            if(user.email && user.displayName)
            {
              return axios
              .post('http://localhost:5000/new-user', userImp)
              .then(()=> {
                setError("");
                navigate("/");
                return "Registration Successful";
              }) .catch((err) => {
                setError(err.code);
                throw new Error(err)
              });
            }
          }).catch((err) => {
            setError(err.code);
            throw new Error(err)
          });
      }
    })
    };
  const password = watch('password','')
  return (
    <div className='flex justify-center items-center pt-14 bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-md'>
        <h2 className='text-3xl font-bold text-center mb-6'> Please Register </h2>

        {/* form data */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex items-center gap-5'>
            <div className='mb-4'>
              <label htmlFor='name' className='block text-gray-700 font-bold'>
                <AiOutlineUser className='inline-block mr-2 mb-1 text-lg' />
                Name
              </label>
              <input type='text' name="name" placeholder='Enter your name' {...register("name", { required: true,minLength:{
                value:4,
                message:"Enter a proper name",
              } })}
                className='w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-secondary'
              />
               <div className='text-red-500 text-sm w-full mt-1'>
              {errors.name && <p>{errors.name.message}</p>}
              </div>

            </div>
            <div className='mb-4'>
              <label htmlFor='email' className='block text-gray-700 font-bold'>
                <AiOutlineMail className='inline-block mr-2 mb-1 text-lg' />
                Email
              </label>
              <input type='email' placeholder='Enter your Email' name="email" {...register("email", { required: true,
                minLength:{
                  value:4,
                  message:"Enter a proper email",
                }
              })}
                className='w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-secondary'
              />
               <div className='text-red-500 text-sm w-full mt-1'>
              {errors.email && <p>{errors.email.message}</p>}
              </div>
            </div>
          </div>

          <div className='flex items-center gap-5'>
            <div className='mb-4'>
              <label htmlFor='password' className='block text-gray-700 font-bold'>
                <AiOutlineLock className='inline-block mr-2 mb-1 text-lg' />
                Password
              </label>
              <input type='password' name='password' placeholder='Enter password'   {...register("password", 
              { required: true, 
                minLength: {
                  value: 8,
                  message: "Password must have at least 8 characters"
                } 
              })}
                className='w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-secondary'
              />
              <div className='text-red-500 text-sm w-full mt-1'>
              {errors.password && <p>{errors.password.message}</p>}
              </div>
            </div>
            <div className='mb-4'>
              <label htmlFor='confirmPassword' className='block text-gray-700 font-bold'>
                <AiOutlineLock className='inline-block mr-2 mb-1 text-lg' />
                Confirm Password
              </label>
              <input type='password' name='confirmPassword' placeholder='Re-enter your Password' {...register("confirmPassword", { 
                required: true , 
                validate : (value) => value === password || "Password is not correct",})}
                className='w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-secondary'
              />
               <div className='text-red-500 text-sm w-full mt-1'>
              {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
              </div>
            </div>
          </div>
          <div className='flex items-center gap-5'>
            <div className='mb-4'>
              <label htmlFor='phoneNumber' className='block text-gray-700 font-bold'>
                <AiOutlinePhone className='inline-block mr-2 mb-1 text-lg' />
                Phone Number
              </label>
              <input type='telephone' placeholder='Enter phone number' {...register("phoneNumber", { required: true })}
                className='w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-secondary'
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='photUrl' className='block text-gray-700 font-bold'>
                <AiOutlinePicture className='inline-block mr-2 mb-1 text-lg' />
                Photo URL
              </label>
              <input type='text' placeholder='Enter your Email' {...register("photoUrl")}
                className='w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-secondary'
              />
            </div>
          </div>

          <div>
            <div className='mb-4'>
              <label htmlFor='gender' className='block text-gray-700 font-bold'>
                <AiOutlineUser className='inline-block mr-2 mb-1 text-lg' />
                Gender
              </label>
              <select {...register("gender", { required: true })} className='w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-secondary'>
                <option value="">Select your Gender</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </select>
            </div>
           <div className='mb-4'>
            <label htmlFor='address' className='block text-gray-700 font-bold'>
              <FiMapPin className='inline-block mr-2 mb-1 text-lg' />
              Address
            </label>
            <textarea
              {...register("address", { required: true })}
              rows="3"
              className='w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-secondary'
              placeholder='Enter address'
            >
            </textarea>
            </div>
          </div>
          <div className='text-center'>
            <button type="submit" className='bg-secondary hover:bg-primary text-white py-2 px-4 rounded-md'>Register</button>
            {/* {
              errors && 
              ( 
              <div className='text-red-500 text-sm w-full mt-1'>
                <p>Password Does not matching</p>
              </div>)
            } */}
          </div>
        </form>
        <p className='text-center mt-2'>
          Already Have an Account? <Link to="/login" className='underline text-secondary ml-1'>Login</Link>
        </p>
        <GoogleLogin />
      </div>
    </div>
  )
}

export default Register