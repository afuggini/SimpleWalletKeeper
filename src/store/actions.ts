import { Wallet } from '@/types'

export const ADD_WALLET = 'ADD_WALLET'
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

export const addWallet = (wallet: Wallet) => ({
  type: ADD_WALLET,
  payload: { wallet }
})

export const login = (username: string) => ({
  type: LOGIN,
  payload: { username }
})

export const logout = () => ({
  type: LOGOUT
})
