import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Authenticated from './Authenticated/Authenticated';
import Unauthenticated from './Unauthenticated/Unauthenticated';

export default function Authentication() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        setCurrentUser(user);
      } else {
        // User is signed out
        // ...
      }
    });
  }, []);

  let outTag = null;
  if (currentUser) {
    outTag = <Authenticated email={currentUser.email} setUser={setCurrentUser} />;
  } else {
    outTag = <Unauthenticated />;
  }

  return (
    outTag
  );
}
