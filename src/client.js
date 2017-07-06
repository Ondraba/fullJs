"use strict"
//React

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

import {Router, Route, IndexRoute, browserHistory} from 'react-router';


import {applyMiddleware, createStore} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
//step1: create store
//step2 create and dispatch actions
//step3 reducers

import reducers from  './reducers/index';
import {addToCart} from './actions/cartActions';
import {postBooks, deleteBooks, updateBooks} from './actions/booksActions';

const middleware = applyMiddleware(thunk, createLogger());
const store = createStore(reducers, middleware);
// store.subscribe(function(){
//
//     console.log('current state is ', store.getState());
// })

// store.dispatch({type:"INCREMENT", payload:1})
import BooksList from './components/pages/booksList';
import Cart from './components/pages/cart';
import BooksForm from './components/pages/booksForm';
import Main from './main';

const Routes = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Main}>
        <IndexRoute component={BooksList}></IndexRoute>
        <Route path="/admin" component={BooksForm} />
         <Route path="/cart" component={Cart} />
      </Route>
    </Router>
  </Provider>
)

render(
  Routes, document.getElementById('app')
);

// store.dispatch({
//   type: "POST_BOOK",
//   payload: [{
//     id:1,
//     title:'this is the book title',
//     description: 'this is desc',
//     price: 22
//   },
//   {
//     id:2,
//     title:'this is the book title two',
//     description: 'this is desc two',
//     price: 55
//   }]
// })
//
//
// store.dispatch({
//   type: "POST_BOOK",
//   payload: [{
//     id:3,
//     title:'this is the book title 3',
//     description: 'this is desc 3',
//     price: 99
//   }]
// })
//
//
// store.dispatch({
//   type: "DELETE_BOOK",
//   payload: {
//     id:1
//   }
// })
//
// store.dispatch({
//   type: "UPDATE_BOOK",
//   payload: {
//     id:2,
//     title:'Learn React'
//   }
// })

//card

// store.dispatch(addToCart([{id: 1}]));

// store.dispatch(postBooks(
//   [{
//     id:1,
//     title:'this is the book title',
//     description: 'this is desc',
//     price: 22
//   },
//   {
//     id:2,
//     title:'this is the book title two',
//     description: 'this is desc two',
//     price: 55
//   }]
// ))

// store.dispatch(deleteBooks(
//   {id:1}
// ))
//
// store.dispatch(updateBooks(
//   {
//     id:2,
//     title:'Learn React'
//   }
// ))
