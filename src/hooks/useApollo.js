import { useMemo } from 'react';

import { APOLLO_STATE_PROP_NAME, initializeApollo } from '../apollo';
import Cookies from "universal-cookie";

const cookies = new Cookies();

function useApollo(pageProps) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];

  const client = useMemo(() => {
    return initializeApollo(state, null)
  }, [state]);

  return client;
}

export default useApollo;