import { Reducer, SyntheticEvent, useReducer, useState } from 'react'
import type { NextApiRequest } from 'next'
import axios from 'axios'
import { withSessionSsr } from '@/withSession'
import Layout from '@/components/Layout'
import SignInForm from '@/components/SignInForm'
import Wallets from '@/components/Wallets'
import StoreContext from '@/store/StoreContext'
import reducer from '@/store/reducer'
import initialState from '@/store/initialState'
import { addWallet, login } from '@/store/actions'
import { User, Wallet } from '@/types'

type Props = {
  username: string | null
  wallets: Wallet[]
}

export default function Home({ username, wallets }: Props) {
  const [state, dispatch] = useReducer<Reducer<any, any>>(reducer, {
    ...initialState,
    username,
    wallets: wallets.reverse()
  })
  const [errorMessage, setErrorMessage] = useState('')

  const onSignIn = async ({ username, password }: User) => {
    try {
      setErrorMessage('')
      await axios.post('/api/login', { username, password })
      dispatch(login(username))
    } catch (error) {
      setErrorMessage(
        axios.isAxiosError(error)
          ? error.response?.data.error
          : 'Internal server error. Please try again.'
      )
    }
  }

  const onClickCreate = async (e: SyntheticEvent) => {
    e.preventDefault()
    const newWallet = await axios.post('/api/wallet/new')
    dispatch(addWallet(newWallet.data))
  }

  return (
    <StoreContext.Provider value={[state, dispatch]}>
      <Layout>
        {state.username ? (
          <>
            <div className="flex justify-between items-center mb-3 pb-3 border-b-2">
              <h1>My Wallets</h1>
              <div>
                ➕ <a href="#" onClick={onClickCreate}>Create New Wallet</a>
              </div>
            </div>
            <Wallets wallets={state.wallets} />
          </>
        ) : (
          <SignInForm
            errorMessage={errorMessage}
            onSubmit={onSignIn}
          />
        )}
      </Layout>
    </StoreContext.Provider>
  )
}

export const getServerSideProps = withSessionSsr(
  ({ req }: { req: NextApiRequest }) => ({
    props: {
      username: req.session.user?.username || null,
      wallets: req.session.wallets || []
    }
  })
)
