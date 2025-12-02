import { Inter } from 'next/font/google';
import Head from 'next/head';
import { ReactNode } from 'react';

import { Navbar } from '@/components';

const inter = Inter({ subsets: ['latin'] });

type Props = {
  children: ReactNode;
};

export function RootLayout({ children }: Props) {
  return (
    <>
      <Head>
        <title>Wristband Demo App</title>
        <meta name="description" content="A Wristband multi-tenant demo app using NextJS with Pages Router." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div
        className={`font-geist-sans flex flex-col items-center justify-items-center min-h-screen p-8 pt-16 bg-slate-50 dark:bg-slate-900`}
      >
        <main
          className={`flex flex-col gap-8 row-start-2 items-center w-full max-w-2xl text-center ${inter.className}`}
        >
          {children}
        </main>
      </div>
    </>
  );
}
