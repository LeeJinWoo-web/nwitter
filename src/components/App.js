import React,{ useState } from 'react';
import AppRouter from 'components/Router';
import { authService } from "fbase";
function App() {
  console.log(authService.currentUser)
  const [isLoggedIn, setLoggedIn] = useState(authService.currentUser);
    return (
      <AppRouter isLoggedIn={isLoggedIn}/>
    );
}

export default App;
