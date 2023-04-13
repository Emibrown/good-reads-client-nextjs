import React, { useEffect, useContext, useState } from "react";
import { gql, useQuery } from "@apollo/client"
import { addApolloState, initializeApollo, createApolloClient } from "@/apollo";
import Cookies from "universal-cookie";
import { UserContext } from "@/providers/UserContextProvider";
import BookTab from "@/components/BookTab";


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

    useEffect( () => {
        if(books){
           console.log(books)
        }
    },[books])
  
    return (
      <div className="flex flex-1 bg-white text-black justify-center items-center py-[20px] px-[30px]">
          <div className="max-w-[1200px] flex-1">
            <div>
              <h1 className="text-[30px] text-[#9f9387] font-bold">All Books</h1>
            </div>
            <BookTab books={books} />
          </div>
      </div>
    )
  }
  
  export const getServerSideProps = async ({ req, res }) => {
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