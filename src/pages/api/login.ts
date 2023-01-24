import type { NextApiRequest, NextApiResponse } from 'next'
import { withSessionApi } from '@/withSession'
import { users } from '@/mockData'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method !== 'POST') {
    return res.redirect('/')
  }
  if (!req.body || !req.body.username || !req.body.password) {
    return res.status(401).send({ error: 'Missing username and/or password' })
  }

  const matchingUser = users[req.body.username]
  if (!matchingUser || matchingUser.password !== req.body.password) {
    return res.status(401).send({ error: 'Incorrect username or password' })
  }

  // Initializes user with empty wallet list
  // while using session for storage purposes
  req.session.wallets = []
  req.session.user = matchingUser

  await req.session.save()
  res.send({ username: matchingUser.username })
}

export default withSessionApi(handler)
