import { getAuth, onAuthStateChanged } from "firebase/auth";

export function getUser() {
  let result = null
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      result = user
      console.log(result)
    } else {
      // User is signed out
      // ...
    }
  })
  console.log(result)
  return result
}