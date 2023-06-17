import React from "react";
import { useSelector } from 'react-redux';
import { Line, Circle } from 'rc-progress';
import './Progressbar.css'

export default function Progressbar() {
    
    const totalAmount  = useSelector((state) => state.cart.total);
    const maxAmount = 1500;
    const percentAmount = (totalAmount/maxAmount)*100

    return (
    <>
        <Line percent={percentAmount} strokeWidth={2} trailWidth={1} strokeColor="#ffd944" trailColor="#eaedf6" className="progress"/>
    </>
    )
}



