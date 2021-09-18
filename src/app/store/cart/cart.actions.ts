import { createAction, props } from "@ngrx/store";

export const setProductsInCart = createAction('SET_PRODUCTS_IN_CART', props<{ cart: any }>())
export const clearCartState = createAction('CLEAR_CART_STATE')