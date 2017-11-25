import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import HomeContainer from './components/home/HomeContainer.js'
import KitchenListContainer from './components/kitchenList/KitchenListContainer.js'
import KitchenShowContainer from './components/kitchenShow/KitchenShowContainer.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path='/' exact component={HomeContainer}/>
        <Route path='/kitchens' exact component={KitchenListContainer}/>
        <Route path='/kitchens/:id' exact component={KitchenShowContainer}/>
      </div>
    );
  }
}

export default App;
