const calcPackaging = (packaging, product, discount) => {
  const packagingArray = packaging.map((item) => {
    // подсчет базовой цены в зависимости от выбранной фасовки
    const packingPrice = Math.round((item.weight * product.basePrice) * item.koef);
    const packingDiscount = Math.round(packingPrice * discount);
    const packingDiscountPrice = packingPrice - packingDiscount;
    const packingPoint = Math.round((packingDiscountPrice || packingPrice) * 0.01);

    return {
      id: item.id,
      title: item.title,
      weight: item.weight,
      koef: item.koef,
      packingPrice,
      packingDiscount,
      packingDiscountPrice,
      packingPoint,
    };
  });

  return packagingArray;
};

export default calcPackaging;
