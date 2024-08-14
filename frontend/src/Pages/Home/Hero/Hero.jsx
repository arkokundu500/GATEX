import React from 'react'
import bgImg from '../../../assets/home/classroom.jpg'

const Hero = () => {
  return (
    <div className='min-h-screen bg-cover' style={{backgroundImage : `url(${bgImg})`}}>
        <div className='min-h-screen flex justify-start pl-11 items-center text-white bg-black bg-opacity-60'>
            <div className='space-y-4'>
            <p className='md:text-4xl text-2xl'>We provide</p>
            <h3 className='md:text-7xl text-4xl font-bold'>Best coaching classes for Gate</h3>
            <div className='md:w-1/2'>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus odio est expedita quis dignissimos, ex quia ducimus ad enim tempora nesciunt rerum ab cum vero a officia non iste nam.
                </p>
            </div>
            <div className='flex flex-wrap items-center gap-5'>
                <button className='px-7 py-3 rounded-lg bg-secondary font-bold uppercase'>Join Now!</button>
                <button className='px-7 py-3 rounded-lg border hover:bg-primary uppercase' >View Courses</button>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Hero