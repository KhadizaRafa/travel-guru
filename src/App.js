import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import DestinationDetails from './Components/DestinationDetails/DestinationDetails';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import NotFound from './Components/NotFound/NotFound';
import Booking from './Components/Booking/Booking';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import './App.css'

export const UserContext = createContext();

function App() {
  const [loggedInUser,setLoggedInUser] = useState({});
  return (
    <div className="App">
      <UserContext.Provider value={[loggedInUser,setLoggedInUser]}>
      <Router>
        <Header></Header>
        <Switch>
        <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route path="/destination/:destinationKey">
            <DestinationDetails />
          </Route>
          <PrivateRoute path="/booking">
            <Booking/>
          </PrivateRoute>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/*">
            <NotFound />
          </Route>
        </Switch>

      </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
