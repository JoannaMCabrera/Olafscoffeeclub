import React, {useState, useEffect} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './cssFiles/App.css';

/*Context*/
import UserContext from './UserContext';


import Header from './components/Header';
import Home from './pages/Home';
import NotFound from './components/NotFound';
import Checkout from "./components/Checkout";
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';

export default function App() {
      const [user, setUser] = useState(
        {
          id: null,
          isAdmin: null
        }
    );

    const unsetUser = () => {
        localStorage.clear();
        setUser({    //check this
          id: null,
          isAdmin: null
        })
    }

    let token = localStorage.getItem('token');
    
    useEffect( ()=> {
        
        fetch('https://shrouded-brook-21767.herokuapp.com/api/users/details',{
          method: "GET",
          headers: {
              "Authorization": `Bearer ${token}`
          }
        })
        .then(result => result.json())
        .then(result =>{
          // console.log(result)

          if(typeof result._id !== "undefined"){
              setUser({
                id: result._id,
                isAdmin:result.isAdmin
              })
          } else{
              setUser({
                id:null,
                isAdmin:null
              })
          }
        })
    }, [token]);


  return (
    //BEM
    <UserContext.Provider value={{user,setUser,unsetUser}}>
      <BrowserRouter>
         <Header/>
         <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/products" component={Products} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/checkout" component={Checkout} />
            <Route component={NotFound} />
         </Switch>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
