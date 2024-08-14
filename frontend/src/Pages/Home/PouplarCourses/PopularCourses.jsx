import React, { useEffect, useState } from 'react'
import useAxiosFtech from '../../../hooks/useAxiosFtech'
/* import { Card } from '@mui/material'; */
import Card from '../../../Pages/Home/PouplarCourses/Card'

const PopularCourses = () => {
    const axiosFetch = useAxiosFtech();
    const [classes,setClasses] = useState([]);
    useEffect(() => {
        const fetchClasses = async () => {
            const response = await axiosFetch.get('/classes')
            /* console.log(response.data); */
            setClasses(response.data);
        }

        fetchClasses();
    },[])

    /* console.log(classes) */
  return (
    <div className='md:w-[80%] mx-auto my-36'> 
    <div>
        <h1  className='text-5xl font-bold text-center dark:text-white'>Our <span className='text-secondary'>Best</span> Courses</h1>
        <div className='w-[40%] text-center mx-auto my-4' >
            <p className='text-gray-500'>Explore some of our best interactive courses for Gate. Get Enrolled and start your prepartion journey</p>
        </div>
    </div>
    <div className='grid md:grid-cols-3 lg:grid-cols-3 gap-4'>
        {
            classes.slice(0,6).map((item, index) => <Card key={index} item = {item}/>)
        }
    </div>
    </div>
  )
}

export default PopularCourses