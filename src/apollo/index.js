import {
  ApolloClient,
  InMemoryCache,
  split,
} from '@apollo/client';
import merge from 'deepmerge';
import isEqual from 'lodash-es/isEqual';
import { createUploadLink } from 'apollo-upload-client';
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
  
export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

let apolloClient;

// setting configuration for http connect for Query and Mutation
const httpLink  = createUploadLink({
    uri:  "http://localhost:8081/graphql",
    headers: {
      "Apollo-Require-Preflight": true,
    }
  });

// setting configuration for websocket connect for subscription
const wsLink =
    typeof window !== "undefined"
        ? new GraphQLWsLink(
                createClient({
                    url: "ws://localhost:8081/graphql",
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