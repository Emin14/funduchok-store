import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {MdOutlineFavoriteBorder, MdFavorite} from 'react-icons/md'
import { pushFavorit } from '../../Redux/slices/favoritsSlice'
import './Favorit.css'

// Компонент для добавления // удаления  из избранного
// Является дочерним для <Product/> и <ProductCard/>
export default function Favorit({item, classNameFavorit, classNameFavorit__MdOutlineFavoriteBorder, text}) {

    const dispatch = useDispatch()
    const favorits = useSelector(state => state.favorits.favorits)

    const addFavorit = () => {
        dispatch(pushFavorit(item))
      }

  return (
    <>
      <span onClick={addFavorit} style={classNameFavorit}>
        {favorits.some(el => el.id === item.id) 
        ? <> <MdFavorite className='favorit__MdFavorite'/>
          {text &&<p className='favorits__text'>Удалить из избранного</p>} </>
        : <><MdOutlineFavoriteBorder   className='favorit__MdOutlineFavoriteBorder' style={classNameFavorit__MdOutlineFavoriteBorder}/> 
            {text &&<p className='favorits__text'>{text}</p>} </> }
      </span>
    </>
  )
}
