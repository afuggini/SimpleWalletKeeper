import Head from 'next/head'
import styles from '@/components/Layout.module.scss'
import Nav from './Nav'

type Props = {
  children: any
  title?: string
  description?: string
}

const defaultTitle = 'Wallet Challenge'

export default function Layout({
  children,
  description,
  title = defaultTitle
}: Props) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description || title || defaultTitle} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div>
          <Nav />
          {children}
        </div>
      </main>
    </>
  )
}
