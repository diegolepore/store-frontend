import { createAction, props } from '@ngrx/store'
import { User } from 'src/app/models/User'

export const setUser = createAction('SET_USER', props<{ user: User }>())
export const clearUserState = createAction('CLEAR_USER_STATE')