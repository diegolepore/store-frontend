import { Action, createReducer, on } from "@ngrx/store";
import * as actions from './user.actions'
import { User } from "src/app/models/User";

export const defaultState = {
  user: {}
}

export const userState = { ...defaultState }

const _userReducer = createReducer(
  userState,
  on(actions.setUser, (state, { user }) =>  Object.assign({}, state, { user })),
  on(actions.clearUserState, (state) =>  Object.assign({}, defaultState))
)

export function userReducer(state: { user: any} | undefined, action: Action) {
  return _userReducer(state, action)
}