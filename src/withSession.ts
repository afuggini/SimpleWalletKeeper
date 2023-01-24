import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next'

const cookieOptions = {
  cookieName: 'walletsession',

  // NOTE: Should go on dev env for more security
  password: 'some_long_and_secure_password_goes_here'
}

export function withSessionApi(fn: any) {
  return withIronSessionApiRoute(fn, cookieOptions)
}

export function withSessionSsr(fn: any) {
  return withIronSessionSsr(fn, cookieOptions)
}
