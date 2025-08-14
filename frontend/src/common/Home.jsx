import React from 'react'
import Hero from './homepage/Hero'
import HowItWorks from './homepage/HowItWorks'
import Search from './homepage/Search'
import Practice from './homepage/Practice'
import Featured from './homepage/Featured'
import Testimonials from './homepage/Testimonials'
import ContactUs from './homepage/ContactUs'
// import WebsiteFeedbackSection from './homepage/WebsiteFeedbackSection'


const Home = () => {
  return (
    <>
        <Hero />
        <HowItWorks />
        <Search />
        <Practice />
        <Featured />
        <Testimonials />
        {/* <WebsiteFeedbackSection/> */}
        <ContactUs />
    </>
  )
}

export default Home
