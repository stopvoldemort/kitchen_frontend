import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import HomeContainer from './components/home/HomeContainer.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path='/' exact component={HomeContainer}/>
      </div>
    );
  }
}

export default App;
