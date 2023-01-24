import type { NextApiRequest } from 'next'
import { Reducer, SyntheticEvent, useReducer, useState } from 'react'
import axios from 'axios'
import { withSessionSsr } from '@/withSession'
import Layout from '@/components/Layout'
import SignInForm from '@/components/SignInForm'
import Wallets from '@/components/Wallets'

import StoreContext from '@/store/StoreContext'
import reducer from '@/store/reducer'
import initialState from '@/store/initialState'
import { addWallet, login } from '@/store/actions'

type Props = {
  username: string | null
  wallets: any[]
}

export default function Home({ username, wallets }: Props) {
  const [state, dispatch] = useReducer<Reducer<any, any>>(reducer, {
    ...initialState,
    username,
    wallets: wallets.reverse()
  })
  const [errorMessage, setErrorMessage] = useState('')

  const onSignIn = async ({ username, password }: { username: string; password: string }) => {
    try {
      setErrorMessage('')
      const response = await axios.post('/api/login', {
        username,
        password
      })
      dispatch(login(username))
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data.error)
      } else {
        setErrorMessage('Internal server error. Please try again.')
        return 'An unexpected error occurred'
      }
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
              <h1 className="">My Wallets</h1>
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
