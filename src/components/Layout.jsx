import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header/Header'
import Sidebar from '../components/Sidebar/Sidebar'
import Footer from '../components/Footer/Footer'


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
