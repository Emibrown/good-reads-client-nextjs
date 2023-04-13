import React, { useEffect, useState, useCallback } from 'react'
import Cookies from "universal-cookie";
import Router from "next/router";

const cookies = new Cookies();

function useProvideAuth() {
    const [authToken, setAuthToken] = useState(null)

    useEffect(() => {
           //checking if there already is a state in localstorage
           //if yes, update the current state with the stored one
          //  setAuthToken(JSON.parse(localStorage.getItem("state")))
           const token = cookies.get("token");
           if( typeof token !== "undefined"){
                console.log("token", token)
                setAuthToken(token)
            }
     }, []);

     useEffect(() => {
        if (authToken !== null) {
          //  localStorage.setItem("state", JSON.stringify(authToken)); 
           cookies.set("token", authToken, { path: "/" });
        }
     }, [authToken]);
  
    const isSignedIn = useCallback( () => {
      if (authToken) {
        return true
      } else {
        return false
      }
    },[authToken])
  
    const getAuthHeaders = useCallback( () => {
        if (!authToken) return null
  
        return {
            authorization: `Bearer ${authToken}`,
        }
    },[authToken])
  
    const signOut = () => {
      setAuthToken(null)
      localStorage.clear()
      cookies.remove("token", { path: "/" })
      Router.push("/")
    }
  
    return {
      getAuthHeaders,
      isSignedIn,
      setAuthToken,
      signOut,
    }
  }

  export default useProvideAuth;