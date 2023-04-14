import {
  ApolloClient,
  InMemoryCache,
  split,
} from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
  
// setting configuration for http connect for Query and Mutation
const httpLink  = createUploadLink({
    uri:  process.env.NEXT_PUBLIC_HTTP_URL,
    headers: {
      "Apollo-Require-Preflight": true,
    }
  });

// setting configuration for websocket connect for subscription
const wsLink =
  typeof window !== "undefined"
      ? new GraphQLWsLink(
              createClient({
                  url: process.env.NEXT_PUBLIC_WS_URL
              })
        )
      : null;

const splitLink = typeof window !== "undefined" && wsLink != null
  ? split(
          ({ query }) => {
              const def = getMainDefinition(query);
              return (
                  def.kind === "OperationDefinition" &&
                  def.operation === "subscription"
              );
          },
          wsLink,
          httpLink
    )
  : httpLink;

export function createApolloClient() {
  return new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
  });
}