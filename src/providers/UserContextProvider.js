import React, { createContext, useState } from 'react';
import useProvideAuth from '@/hooks/useProvideAuth';

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const auth = useProvideAuth()

  return (
    <UserContext.Provider value={auth}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContextProvider;