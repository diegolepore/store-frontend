import { Action, createReducer, on } from '@ngrx/store'
import * as actions from './user.actions'
import { User } from 'src/app/models/User'

export const defaultState: { user: User } = {
  user: {
    id: 0,
    first_name: '',
    last_name: '',
    email: ''
  }
}

export const userState = { ...defaultState }

const _userReducer = createReducer(
  userState,
  on(actions.setUser, (state, { user }) =>  Object.assign({}, state, { user })),
  on(actions.clearUserState, () =>  Object.assign({}, defaultState))
)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function userReducer(state: { user: User } | undefined, action: Action) {
  return _userReducer(state, action)
}