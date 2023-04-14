import React, { useEffect, useContext, useState } from "react";
import { gql } from "@apollo/client"
import { createApolloClient } from "@/apollo";
import Cookies from "universal-cookie";
import BookTab from "@/components/BookTab";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Filter from "@/components/Filter";

const getBooksQuery = gql`
    query Query {
        getBooks {
            books {
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

export default function Books({books}) {
    const [allBooks, setAllBooks] = useState(books)
    const {t} = useTranslation()
 
    return (
      <div className="flex flex-1 bg-white text-black justify-center items-center py-[20px] px-[30px]">
          <div className="max-w-[1200px] flex-1">
            <div>
              <h1 className="text-[30px] text-[#9f9387] font-bold">{t("home:all_bk")}</h1>
            </div>
            <Filter value={books} onChange={(val) => setAllBooks(val)} />
            <BookTab books={allBooks} />
          </div>
      </div>
    )
  }
  
  export const getServerSideProps = async ({ locale, req }) => {
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

    try {
        const client = createApolloClient();
  
        const result = await client.query({
          query: getBooksQuery,
          context: {
            headers: {
                "authorization": `Bearer ${token}`
            },
          },
        });
      
        return {
            props: {
                ...(await serverSideTranslations(locale, ['home'])),
                books: result.data.getBooks.books
            }
        }
      
    } catch (e) {
        console.log("server error", e)
        return {
            redirect: {
              destination: '/',
              permanent: false,
            },
        }
    }
   
  };