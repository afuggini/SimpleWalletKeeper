import { ADD_WALLET, LOGIN, LOGOUT } from './actions'
import initialState from './initialState';

type Action = {
  type: string
  payload: any
}

export default function reducer (state = initialState, action: Action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_WALLET:
      return {
        ...state,
        wallets: [ payload.wallet, ...state.wallets ]
      }
    case LOGIN:
      return {
        ...state,
        username: payload.username
      }
    case LOGOUT:
      return initialState
    default:
      return state
  }
}
