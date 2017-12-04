import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import NavbarContainer from './components/navbar/NavbarContainer.js'
import HomeContainer from './components/home/HomeContainer.js'
import KitchenListContainer from './components/kitchenList/KitchenListContainer.js'
import KitchenShowContainer from './components/kitchenShow/KitchenShowContainer.js'
import ReservationListContainer from './components/reservationList/ReservationListContainer.js'
import CreateUserContainer from './components/createUser/CreateUserContainer.js'
import CreateKitchenContainer from './components/createKitchen/CreateKitchenContainer.js'
import MyKitchensContainer from './components/myKitchens/MyKitchensContainer.js'
import EditKitchenContainer from './components/createKitchen/EditKitchenContainer.js'

import { autoLogin } from './actions/users.js'

class App extends Component {


  componentDidMount = () => {
    this.props.autoLogin()
  }

  render() {


    return (
      <div className="App">
        <Route path='/' component={NavbarContainer} />
        <Route path='/users/new' exact component={CreateUserContainer}/>
        <Route path='/' exact component={HomeContainer}/>
        <Route path='/kitchens' exact component={KitchenListContainer}/>
        <Switch>
          <Route path='/kitchens/new' exact component={CreateKitchenContainer}/>
          <Route path='/kitchens/:id' exact component={KitchenShowContainer}/>
        </Switch>
        <Route path='/reservations' exact component={ReservationListContainer}/>
        <Route path='/mykitchens/' exact component={MyKitchensContainer}/>
        <Route path='/mykitchens/:id' exact component={EditKitchenContainer}/>
      </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  return ({
    autoLogin: () => dispatch(autoLogin())
  })
}
export default withRouter(connect(null, mapDispatchToProps)(App))
