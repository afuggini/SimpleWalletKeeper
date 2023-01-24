import { useReducer, useState } from 'react'
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
  const [state, dispatch] = useReducer(reducer, {
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
        setErrorMessage('Internal server error. Please try again.');
        return 'An unexpected error occurred';
      }
    }
  }

  const onClickCreate = async (e) => {
    e.preventDefault()
    const newWallet = await axios.post('/api/wallet/new')
    dispatch(addWallet(newWallet.data))
  }

  return (
    <StoreContext.Provider value={[state, dispatch]}>
      <Layout>
        {state.username ? (
          <>
            <h1 className="mb-3">My Wallets</h1>
            <div className="mb-3 text-right">
              ➕ <a href="#" onClick={onClickCreate}>Create New Wallet</a>
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
  ({ req }) => ({
    props: {
      username: req.session.user?.username || null,
      wallets: req.session.wallets || []
    }
  })
)
