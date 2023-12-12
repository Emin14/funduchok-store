import { doc, getDoc } from 'firebase/firestore';
import db from '../firebase';

export default async function getUserOrders(document) {
  const docRef = doc(db, 'users', document);
  try {
    const findDoc = await getDoc(docRef);
    return findDoc.data();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('Error getting cached document:', e);
  }
  return null;
}
