import React, {useState, useEffect, useContext} from "react";
import FormInput from "@/components/FormInput"
import { UserContext } from "@/providers/UserContextProvider";
import { gql, useMutation } from '@apollo/client';
import Router from "next/router";
import ErrorMessage from "@/components/ErrorMessage";
import FormButton from "@/components/FormButton";
import Cookies from "universal-cookie";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from "next-i18next";

const SignupMutation =gql`
    mutation Mutation($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
        createUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
            status
            user {
                email
                firstName
                id
                lastName
            }
        }
    }
`;

export default function Signup() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const { isSignedIn } = useContext(UserContext)
    const {t} = useTranslation();


    if(isSignedIn()) Router.push("/")

    const [createUser, { loading, data }] = useMutation(SignupMutation, {
        variables: { firstName, lastName, email, password }
    });

    const onSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        try{
           await createUser();
        }catch(e){
            setError(e.message)
        }
    }

    useEffect( () => {
        if(data){
            Router.push("/user/login")
        }
    },[data])

    return (
        <div className="flex flex-1 bg-white text-black justify-center items-center py-[20px] px-[30px]">
        <div className="max-w-[1200px] flex flex-1 justify-center">
          <div className=" max-w-[400px] flex flex-1 flex-col items-center">
            <ErrorMessage message={error} />
            <h1 className="text-[30px] flex flex-1 text-[#9f9387] font-bold">{t("home:create_account")}</h1>
            <form className="flex flex-1 flex-col w-full" onSubmit={onSubmit}>
                <FormInput 
                  label={t("home:first_name")}
                  type="text"
                  name="firstName"
                  required={true}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter first name"
                />
                <FormInput 
                  label={t("home:last_name")}
                  type="text"
                  name="lastName"
                  required={true}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter last name"
                />
                <FormInput 
                  label={t("home:email")}
                  type="email"
                  name="emailAddress"
                  required={true}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email Address"
                />
                <FormInput 
                  label={t("home:password")}
                  type="password"
                  name="password"
                  required={true}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                />
                <FormButton 
                  type="submit"
                  loading={loading}
                  title={t("home:sign_up")}
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

    console.log(token)

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