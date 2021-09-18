import { createAction, props } from '@ngrx/store'
import { Product } from 'src/app/models/Product'

export const setProducts = createAction('SET_PRODUCTS', props<{ products: Product[] }>())