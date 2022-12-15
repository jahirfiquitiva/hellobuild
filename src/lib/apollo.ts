import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  defaultDataIdFromObject,
  from,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        if (err.extensions.code === 'UNAUTHENTICATED') {
          // get the authentication token from local storage if it exists
          const token = sessionStorage.getItem('gh_token');
          if (token) {
            // Modify the operation context with the token from session storage
            const oldHeaders = operation.getContext().headers;
            operation.setContext({
              headers: {
                ...oldHeaders,
                authorization: `Bearer ${token}`,
              },
            });
            // Retry the request, returning the new observable
            return forward(operation);
          }
        }
        console.error(err);
      }
    }

    // To retry on network errors, we recommend the RetryLink
    // instead of the onError link. This just logs the error.
    if (networkError) {
      console.error(`[Network error]: ${networkError}`);
    }
  },
);

const httpLink = createHttpLink({
  uri: 'https://api.github.com/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = sessionStorage.getItem('gh_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const apolloClient = new ApolloClient({
  link: from([errorLink, authLink.concat(httpLink)]),
  cache: new InMemoryCache({
    resultCaching: false,
    dataIdFromObject(responseObject) {
      switch (responseObject.__typename) {
        case 'User':
          return `User:${responseObject.login}`;
        default:
          return defaultDataIdFromObject(responseObject);
      }
    },
  }),
});
