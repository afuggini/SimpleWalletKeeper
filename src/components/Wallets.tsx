import { SyntheticEvent, useState } from 'react'
import styles from './Wallets.module.scss'
import axios from 'axios'

type Wallet = {
  address: string
  privateKey: string
}

type Props = {
  wallets: Wallet[]
}

export default function Wallets({ wallets }: Props) {
  const [isFetching, setIsFetching] = useState('')

  const getBalance = async (address: string) => {
    try {
      setIsFetching(address)
      const { data: balance } = await axios.get(`/api/wallet/balance/${address}`)
      alert(balance)
    } catch (error) {
      console.error(error)
    } finally {
      setIsFetching('')
    }
  }

  const onShowKeyClick = (privateKey: string) => (e: SyntheticEvent) => {
    e.preventDefault()
    alert(privateKey)
  }

  const onShowBalanceClick = (address: string) => (e: SyntheticEvent) => {
    e.preventDefault()
    if (isFetching) return
    getBalance(address)
  }

  return (
    <div>
      {wallets?.length ? (
        <ul className={styles.walletList}>
          {wallets?.map(({ address, privateKey }) => (
            <li key={address}>
              <div>{address}</div>
              <ul className="flex">
                <li className="mr-2">
                  🔑 <a href="#" onClick={onShowKeyClick(privateKey)}>show key</a>
                </li>
                <li className="mr-2">
                  {isFetching === address ? (
                    <span className="text-gray-400">🔍 fetching...</span>
                  ) : (
                    <>🔍 <a href="#" onClick={onShowBalanceClick(address)}>show balance</a></>
                  )}
                </li>
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <div>No wallets yet.</div>
      )}
    </div>
  )
}
