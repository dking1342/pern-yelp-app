import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ReviewProvider } from './context/reviews';
import { AppProvider } from './context/store';
import Home from './pages/Home';
import RestaurantDetails from './pages/RestaurantDetails';
import Review from './pages/Review';


const App = () => {
  return (
    <AppProvider>
      <ReviewProvider>
        <Router>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/restaurants/:id' component={RestaurantDetails} />
            <Route exact path='/restaurants/:id/update' component={Review} />
          </Switch>
        </Router>
      </ReviewProvider>
    </AppProvider>
  )
}

export default App
