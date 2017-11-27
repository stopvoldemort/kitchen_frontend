import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import NavbarContainer from './components/navbar/NavbarContainer.js'
import HomeContainer from './components/home/HomeContainer.js'
import KitchenListContainer from './components/kitchenList/KitchenListContainer.js'
import KitchenShowContainer from './components/kitchenShow/KitchenShowContainer.js'
import ReservationListContainer from './components/reservationList/ReservationListContainer.js'
import CreateUserContainer from './components/createUser/CreateUserContainer.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path='/' component={NavbarContainer} />
        <Route path='/' exact component={HomeContainer}/>
        <Route path='/kitchens' exact component={KitchenListContainer}/>
        <Route path='/kitchens/:id' exact component={KitchenShowContainer}/>
        <Route path='/reservations' exact component={ReservationListContainer}/>
        <Route path='/user/new' exact component={CreateUserContainer}/>
      </div>
    );
  }
}

export default App;
