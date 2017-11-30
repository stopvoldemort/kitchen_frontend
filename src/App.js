import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import NavbarContainer from './components/navbar/NavbarContainer.js'
import HomeContainer from './components/home/HomeContainer.js'
import KitchenListContainer from './components/kitchenList/KitchenListContainer.js'
import KitchenShowContainer from './components/kitchenShow/KitchenShowContainer.js'
import ReservationListContainer from './components/reservationList/ReservationListContainer.js'
import CreateUserContainer from './components/createUser/CreateUserContainer.js'
import CreateKitchenContainer from './components/createKitchen/CreateKitchenContainer.js'
import MyKitchensContainer from './components/myKitchens/MyKitchensContainer.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path='/' component={NavbarContainer} />
        <Route path='/' exact component={HomeContainer}/>
        <Route path='/kitchens' exact component={KitchenListContainer}/>
        <Switch>
          <Route path='/kitchens/new' exact component={CreateKitchenContainer}/>
          <Route path='/kitchens/:id' exact component={KitchenShowContainer}/>
        </Switch>
        <Route path='/reservations' exact component={ReservationListContainer}/>
        <Route path='/users/new' exact component={CreateUserContainer}/>
        <Route path='/mykitchens' exact component={MyKitchensContainer}/>
      </div>
    );
  }
}

export default App;
