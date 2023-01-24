import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next'

const cookieOptions = {
  cookieName: 'walletsession',

  // NOTE could go on dev env for more security
  password: 'h_T8KTvEWz!XZJsvkP.7JeV_6sLhJ43CZYrqZe_c'
}

export function withSessionApi(fn: any) {
  return withIronSessionApiRoute(fn, cookieOptions)
}

export function withSessionSsr(fn: any) {
  return withIronSessionSsr(fn, cookieOptions)
}
