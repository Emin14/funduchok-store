import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../firebase';

export async function getProducts(category) {
  console.log(category)
    const result = []
  const q = query(collection(db, "products"), where("category", "==", category));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    result.push(doc.data());
});
  return result
}
