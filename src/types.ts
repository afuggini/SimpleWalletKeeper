export type User = {
  username: string
  password: string
}

export type UserDB = {
  [u: string]: User
}

export type Wallet = {
  address: string
  privateKey: string
}
