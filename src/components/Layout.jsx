import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../pages/Header/Header'
import Sidebar from '../components/Sidebar/Sidebar'
import Footer from '../pages/Footer/Footer'


export default function Layout() {

  return (
    <div className='container wrapper'>
      <Header className='container '/>
      <Sidebar className='container '/>
      <main className='main-area'>
          <Outlet/>
      </main>
      <Footer></Footer>
    </div>
  )
}
