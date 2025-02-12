import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'}/>
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img}/>
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Our Info</p>
          <p className='text-gray-500'>IIITDM Kancheepuram <br /></p>
          <p className='text-gray-500'>Email: cs22b2013@iiitdm.ac.in <br/> Email: ashrithgandhe0629@gmail.com</p>
          <p className='font-semibold text-gray-600 text-xl'>Careers at Forever</p>
          <p className='text-gray-500'>Learn more about our teams and jobs</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
        </div>
      </div>
      <NewsletterBox />
    </div>
  )
}

export default Contact;