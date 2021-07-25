import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AppProvider } from './context/store';
import Home from './pages/Home';
import RestaurantDetails from './pages/RestaurantDetails';
import UpdateRestaurant from './pages/UpdateRestaurant';


const App = () => {
  return (
    <AppProvider>
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/restaurants/:id' component={RestaurantDetails} />
          <Route exact path='/restaurants/:id/update' component={UpdateRestaurant} />
        </Switch>
      </Router>
    </AppProvider>
  )
}

export default App
