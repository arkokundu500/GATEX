import React from 'react'
import HeroContainer from './Hero/HeroContainer'
import Gallery from './Gallery/Gallery'
import PopularCourses from './PouplarCourses/PopularCourses'
import OurTeachers from './OurTeachers/OurTeachers'
import useAuth from '../../hooks/useAuth'


const Home = () => {
  return (
    <section>
      <HeroContainer/>
    <div className='max-w-screen-xl mx-auto'>
      <Gallery/>
      <PopularCourses/>
      <OurTeachers/>
    </div>
    </section>
  )
}

export default Home