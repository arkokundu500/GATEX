import React, { useEffect, useState } from 'react'
import useAxiosFtech from '../../../hooks/useAxiosFtech';
import { CiFacebook } from "react-icons/ci";
import { FaLinkedin } from "react-icons/fa";

import img from "../../../assets/home/teach1.jpg"

const OurTeachers = () => {
    const [instructors,setInstructors] = useState([]);
    const axiosFetch = useAxiosFtech();
    useEffect(() => {
        axiosFetch.get('/popular-instructors').then((data) => {
          setInstructors(data.data)
        }).catch((err) => {console.log(err)})
    },[]);

/*       console.log(instructors)
 */  return (
    <div className='md:w-[80%] mx-auto my-36'> 
    <div>
        <h1  className='text-5xl font-bold text-center dark:text-white'>Our <span className='text-secondary'>Amazing</span> Teachers</h1>
        <div className='w-[40%] text-center mx-auto my-4' >
            <p className='text-gray-500'>Explore some of our best interactive courses for Gate. Get Enrolled and start your prepartion journey</p>
        </div>
    </div>
   {
    instructors ? <> 
    <div className='grid mb-28 md:grid-cols-2 lg:grid-cols-4 w-[90%] gap-6 mx-auto'>
      {
        instructors?.slice(0,4).map((instructor,i) => (
          <div key={i} className='flex dark:text-white hover:translate-y-2 duration-200 cursor-pointer flex-col shadow-md dark:shadow-gray-100 py-8 md:px-8 rounded-md'>
            <div className='flex-col flex gap-6 md:gap-8'>
              <img className='rounded-full border-4 border-gray-300 h-24 w-24 mx-auto' src={instructor?.instructor?.photoUrl || `${img}` } alt="" />

              <div className='flex flex-col text-center'>
                <p className='font-medium txt-lg dark:text-white text-gray-800'> {instructor?.instructor?.name}</p>
                <p className='text-gray-500 whitespace-nowrap'>Instructor</p>
                <p className='text-gray-500 mb-4 whitespace-nowrap'>Total Students : {instructor?.totalEnrolled}</p>
              </div>
              <div className="flex items-center justify-evenly mb-1">
               <CiFacebook className="text-blue-600 w-8 h-8" />
               <FaLinkedin className='text-blue-600 w-8 h-8'/>
             </div>
            </div>
          </div>
        ))
      }
    </div>
    </> : <><p>No Instructor available</p></>
   }
    </div>
  )
}

export default OurTeachers