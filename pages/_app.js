import { AppContextProvider } from '@/contexts/AppContext'
import '@/styles/globals.css'
import { SessionProvider } from "next-auth/react"
import Head from 'next/head'


export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <div>
      <Head>
        <title>twiter</title>
      </Head>
      <SessionProvider session={session}>
        <AppContextProvider>
          <Component {...pageProps} />
        </AppContextProvider>
      </SessionProvider>
    </div>
  )
}
