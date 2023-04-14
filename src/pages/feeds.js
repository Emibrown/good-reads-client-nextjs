import React, {useState, useEffect} from "react";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from "next-i18next";
import Feeds from '@/components/Feeds';
import { gql, useSubscription } from '@apollo/client';
import { createApolloClient } from "@/apollo";
import Cookies from "universal-cookie";

const GET_FINISHED_BOOKS = gql`
    query Query {
      getFinishedBooks {
        books {
          title
          coverImage
          rating
          updatedAt
          author
        }
        status
      }
    }
`;

const BOOK_FEED = gql`
   subscription Subscription {
        bookFeed {
          title
          coverImage
          rating
          updatedAt
          author
        }
    }
`;

export default function BookFeeds({books}) {
  const {t} = useTranslation();
  const [feeds, setFeeds] = useState(books)

  // Creating subscription for feeds //
  useSubscription(BOOK_FEED, {
    onData: (subscriptionData) => {
      // This function will get triggered one a publish event is being initiated by the server
      if (subscriptionData) {
        // we are updating the state of feeds
        console.log("subscriptionData", subscriptionData?.data?.data?.bookFeed);
        setFeeds([subscriptionData?.data?.data?.bookFeed, ...feeds]);
      }
    },
  });
  return (
    <Feeds books={feeds} />
  )
}

export async function getServerSideProps({ locale, req }) {
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

  const client = createApolloClient();

  const result = await client.query({
    query: GET_FINISHED_BOOKS,
    context: {
      headers: {
          "authorization": `Bearer ${token}`
      },
    },
  });

  return {
    props: {
      ...(await serverSideTranslations(locale, ['home'])),
      books: result.data.getFinishedBooks.books
    }
  } 
}