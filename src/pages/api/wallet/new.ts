import type { NextApiRequest, NextApiResponse } from 'next'
import { ethers } from 'ethers'
import { withSessionApi } from '@/lib/withSession'
import { Wallet } from '@/types'

async function handler (
  req: NextApiRequest,
  res: NextApiResponse<Wallet>
) {
  if (req.method !== 'POST' || !req.session.user) {
    return res.status(404)
  }

  const { address, privateKey } = ethers.Wallet.createRandom()

  req.session.wallets = [
    ...req.session.wallets,
    { address, privateKey }
  ]
  await req.session.save()

  res.status(200).json({ address, privateKey })
}

export default withSessionApi(handler)
