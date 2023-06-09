import '@/styles/globals.css';
import Layout from '@/components/Layout';
import { UserProvider } from '@/app/context/UserContext';
import { BoardProvider } from '@/app/context/BoardContext';
import Head from 'next/head';
import { getDefaultUser } from '@/pages/api/user';
import { useEffect, useState } from 'react';
import getLeaderboard from '@/pages/api/leaderboard';
import { makeBoard } from '@/app/utils/BoardUtils';

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const user = await getDefaultUser();
      setUser(user);
    }
    fetchData();
  }, []);

  return (
    <div>
      <Head>
        <title>Bell Challenge</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Layout>
        {user && (
          <UserProvider
            name={user.name}
            score={user.score}
            role='Developer'
            workplace='Acme Inc.'
          >
            <BoardProvider initialBoard={makeBoard(user.score)}>
              <Component {...pageProps} />
            </BoardProvider>
          </UserProvider>
        )}
      </Layout>
    </div>
  );
}
