import { Action, createReducer, on } from "@ngrx/store";
import * as actions from './cart.actions'

export const defaultState = {
  cart: []
}

export const productsState = { ...defaultState }

const _cartReducer = createReducer(
  productsState,
  on(actions.setProductsInCart, (state, { cart }) => Object.assign({}, state, { cart })),
  on(actions.clearCartState, (state) => Object.assign({}, defaultState))
)

export function cartReducer(state: { cart: never[]; } | undefined, action: Action) {
  return _cartReducer(state, action)
}