import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import axios from '../../axios.js';
import './LoginInSite.css'
import { useDispatch } from 'react-redux';
import { registerInSite } from '../../Redux/slices/userSlice.js';

export default function LoginInSite ({show, setShow}) {
    const dispatch = useDispatch()

  const {
      register,
      reset,
      handleSubmit,
      formState: {
          errors
      }
  } = useForm()



  const sigInHandler = (data) => {
    console.log(data)
    axios.post('/login', data)
    .then((res) => {
        dispatch(registerInSite(res.data.user))
        reset()
    })
    .catch(err => alert(err))
    setShow(false)
}

  return (
    <div className={show ? 'loginpage active' : 'loginpage'} onClick={() => setShow(false)} onSubmit={handleSubmit(sigInHandler)}>
        <form action="" className='loginpage__form' onClick={e => e.stopPropagation()}>
            <h2 className='loginpage__title'>Войти</h2>
            <p className='loginpage__description'>Чтобы накапливать баллы, получать промокоды и следить за историей покупок</p>
            <label>
                <input type="text" placeholder='Введите почтовый ящик' {...register("email")}/>
            </label>
            <label htmlFor="">
                <input type="text" placeholder='Введите пароль' {...register("password")}/>
            </label>
            <button type='submit' className='loginpage__button'>войти</button> 
        </form>
    </div>
  )
}
