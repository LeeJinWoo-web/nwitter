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
  const karlBranch = ()=> {
    console.log('karl branch1')
    console.log('karl branch2')
    console.log('karl branch3')
  }
    return (
      <>
      {init ? <AppRouter refreshUser={refreshUser} isLoggedIn={Boolean(userObj)} userObj={userObj}/> : "initializing..." }
      </>
    );
}

export default App;
