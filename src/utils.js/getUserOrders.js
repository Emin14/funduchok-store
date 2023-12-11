import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase';

export async function getUserOrders(document) {
  const docRef = doc(db, "users", document);
  try {
    const doc = await getDoc(docRef);
    return doc.data()
  } catch (e) {
    console.log("Error getting cached document:", e);
  }
}

// Получить из базы данных
// useEffect(()=> {
//     ()
//     .then(data => setCart(data.orders));
//   }, [])


// Добавить в массив базы данных
// const washingtonRef = doc(db, "users", "Gn5mDoupojb6ka4OPQRT");

// Atomically add a new region to the "regions" array field.
// await updateDoc(washingtonRef, {
//     orders: arrayUnion({
//         ...product,
//         ...packaging,
//         id,
//         title,
//         weightTitle,
//         totalDiscount: packingDiscount * count,
//         totalPoints: packingPoint * count,
//         percentDiscount: amountOfDiscount,
//         count,
//     })
// });