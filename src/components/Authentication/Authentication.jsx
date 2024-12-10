import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Authenticated from './Authenticated/Authenticated';
import Unauthenticated from './Unauthenticated/Unauthenticated';

export default function Authentication({ points, active }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        // User is signed out
        // ...
      }
    });
  }, []);

  let outTag = null;
  if (currentUser) {
    outTag = (
      <Authenticated
        email={currentUser.email}
        setUser={setCurrentUser}
        points={points}
        active={active}
      />
    );
  } else {
    outTag = <Unauthenticated />;
  }

  return (
    outTag
  );
}
