import { Action, createReducer, on } from "@ngrx/store";
import * as actions from './products.actions'
import { Product } from "src/app/models/Product";

export const defaultState = {
  products: []
}

export const productsState = { ...defaultState }

const _productsReducer = createReducer(
  productsState,
  on(actions.setProducts, (state, { products }) => Object.assign({}, state, { products })),
)

export function productsReducer(state: { products: never[] } | undefined, action: Action) {
  return _productsReducer(state, action)
}