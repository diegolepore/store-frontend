import { createAction, props } from "@ngrx/store";

export const setProducts = createAction('SET_PRODUCTS', props<{ products: any }>())