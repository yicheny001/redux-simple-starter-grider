import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {Router, browserHistory} from 'react-router'
import reducers from './reducers';
import routes from './routes'
import promise from 'redux-promise'
import {reducer as formReducer} from 'redux-form'

const createStoreWithMiddleware = applyMiddleware(
  promise
)(createStore);
//this makes sure that the promise reaches the middleware before it gets to the reducers

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory} routes={routes}>
    </Router>
  </Provider>
  , document.querySelector('.container'));
