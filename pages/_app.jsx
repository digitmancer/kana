import React from 'react';
import Head from 'next/head';
import '@fontsource/noto-sans-jp/500.css';
import '@fontsource/noto-sans-jp/600.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '../styles/global.scss';

export default function KanaCoach({ Component, pageProps })
{
  return (
    <>
      <Head>
        <title>Kana Coach</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}