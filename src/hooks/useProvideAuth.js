import React, { useEffect, useState, useCallback } from 'react'

function useProvideAuth() {
    const [authToken, setAuthToken] = useState(null)

    useEffect(() => {
        if (JSON.parse(localStorage.getItem("state"))) { 
           //checking if there already is a state in localstorage
           //if yes, update the current state with the stored one
           setAuthToken(JSON.parse(localStorage.getItem("state")))
        }
     }, []);

     useEffect(() => {
        if (authToken !== null) {
           localStorage.setItem("state", JSON.stringify(authToken)); 
        }
     }, [authToken]);
  
    const isSignedIn = () => {
      if (authToken) {
        return true
      } else {
        return false
      }
    }
  
    const getAuthHeaders = useCallback( () => {
        if (!authToken) return "yeah"
  
        return {
            authorization: `Bearer ${authToken}`,
        }
    },[authToken])
  
    const signOut = () => {
      setAuthToken(null)
      localStorage.clear()
    }
  
    return {
      getAuthHeaders,
      isSignedIn,
      setAuthToken,
      signOut,
    }
  }

  export default useProvideAuth;