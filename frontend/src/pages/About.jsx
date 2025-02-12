import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import NewsletterBox from '../components/NewsletterBox';

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'About'} text2={'US'} />
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>This a full stack E-Commerece website developed by two CSE students</p>
          <p>
            Our Details are : <br /><span>G Rajvardhan (cs22b2013@iiitdm.ac.in) </span>
            <br /><span>G Ashrith (ashrithgandhe0629@gmail.com) </span>
          </p>
          <b className='text-gray-800'>Our Intention</b>
          <p>We made this website to develop our skills in Web Development with latest and on demand technologies</p>

        </div>
      </div>
      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 border-gray-200'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>
            High Quality and authenticity is assured on our website
          </p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 border-gray-200'>
          <b>Convenience:</b>
          <p className='text-gray-600'>
            Easy Returns, Cash on Delivery, and other services
          </p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 border-gray-200'>
          <b>Custormer Service:</b>
          <p className='text-gray-600'>
            Customer Friendly service.
          </p>
        </div>
      </div>
      <NewsletterBox />
    </div>
  )
}

export default About