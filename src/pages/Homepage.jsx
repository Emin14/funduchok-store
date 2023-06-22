import Categories from '../components/Categories/Categories'

import { useSelector } from 'react-redux'
import ProductsFound from '../components/ProductsFound/ProductsFound'

// Компонент страницы <Homepage />
export default function Homepage() {

  const {begin} = useSelector((state) => state.search.search);

  if (begin) {
    return (
      <ProductsFound />
    )
  }

  return (
      <Categories />
  )
}
