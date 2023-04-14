import React, {useState, useEffect, useContext, useTransition} from "react";
import FormInput from "@/components/FormInput"
import { UserContext } from "@/providers/UserContextProvider";
import { gql, useMutation } from '@apollo/client';
import Router from "next/router";
import ErrorMessage from "@/components/ErrorMessage";
import FormButton from "@/components/FormButton";
import Cookies from "universal-cookie";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const AddBookMutation =gql`
    mutation Mutation($file: Upload!, $title: String, $author: String) {
      createBook(file: $file, title: $title, author: $author) {
        status
        book {
          addedOn
          author
          bookCollection
          coverImage
          finished
          id
          rating
          title
          user
        }
      }
    }
`;

export default function Add() {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [file, setFile] = useState(null)
    const [error, setError] = useState(null)
    const { getAuthHeaders } = useContext(UserContext)
    const {t} = useTranslation()

    const [createBook, { loading, data }] = useMutation(AddBookMutation, {
        variables: { file, title, author },
        context: {
            headers: {
              "authorization": getAuthHeaders()?.authorization,
            },
        },
    });

    const onSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        try{
           await createBook();
        }catch(e){
            setError(e.message)
        }
    }

    useEffect( () => {
        if(data){
            Router.push("/book/books")
        }
    },[data])

    return (
        <div className="flex flex-1 bg-white text-black justify-center items-center py-[20px] px-[30px]">
        <div className="max-w-[1200px] flex flex-1 justify-center">
          <div className=" max-w-[400px] flex flex-1 flex-col items-center">
            <ErrorMessage message={error} />
            <h1 className="text-[30px] flex flex-1 text-[#9f9387] font-bold">{t("home:add_bk")}</h1>
            <form className="flex flex-1 flex-col w-full" onSubmit={onSubmit}>
                <FormInput 
                  label={t("home:title")}
                  type="text"
                  name="title"
                  required={true}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter Title"
                />
                <FormInput 
                  label={t("home:author")}
                  type="text"
                  name="author"
                  required={true}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Enter Author"
                />
                <div>
                    <p className="text-[18px] m-2">{t("home:cover_image")}</p>
                    <input type="file" required onChange={(e) => setFile(e.target.files[0])} />
                </div>
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

  if( typeof token === "undefined"){
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
    }
  }

};