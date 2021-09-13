import { Action, createReducer, on } from "@ngrx/store";
import * as actions from './auth.actions'

export const defaultState = {
  access_token: ''
}

export const authState = { ...defaultState }

const _authReducer = createReducer(
  authState,
  on(actions.login, (state, { access_token }) => Object.assign({}, state, { access_token })),
  on(actions.logout, (state) =>  Object.assign({}, defaultState))
)

export function authReducer(state: { access_token: string; } | undefined, action: Action) {
  return _authReducer(state, action)
}