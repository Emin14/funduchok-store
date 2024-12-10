import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom'; 
import { useParams } from "react-router"
import Product from './Product/Product';
import { togleFavorit } from '../../Redux/slices/favoritsSlice';

import {
  blocks, amountOfDiscount, weightAndkoef, categories,
} from './constans';
import {
  changeCartProducts, calcAmount, calcPoints, calcPieces,
} from '../../Redux/slices/cartSlice';

import calcPackaging from '../../utils.js/calcPackaging';
import notify from '../../utils.js/notify';
import { useGetProductsQuery } from '../../Redux/services/productsApi';

export default function ProductLayout() {
  const dispatch = useDispatch();

  // const allProducts = useSelector((state) => state.products.products);
  const { data: allProducts, error, isLoading, isError } = useGetProductsQuery();

  const { category, idProduct } = useParams();
  const [product, setProduct] = useState(null);
  const [categoryObj, setCategoryObj] = useState(null);

  useEffect(() => {
    if(allProducts) {
      const findProducts = allProducts.filter((item) => item.id === idProduct);
      setProduct(findProducts[0]);
    }
  }, [idProduct, allProducts]);

  useEffect(() => {
    const ada = categories.filter((item) => item.pathname === category);
    setCategoryObj(ada[0]);
  }, [category]);

  const favorits = useSelector((state) => state.favorits.favorits);

  const [isFavorite, setIsFavorite] = useState(false);
  const [count, setCount] = useState(1);
  const [packing, setPacking] = useState(null);
  const [currentPackage, setCurrentPackage] = useState(2);
  const [block, setBlock] = useState({ title: 'Описание', description: true });

  useEffect(() => {
    const find = favorits.some((el) => el.id === product?.id);
    setIsFavorite(find);
  }, [favorits, product]);

  useEffect(() => {
    if (product) {
      const packagingArray = calcPackaging(weightAndkoef, product, amountOfDiscount);
      setPacking(packagingArray);
    }
  }, [product]);

  const handleClick = () => {
    dispatch(togleFavorit(product));
  };

  const incrementCount = (e) => {
    e.preventDefault();
    if (count < 2) {
      setCount(1);
      return;
    }
    setCount((prev) => prev - 1);
  };

  const decrementCount = (e) => {
    e.preventDefault();
    setCount((prev) => prev + 1);
  };

  const handleChange = (e) => {
    setCount(1);
    setCurrentPackage(e.target.id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const packaging = packing[currentPackage];
    const { packingDiscount, title: weightTitle } = packaging;
    const { id, title } = product;
    dispatch(changeCartProducts(
      {
        ...product,
        ...packaging,
        id,
        title,
        categoryPath: category,
        weightTitle,
        totalDiscount: packingDiscount * count,
        percentDiscount: amountOfDiscount,
        count,
      },
    ));
    dispatch(calcAmount());
    dispatch(calcPoints());
    dispatch(calcPieces());
    if (window.screen.width > 767.98) {
      notify(product.title, packaging.title, count);
    }
  };

  const selectBlock = (e) => {
    setBlock({
      title: e.target.innerText,
      [e.target.dataset.columns]: true,
    });
  };

  return (
    <Product
      product={product}
      categoryObj={categoryObj}
      isFavorite={isFavorite}
      setIsFavorite={setIsFavorite}
      handleClick={handleClick}
      packing={packing}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      currentPackage={currentPackage}
      count={count}
      incrementCount={incrementCount}
      decrementCount={decrementCount}
      block={block}
      blocks={blocks}
      selectBlock={selectBlock}
    />
  );
}
