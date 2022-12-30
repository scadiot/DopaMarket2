import { Reducer } from 'redux';
import { Product } from '../models';

export const ADD_PRODUCT = 'ADD_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

interface AddProductAction {
  type: typeof ADD_PRODUCT;
  payload: Product;
}

interface SetProductsAction {
  type: typeof SET_PRODUCTS;
  payload: Product[];
}

export type ActionTypes = AddProductAction | SetProductsAction;

const defaultState: Product[] = [

];

const productsReducer: Reducer<Product[]> = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return [...state, action.payload]
      case SET_PRODUCTS:
        return action.payload
    default:
      return state;
  }
}

export default productsReducer;
