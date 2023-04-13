import React, { useEffect } from "react";
import { gql } from '@apollo/client';
import { initializeApollo } from "@/apollo";
import Image from "next/image";
import Cookies from "universal-cookie";
import moment from 'moment';
import Link from "next/link";

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

export default function BookId({book}) {

    useEffect( () => {
        console.log(book)
    },[book])

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
                    <div>
                        <a className="bg-black inline-block text-center w-[100%] text-white py-[10px] px-[20px]">Finish</a>
                    </div>
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
        const client = initializeApollo("", `Bearer ${token}`);
  
        const id = query.id

        const result = await client.query({
          query: getBook,
          variables: {id},
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
  