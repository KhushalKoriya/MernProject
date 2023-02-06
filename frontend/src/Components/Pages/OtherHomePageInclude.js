import React from 'react'
import { Outlet } from 'react-router'
import { Footer } from '../Includes/Footer'
import { Header } from '../Includes/Header'

export const OtherHomePageInclude = () => {
  return (
   <>
   <Header/>
   <Outlet/>
   <Footer/>
   </>
  )
}
