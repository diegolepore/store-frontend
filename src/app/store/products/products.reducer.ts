import { Action, createReducer, on } from '@ngrx/store'
import * as actions from './products.actions'
import { Product } from 'src/app/models/Product'

export const defaultState: { products: Product[] } = {
  products: []
}

export const productsState = { ...defaultState }

const _productsReducer = createReducer(
  productsState,
  on(actions.setProducts, (state, { products }) => Object.assign({}, state, { products }))
)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function productsReducer(state: { products: Product[] } | undefined, action: Action) {
  return _productsReducer(state, action)
}