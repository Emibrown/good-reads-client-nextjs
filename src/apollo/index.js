import {
    ApolloClient,
    InMemoryCache,
    HttpLink
  } from '@apollo/client';
  import merge from 'deepmerge';
  import isEqual from 'lodash-es/isEqual';
    
  export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';
  
  let apolloClient;
  
  function createApolloClient() {
    const link = new HttpLink({
      uri: "http://localhost:8080/qraphql",
      headers: ''
    })

    return new ApolloClient({
      ssrMode: typeof window === 'undefined',
      link,
      cache: new InMemoryCache(),
    });
  }
  
  export function initializeApollo(initialState) {
    const _apolloClient = apolloClient ?? createApolloClient();
  
    if (initialState) {
      const existingCache = _apolloClient.cache.extract();
  
      const data = merge(initialState, existingCache, {
        arrayMerge: (destinationArray, sourceArray) => [
          ...sourceArray,
          ...destinationArray.filter((d) =>
            sourceArray.every((s) => !isEqual(d, s))
          ),
        ],
      });
      _apolloClient.cache.restore(data);
    }
  
    if (typeof window === 'undefined') {
      return _apolloClient;
    }
  
    if (!apolloClient) {
      apolloClient = _apolloClient;
    }
  
    return _apolloClient;
  }
  
  export function addApolloState(
    client,
    pageProps
  ) {
    if (pageProps?.props) {
      pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
    }
  
    return pageProps;
  }