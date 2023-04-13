import '@/styles/globals.css'
import Header from '@/components/Header'
import { ApolloProvider } from '@apollo/client';
import useApollo from '../hooks/useApollo';
import UserContextProvider from '@/providers/UserContextProvider';

export default function App({ Component, pageProps }) {
  const client = useApollo(pageProps);

  return (
    <UserContextProvider>
      <ApolloProvider client={client}>
        <Header />
        <Component {...pageProps} />
      </ApolloProvider>
    </UserContextProvider>

  )
}
