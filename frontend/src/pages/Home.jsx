import React from 'react'
import HomeSection from '../components/HomeSection'
import { NavBar } from '../components/NavBar'
import Footer from '../components/Footer'
import { Toaster } from "react-hot-toast";

const Home = () => {
  return (
    <>
        <div>
            <HomeSection/>
            <Footer/>
            <Toaster position="top-right" reverseOrder={false} />
        </div>
        
    </>
  )
}

export default Home