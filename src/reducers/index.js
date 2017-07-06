"use strict"
import {combineReducers} from 'redux';

import {booksReducer} from './booksReducer';
import {cartReducers} from './cartReducer';

export default combineReducers({
  books: booksReducer,
  cart: cartReducers
})
