import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function getUser() {
  let result = null;
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      result = user;
    } else {
      // User is signed out
      // ...
    }
  });
  return result;
}
