import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import 'semantic-ui-css/semantic.min.css'
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { rootReducer } from './reducers/rootReducer.js'
import { BrowserRouter as Router } from 'react-router-dom'
import thunk from 'redux-thunk'


let store = createStore(
  rootReducer,
  applyMiddleware(thunk)
)

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
