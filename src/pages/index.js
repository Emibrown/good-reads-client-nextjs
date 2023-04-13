import React, {useState, useEffect, useContext} from "react";
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Banner from '@/components/Banner'
import Feeds from '@/components/Feeds'
import { gql, useSubscription } from '@apollo/client';

const BOOK_FEED = gql`
   subscription Subscription {
        bookFeed {
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
`;

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  // Creating subscription for blogs //
  useSubscription(BOOK_FEED, {
    onData: (subscriptionData) => {
      // This function will get triggered one a publish event is being initited by the server
      // if (subscriptionData) {
        // we are updating the state of blogs
        console.log("subscriptionData", subscriptionData?.data?.data?.bookFeed);
      // }
    },
  });

  return (
    <>
      <Banner/>
      <Feeds />
    </>
  )
}
