import Amplify from 'aws-amplify';
import { ApolloClient, ApolloProvider } from '@apollo/client';
import Head from 'next/head';
import { useEffect, useState } from 'react';

import awsExports from '~/aws-exports';
import { Breadcrumbs } from '~/components';
import Authentication from '~/components/authentication';
import { AuthContext, UserInfo } from '~/context';
import { useApollo } from '~/graphql';

import '~/styles.scss';

Amplify.configure(awsExports);

type AppStateProps = {
  apolloClient: ApolloClient<any>;
  userInfo?: UserInfo;
};

function MyApp({ Component, pageProps }) {
  const [appState, setAppState] = useState<AppStateProps>({
    apolloClient: useApollo(pageProps.initialApolloState),
  });

  const apolloClient = useApollo(pageProps.initialApolloState, appState.userInfo?.accessToken);

  useEffect(() => {
    setAppState({
      ...appState,
      apolloClient,
    });
  }, [appState.userInfo?.accessToken]);

  return (
    <ApolloProvider client={appState.apolloClient}>
      <Head>
        <title>blog.me powered by AWS amplify!</title>
        <meta charSet="UTF-8" />
        <meta name="description" content="A simple blog built using next.js and powered by AWS Amplify" />
        <link rel="icon" href="/favicon.ico" />

        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/js/bootstrap.min.js"></script>
      </Head>
      <AuthContext.Provider
        value={{
          setUserInfo: (userInfo) => setAppState({ ...appState, userInfo }),
          userInfo: appState.userInfo,
        }}
      >
        <main className="container py-3 py-md-5">
          <div className="shadow-lg pt-4 pb-3 px-3 p-md-5 bg-white rounded">
            <div className="mb-2">
              <h1>
                Welcome to <code>blog.me!</code>
              </h1>
              <p>
                A simple blog built using <a href="https://nextjs.org">next.js</a> and powered by{' '}
                <a href="https://aws.amazon.com/amplify/">AWS Amplify</a>
              </p>
            </div>
            <Authentication />
            <Breadcrumbs menus={pageProps.menus} />
            <Component {...pageProps} />
          </div>
        </main>
      </AuthContext.Provider>
      <style jsx>
        {`
          * {
            font-family: 'Exo', serif;
          }
        `}
      </style>
    </ApolloProvider>
  );
}

export default MyApp;
