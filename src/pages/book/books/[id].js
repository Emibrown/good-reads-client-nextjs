import React, { useEffect, useState, useContext } from "react";
import { gql, useMutation } from '@apollo/client';
import { initializeApollo, createApolloClient } from "@/apollo";
import Image from "next/image";
import Cookies from "universal-cookie";
import moment from 'moment';
import Link from "next/link";
import FormButton from "@/components/FormButton";
import FormSelect from "@/components/FormSelect";
import ErrorMessage from "@/components/ErrorMessage";
import { UserContext } from "@/providers/UserContextProvider";
import Router from "next/router";

const getBook = gql`
   query Query($id: String) {
        getBook(id: $id) {
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

const ON_FINISH =gql`
    mutation Mutation($id: String, $rating: String) {
        onFinish(id: $id, rating: $rating) {
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

export default function BookId({book}) {
    const [id, setId] = useState(book.id)
    const [rating, setRating] = useState(book.rating)
    const [error, setError] = useState(null)
    const { getAuthHeaders } = useContext(UserContext)

    const [onFinish, { loading, data }] = useMutation(ON_FINISH, {
        variables: { 
            id,
            rating
        },
        context: {
            headers: {
              "authorization": getAuthHeaders()?.authorization,
            },
        },
    });

    useEffect( () => {
        console.log(book)
    },[book])

    useEffect( () => {
        if(data){
            Router.push("/book/books")
        }
    },[data, book])

    const onSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        try{
           await onFinish();
        }catch(e){
            console.log(e)
            setError(e.message)
        }
    }

    return (
      <div className="flex flex-1 bg-white text-black justify-center items-center py-[20px] px-[30px]">
          <div className="max-w-[1200px] flex-1">
            <div>
              <div>
                <h1 className="text-[30px] text-[#9f9387] font-bold">Title: {book.title}</h1>
              </div>
              <div className="flex flex-1 flex-col md:flex-row md:space-x-[40px]">
                <Image alt='' loader={() => book.coverImage} src={book.coverImage} width={200} height={200}/>
                <div className="space-y-2">
                    <div className="mt-1 flex space-x-2 text-[20px]font-normal leading-4 text-gray-500">
                        <p>{book.author} Author</p>
                    </div>
                    <div className="mt-1 flex space-x-2 text-[20px] font-normal leading-4 text-gray-500">
                        <p>{book.bookCollection} Collection</p>
                    </div>
                    <div className="mt-1 flex space-x-2 text-[20px] font-normal leading-4 text-gray-500">
                        <p>{moment(new Date(parseInt(book.addedOn))).format('LLL')} Date</p>
                    </div>
                    <div className="mt-1 flex space-x-2 text-[20px]font-normal leading-4 text-gray-500">
                        <p>{book.rating} Rating</p>
                    </div>
                    <div>
                        <Link href={`/book/edit/${book.id}`} className="bg-[#f6d479] inline-block text-center w-[100%] text-black py-[10px] px-[20px]">Modify Book</Link>
                    </div>
                    {!book.finished && (
                        <div>
                            <ErrorMessage message={error} />
                            <form className="flex flex-1 flex-col w-full" onSubmit={onSubmit}>
                                <FormSelect
                                    label="Rate this book from 0 - 5"
                                    required
                                    value={rating}
                                    options={[0,1,2,3,4,5]}
                                    onChange={(e) => setRating(e.target.value)}
                                />
                                <FormButton 
                                    type="submit"
                                    loading={loading}
                                    title="Finish"
                                />
                            </form>
                        </div>
                    )}
                </div>
              </div>
            </div>
          </div>
      </div>
    )
  }

  export async function getServerSideProps({ req, query }) {
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
  
        const id = query.id

        const result = await client.query({
          query: getBook,
          variables: {id},
          context: {
            headers: {
                "authorization": `Bearer ${token}`
            },
          },
        });
      
        return {
            props: {
                book: result.data.getBook.book
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
  }
  