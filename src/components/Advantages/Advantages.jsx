import React from 'react'
import {FaMedal} from 'react-icons/fa'
import {TbTruckDelivery} from 'react-icons/tb'
import {MdPayment} from 'react-icons/md'
import './Advantages.css'

export default function Advantages() {
  return (
    <div className='advantages'>
    <FaMedal/>
    <p>Гарантия качества</p>
    <TbTruckDelivery/>
    <p>Доставка</p>
    <MdPayment/>
    <p>Оплата</p>
    </div>
  )
}
