import React, { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import './Product.css'
import Advantages from '../Advantages/Advantages'
import PriceTable from '../PriceTable/PriceTable'
import axios from '../../axios'
import ProductProperties from '../ProductProperties/ProductProperties'
import Favorit from '../Favorit/Favorit'


// Компонент товара
export default function Product() {

  const params = useParams()
  const location = useLocation()

  const [product, setProduct] = useState({
    title: "",
    image: "",
    basePrice: 0,
    category: 0,
    description: ""
  })

  const [category, setCategory] = useState('')

  useEffect(()=> {
    axios(`products/${params.idProduct}`)
    .then(res => {
      setProduct(res.data);
      axios(`category/${res.data.category}`)
      .then(data => setCategory(data.data))
    })
    .catch(err => console.log(err))
  }, [location])


  const classNameFavorit__MdOutlineFavoriteBorder = {
    color: '#999'
  }

  return (
    <>
    <ul className='product__bread-crumbs'>
      <li><Link to='/'>Главная  </Link></li>
      <li><Link to={`/${category.pathname}`}>{category.title}  </Link></li>
      <li><span>{product.title}</span></li>
    </ul>
      <h1 className='product__title'>{product.title}</h1>
      <div className='product-wrapper'>
        <div className='product__advantages-wrapper'>
          <Advantages>
            <Favorit item={product} classNameFavorit__MdOutlineFavoriteBorder={classNameFavorit__MdOutlineFavoriteBorder} text="Добавить в избранное"/>
          </Advantages>
          </div>
        <div className='product'>
        {/* Можно было бы реализовать не стал заморачиваться
          <p className='product__statistics'>
            <span>10 отзывов</span>
            <span>купили 15095 раз</span>
          </p> */}
          <img src={product.image} alt="" />
        </div>
        <PriceTable product={product} category={category}/>
      </div>
      <ProductProperties product={product}/>
    </>
  )
}