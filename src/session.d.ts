import * as IronSession from 'iron-session'

declare module 'iron-session' {
  interface IronSessionData {
    user?: {
      username: string
      password?: string
    }
    wallets: {
      address: string
      privateKey: string
    }[]
  }
}
