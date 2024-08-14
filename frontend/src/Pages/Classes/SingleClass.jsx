import React, { useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import useUser from '../../hooks/useUser';
import useAxiosFtech from '../../hooks/useAxiosFtech';
import useAxiosSecure from '../../hooks/useAxiosSecure';

import {DialogActions} from "@mui/material";
import{BiTime} from "react-icons/bi";
import { FaLanguage,FaLevelUpAlt,FaUser,FaUsers } from 'react-icons/fa';
import {GiClassicalKnowledge} from "react-icons/gi";
import { MdBookOnline } from 'react-icons/md';
import bannerImg1 from "../../assets/home/banner3.jpg"
import teachImg1 from "../../assets/home/teach1.jpg"



const SingleClass = () => {
    const courses = useLoaderData();
    /* console.log(courses) */
    const {currentUser} = useUser();
    /* console.log(currentUser?.role) */
    const role=currentUser?.role;
    const [enrolledClases,setEnrolledClases] = useState([]);
    const axiosFetch = useAxiosFtech();
    const axiosSecure = useAxiosSecure();
    

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

  return (
    <>
    <div 
    className='font-gillroy font-medium text-gray-100 dark:text-white text-lg leading-[27px] w-[90%] mx-auto'
    data-new-gr-c-s-check-loaded="14.1157.0"
    data-gr-ext-installed=""
    >
        {/*Breadcrumb or Header*/}
        <div className='breadcrumbs bg-red-400 py-20 mt-20 section-padding bg-cover bg-center bg-no-repeat'>
        <h1 className='text-4xl font-bold text-center text-white'>Course Details</h1>
       </div>

        <div className='nav-tab-wrapper tabs section-padding mt-8'>
            <div className='container'>
                <div className='grid grid-cols-12 md:gap-[30px]'>
                    {/*left side */}
                    <div className='lg:col-span-8 col-span-12'>
                        <div className='single-course-details'>
                            <div className='xl:h-[470px] h-[350px] mb-10 course-min-thumb'>
                                <img 
                                src={courses.image}
                                alt=""
                                className='rounded-md object-fut w-full h-full block'
                                    />
                            </div>
                            <h2 className='text-2xl text-black mb-2'>{courses?.name}</h2>
                                <div className='author-meta mt-6 sm:flex lg:space-x-16 sm:space-x-5 space-y-5 sm:space-y-0 items-center'>
                                    <div className='flex space-x-4 items-center group'>
                                        <div className='flex-home'>
                                            <div className='h-12 w-12 rounded'>
                                            <img 
                                            src={teachImg1}
                                            alt=""
                                            className='object-cover w-full h-full rounded'
                                            />
                                            </div>
                                        </div>


                                        <div className='flex-1'>
                                            <p className='text-secondary'>
                                                Trainer
                                                <a  href="#" className='text-black'>
                                                    :{courses.instructorName}
                                                </a>
                                            </p>
                                        </div>
                                    </div>

                                <div>
                                    <span className='text-secondary' >
                                        Last Update :
                                        <a href='#' className='text-black ml-1'> 
                                            {new Date(courses.submitted).toLocaleDateString()}
                                        </a>
                                    </span>
                                </div>
                                </div>
                              
                              <div className='nav-tab-wrapper mt-12 text-black'>
                                <ul id="tabs-nav" className='course-tab mb-8'>
                                    <li className='active text-secondary'>
                                        <a href="#tab1">Overview</a>
                                    </li>
                                    <li>
                                        <a href='#tab2'>Curricullm</a>
                                    </li>
                                    <li>
                                        <a href='#tab3'>Instructor</a>
                                    </li>
                                    <li>
                                        <a href='#tab4'>Reviews</a>
                                    </li>
                                </ul>
                                <div id="tabs-content">
                                    <div id="tab1" className='tab-content'>
                                        <div>
                                            <h3 className='text-2xl mt-8'>Course Description</h3>
                                            <p className='mt-4'>
                                                This course will help you learn the concepts in depth and thoroughly. Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
                                                Eum, iusto voluptatibus commodi odio quibusdam, iure consequuntur, 
                                                obcaecati ut eos ad tempore labore magni non perferendis
                                                 maxime odit repudiandae beatae eius?
                                                 <br /> <br /> You'll be teached with the basic to advance topics of 
                                                 all the subjects and mostly the important ones. Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                                  Culpa ducimus nemo impedit, adipisci enim, officia similique 
                                                  accusantium suscipit eveniet corrupti fugiat 
                                                  porro animi? Inventore, blanditiis! Tempore possimus molestiae eligendi magni.
                                            </p>
                                            <div className='bg-white dark:bg-indigo-500 space-y-6 p-8 rounded-md my-8'>
                                                <h4 className='text-2xl'>What will you Learn?</h4>
                                                <ul className='grid sm:grid-cols-2 grid-cols-1 gap-6'>
                                                    <li className='flex space-x-3'>
                                                        <div className='flex-none relative top-1'>
                                                        <img src="/correct-mark.png" alt="" />    
                                                        </div> 
                                                        <div className='flex-1'>
                                                            Learn how perspective works and how to
                                                            incorporate your art
                                                        </div>
                                                    </li>
                                                    <li className='flex space-x-3'>
                                                        <div className='flex-none relative top-1'>
                                                        <img src="/correct-mark.png" alt="" />    
                                                        </div> 
                                                        <div className='flex-1'>
                                                            Learn how perspective works and how to
                                                            incorporate your art
                                                        </div>
                                                    </li>

                                                    <li className='flex space-x-3'>
                                                        <div className='flex-none relative top-1'>
                                                        <img src="/correct-mark.png" alt="" />    
                                                        </div> 
                                                        <div className='flex-1'>
                                                            Learn how perspective works and how to
                                                            incorporate your art
                                                        </div>
                                                    </li>

                                                    <li className='flex space-x-3'>
                                                        <div className='flex-none relative top-1'>
                                                        <img src="/correct-mark.png" alt="" />    
                                                        </div> 
                                                        <div className='flex-1'>
                                                            Learn how perspective works and how to
                                                            incorporate your art
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>

                                            {/* <div>
                                                <h4 className='text-2xl'>What will you learn?</h4>
                                                <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 mt-5'>
                                                    <div className='bg-white rounded px-5 py-[18px] flex  shadow-box2 space-x-[10px] items-center'>
                                                        <span className='flex-none'>
                                                        <img src='/logo.png' alt="" />
                                                        </span>
                                                        <span className='flex-1 text-black'>
                                                            Computer/Mobile
                                                        </span>
                                                    </div>
                                                    <div className='bg-white rounded px-5 py-[18px] flex shadow-box2 space-x-[10px] items-center'>
                                                        <div className='flex-none'>
                                                         <img src="/logo.png" alt="" />
                                                        </div>
                                                        <span className='flex-1 text-black'>
                                                            Paper &amp; Pencil
                                                        </span>
                                                    </div>

                                                    <div className='bg-white rounded px-5 py-[18px] flex shadow-box2 space-x-[10px] items-center'>
                                                        <div className='flex-none'>
                                                         <img src="/logo.png" alt="" />
                                                        </div>
                                                        <span className='flex-1 text-black'>
                                                            Internet Connnection
                                                        </span>
                                                    </div>
                                                </div>
                                            </div> */}
                                        </div>
                                    </div>
                                    <div id="tab2" className='tab-content'>
                                        <div>
                                            <h3 className='text-2xl mt-8'>Lesson Plan</h3>
                                            <p className='mt-4'>
                                             Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                             Quaerat commodi repellendus incidunt 
                                             assumenda neque, delectus labore mollitia, 
                                             vero facilis, in porro? Dolor laborum 
                                             suscipit mollitia a aspernatur veniam vitae molestiae!
                                            </p>
                                            <div className='bg-[#F8F8F8] dark:bg-indigo-500 space-y-6 p-8 rounded-md my-8'>
                                                <h4 className='text-2xl'> This Course is for 2025/2026 passouts</h4>
                                            </div>
                                            <div>
                                                <h4 className='text-2xl'>What you will Learn?</h4>
                                                <p className='mt-4'>
                                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat magni, placeat voluptates necessitatibus
                                                    tempore corrupti dolorem aut quidem totam, rerum temporibus 
                                                    maxime porro, deserunt consequuntur dignissimos. Minus tempore aperiam eius.
                                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                                                    Ad quaerat adipisci est perspiciatis harum! In ipsum quidem doloremque 
                                                    aspernatur expedita minima laudantium, temporibus praesentium 
                                                    debitis enim eaque obcaecati voluptates accusamus.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                              </div>
                        </div>
                    </div>
                    {/*right side */}
                    <div className='lg:col-span-4 col-span-12 mt-8 md:mt-0'>
                        <div className='sidebarWrapper space-y-[30px]'>
                            <div className='wdiget custom-text space-y-5'>
                                <a className='h-[220px] rounded relative block' href="#">
                                    <img 
                                    src={courses.image}
                                    alt=""
                                    className='block w-full h-full object-cover rounded'
                                    />
                                    <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
                                    <img src="/play.png" alt="" />
                                    </div>
                                </a>
                                <h3 className='text-black'>${courses.price}</h3>
                                <button onClick={() => handleSelect(courses._id)} title={role === 'admin' || role === 'instructor' ? 'Instructor/Admin cannot be able to select'
                                    ? courses.availableSeats <1 : "No Seat available" : "You can select this classes" } disabled ={role === 'admin' ||
                                        role === 'instructor' || courses.availableSeats < 1} className='btn btn-primary w-full text-center bg-secondary py-2 px-6
                                        text-white '>
                                            Enroll Now
                                        </button>
                                <ul className='list'>
                                    <li className='flex space-x-3 border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0'>
                                        <div className='flex-1 text-black space-x-3 flex items-center'>
                                            <FaUser className='inline-flex'/>
                                            <div className='text-black font-semibold'>
                                                Instructor
                                            </div>
                                        </div>
                                        <div className='flex-none text-black'> {courses.instructorName}  </div>
                                    </li>
                                    <li className='flex space-x-3 border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0'>
                                        <div className='flex-1 text-black space-x-3 flex items-center'>
                                            <MdBookOnline/>
                                            <div className='text-black font-semibold'>
                                                Lectures
                                            </div>
                                        </div>
                                        <div className='flex-none text-black'> 23 </div>
                                    </li>
                                    <li className='flex space-x-3 border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0'>
                                        <div className='flex-1 text-black space-x-3 flex items-center'>
                                            <BiTime/>
                                            <div className='text-black font-semibold'>
                                                Duration
                                            </div>
                                        </div>
                                        <div className='flex-none text-black'> 10Hr 40Mins</div>
                                    </li>

                                    <li className='flex space-x-3 border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0'>
                                        <div className='flex-1 text-black space-x-3 flex items-center'>
                                            <FaUsers/>
                                            <div className='text-black font-semibold'>
                                                Enrollled
                                            </div>
                                        </div>
                                        <div className='flex-none text-black'> {courses?.totalEnrolled} </div>
                                    </li>

                                    <li className='flex space-x-3 border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0'>
                                        <div className='flex-1 text-black space-x-3 flex items-center'>
                                            <FaLevelUpAlt/>
                                            <div className='text-black font-semibold'>
                                                Course Level
                                            </div>
                                        </div>
                                        <div className='flex-none text-black'> Intermediate </div>
                                    </li>

                                    <li className='flex space-x-3 border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0'>
                                        <div className='flex-1 text-black space-x-3 flex items-center'>
                                            <FaUser className='inline-flex'/>
                                            <div className='text-black font-semibold'>
                                                Language
                                            </div>
                                        </div>
                                        <div className='flex-none text-black'> English </div>
                                    </li>
                                </ul>
                                <ul>
                                    <ul className='flex space-x-4 items-center pt-3'>
                                        <li className='text-black font-semibold'>Share on:</li>
                                        <li>
                                            <a href="#" className='flex h-10 w-10'>
                                                <img src="/logo.png" alt="" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className='flex h-10 w-10'>
                                                <img src="/logo.png" alt="" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className='flex h-10 w-10'>
                                                <img src="/logo.png" alt="" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className='flex h-10 w-10'>
                                                <img src="/logo.png" alt="" />
                                            </a>
                                        </li>
                                    </ul>
                                </ul>
                            </div>

                            <div className='widget'>
                                <h4 className='widget-title text-black'>Related Courses</h4>
                                <ul className='list'>
                                    <li className='flex space-x-4 border-[#ECECEC] pb-6 mb-6 last:pb-0 last:mb-0 last:border-0 border-b'>
                                    <div className='flex-none'>
                                        <div className='h-20 w-20 rounded'>
                                            <img 
                                            src={bannerImg1}
                                            alt=""
                                            className='w-full h-full object-cover rounded'
                                            />
                                        </div>
                                    </div>
                                    <div className='flex-1'>
                                        <div className='flex-space-x-3 mb-2'>
                                            <iconify-icon 
                                            icon="heroicons:star-20-solid"
                                            className="text-tertiary"
                                            ></iconify-icon>

                                            <iconify-icon 
                                            icon="heroicons:star-20-solid"
                                            className="text-tertiary"
                                            ></iconify-icon>

                                            <iconify-icon 
                                            icon="heroicons:star-20-solid"
                                            className="text-tertiary"
                                            ></iconify-icon>

                                            <iconify-icon 
                                            icon="heroicons:star-20-solid"
                                            className="text-tertiary"
                                            ></iconify-icon>

                                            <iconify-icon 
                                            icon="heroicons:star-20-solid"
                                            className="text-tertiary"
                                            ></iconify-icon>
                                        </div>
                                        <div className='mb-1 font-semibold text-black'>
                                            Crash Course....
                                        </div>
                                        <span className='text-secondary font-semibold'>
                                            Rs.700
                                        </span>
                                    </div>
                                    </li> 
                                    <li className='flex space-x-4 border-[#ECECEC] pb-6 mb-6 last:mb-0 last:border-0 border-b'>
                                        <div className='flex-none'>
                                            <div className='h-20 w-20 rounded'>
                                                <img 
                                                src={bannerImg1}
                                                alt=""
                                                className='w-full h-full object-cover rounded'
                                                />
                                            </div>
                                        </div>
                                            <div className='flex-1'>
                                                <div className='mb-1 font-semibold text-black'>
                                                    Online Course....
                                                </div>
                                                <span className='text-secondary font-semibold'>
                                                    Rs.2000
                                                </span>
                                            </div>
                                    </li>

                                    <li className='flex space-x-4 border-[#ECECEC] pb-6 mb-6 last:mb-0 last:border-0 border-b'>
                                        <div className='flex-none'>
                                            <div className='h-20 w-20 rounded'>
                                                <img 
                                                src={bannerImg1}
                                                alt=""
                                                className='w-full h-full object-cover rounded'
                                                />
                                            </div>
                                        </div>
                                            <div className='flex-1'>
                                                <div className='mb-1 font-semibold text-black'>
                                                    Online Course....
                                                </div>
                                                <span className='text-secondary font-semibold'>
                                                    Rs.2000
                                                </span>
                                            </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     </div>
    </>
  )
}

export default SingleClass