import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import Header from '../pages/Header/Header'
import Sidebar from '../components/Sidebar/Sidebar'

export default function Layout() {
  return (
    <div className='container wrapper'>
    <Header className='container '/>
    <Sidebar className='container '/>
    <main className='main-area'>
        <Outlet/>
    </main>
    <footer className='container footer-area'/>
    </div>
  )
}
