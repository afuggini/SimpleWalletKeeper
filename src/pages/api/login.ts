import { withSessionApi } from '@/lib/withSession'
import { users } from '@/mockData'
import { makeLoginHandler  } from '@/lib/login'

const getUser = (username: string) => Promise.resolve(users[username])

export default withSessionApi(makeLoginHandler(getUser))
