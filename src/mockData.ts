type UserDB = {
  [u: string]: {
    username: string
    password: string
  }
}

export const users: UserDB = {
  'admin': {
    username: 'admin',
    password: '123456'
  }
}
