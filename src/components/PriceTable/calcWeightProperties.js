import  data from './weightAndkoef.json'
const {amountOfDiscount, weightAndkoef} = data

// Функция для подсчета скидочной цены в зависимости от выбранной фасовки
export function calcDiscountPrice (data, product) {
    return (Math.round(((data.weight * product.basePrice)* data.koef) - ((data.weight * product.basePrice)* data.koef) * amountOfDiscount))
}

// Функция для подсчета базовой цены в зависимости от выбранной фасовки
export function calcBasicPrice (data, product){
    return Math.round((data.weight * product.basePrice) * data.koef)
}

// Функция для подсчета и сохранения в state: цены в зависимости от фасовки, скидочной цены, сумму скидки, сумму баллов
export function calcWeightProperties (weight, product) {
    const productPacking = weightAndkoef.find(el => el.weight === +weight);
    const basePrice  =  calcBasicPrice(productPacking, product);
    const salePrice = calcDiscountPrice(productPacking, product)
    let fasovka = productPacking.weight

    const difference = basePrice - salePrice;
    const calcPoints = salePrice * 0.01

    return {
        basePrice,
        salePrice,
        discountfor1Count: difference,
        pointfor1Count: calcPoints,
        fasovka,
    }
}