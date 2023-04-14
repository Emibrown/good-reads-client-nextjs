import React, {useState, useEffect, useCallback, useContext} from "react";
import FormInput from "@/components/FormInput"
import { gql, useMutation } from '@apollo/client';
import FormButton from "@/components/FormButton";
import ErrorMessage from "@/components/ErrorMessage";
import { UserContext } from "@/providers/UserContextProvider";
import Router from "next/router";
import Cookies from "universal-cookie";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from "next-i18next";

const LoginMutation =gql`
    mutation Mutation($email: String!, $password: String!) {
        userLogin(email: $email, password: $password) {
            access_token
            status
        }
    }
`;

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const { getAuthHeaders, setAuthToken, isSignedIn } = useContext(UserContext)
    const {t} = useTranslation();

    if(isSignedIn()) Router.push("/")

    const [userLogin, { client, loading, data }] = useMutation(LoginMutation, {
        variables: { email, password }
    });

    const onSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        try{
           await userLogin();
        }catch(e){
            setError(e.message)
        }
    }
  
    useEffect( () => {
        if(data){
            setAuthToken(data.userLogin.access_token)
        }
    },[data, setAuthToken])

    useEffect( () => {
        console.log(getAuthHeaders())
    },[getAuthHeaders])

    return (
        <div className="flex flex-1 bg-white text-black justify-center items-center py-[20px] px-[30px]">
        <div className="max-w-[1200px] flex flex-1 justify-center">
          <div className=" max-w-[400px] flex flex-1 flex-col items-center">
            <ErrorMessage message={error} />
            <h1 className="text-[30px] flex flex-1 text-[#9f9387] font-bold">{t("home:sign_title")}</h1>
            <form className="flex flex-1 flex-col w-full" onSubmit={onSubmit}>
                <FormInput 
                  label={t("home:email")}
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  required={true}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <FormInput 
                  label={t("home:password")}
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  required={true}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FormButton 
                  type="submit"
                  loading={loading}
                  title={t("home:continue")}
                />
            </form>
          </div>
        </div>
    </div>
    )
}

export const getServerSideProps = async ({ locale, req, res }) => {
    const cookies = new Cookies(req.headers.cookie);
    const token = cookies.get("token");

    if( typeof token !== "undefined"){
        return {
            redirect: {
              destination: '/',
              permanent: false,
            },
        }
    }


   return {
    props: {
        ...(await serverSideTranslations(locale, ['home'])),
    },
   }
   
  };