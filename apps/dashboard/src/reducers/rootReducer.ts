import { combineReducers } from 'redux';
import productsReducer from './products';
import {State} from '../models';

export default combineReducers<State>({
  products: productsReducer,
})
