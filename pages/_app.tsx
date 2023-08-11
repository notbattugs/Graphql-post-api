import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
const client = new ApolloClient({
  uri: 'http://localhost:3000/api/hello',
  cache: new InMemoryCache(),
});
export default function App({ Component, pageProps }: AppProps) {
  return(
  <ApolloProvider client={client}>
   <Component {...pageProps} />
  </ApolloProvider>)
}
