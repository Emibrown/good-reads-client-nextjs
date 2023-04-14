import '@/styles/globals.css'
import Header from '@/components/Header'
import { ApolloProvider } from '@apollo/client';
import UserContextProvider from '@/providers/UserContextProvider';
import { createApolloClient } from '@/apollo';
import { appWithTranslation } from 'next-i18next';

function App({ Component, pageProps }) {
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

export default appWithTranslation(App);
