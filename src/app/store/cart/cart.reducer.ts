import { Action, createReducer, on } from '@ngrx/store'
import * as actions from './cart.actions'
import { CartProduct } from 'src/app/models/CartProduct'

export const defaultState: { cart: CartProduct[] } = {
  cart: []
}

export const productsState = { ...defaultState }

const _cartReducer = createReducer(
  productsState,
  on(actions.setProductsInCart, (state, { cart }) => Object.assign({}, state, { cart })),
  on(actions.clearCartState, () => Object.assign({}, defaultState))
)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function cartReducer(state: { cart: CartProduct[] } | undefined, action: Action) {
  return _cartReducer(state, action)
}