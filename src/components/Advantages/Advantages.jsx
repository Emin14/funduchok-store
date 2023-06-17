import React from 'react'
import {FaMedal} from 'react-icons/fa'
import {TbTruckDelivery} from 'react-icons/tb'
import {MdPayment} from 'react-icons/md'
import './Advantages.css'

export default function Advantages({children}) {
  return (
    <ul className='advantages'>
      <li className='advantages__list_item'>
        <FaMedal/>
        <p className='advantages__text'>Гарантия качества</p>
      </li>
      <li className='advantages__list_item'>
        <TbTruckDelivery/>
        <p className='advantages__text'>Доставка</p>
      </li >
      <li className='advantages__list_item'>
        <MdPayment/>
        <p className='advantages__text'>Оплата</p>
      </li>
      {children && 
          <li className='advantages__favorit'>
            {children}
          </li>
      }
    </ul>
  )
}
