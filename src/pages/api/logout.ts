
import type { NextApiRequest, NextApiResponse } from 'next'
import { withSessionApi } from "@/withSession"

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  req.session.destroy()
  await req.session.save()
  res.send({ ok: true })
}

export default withSessionApi(handler)
