// TODO:
// get posts appearing on their own
// be able to edit and delete posts

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import MainLayout from './components/main-layout';
import { ActionTypes } from './actions';
import './style.scss';

// this creates the store with the reducers, and does some other stuff to initialize devtools
// boilerplate to copy, don't have to know
const store = createStore(reducers, {}, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f,
));

const token = localStorage.getItem('token');
if (token) {
  store.dispatch({ type: ActionTypes.AUTH_USER });
}

// we now wrap App in a Provider
ReactDOM.render(
  <Provider store={store}>
    <MainLayout />
  </Provider>
  , document.getElementById('main'),
);
