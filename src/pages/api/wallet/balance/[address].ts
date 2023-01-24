import type { NextApiRequest, NextApiResponse } from 'next'
import { ethers } from 'ethers'
import { withSessionApi } from '@/withSession'

async function handler (
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  const { address } = req.query
  if (!req.session.user || !address || typeof address !== 'string') {
    return res.status(404)
  }

  try {
    const provider = new ethers.providers.JsonRpcProvider('https://rpc.sepolia.dev')
    const balance = await provider.getBalance(address as string)
    res.status(200).end(ethers.utils.formatEther(balance))
  } catch (error) {
    res.status(500).end()
  }
}

export default withSessionApi(handler)
