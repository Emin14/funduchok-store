import { collection, getDocs} from "firebase/firestore";
import { db } from '../firebase';

export async function getProductsAll() {
  const result = []
  const querySnapshot = await getDocs(collection(db, "products"));
  querySnapshot.forEach((doc) => {
    result.push(doc.data());
  });
  return result
}