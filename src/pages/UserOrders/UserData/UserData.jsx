import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import axios from '../../../axios';
import { changeData } from '../../../Redux/slices/userSlice';
import { logout } from '../../../Redux/slices/userSlice';
import './UserData.css'

export default function UserData() {

    const [showPopupChangeData, setShowPopupChangeData] = useState(false);
    const [showPopupdeleteAccount, setShowPopupdeleteAccount] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const currentUser = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        if (!currentUser) {
            navigate('/')
        }
    }, [])

    const {email, name, phone} = useSelector((state) => state.user.user)
    const user = {
        email,
        name,
        phone
    }

    const keys = Object.keys(user)

    const changeUserData = (e) => {
        e.preventDefault()

        const data = {
            email: e.target.children[2].value,
            name: e.target.children[4].value,
            phone: e.target.children[6].value,
        }
        axios.patch(`users/${currentUser.id}`, data);
        dispatch(changeData(data))
        setShowPopupChangeData(false)
    }

    const deleteAccount = (e) => {
        e.preventDefault()
        axios.delete(`users/${currentUser.id}`);
        dispatch(logout(''))
        setShowPopupdeleteAccount(false)
        navigate('/')
    }



  return (
    <div className='userdata__wrapper'>
        <div className='userdata__info'>
            <h4 className='userdata__title'>Мои данные</h4>
            <table>
                <tbody>
                    {
                    keys.map(item => (
                        <tr key={item}>
                            <td>{item}</td>
                            <td>{user[item]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <ul className='userdata__list'>
            <h4>Изменить/Удалить</h4>
            <li onClick={() => setShowPopupChangeData(true)}>Сменить мои данные</li>
            <li onClick={() => setShowPopupdeleteAccount(true)}>Удалить мой аккаунт</li>
        </ul>
        <div className={showPopupChangeData ? 'userdata__popup active' : 'userdata__popup'} onClick={() => setShowPopupChangeData(false)} onSubmit={changeUserData}>
            <form action="" className='userdata__form' onClick={e => e.stopPropagation()}>
                <h2 className='userdata__title'>Изменить данные профиля</h2>
                <label htmlFor="email">Email</label>
                    <input id='email' type="text" placeholder='Введите почтовый ящик' defaultValue={email}/>
                <label htmlFor="name">Имя</label>
                    <input id='name' type="text" placeholder='Введите имя' defaultValue={name}/>
                <label htmlFor="phone">Телефон</label>
                    <input id='phone' type="text" placeholder='Введите телефон' defaultValue={phone}/>
                <button type='submit' className='userdata__button'>сменить</button> 
            </form>
        </div>
        <div className={showPopupdeleteAccount ? 'userdata__popup active' : 'userdata__popup'} onClick={() => setShowPopupdeleteAccount(false)} onSubmit={changeUserData}>
            <div action="" className='userdata__delete-wrapper' onClick={e => e.stopPropagation()}>
                <h2 className='userdata__title'>Вы действительно хотите удалить свой аккаунт?</h2>
                <div className='userdata__delete-buttons'>
                    <button type='button' className='userdata__delete_button' onClick={deleteAccount}>Да</button> 
                    <button type='button' className='userdata__delete_button' onClick={() => setShowPopupdeleteAccount(false)}>Отмена</button> 
                </div>
            </div>
        </div>
    </div>
  )
}
