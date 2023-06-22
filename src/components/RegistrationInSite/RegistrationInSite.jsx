import React from 'react'
import { useForm } from "react-hook-form";
import axios from '../../axios.js';
import './RegistrationInSite.css'
import { useDispatch } from 'react-redux';
import { registerInSite } from '../../Redux/slices/userSlice.js';

export default function RegistrationInSite({show, setShow}) {

    const dispatch = useDispatch()

    const {
        register,
        reset,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm()

    const sigUpHandler = (data) => {
        axios.post('/users', {
            ...data,
            points: 0,
            orders: []
        })
        .then((res) => {
            dispatch(registerInSite(res.data.user))
            reset()
        })
        .catch(err => alert(err))
        setShow(false)
    }

  return (
    <div className={show ? 'loginpage active' : 'loginpage'} onClick={() => setShow(false)} onSubmit={handleSubmit(sigUpHandler)}>
        <form action="" className='loginpage__form' onClick={e => e.stopPropagation()}>
            <h2 className='loginpage__title'>Регистрация</h2>
            <p className='loginpage__description'>Чтобы накапливать баллы, получать промокоды и следить за историей покупок</p>
            <label >
                <input type="text" placeholder='Имя' {...register("name")}/>
            </label>
            <label>
                <input type="text" placeholder='Введите почтовый ящик' {...register("email")}/>
            </label>
            <label >
                <input type="text" placeholder='Номер телефона' {...register("phone")}/>
            </label>
            <label >
                <input type="text" placeholder='Придумайте пароль' {...register("password")}/>
            </label>
            <label >
                <input type="text" placeholder='Повторите пароль'/>
            </label>
            <button type='submit' className='loginpage__button'>регистрация</button> 
        </form>
    </div>
  )
}
