import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import DestinationDetails from './Components/DestinationDetails/DestinationDetails';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import NotFound from './Components/NotFound/NotFound';


function App() {
  return (
    <div className="App">

      <Router>
        <Header></Header>
        <Switch>
          <Route path="/destination/:destinationKey">
            <DestinationDetails />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>

      </Router>
    </div>
  );
}

export default App;
