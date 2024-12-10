import { collection, getDocs } from 'firebase/firestore';
import db from '../firebase';

export default async function getProductsAll() {
  try {
    const querySnapshot = await getDocs(collection(db, 'products'));
    return querySnapshot.docs.map(doc => doc.data());
  } catch (error) {
    console.error("Ошибка при получении данных с Firestore:", error);
    return [];  // Можно вернуть пустой массив или обработать ошибку другим способом
  }
}