import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {MdOutlineFavoriteBorder, MdFavorite} from 'react-icons/md'
import { pushFavorit } from '../../Redux/slices/favoritsSlice'
import './Favorit.css'

// Удалось сделать чистую функцию, которую использовал уже в 2 местах. В дальнейшем может привязать к юзеру или чтобы работало и без юзера и с юзером.
export default function Favorit({item, classNameFavorit, classNameFavorit__MdOutlineFavoriteBorder, text}) {

    const dispatch = useDispatch()
    const favorits = useSelector(state => state.favorits.favorits)

    const fff = () => {
        dispatch(pushFavorit(item))
      }

  return (
    <>
    <span onClick={fff} style={classNameFavorit}>
    {favorits.some(el => el.id === item.id) 
    ? <> <MdFavorite className='favorit__MdFavorite'/>
      {text &&<p className='favorits__text'>Удалить из избранного</p>} </>
    : <><MdOutlineFavoriteBorder   className='favorit__MdOutlineFavoriteBorder' style={classNameFavorit__MdOutlineFavoriteBorder}/> 
        {text &&<p className='favorits__text'>{text}</p>} </> }
    </span>
    {/* {text &&<p className='favorits__text'>{text}</p>} */}
    </>
  )
}
