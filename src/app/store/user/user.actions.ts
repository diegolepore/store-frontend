import { createAction, props } from "@ngrx/store";

export const setUser = createAction('SET_USER', props<{ user: any }>())
export const clearUserState = createAction('CLEAR_USER_STATE')