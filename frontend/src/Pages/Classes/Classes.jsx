import React, {useEffect, useState } from 'react'
import useAxiosFtech from '../../hooks/useAxiosFtech';
import { Transition } from '@headlessui/react'
import {Link, useNavigate} from "react-router-dom" 
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useUser from '../../hooks/useUser';
import { toast } from 'react-toastify';


const Classes = () => {
  const [classes,setClasses] = useState([]);
  const {currentUser} = useUser();
 console.log("Current User: ",currentUser)
  const role = currentUser?.role;
  const [enrolledClasses,setEnrolledClasses] = useState([]);
  const navigate = useNavigate()
  const [hoverCard,setHoverCard] = useState(null);
  const axiosFetch = useAxiosFtech()
  const axiosSecure = useAxiosSecure()

  const handleHover = (index) => {
    setHoverCard(index);  
  }
  useEffect(() =>
    {
      axiosFetch
      .get('/classes')
      . then (res => setClasses(res.data))
      .catch (err => console.log(err))
    },[]);

    //handle add to cart 
const handleSelect = (id) => {
 // console.log(id)
 axiosSecure
 .get(`/enrolled-classes/${currentUser?.email}`)
 .then(res => setEnrolledClasses(res.data))
 .catch((er) =>console.log(err));

 if(!currentUser) {
  alert("Please login first")
  return navigate("/login")
 }

 axiosSecure.get(`/cart-item/${id}??email=${currentUser?.email}`)
 .then(res => {
  if(res.data.classId === id) {
    return alert("Already Selected")
  }
  else if(enrolledClasses.find(item => item.classes._id === id)){
    return alert("Already Enrolled")
  }else {
    const data = {
      classId:id,
      userMail: currentUser?.email,
      data:new Date()
    }
    axiosSecure.post('/add-to-cart', data)
    .then(res => {
      alert("Succesfully Added to Cart!");
      console.log(res.data)
    })
  }
 })
}

   /*  console.log(classes) */
  return (
    <div>
      <div className='mt-20 pt-3'>
        <h1 className='text-4xl font-bold text-center text-primary'>COURSES</h1>
      </div>
      <div className='my-16 w-[90%] mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 '>
        {
          classes.map((cls,index) => (
            <div
            key={index}
            className={`relative hover:translate-y-2 duration-150 hover:ring-2 hover:ring-secondary w-64 text-center mx-auto  dark:bg-slate-600 dark:text-white rounded-lg shadow-lg overflow-hidden cursor-pointer
               ${cls.availableSeats < 1 ? 'bg-red-300': 'bg-white' }`}
              onMouseEnter={() => handleHover(index)}
              onMouseLeave={() => handleHover(null)}
            >
              <div className='relative h-48'>
                  <div className={`absolute inset-0 bg-black dark:bg-slate-400 opacity-0 transition-opacity duration-300 ${hoverCard === index ? "opacity-60" : ""}`}></div>
                  <img src={cls.image} alt="" className='object-cover w-full h-full'/>
                  <Transition 
                  show={hoverCard === index}
                  >
                  <div className="transition duration-300 ease-in data-[closed]:opacity-0">
                    <div className='absolute inset-0 flex items-center justify-center'>
                      <button 
                      onClick={() => handleSelect(cls._id)} 
                      title={role == 'admin' || role  === 'instructor' ? 'Instructor/Admin cannot be able to select' ?
                        cls.availableSeats < 1 : 'No Seat Available' : 'You can Select Courses'}
                        disabled = {role === "admin" || role === 'instructor' || cls.availableSeats < 1}
                      className='px-4 py-2 text-white disabled:bg-red-300 bg-secondary duration-300 rounded 
                      hover:bg-red-700'
                      >
                        Add to Cart
                             </button>
                          </div>
                        </div>
                        </Transition>
                    </div>
                     {/*details*/}
                             <div className='px-6 py-2'>
                       <h3 className={`${cls.name.length > 25 ? "text-[14px]" : "text-[16px]"} font-semibold mb-1`}>{cls.name}</h3>
                           <p className='text-gray-500 dark:text-white text-xs '>Instructor: {cls.instructorName}</p>
                                <div className='flex items-center justify-between mt-4'>
                                       <span className='text-black dark:text-white  text-xs'>Available Seats : {cls.availableSeats}</span>
                                 <span className='text-green-500 font-semibold'>Rs.{cls.price}</span>
                            </div>
                    <Link to={`/class/${cls._id}`}><button className='px-4 py-2 mt-4 mb-2 mx-auto text-white
                    disabled:bg-red-300 bg-secondary duration-300 rounded hover:bg-primary '>View</button></Link>
                </div>
              </div>
                    ))
        }

       </div>
   </div>
  )
}

export default Classes