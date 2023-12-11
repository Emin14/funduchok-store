import React, { useState, useEffect } from 'react'
import Authenticated from './Authenticated/Authenticated';
import Unauthenticated from './Unauthenticated/Unauthenticated';
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Authentication() {

    const [user, setUser] = useState(null)

      useEffect(()=> {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
          if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            const uid = user.uid;
            setUser(user)
            
          } else {
            // User is signed out
            // ...
          }
        });
      }, [])

  return (
    <>
        {
            user 
            ? <Authenticated email={user.email} setUser={setUser}/>
            : <Unauthenticated  />
        }
    </>
  )
}
