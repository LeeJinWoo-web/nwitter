import React,{ useEffect, useState } from 'react';
import AppRouter from 'components/Router';
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args)
        });
      } else {
          setUserObj(null);
        }
      setInit(true);
    })
  }, [])
  const refreshUser = () => {
    const user = authService.currentUser;
    console.log(user.displayName)
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => {user.updateProfile(args)}
    });
  }
  
  const branchTest2 = () => {
    console.log('change branch master')
    console.log('change branch master2')
    console.log('change branch master3')
  }
  const branchTest = () => {
    console.log('change branch master')
    console.log('change branch master2')
    console.log('change branch master3')

  }
    return (
      <>
      {init ? <AppRouter refreshUser={refreshUser} isLoggedIn={Boolean(userObj)} userObj={userObj}/> : "initializing..." }
      </>
    );
}

export default App;
