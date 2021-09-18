import { createAction, props } from '@ngrx/store'

export const login = createAction('LOGIN', props<{ access_token: string }>())
export const logout = createAction('LOGOUT')