// Базовый путь для категории
const CATEGORY_ROUTE = '/category';

export const getCategoryProductRoute = (category, idProduct) => {
   if (!idProduct) {
     return `${CATEGORY_ROUTE}/${category}`;
   }

   return `${CATEGORY_ROUTE}/${category}/${idProduct}`;
 };