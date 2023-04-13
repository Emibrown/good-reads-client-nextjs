import React, { useEffect, useContext, useState } from "react";
import { gql, useQuery } from "@apollo/client"
import { addApolloState, initializeApollo } from "@/apollo";
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

export default function Books() {
    const { data } = useQuery(getBooksQuery);
    const { isSignedIn } = useContext(UserContext)

    let [categories] = useState({
        Recent: [
          {
            id: 1,
            title: 'Does drinking coffee make you smarter?',
            date: '5h ago',
            commentCount: 5,
            shareCount: 2,
          },
          {
            id: 2,
            title: "So you've bought coffee... now what?",
            date: '2h ago',
            commentCount: 3,
            shareCount: 2,
          },
        ],
        Popular: [
          {
            id: 1,
            title: 'Is tech making coffee better or worse?',
            date: 'Jan 7',
            commentCount: 29,
            shareCount: 16,
          },
          {
            id: 2,
            title: 'The most innovative things happening in coffee',
            date: 'Mar 19',
            commentCount: 24,
            shareCount: 12,
          },
        ],
        Trending: [
          {
            id: 1,
            title: 'Ask Me Anything: 10 answers to your questions about coffee',
            date: '2d ago',
            commentCount: 9,
            shareCount: 5,
          },
          {
            id: 2,
            title: "The worst advice we've ever heard about coffee",
            date: '4d ago',
            commentCount: 1,
            shareCount: 2,
          },
        ],
      })

    // useEffect( () => {
    //     if(!isSignedIn()) Router.push("/")
    // },[isSignedIn])

    useEffect( () => {
        if(data){
           console.log(data.getBooks.books)
        }
    },[data])
  
    return (
      <div className="flex flex-1 bg-white text-black justify-center items-center py-[20px] px-[30px]">
          <div className="max-w-[1200px] flex-1">
            <div>
              <h1 className="text-[30px] text-[#9f9387] font-bold">All Books</h1>
            </div>
            <BookTab books={data.getBooks.books} />
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
        const client = initializeApollo("", `Bearer ${token}`);
  
        await client.query({
          query: getBooksQuery,
        });
      
        return addApolloState(client, {
          props: {},
        });
    } catch (e) {
        console.log("server error")
        return {
            redirect: {
              destination: '/',
              permanent: false,
            },
        }
    }
   
  };