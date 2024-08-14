import React from 'react'
import useUser from '../../../hooks/useUser'
import WelcomeImg from '../../../assets/dashboard/urban-welcome.svg'
import { Link } from 'react-router-dom'

const StudentCP = () => {
    const {currentUser} =useUser()
  return (
    <div className='h-screen flex justify-center items-center p-2 w-full'>
        <div className='flex justify-center items-center'>
        <div>
            <div>
                <img onContextMenu={e => e.preventDefault()} src={WelcomeImg} alt="" className='h-[300px]' placeholder='blur'/>
            </div>
            <h1 className='text-4xl capitalize font-bold'>Hi <span className='text-secondary items-stretch'>{currentUser?.name}!</span>, Welcome to your dashboard</h1>
            <p className='text-center text-base py-2'>Hey there, this is your dashboard,lookout to everything you need in here!!</p>

            <div className='text-center'>
                <h2 className='font-bold' > You can jump any page you want from here </h2>
                <div className='flex items-center justify-center my-4 gap-3'>
                    <div className='border border-secondary rounded-lg hover:bg-secondary hover:text-white duration-200 px-2 py-1'>
                        <Link to ="/dashboard/enrolled-class"> My Enroll </Link>
                    </div>

                    <div className='border border-secondary rounded-lg hover:bg-secondary hover:text-white duration-200 px-2 py-1'>
                        <Link to ="/dashboard/my-selected"> My Selected </Link>
                    </div>
                    <div className='border border-secondary rounded-lg hover:bg-secondary hover:text-white duration-200 px-2 py-1'>
                        <Link to ="/dashboard/my-payments"> Payment History</Link>
                    </div>
                    <div className='border border-secondary rounded-lg hover:bg-secondary hover:text-white duration-200 px-2 py-1'>
                        <Link to ="/dashboard/apply-instructor"> Join as Instructor</Link>
                    </div>
                </div>
            </div>
            </div>
        </div>    
        </div>
  )
}

export default StudentCP