import { Action, createReducer, on } from '@ngrx/store'
import * as actions from './auth.actions'
import { Auth } from 'src/app/models/Auth'

export const defaultState: Auth = {
  access_token: ''
}

export const authState = { ...defaultState }

const _authReducer = createReducer(
  authState,
  on(actions.login, (state, { access_token }) => Object.assign({}, state, { access_token })),
  on(actions.logout, () =>  Object.assign({}, defaultState))
)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function authReducer(state: Auth | undefined, action: Action) {
  return _authReducer(state, action)
}