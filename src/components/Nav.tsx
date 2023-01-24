import { SyntheticEvent, useContext } from 'react'
import axios from 'axios'
import StoreContext from '@/store/StoreContext'
import styles from './Nav.module.scss'
import { logout } from '@/store/actions'

export default function Nav() {
  const [state, dispatch] = useContext(StoreContext)

  const onLogout = async (e: SyntheticEvent) => {
    e.preventDefault()
    await axios.get('/api/logout')
    dispatch(logout())
  }

  return (
    <nav>
      {state?.username && (
        <ul className={styles.nav}>
          <li>
            Welcome, {state.username}!
          </li>
          <li>
            <a href="#" onClick={onLogout}>Logout</a>
          </li>
        </ul>
      )}
    </nav>
  )
}
