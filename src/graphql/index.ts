import { ApolloLink, ApolloClient, createHttpLink, from, InMemoryCache, makeVar } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { useMemo } from 'react';

import awsExports from '~/aws-exports';
export * as Fragments from './fragments';
export * as Mutations from './mutations';

const URL = 'https://aqwasoohjbhdpirrpff3yhubve.appsync-api.ap-southeast-2.amazonaws.com/graphql';

const createAuthLink = (token) => {
  const authHeader = token === awsExports.aws_appsync_apiKey ? 'x-api-key' : 'Authorization';
  return new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        [authHeader]: token,
      },
    });

    return forward(operation).map((response) => {
      // console.log(`response`, response);
      return response;
    });
  });
};

type Modal = {
  open: boolean;
  message?: string;
};

const modalVar = makeVar<Modal>({ open: false, message: '' });

const errorLink = onError(({ response, graphQLErrors }) => {
  console.log(`onError:::response`, graphQLErrors);

  if (graphQLErrors.find(({ errorType }) => errorType === 'Unauthorized') !== undefined) {
    modalVar({ open: true, message: 'Not authorized!' });
    response.errors = null;
  }
});

const httpLink = createHttpLink({
  uri: URL,
});

const typePolicies = {
  Query: {
    fields: {
      modal() {
        return modalVar();
      },
    },
  },
};

const resolvers = {
  Mutation: {
    toggleModal(_, args) {
      modalVar(args);
      return args;
    },
  },
};

function createApolloClient(token) {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: from([errorLink, createAuthLink(token), httpLink]),
    cache: new InMemoryCache({ typePolicies }),
    connectToDevTools: true,
    resolvers,
  });
}

let cache: { apolloClient: ApolloClient<any>; token: string } = {
  apolloClient: null,
  token: null,
};

export function initApollo(initialState = {}, token = awsExports.aws_appsync_apiKey): ApolloClient<any> {
  if (typeof window === 'undefined') return createApolloClient(token);

  if (!cache.apolloClient || cache.token !== token) {
    cache = {
      apolloClient: createApolloClient(token),
      token,
    };
  }

  if (initialState) {
    cache.apolloClient.cache.restore(initialState);
  }

  return cache.apolloClient;
}

export function useApollo(initialState = {}, token = awsExports.aws_appsync_apiKey): ApolloClient<any> {
  return useMemo(() => initApollo(initialState, token), [initialState, token]);
}
