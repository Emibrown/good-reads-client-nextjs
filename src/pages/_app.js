import '@/styles/globals.css'
import Header from '@/components/Header'
import { ApolloProvider } from '@apollo/client';
import useApollo from '../hooks/useApollo';
import UserContextProvider from '@/providers/UserContextProvider';
import { createApolloClient } from '@/apollo';

export default function App({ Component, pageProps }) {
  const client = createApolloClient();

  return (
    <UserContextProvider>
      <ApolloProvider client={client}>
        <Header />
        <Component {...pageProps} />
      </ApolloProvider>
    </UserContextProvider>

  )
}
