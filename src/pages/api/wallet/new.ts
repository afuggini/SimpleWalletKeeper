import type { NextApiRequest, NextApiResponse } from 'next'
import { ethers } from 'ethers'
import { withSessionApi } from '@/withSession'

type Data = {
  address: string
  privateKey: string
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST' || !req.session.user) {
    res.status(404)
    return
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
