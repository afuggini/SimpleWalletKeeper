import type { NextApiRequest, NextApiResponse } from 'next'

import { ethers } from 'ethers'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  const { address } = req.query
  const provider = new ethers.providers.JsonRpcProvider('https://rpc.sepolia.dev')

  if (!address || typeof address !== 'string') {
    return res.status(404)
  }

  const balance = await provider.getBalance(address as string)
  res.status(200).end(ethers.utils.formatEther(balance))
}
