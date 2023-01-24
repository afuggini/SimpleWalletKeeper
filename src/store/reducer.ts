import { ADD_WALLET, LOGIN, LOGOUT } from './actions'
import initialState from './initialState'

export default function reducer (state = initialState, action: any) {
  const { type, payload } = action
  console.log(type, payload)

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
