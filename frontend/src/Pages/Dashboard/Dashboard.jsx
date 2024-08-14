import React from 'react'
import useUser from '../../hooks/useUser'
import DashboardNavigate from '../../routes/DashboardNavigate';
/* import  {RingLoader} from 'react-spinners' */

const Dashboard = () => {
  const {currentUser, isLoading} = useUser();
  const role = currentUser?.role;

/* 
  if(isLoading) {
    return <div className='flex justify-center items-center h-screen'>
      <RingLoader
  color="#0000ff"
  size={100}
/>
    </div>
  } */
  return (
    <DashboardNavigate/>
  )
}

export default Dashboard