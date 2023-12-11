// import React, { useState, useEffect } from 'react'
// import LoginInSite from '../LoginInSite/LoginInSite'
// import RegistrationInSite from '../RegistrationInSite/RegistrationInSite'
// import { useSelector } from 'react-redux'
// import { useDispatch } from 'react-redux';
// import { logout} from '../../Redux/slices/userSlice.js';
// import {RiArrowDownSLine} from 'react-icons/ri'
// import { NavLink} from 'react-router-dom'
// import './User.css'
// import { getPoints } from '../../Redux/slices/dataSlice'
// import Signin from '../authentication/Signin.jsx'
// import Signup from '../authentication/Signup.jsx'
// import { getAuth, onAuthStateChanged, signOut  } from "firebase/auth";


// // Компонент для отображения в Header состояния входа и выхода для юзера
// export default function User() {

//     // const user = useSelector((state) => state.user.user)
//     const [showLoginpage, setShowLoginpage] = useState(false);
//     const [showRegisterpage, setShowRegisterpage] = useState(false);
//     const [showUserinfo, setShowUserinfo] = useState(false);
//     const dispatch = useDispatch()

// // Функция для выхода из аккаунта.
//   const logOutUser = () => {
//     const auth = getAuth();
//     signOut(auth)
//     .then(() => {
//       setUser(null)
//   })
//   .catch((error) => {
//   // An error happened.
//   });
//   }






//   return (
//     <>
    
//     {user 
//     ? <div className='user__out-links' >
//       <div className='user__out-links_user' onMouseOver={() => setShowUserinfo(true)} onMouseOut={() => setShowUserinfo(false)}>
//         <p>Привет, {user.email}</p>
//           <div>
//             <span className='user__myaccount-text'>Мой аккаунт</span>
//             <RiArrowDownSLine className='user__RiArrowDownSLine'/>
//           </div>
//       </div>
//         {showUserinfo &&
//         <div className='user__info' onMouseOver={() => setShowUserinfo(true)} onMouseOut={() => setShowUserinfo(false)}>
//           <ul>
//             <li className='user__info_item'><NavLink to='/user/orders'>Мои заказы</NavLink></li>
//             <li className='user__info_item'><NavLink to='/user/data'>Данные профиля</NavLink></li>
//           </ul>
//         </div>}
//         <span className='user__out-links_button' onClick={logOutUser}>Выйти </span>
//       </div>
//     : 
//       <div className='user__links-account'> 
//         <button onClick={() => setShowLoginpage(true)}>Войти</button>
//         <span>|</span>
//         <button onClick={() => setShowRegisterpage(true)}>Регистрация</button>
//       </div>
//     }
//       {/* <LoginInSite show={showLoginpage} setShow={setShowLoginpage}/>
//       <RegistrationInSite show={showRegisterpage} setShow={setShowRegisterpage}/> */}
//       <Signin show={showLoginpage} setShow={setShowLoginpage} />
//       <Signup show={showRegisterpage} setShow={setShowRegisterpage} />
//     </>
//   )
// }
