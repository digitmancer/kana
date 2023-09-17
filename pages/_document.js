import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <link rel="icon" type="image/x-icon" href="favicon.ico" />
          <link 
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP&family=Roboto:wght@100&display=swap" 
            rel="stylesheet"
          /> 
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;