import React from 'react'
import image3 from "../../../assets/gallary/teach.jpg"
import image4 from "../../../assets/gallary/image4.jpg"


const Gallery = () => {
  return (
    <div className='md:w-[80%] mx-auto my-28'>
        <div className='mb-16'>
            <h1 className='text-5xl font-bold text-center dark:text-white'>Our Display Space</h1>
        </div>


            {/*image container*/}
        <div className='md:grid grid-cols-2 items-center justify-center gap-2 '>
        <div className='mb-4 md:mb-0'>
            <img src={image4} alt='' className='md:h-[720px] w-full mx-auto rounded-sm'/>
        </div>
        <div className='gap-2 grid grid-cols-1'>
        <div className=''>
            <img src={image3} alt='' className='md:h-[350px] rounded-sm' />
        </div>
        <div className=''>
            <img src={image3} alt='' className='md:h-[350px] rounded-sm' />
        </div>
        </div>
    </div>
    </div>
  )
}

export default Gallery