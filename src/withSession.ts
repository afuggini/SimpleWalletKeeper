import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next'

const cookieOptions = {
  cookieName: 'walletsession',
  password: 'some_long_and_secure_password_goes_here', // NOTE: Shoud go on a dev env for security reasons
}

export function withSessionApi(fn: any) {
  return withIronSessionApiRoute(fn, cookieOptions)
}

export function withSessionSsr(fn: any) {
  return withIronSessionSsr(fn, cookieOptions)
}
