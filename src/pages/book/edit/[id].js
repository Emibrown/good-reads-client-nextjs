import React, {useState, useEffect, useContext} from "react";
import FormInput from "@/components/FormInput"
import { UserContext } from "@/providers/UserContextProvider";
import { gql, useMutation } from '@apollo/client';
import { createApolloClient } from "@/apollo";
import Router from "next/router";
import ErrorMessage from "@/components/ErrorMessage";
import FormButton from "@/components/FormButton";
import Cookies from "universal-cookie";
import FormSelect from "@/components/FormSelect";

const UpdateBookMutation =gql`
    mutation Mutation($file: Upload, $id: String, $title: String, $author: String, $bookCollection: String) {
      updateBook(file: $file, id: $id, title: $title, author: $author, bookCollection: $bookCollection) {
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

export default function Edit({book}) {
    const [id, setId] = useState(book.id)
    const [title, setTitle] = useState('gg')
    const [author, setAuthor] = useState('gg')
    const [collection, setCollection] = useState('Read')
    const [file, setFile] = useState(null)
    const [error, setError] = useState(null)
    const { getAuthHeaders } = useContext(UserContext)
    
    const [updateBook, { loading, data }] = useMutation(UpdateBookMutation, {
        variables: { 
            file,
            id,
            title, 
            author,
            bookCollection: collection
        },
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
           await updateBook();
        }catch(e){
            console.log(e)
            setError(e.message)
        }
    }

    useEffect( () => {
        if(data){
            Router.push(`/book/books/${book.id}`)
        }
    },[data, book])

    useEffect( () => {
        setAuthor(book?.author)
        setTitle(book?.title)
        setCollection(book?.bookCollection)
        setId(book.id)
    },[book])

    return (
        <div className="flex flex-1 bg-white text-black justify-center items-center py-[20px] px-[30px]">
        <div className="max-w-[1200px] flex flex-1 justify-center">
          <div className=" max-w-[400px] flex flex-1 flex-col items-center">
            <ErrorMessage message={error} />
            <h1 className="text-[30px] flex flex-1 text-[#9f9387] font-bold">Edit Book</h1>
            <form className="flex flex-1 flex-col w-full" onSubmit={onSubmit}>
                <FormInput 
                  label="Title"
                  type="text"
                  name="title"
                  required={true}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter Title"
                />
                <FormInput 
                  label="Author"
                  type="text"
                  name="author"
                  value={author}
                  required={true}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Enter Author"
                />
                <FormSelect
                    label="Collection"
                    required
                    value={collection}
                    options={['Want to read','Reading','Read']}
                    onChange={(e) => setCollection(e.target.value)}
                />
                <div>
                    <p className="text-[18px] m-2">Cover Image</p>
                    <input type="file"  onChange={(e) => setFile(e.target.files[0])} />
                </div>
                <FormButton 
                  type="submit"
                  loading={loading}
                  title="Continue"
                />
            </form>
          </div>
        </div>
    </div>
    )
}

export const getServerSideProps = async ({ req, query }) => {
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
        const client = createApolloClient()

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

};